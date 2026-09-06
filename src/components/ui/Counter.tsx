"use client";

import { useEffect, useRef } from "react";
import type { Counter as CounterSpec } from "@/content/projects";
import { formatCounter } from "@/lib/format";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";

interface CounterProps {
	counter: CounterSpec;
	display?: string;
	className?: string;
	duration?: number;
}

// Server-renders the final value; on scroll-into-view it counts from the
// real "before" state to the real "after" state. Never invents a start.
export default function Counter({
	counter,
	display,
	className,
	duration = 1.6,
}: CounterProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const finalText = display ?? formatCounter(counter.to, counter);

	useEffect(() => {
		const el = ref.current;
		if (!el || prefersReducedMotion()) return;
		registerGsap();
		const state = { v: counter.from };
		el.textContent = formatCounter(counter.from, counter);
		const trigger = ScrollTrigger.create({
			trigger: el,
			start: "top 85%",
			once: true,
			onEnter: () =>
				gsap.to(state, {
					v: counter.to,
					duration,
					ease: "power3.out",
					onUpdate: () => {
						el.textContent = formatCounter(state.v, counter);
					},
					onComplete: () => {
						el.textContent = finalText;
					},
				}),
		});
		return () => {
			trigger.kill();
			gsap.killTweensOf(state);
			el.textContent = finalText;
		};
	}, [counter, duration, finalText]);

	return (
		<span ref={ref} className={className}>
			{finalText}
		</span>
	);
}
