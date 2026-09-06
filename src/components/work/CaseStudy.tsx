"use client";

import { ArrowUpRight } from "lucide-react";
import Counter from "@/components/ui/Counter";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import TraceMark from "@/components/ui/TraceMark";
import { images, type Project } from "@/content";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { fadeUp, revealLines } from "@/lib/animations";
import { gsap } from "@/lib/gsap";
import { onBootReveal } from "@/lib/motion/boot";

function Passage({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div data-fade className="grid gap-3 border-t border-line pt-6 md:grid-cols-12">
			<p className="mono text-fg/60 md:col-span-3">{label}</p>
			<p className="max-w-3xl text-lg leading-relaxed text-fg/85 md:col-span-8 md:col-start-5 md:text-xl">
				{children}
			</p>
		</div>
	);
}

export default function CaseStudy({ project, index }: { project: Project; index: number }) {
	const rootRef = useSectionAnimation<HTMLDivElement>((root) => {
		const title = root.querySelector("[data-title]");
		const tl = gsap.timeline({ paused: true });
		if (title) tl.from(title, { yPercent: 110, duration: 1.2, ease: "expo.out" }, 0);
		tl.from(root.querySelectorAll("[data-intro]"), { autoAlpha: 0, y: 14, duration: 0.8, stagger: 0.06, ease: "expo.out" }, 0.3);
		onBootReveal(() => tl.play());
		revealLines(root, "[data-lines]");
		fadeUp(root, "[data-fade]");
	});

	const portrait = images[project.image].height > images[project.image].width;

	return (
		<div ref={rootRef}>
			<header className="mt-10 md:mt-14">
				<p data-intro className="mono flex items-center gap-3 text-fg/60">
					<span className="tag">{project.category}</span>
					{String(index + 1).padStart(2, "0")} / {project.year}
				</p>
				<h1 className="display mt-6 overflow-hidden pb-[0.06em] text-[clamp(3rem,12vw,13rem)]">
					<span data-title className="block">
						{project.title}
					</span>
				</h1>
				<div className="mt-8 grid gap-8 md:grid-cols-12">
					<p data-intro className="font-sans text-[clamp(1.4rem,2.6vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em] md:col-span-7">
						{project.tagline}
					</p>
					<dl data-intro className="mono grid grid-cols-2 gap-4 text-fg/70 md:col-span-4 md:col-start-9">
						<div>
							<dt className="text-fg/45">Role</dt>
							<dd>{project.role}</dd>
						</div>
						<div>
							<dt className="text-fg/45">Year</dt>
							<dd>{project.year}</dd>
						</div>
						<div className="col-span-2">
							<dt className="text-fg/45">Stack</dt>
							<dd>{project.stack.join(" / ")}</dd>
						</div>
						{project.link && (
							<div className="col-span-2">
								<dt className="text-fg/45">Live</dt>
								<dd>
									<a
										href={project.link.href}
										target="_blank"
										rel="noopener noreferrer"
										className="hairline inline-flex items-center gap-1"
									>
										{project.link.label} <ArrowUpRight size={12} aria-hidden />
									</a>
								</dd>
							</div>
						)}
					</dl>
				</div>
			</header>

			<div data-fade className={`mt-16 md:mt-24 ${portrait ? "grid gap-8 md:grid-cols-12" : ""}`}>
				<PlaceholderImage
					id={project.image}
					eager
					sizes="100vw"
					className={portrait ? "w-full md:col-span-6 md:col-start-4" : "w-full"}
				/>
			</div>

			{project.metrics.length > 0 && (
				<dl data-fade className="mt-20 grid grid-cols-2 gap-8 md:mt-28 md:grid-cols-12">
					{project.metrics.map((metric) => (
						<div key={metric.label} className="md:col-span-4">
							<dd className="font-sans text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-none tracking-[-0.045em]">
								{metric.counter ? <Counter counter={metric.counter} display={metric.display} /> : metric.display}
							</dd>
							<dt className="mono mt-3 text-fg/60">{metric.label}</dt>
						</div>
					))}
				</dl>
			)}

			<div className="mt-20 space-y-16 md:mt-28">
				<Passage label="Problem">{project.problem}</Passage>
				<Passage label="Approach">{project.approach}</Passage>
				<Passage label="Outcome">
					{project.outcome}
					<TraceMark {...project.trace} />
				</Passage>
			</div>
		</div>
	);
}
