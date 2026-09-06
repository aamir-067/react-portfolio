"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";

// Reading-progress hairline plus a subtle velocity shear on display headings.
export default function ScrollFX() {
	const barRef = useRef<HTMLSpanElement>(null);
	const pathname = usePathname();

	useEffect(() => {
		const bar = barRef.current;
		if (!bar || prefersReducedMotion()) return;
		registerGsap();

		const triggers: ScrollTrigger[] = [];

		gsap.set(bar, { scaleX: 0 });
		triggers.push(
			ScrollTrigger.create({
				start: 0,
				end: "max",
				onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
			}),
		);

		const shearTargets = gsap.utils.toArray<HTMLElement>("[data-shear]");
		if (shearTargets.length) {
			const proxy = { skew: 0 };
			const setSkew = gsap.quickSetter(shearTargets, "skewX", "deg");
			triggers.push(
				ScrollTrigger.create({
					start: 0,
					end: "max",
					onUpdate: (self) => {
						const target = gsap.utils.clamp(-1.2, 1.2, self.getVelocity() / -800);
						if (Math.abs(target) > Math.abs(proxy.skew)) {
							proxy.skew = target;
							gsap.to(proxy, {
								skew: 0,
								duration: 0.65,
								ease: "power3.out",
								overwrite: true,
								onUpdate: () => setSkew(proxy.skew),
							});
						}
					},
				}),
			);
		}

		return () => triggers.forEach((t) => t.kill());
	}, [pathname]);

	return (
		<span
			ref={barRef}
			aria-hidden
			className="fixed left-0 top-0 z-[96] h-px w-full origin-left scale-x-0 bg-fg"
		/>
	);
}
