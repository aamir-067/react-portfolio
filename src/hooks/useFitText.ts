"use client";

import { useEffect, type RefObject } from "react";

// Scales an inline element's font-size so its text spans its container width.
export function useFitText(
	ref: RefObject<HTMLElement | null>,
	containerRef: RefObject<HTMLElement | null>,
	max = 400,
) {
	useEffect(() => {
		const el = ref.current;
		const container = containerRef.current;
		if (!el || !container) return;
		const fit = () => {
			el.style.fontSize = "100px";
			const range = document.createRange();
			range.selectNodeContents(el);
			const textWidth = range.getBoundingClientRect().width;
			const target = container.clientWidth;
			if (!textWidth || !target) return;
			el.style.fontSize = `${Math.min(max, (target / textWidth) * 100 * 0.985)}px`;
		};
		const observer = new ResizeObserver(fit);
		observer.observe(container);
		document.fonts.ready.then(fit);
		fit();
		return () => observer.disconnect();
	}, [ref, containerRef, max]);
}
