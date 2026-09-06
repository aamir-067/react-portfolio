"use client";

import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { manifesto, site } from "@/content";
import { useFitText } from "@/hooks/useFitText";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { fadeUp } from "@/lib/animations";
import { gsap, SplitText } from "@/lib/gsap";

// noth.in register: a two-line thesis, a pill, then the name at full width.
export default function Statement() {
	const nameRef = useRef<HTMLSpanElement>(null);
	const boxRef = useRef<HTMLDivElement>(null);
	useFitText(nameRef, boxRef, 520);

	const rootRef = useSectionAnimation<HTMLElement>((root) => {
		fadeUp(root, "[data-fade]");
		const name = nameRef.current;
		if (!name) return;
		const chars = SplitText.create(name, { type: "chars", charsClass: "hero-char" }).chars;
		gsap.from(chars, {
			yPercent: 110,
			duration: 1.3,
			ease: "expo.out",
			stagger: 0.035,
			scrollTrigger: { trigger: name, start: "top 90%", once: true },
		});
		gsap.to(name, {
			yPercent: -12,
			ease: "none",
			scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
		});
	});

	return (
		<section
			ref={rootRef}
			id="about"
			aria-label="Statement"
			className="invert-scope gutter relative flex min-h-[100svh] flex-col justify-between pb-8 pt-28 md:pt-32"
		>
			<div className="flex flex-wrap items-start justify-between gap-8">
				<div>
					<p data-fade className="font-sans text-[clamp(1.3rem,2.1vw,2rem)] font-medium leading-[1.15] tracking-tight">
						{manifesto.lines[0]}
						<br />
						{manifesto.lines[1]}
					</p>
					<a data-fade href={`mailto:${site.email}`} className="pill mt-10">
						Book a call
						<ArrowRight size={14} aria-hidden />
					</a>
				</div>
			</div>

			<div ref={boxRef} className="my-10 w-full">
				<h2 className="display overflow-hidden pb-[0.05em] leading-[0.82] tracking-[-0.055em]">
					<span className="sr-only">{site.name}</span>
					<span ref={nameRef} aria-hidden className="block whitespace-nowrap text-[clamp(3rem,16vw,22rem)]">
						{site.firstName} {site.lastName}
					</span>
				</h2>
			</div>

			<div className="flex flex-wrap items-end justify-between gap-6">
				<p data-fade className="max-w-sm font-sans text-base font-medium tracking-tight md:text-lg">
					{manifesto.footnote}
				</p>
				<p data-fade className="mono flex items-center gap-5 font-semibold">
					<a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hairline inline-flex items-center gap-1">
						LinkedIn <ArrowUpRight size={12} aria-hidden />
					</a>
					<span aria-hidden>/</span>
					<a href={site.github} target="_blank" rel="noopener noreferrer" className="hairline inline-flex items-center gap-1">
						GitHub <ArrowUpRight size={12} aria-hidden />
					</a>
				</p>
			</div>
		</section>
	);
}
