"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";
import { signalBootReveal } from "@/lib/motion/boot";
import { site } from "@/content";

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
		const counter = root.querySelector("[data-boot-count]");
		const word = root.querySelector("[data-boot-word]");
		const progress = { v: 0 };

		const failSafe = window.setTimeout(() => {
			document.documentElement.removeAttribute("data-boot");
			signalBootReveal();
		}, 4000);

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

		tl.from(word, { yPercent: 110, duration: 0.8, ease: "expo.out" }, 0)
			.to(
				progress,
				{
					v: 100,
					duration: 1.1,
					ease: "power2.inOut",
					onUpdate: () => {
						if (counter) counter.textContent = String(Math.round(progress.v)).padStart(3, "0");
					},
				},
				0.1,
			)
			.to(root, {
				yPercent: -101,
				duration: 0.8,
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
			className="boot-veil gutter fixed inset-0 z-[120] flex-col justify-between bg-cobalt py-6 text-white"
		>
			<div className="mono flex items-center justify-between text-white/70">
				<span>{site.wordmark}</span>
				<span>Loading</span>
			</div>
			<div className="flex items-end justify-between gap-6 overflow-hidden">
				<p data-boot-word className="display text-[clamp(3rem,12vw,11rem)]">
					{site.firstName}
				</p>
				<p className="mono text-2xl md:text-4xl">
					<span data-boot-count>000</span>
				</p>
			</div>
		</div>
	);
}
