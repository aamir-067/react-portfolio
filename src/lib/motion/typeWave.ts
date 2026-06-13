import { gsap } from "@/lib/gsap";
import { isFinePointer, prefersReducedMotion } from "@/lib/device";

interface WaveChar {
	el: HTMLElement;
	italicTo: (value: number) => void;
	romanTo: (value: number) => void;
	yTo: (value: number) => void;
	cx: number;
	cy: number;
}

export interface TypeWave {
	measure: () => void;
	pulse: (line: HTMLElement) => void;
	cleanup: () => void;
}

const noopWave: TypeWave = {
	measure: () => {},
	pulse: () => {},
	cleanup: () => {},
};

// Sweeps an italic accent twin across specimen glyphs, driven by the
// real cursor on fine pointers or by pulse() for choreographed passes.
export function attachTypeWave(
	container: HTMLElement,
	charSelector: string,
	{ radius = 130, lift = 6 } = {},
): TypeWave {
	if (prefersReducedMotion()) return noopWave;

	const pointer = { x: -9e4, y: -9e4, active: false };
	let needsRelease = false;
	let measureQueued = false;

	const chars: WaveChar[] = Array.from(
		container.querySelectorAll<HTMLElement>(charSelector),
	).map((el) => {
		if (!el.querySelector(".tw-roman")) {
			const glyph = el.textContent ?? "";
			el.classList.add("tw-char");
			if (el.closest("em")) el.classList.add("tw-invert");
			el.textContent = "";
			const roman = document.createElement("span");
			roman.className = "tw-roman";
			roman.textContent = glyph;
			const italic = document.createElement("span");
			italic.className = "tw-italic";
			italic.setAttribute("aria-hidden", "true");
			italic.textContent = glyph;
			el.append(roman, italic);
		}
		const roman = el.querySelector<HTMLElement>(".tw-roman")!;
		const italic = el.querySelector<HTMLElement>(".tw-italic")!;
		return {
			el,
			italicTo: gsap.quickTo(italic, "opacity", {
				duration: 0.35,
				ease: "power2.out",
			}),
			romanTo: gsap.quickTo(roman, "opacity", {
				duration: 0.35,
				ease: "power2.out",
			}),
			yTo: gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" }),
			cx: 0,
			cy: 0,
		};
	});

	const measure = () => {
		for (const char of chars) {
			const rect = char.el.getBoundingClientRect();
			char.cx = rect.left + rect.width / 2;
			char.cy = rect.top + rect.height / 2;
		}
	};
	measure();

	const tick = () => {
		if (!pointer.active) {
			if (needsRelease) {
				needsRelease = false;
				for (const char of chars) {
					char.italicTo(0);
					char.romanTo(1);
					char.yTo(0);
				}
			}
			return;
		}
		needsRelease = true;
		for (const char of chars) {
			const dist = Math.hypot(char.cx - pointer.x, char.cy - pointer.y);
			const t = Math.max(0, 1 - dist / radius);
			const p = t * t * (3 - 2 * t);
			char.italicTo(p);
			char.romanTo(1 - p * 0.92);
			char.yTo(-lift * p);
		}
	};

	const onMove = (e: PointerEvent) => {
		pointer.x = e.clientX;
		pointer.y = e.clientY;
		pointer.active = true;
	};
	const onLeave = () => {
		pointer.active = false;
	};
	const queueMeasure = () => {
		if (measureQueued) return;
		measureQueued = true;
		window.setTimeout(() => {
			measureQueued = false;
			measure();
		}, 200);
	};

	gsap.ticker.add(tick);
	if (isFinePointer()) {
		window.addEventListener("pointermove", onMove, { passive: true });
		document.documentElement.addEventListener("pointerleave", onLeave);
	}
	window.addEventListener("scroll", queueMeasure, { passive: true });
	window.addEventListener("resize", queueMeasure);

	const pulse = (line: HTMLElement) => {
		const rect = line.getBoundingClientRect();
		const proxy = { x: rect.left - radius };
		pointer.y = rect.top + rect.height / 2;
		pointer.active = true;
		gsap.to(proxy, {
			x: rect.right + radius,
			duration: 1.15,
			ease: "power1.inOut",
			onUpdate: () => {
				pointer.x = proxy.x;
			},
			onComplete: () => {
				pointer.active = false;
			},
		});
	};

	const cleanup = () => {
		gsap.ticker.remove(tick);
		window.removeEventListener("pointermove", onMove);
		document.documentElement.removeEventListener("pointerleave", onLeave);
		window.removeEventListener("scroll", queueMeasure);
		window.removeEventListener("resize", queueMeasure);
	};

	return { measure, pulse, cleanup };
}
