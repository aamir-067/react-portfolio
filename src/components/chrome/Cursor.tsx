"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion } from "@/lib/device";

export default function Cursor() {
	const dotRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const dot = dotRef.current;
		if (!dot || !isFinePointer() || prefersReducedMotion()) return;
		document.documentElement.setAttribute("data-custom-cursor", "");

		const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3.out" });
		const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3.out" });
		const scaleTo = gsap.quickTo(dot, "scale", {
			duration: 0.3,
			ease: "power3.out",
		});

		let visible = false;
		const onMove = (e: MouseEvent) => {
			if (!visible) {
				gsap.set(dot, { x: e.clientX, y: e.clientY, opacity: 1 });
				visible = true;
				return;
			}
			xTo(e.clientX);
			yTo(e.clientY);
		};
		const onOver = (e: MouseEvent) => {
			const interactive = (e.target as Element | null)?.closest(
				"a, button, [data-cursor]",
			);
			scaleTo(interactive ? 2.8 : 1);
		};
		const onLeave = () => {
			gsap.set(dot, { opacity: 0 });
			visible = false;
		};

		window.addEventListener("mousemove", onMove, { passive: true });
		window.addEventListener("mouseover", onOver, { passive: true });
		document.documentElement.addEventListener("mouseleave", onLeave);
		return () => {
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseover", onOver);
			document.documentElement.removeEventListener("mouseleave", onLeave);
			document.documentElement.removeAttribute("data-custom-cursor");
			gsap.killTweensOf(dot);
		};
	}, []);

	return (
		<div
			ref={dotRef}
			aria-hidden
			className="pointer-events-none fixed left-0 top-0 z-[110] -ml-[5px] -mt-[5px] h-2.5 w-2.5 rounded-full bg-paper opacity-0 mix-blend-difference"
		/>
	);
}
