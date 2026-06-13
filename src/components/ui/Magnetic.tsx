"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion } from "@/lib/device";

interface MagneticProps {
	children: ReactNode;
	className?: string;
	strength?: number;
}

export default function Magnetic({
	children,
	className,
	strength = 0.32,
}: MagneticProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el || !isFinePointer() || prefersReducedMotion()) return;
		const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
		const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
		const onMove = (e: PointerEvent) => {
			const r = el.getBoundingClientRect();
			xTo((e.clientX - (r.left + r.width / 2)) * strength);
			yTo((e.clientY - (r.top + r.height / 2)) * strength);
		};
		const onLeave = () => {
			gsap.to(el, {
				x: 0,
				y: 0,
				duration: 0.8,
				ease: "elastic.out(1, 0.45)",
				overwrite: true,
			});
		};
		el.addEventListener("pointermove", onMove);
		el.addEventListener("pointerleave", onLeave);
		return () => {
			el.removeEventListener("pointermove", onMove);
			el.removeEventListener("pointerleave", onLeave);
			gsap.killTweensOf(el);
		};
	}, [strength]);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
