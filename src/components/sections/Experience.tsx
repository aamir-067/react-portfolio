"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { certifications, education, experience } from "@/content";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { fadeUp, revealLines } from "@/lib/animations";

export default function Experience() {
	const rootRef = useSectionAnimation<HTMLElement>((root) => {
		revealLines(root, "[data-lines]");
		fadeUp(root, "[data-fade]");
	});

	return (
		<section
			ref={rootRef}
			id="experience"
			className="px-5 py-28 md:px-10 md:py-40"
		>
			<div className="grid gap-14 md:grid-cols-12">
				<div className="md:col-span-4">
					<SectionHeading
						index="04"
						label="Experience"
						title={
							<>
								Shipping <em className="text-accent">since 2024</em>
							</>
						}
						titleClassName="text-[clamp(2.4rem,4.2vw,3.8rem)]"
					/>

					<div className="mt-14 space-y-3" data-fade>
						<p className="mono-label text-fg/60">Education</p>
						<p className="font-serif text-2xl">{education.degree}</p>
						<p className="text-sm text-fg/60">{education.school}</p>
					</div>

					<div className="mt-10 space-y-3" data-fade>
						<p className="mono-label text-fg/60">Certifications</p>
						<ul className="space-y-2 text-sm leading-relaxed text-fg/75">
							{certifications.map((cert) => (
								<li key={cert}>{cert}</li>
							))}
						</ul>
					</div>
				</div>

				<div className="border-t border-line md:col-span-7 md:col-start-6">
					{experience.map((job) => (
						<article
							key={job.company}
							data-fade
							className="border-b border-line py-10 md:py-12"
						>
							<header className="flex flex-wrap items-baseline justify-between gap-3">
								<h3 className="font-serif text-3xl md:text-4xl">
									{job.company}
									<span className="font-serif text-xl italic text-fg/60">
										{" "}
										· {job.location}
									</span>
								</h3>
								<p className="mono-label text-fg/60">{job.period}</p>
							</header>
							<p className="mono-label mt-3 text-accent">{job.role}</p>
							<ul className="mt-6 max-w-2xl space-y-3.5">
								{job.highlights.map((highlight) => (
									<li
										key={highlight}
										className="flex gap-4 leading-relaxed text-fg/80"
									>
										<span
											aria-hidden
											className="mt-[0.7em] h-px w-5 shrink-0 bg-accent"
										/>
										{highlight}
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
