"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { education } from "@/content";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { fadeUp, parallaxMedia, revealLines } from "@/lib/animations";

export default function About() {
	const rootRef = useSectionAnimation<HTMLElement>((root) => {
		revealLines(root, "[data-lines]");
		fadeUp(root, "[data-fade]");
		parallaxMedia(root, "[data-frame]");
	});

	return (
		<section
			ref={rootRef}
			id="about"
			className="relative px-5 py-28 md:px-10 md:py-40"
		>
			<SectionHeading
				index="01"
				label="About"
				title={
					<>
						An engineer who ships{" "}
						<em className="text-accent">the whole system</em>
					</>
				}
			/>

			<div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12">
				<div className="space-y-7 text-lg leading-relaxed text-fg/80 md:col-span-7 md:text-xl">
					<p data-fade>
						I am a fullstack engineer in Peshawar who builds AI products end
						to end. The interesting part of AI is rarely the model. It is the
						system around it: retrieval that keeps answers grounded, queues
						that absorb heavy generation, schemas that stay consistent at ten
						thousand requests a day.
					</p>
					<p data-fade>
						Lately that has meant agent pipelines that read corporate
						disclosures for banks, a generative studio that replaces product
						photoshoots, and a multi-model AI app that crossed a thousand
						downloads on the Play Store. Before that, ERPs, hotel backends and
						TV art apps for LG and Samsung. Along the way I taught modern web
						development and industry practice to more than twenty students.
					</p>
				</div>

				<div className="md:col-span-4 md:col-start-9">
					<PlaceholderImage
						id="aboutPortrait"
						meta="fig. 00 / portrait"
						className="w-full max-w-sm"
					/>
					<dl className="mono-label mt-6 space-y-2.5 text-fg/60" data-fade>
						<div>
							<dt className="sr-only">Education</dt>
							<dd>
								{education.degree} / {education.school}
							</dd>
						</div>
						<div>
							<dt className="sr-only">Teaching</dt>
							<dd>20+ students taught modern web development</dd>
						</div>
					</dl>
				</div>
			</div>
		</section>
	);
}
