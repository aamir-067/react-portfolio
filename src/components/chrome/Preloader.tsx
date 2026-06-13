"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";
import { signalBootReveal } from "@/lib/motion/boot";

const BOOT_LOGS = [
	"parsing the brief",
	"indexing selected work",
	"compiling the front page",
	"ready",
];

export default function Preloader() {
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const root = rootRef.current;
		const booting =
			root &&
			document.documentElement.hasAttribute("data-boot") &&
			!prefersReducedMotion();

		if (!booting) {
			document.documentElement.removeAttribute("data-boot");
			signalBootReveal();
			return;
		}

		registerGsap();
		const logs = root.querySelectorAll("[data-boot-log]");
		const counter = root.querySelector("[data-boot-count]");
		const bar = root.querySelector("[data-boot-bar]");
		const progress = { v: 0 };

		// Fail-safe: the veil must never outlive its welcome.
		const failSafe = window.setTimeout(() => {
			document.documentElement.removeAttribute("data-boot");
			signalBootReveal();
		}, 4500);

		const tl = gsap.timeline({
			onComplete: () => {
				document.documentElement.removeAttribute("data-boot");
				try {
					sessionStorage.setItem("aamir-boot", "1");
				} catch {
					/* private mode */
				}
			},
		});

		tl.from(
			logs,
			{ autoAlpha: 0, y: 10, stagger: 0.24, duration: 0.4, ease: "power2.out" },
			0,
		)
			.to(
				progress,
				{
					v: 100,
					duration: 1.3,
					ease: "power2.inOut",
					onUpdate: () => {
						if (counter)
							counter.textContent = String(Math.round(progress.v)).padStart(
								3,
								"0",
							);
						if (bar)
							gsap.set(bar, { scaleX: progress.v / 100 });
					},
				},
				0.1,
			)
			.to(root, {
				yPercent: -101,
				duration: 0.85,
				ease: "expo.inOut",
				onStart: signalBootReveal,
			});

		return () => {
			window.clearTimeout(failSafe);
			tl.kill();
			signalBootReveal();
		};
	}, []);

	return (
		<div
			ref={rootRef}
			aria-hidden
			className="boot-veil fixed inset-0 z-[120] flex-col justify-between bg-ink px-5 py-6 text-paper md:px-10"
		>
			<div className="mono-label flex items-center justify-between text-paper/50">
				<span>
					AK <span className="text-accent">/</span> boot
				</span>
				<span>Portfolio 2026</span>
			</div>

			<div className="flex items-end justify-between gap-6">
				<div className="space-y-2.5">
					{BOOT_LOGS.map((line, i) => (
						<p
							key={line}
							data-boot-log
							className="mono-label flex items-center gap-3 text-paper/60"
						>
							<span className="text-accent">
								{String(i + 1).padStart(2, "0")}
							</span>
							{line}
						</p>
					))}
				</div>
				<p className="font-serif text-7xl italic leading-none md:text-8xl">
					<span data-boot-count>000</span>
				</p>
			</div>

			<span
				data-boot-bar
				className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent"
			/>
		</div>
	);
}
