"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import RotatingStamp from "@/components/ui/RotatingStamp";
import { site } from "@/content";
import { isFinePointer } from "@/lib/device";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { gsap, SplitText } from "@/lib/gsap";
import { onBootReveal } from "@/lib/motion/boot";
import { attachTypeWave, type TypeWave } from "@/lib/motion/typeWave";

const HEADLINE: Array<{ no: string; content: React.ReactNode }> = [
	{ no: "01", content: "Sr. Fullstack" },
	{ no: "02", content: "AI Engineer," },
	{
		no: "03",
		content: (
			<>
				building <em className="text-accent">signal</em>
			</>
		),
	},
	{ no: "04", content: "out of noise." },
];

export default function Hero() {
	const waveRef = useRef<TypeWave | null>(null);
	const ambientRef = useRef(0);

	const rootRef = useSectionAnimation<HTMLElement>((root) => {
		const lineSpans = Array.from(
			root.querySelectorAll<HTMLElement>("[data-hero-line]"),
		);
		const innerLines: HTMLElement[] = [];
		lineSpans.forEach((el) => {
			const split = SplitText.create(el, {
				type: "lines,chars",
				autoSplit: false,
				linesClass: "split-line",
				charsClass: "tw-char",
			});
			innerLines.push(...(split.lines as HTMLElement[]));
		});

		const wave = attachTypeWave(root, ".tw-char", { radius: 170, lift: 7 });
		waveRef.current = wave;

		const tl = gsap.timeline({
			paused: true,
			defaults: { ease: "power4.out" },
			onComplete: () => {
				lineSpans.forEach((el) => el.classList.remove("overflow-hidden"));
				wave.measure();
				const signalLine = lineSpans[2];
				if (signalLine) wave.pulse(signalLine);
				if (!isFinePointer() && lineSpans.length) {
					let next = 0;
					ambientRef.current = window.setInterval(() => {
						wave.measure();
						wave.pulse(lineSpans[next % lineSpans.length]);
						next += 1;
					}, 7000);
				}
			},
		});

		tl.from(
			root.querySelectorAll("[data-hero-rule]"),
			{ scaleX: 0, transformOrigin: "left center", duration: 1, stagger: 0.1 },
			0,
		);
		if (innerLines.length) {
			tl.from(innerLines, { yPercent: 112, duration: 1.1, stagger: 0.09 }, 0.15);
		}
		tl.from(
			root.querySelectorAll("[data-hero-fade]"),
			{ y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.06 },
			0.55,
		);

		onBootReveal(() => tl.play());
	});

	useEffect(
		() => () => {
			waveRef.current?.cleanup();
			window.clearInterval(ambientRef.current);
		},
		[],
	);

	return (
		<section
			ref={rootRef}
			aria-label="Introduction"
			className="relative flex min-h-[100svh] flex-col px-5 pb-5 pt-20 md:px-10 md:pb-7 md:pt-24"
		>
			<div className="mono-label flex items-baseline justify-between gap-4 py-3 text-fg/60">
				<span data-hero-fade>{site.name}</span>
				<span data-hero-fade className="hidden sm:inline">
					Portfolio <span className="text-accent">/</span> 2026 edition
				</span>
				<span data-hero-fade className="hidden md:inline">
					{site.location} ({site.timezoneLabel})
				</span>
			</div>
			<span data-hero-rule aria-hidden className="block h-px w-full bg-line" />

			<div className="flex flex-1 flex-col justify-center py-10 sm:pl-12 md:py-12">
				<h1 className="font-serif text-[clamp(2.9rem,11.5vw,8.5rem)] leading-[0.97] tracking-[-0.015em]">
					<span className="sr-only">
						{site.name}, Sr. Fullstack AI Engineer, building signal out of
						noise.
					</span>
					{HEADLINE.map((line) => (
						<span key={line.no} aria-hidden className="relative block">
							<span
								data-hero-fade
								className="mono-label absolute -left-12 top-[0.4em] hidden text-fg/35 sm:block"
							>
								{line.no}
							</span>
							<span data-hero-line className="block overflow-hidden">
								{line.content}
							</span>
						</span>
					))}
				</h1>

				<div className="mt-7 flex items-baseline gap-5">
					<span
						data-hero-rule
						aria-hidden
						className="block h-px flex-1 bg-line"
					/>
					<p data-hero-fade className="mono-label shrink-0 text-fg/45">
						Set in Instrument Serif
						<span className="hidden sm:inline">
							{" "}
							<span className="text-accent">/</span> roman and italic
						</span>
					</p>
				</div>
			</div>

			<div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8 pb-8 sm:pl-12">
				<p
					data-hero-fade
					className="max-w-md text-sm leading-relaxed text-fg/65 md:text-base"
				>
					I design and ship AI products end to end. Agent systems that read
					documents at scale, retrieval that keeps models grounded, realtime
					backends that stay fast, and the product around all of it.
				</p>
				<div data-hero-fade>
					<RotatingStamp />
				</div>
			</div>

			<span
				data-hero-rule
				aria-hidden
				className="block h-px w-full bg-line"
			/>
			<dl className="grid grid-cols-1 gap-2 pt-3 sm:grid-cols-3 sm:gap-6">
				<div data-hero-fade className="mono-label text-fg/60">
					<dt className="inline text-accent">Now</dt>
					<dd className="inline">
						{" "}
						/ Full Stack Developer, Metasense Technologies
					</dd>
				</div>
				<div data-hero-fade className="mono-label text-fg/60">
					<dt className="inline text-accent">Focus</dt>
					<dd className="inline"> / Agents, retrieval, realtime systems</dd>
				</div>
				<div
					data-hero-fade
					className="mono-label flex items-center gap-2 text-fg/60 sm:justify-end"
				>
					<ArrowDown size={12} strokeWidth={1.5} aria-hidden />
					Scroll
				</div>
			</dl>
		</section>
	);
}
