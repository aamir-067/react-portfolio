"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/device";

export function useSectionAnimation<T extends HTMLElement = HTMLElement>(
	build: (root: T) => void,
) {
	const rootRef = useRef<T | null>(null);
	const buildRef = useRef(build);
	buildRef.current = build;

	useEffect(() => {
		const root = rootRef.current;
		if (!root || prefersReducedMotion()) return;
		registerGsap();
		let disposed = false;
		const ctx = gsap.context(() => {}, root);
		document.fonts.ready.then(() => {
			if (!disposed) ctx.add(() => buildRef.current(root));
		});
		return () => {
			disposed = true;
			ctx.revert();
		};
	}, []);

	return rootRef;
}
