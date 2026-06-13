import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
	lenis = instance;
};

export const getLenis = () => lenis;

export function scrollToTarget(selector: string) {
	const instance = getLenis();
	if (instance) {
		instance.scrollTo(selector, { duration: 1.4 });
		return;
	}
	document
		.querySelector(selector)
		?.scrollIntoView({ behavior: "smooth", block: "start" });
}
