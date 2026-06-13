import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

interface RevealOptions {
	stagger?: number;
	delay?: number;
	start?: string;
	trigger?: Element | null;
	group?: boolean;
}

export function splitIntoLines(el: Element) {
	return SplitText.create(el, {
		type: "lines",
		mask: "lines",
		autoSplit: true,
		linesClass: "split-line",
	});
}

export function revealLines(
	root: HTMLElement,
	selector: string,
	{ stagger = 0.09, delay = 0, start = "top 82%", trigger }: RevealOptions = {},
) {
	const targets = gsap.utils.toArray<HTMLElement>(
		root.querySelectorAll(selector),
	);
	targets.forEach((el) => {
		const split = splitIntoLines(el);
		gsap.from(split.lines, {
			yPercent: 112,
			duration: 1.05,
			ease: "power4.out",
			stagger,
			delay,
			scrollTrigger: {
				trigger: trigger ?? el,
				start,
				once: true,
			},
		});
	});
}

export function fadeUp(
	root: HTMLElement,
	selector: string,
	{
		stagger = 0.08,
		delay = 0,
		start = "top 88%",
		trigger,
		group = false,
	}: RevealOptions = {},
) {
	const targets = gsap.utils.toArray<HTMLElement>(
		root.querySelectorAll(selector),
	);
	if (!targets.length) return;
	if (group) {
		gsap.from(targets, {
			y: 26,
			autoAlpha: 0,
			duration: 0.9,
			ease: "power3.out",
			stagger,
			delay,
			scrollTrigger: { trigger: trigger ?? targets[0], start, once: true },
		});
		return;
	}
	targets.forEach((el) => {
		gsap.from(el, {
			y: 26,
			autoAlpha: 0,
			duration: 0.9,
			ease: "power3.out",
			delay,
			scrollTrigger: { trigger: el, start, once: true },
		});
	});
}

export function parallaxMedia(root: HTMLElement, selector: string) {
	const frames = gsap.utils.toArray<HTMLElement>(
		root.querySelectorAll(selector),
	);
	frames.forEach((frame) => {
		const media = frame.querySelector("img, svg, [data-media]");
		if (!media) return;
		gsap.from(frame, {
			clipPath: "inset(10% 4% 10% 4%)",
			duration: 1.2,
			ease: "expo.out",
			scrollTrigger: { trigger: frame, start: "top 80%", once: true },
		});
		gsap.fromTo(
			media,
			{ yPercent: -7, scale: 1.12 },
			{
				yPercent: 7,
				scale: 1.04,
				ease: "none",
				scrollTrigger: {
					trigger: frame,
					start: "top bottom",
					end: "bottom top",
					scrub: true,
				},
			},
		);
	});
}

export function velocitySkew(root: HTMLElement, selector: string) {
	const targets = gsap.utils.toArray<HTMLElement>(
		root.querySelectorAll(selector),
	);
	if (!targets.length) return;
	const proxy = { skew: 0 };
	const setSkew = gsap.quickSetter(targets, "skewY", "deg");
	ScrollTrigger.create({
		trigger: root,
		start: "top bottom",
		end: "bottom top",
		onUpdate(self) {
			const target = gsap.utils.clamp(-2.2, 2.2, self.getVelocity() / -420);
			if (Math.abs(target) > Math.abs(proxy.skew)) {
				proxy.skew = target;
				gsap.to(proxy, {
					skew: 0,
					duration: 0.7,
					ease: "power3.out",
					overwrite: true,
					onUpdate: () => setSkew(proxy.skew),
				});
			}
		},
	});
}
