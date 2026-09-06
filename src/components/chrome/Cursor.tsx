"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion } from "@/lib/device";

// Instrument cursor: a dot that tracks tight, a ticked ring that lags and
// spins. Over anything clickable the ring opens up and shows a one-word label
// (data-cursor="View"). Difference blend keeps it legible on every ground.
export default function Cursor() {
	const dotRef = useRef<HTMLDivElement>(null);
	const ringRef = useRef<HTMLDivElement>(null);
	const labelRef = useRef<HTMLSpanElement>(null);
	const pathname = usePathname();

	useEffect(() => {
		const dot = dotRef.current;
		const ring = ringRef.current;
		const label = labelRef.current;
		if (!dot || !ring || !label || !isFinePointer() || prefersReducedMotion()) return;
		document.documentElement.setAttribute("data-custom-cursor", "");

		const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
		const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
		const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
		const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

		let visible = false;
		let mode = "";

		const setMode = (next: string, text: string) => {
			if (next === mode && label.textContent === text) return;
			mode = next;
			label.textContent = text;
			ring.dataset.mode = next;
			dot.dataset.mode = next;
			gsap.to(ring, {
				width: next === "label" ? 84 : next === "link" ? 44 : 30,
				height: next === "label" ? 84 : next === "link" ? 44 : 30,
				duration: 0.45,
				ease: "expo.out",
				overwrite: "auto",
			});
		};

		const onMove = (e: MouseEvent) => {
			if (!visible) {
				gsap.set([dot, ring], { x: e.clientX, y: e.clientY, opacity: 1 });
				visible = true;
				return;
			}
			dotX(e.clientX);
			dotY(e.clientY);
			ringX(e.clientX);
			ringY(e.clientY);
		};
		const onOver = (e: MouseEvent) => {
			const target = (e.target as Element | null)?.closest<HTMLElement>("a, button, [data-cursor]");
			if (!target) return setMode("", "");
			const text = target.dataset.cursor;
			if (text) return setMode("label", text);
			setMode("link", "");
		};
		const onDown = () => gsap.to(ring, { scale: 0.82, duration: 0.15, ease: "power2.out" });
		const onUp = () => gsap.to(ring, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" });
		const onLeave = () => {
			gsap.set([dot, ring], { opacity: 0 });
			visible = false;
		};

		window.addEventListener("mousemove", onMove, { passive: true });
		window.addEventListener("mouseover", onOver, { passive: true });
		window.addEventListener("mousedown", onDown);
		window.addEventListener("mouseup", onUp);
		document.documentElement.addEventListener("mouseleave", onLeave);
		return () => {
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseover", onOver);
			window.removeEventListener("mousedown", onDown);
			window.removeEventListener("mouseup", onUp);
			document.documentElement.removeEventListener("mouseleave", onLeave);
			document.documentElement.removeAttribute("data-custom-cursor");
			gsap.killTweensOf([dot, ring]);
		};
	}, [pathname]);

	return (
		<>
			<div
				ref={dotRef}
				aria-hidden
				className="cursor-dot pointer-events-none fixed left-0 top-0 z-[115] h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 mix-blend-difference"
			/>
			<div
				ref={ringRef}
				aria-hidden
				className="cursor-ring pointer-events-none fixed left-0 top-0 z-[115] flex h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 items-center justify-center text-white opacity-0 mix-blend-difference"
			>
				<svg viewBox="0 0 100 100" className="cursor-ticks absolute inset-0 h-full w-full" aria-hidden>
					<circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="40 32" strokeLinecap="round" />
					<path d="M50 0v10M50 90v10M0 50h10M90 50h10" stroke="currentColor" strokeWidth="2.5" />
				</svg>
				<span ref={labelRef} className="cursor-label mono-sm relative select-none whitespace-nowrap" />
			</div>
		</>
	);
}
