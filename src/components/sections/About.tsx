"use client";

import Counter from "@/components/ui/Counter";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import TraceMark from "@/components/ui/TraceMark";
import { education, stats } from "@/content";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { fadeUp, revealLines } from "@/lib/animations";

export default function About() {
	const rootRef = useSectionAnimation<HTMLElement>((root) => {
		revealLines(root, "[data-lines]");
		fadeUp(root, "[data-fade]");
	});

	return (
		<section ref={rootRef} aria-label="About" className="gutter border-t border-line py-28 md:py-40">
			<div className="grid gap-12 md:grid-cols-12">
				<p data-fade className="font-sans text-lg font-medium tracking-tight md:col-span-3">
					( The step aside )
				</p>
				<div className="md:col-span-8 md:col-start-5">
					<p data-lines className="font-sans text-[clamp(1.5rem,2.6vw,2.6rem)] font-medium leading-[1.15] tracking-[-0.025em]">
						I am a fullstack engineer in Peshawar who builds AI products end to end. The
						interesting part of AI is rarely the model. It is the system around it: retrieval
						that keeps answers grounded, queues that absorb heavy generation, schemas that stay
						consistent at ten thousand requests a day.
					</p>
					<div className="mt-14 grid gap-10 md:grid-cols-8">
						<p data-fade className="text-base leading-relaxed text-fg/75 md:col-span-5 md:text-lg">
							Lately that has meant agent pipelines that read corporate disclosures for banks, a
							generative studio that replaces product photoshoots, and a multi-model AI app that
							crossed a thousand downloads on the Play Store. Before that, ERPs, hotel backends
							and TV art apps for LG and Samsung. Along the way I taught modern web development
							and industry practice to more than twenty students.
							<span className="mono mt-6 block text-fg/60">
								{education.degree} / {education.school}
							</span>
						</p>
						<div data-fade className="md:col-span-3">
							<PlaceholderImage id="aboutPortrait" className="w-full max-w-[260px]" tag="Peshawar" />
						</div>
					</div>
				</div>
			</div>

			<dl className="mt-24 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 md:mt-32 lg:grid-cols-4">
				{stats.map((stat, i) => (
					<div key={stat.label} data-fade>
						<dd className="font-sans text-[clamp(2.6rem,5vw,4.6rem)] font-semibold leading-none tracking-[-0.04em]">
							<Counter counter={stat} />
							<TraceMark
								status={stat.source.startsWith("Self") ? "self-reported" : "verified"}
								note={stat.source}
								align={i % 2 ? "right" : "left"}
							/>
						</dd>
						<dt className="mono mt-3 max-w-[22ch] text-fg/60">{stat.label}</dt>
					</div>
				))}
			</dl>
		</section>
	);
}
