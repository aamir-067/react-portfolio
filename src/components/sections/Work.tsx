"use client";

import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { projects, type Project } from "@/content";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { ScrollTrigger } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";
import {
	fadeUp,
	parallaxMedia,
	revealLines,
	velocitySkew,
} from "@/lib/animations";

function CaseBlock({ label, text }: { label: string; text: string }) {
	return (
		<div data-fade>
			<p className="mono-label text-accent">{label}</p>
			<p className="mt-3 max-w-2xl text-base leading-relaxed text-fg/80 md:text-lg">
				{text}
			</p>
		</div>
	);
}

function CaseStudy({ project }: { project: Project }) {
	return (
		<article
			id={project.slug}
			data-case
			className="grid gap-10 border-t border-line pt-14 md:grid-cols-12 md:gap-8"
		>
			<div className="md:col-span-4">
				<div className="space-y-6 md:sticky md:top-28">
					<p className="mono-label text-fg/50">
						{project.index} / {project.year}
					</p>
					<h3
						data-lines
						className="font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[0.95]"
					>
						{project.title}
					</h3>
					<p data-fade className="font-serif text-xl italic text-fg/70">
						{project.tagline}
					</p>
					<p data-fade className="mono-label text-fg/50">
						Role / {project.role}
					</p>
					<ul
						data-fade
						aria-label={`${project.title} stack`}
						className="flex max-w-xs flex-wrap gap-2"
					>
						{project.stack.map((tech) => (
							<li
								key={tech}
								className="mono-label border border-line px-2.5 py-1.5 text-fg/70"
							>
								{tech}
							</li>
						))}
					</ul>
					{project.link && (
						<p data-fade>
							<a
								href={project.link.href}
								target="_blank"
								rel="noopener noreferrer"
								className="mono-label inline-flex items-center gap-1.5 text-accent transition-colors hover:text-accent-soft"
							>
								<ArrowUpRight size={13} strokeWidth={1.5} aria-hidden />
								{project.link.label}
							</a>
						</p>
					)}
				</div>
			</div>

			<div className="space-y-12 md:col-span-8">
				<CaseBlock label="Problem" text={project.problem} />
				<div data-skew>
					<PlaceholderImage
						id={project.image}
						meta={`fig. ${project.index}`}
						className={
							project.orientation === "portrait"
								? "mx-auto w-full max-w-[300px] md:mx-0 md:ml-auto"
								: "w-full"
						}
					/>
				</div>
				<CaseBlock label="Approach" text={project.approach} />
				<CaseBlock label="Outcome" text={project.outcome} />
				{project.metrics.length > 0 && (
					<dl
						data-fade
						className="grid grid-cols-2 gap-8 border-t border-line pt-8"
					>
						{project.metrics.map((metric) => (
							<div key={metric.label}>
								<dd className="font-serif text-4xl text-fg md:text-5xl">
									{metric.value}
								</dd>
								<dt className="mono-label mt-2 text-fg/50">{metric.label}</dt>
							</div>
						))}
					</dl>
				)}
			</div>
		</article>
	);
}

export default function Work() {
	const rootRef = useSectionAnimation<HTMLElement>((root) => {
		revealLines(root, "[data-lines]");
		fadeUp(root, "[data-fade]");
		parallaxMedia(root, "[data-frame]");
		velocitySkew(root, "[data-skew]");

		const railLinks = root.querySelectorAll<HTMLElement>(".rail-link");
		root.querySelectorAll<HTMLElement>("[data-case]").forEach((article, i) => {
			ScrollTrigger.create({
				trigger: article,
				start: "top 55%",
				end: "bottom 55%",
				onToggle: (self) =>
					railLinks[i]?.classList.toggle("rail-active", self.isActive),
			});
		});
	});

	return (
		<section
			ref={rootRef}
			id="work"
			className="theme-ink relative bg-surface px-5 py-28 md:px-10 md:py-40"
		>
			<SectionHeading
				index="02"
				label="Selected Work"
				title={
					<>
						Selected <em className="text-accent">work</em>
					</>
				}
			/>
			<p data-fade className="mono-label mt-8 text-fg/60">
				Five systems, taken from problem to production.
			</p>

			<div className="relative mt-20">
				<nav
					aria-label="Case studies"
					className="absolute -left-1 top-0 bottom-0 hidden xl:block"
				>
					<ol className="sticky top-[38vh] space-y-3">
						{projects.map((project) => (
							<li key={project.slug}>
								<button
									type="button"
									onClick={() => scrollToTarget(`#${project.slug}`)}
									aria-label={`Go to ${project.title}`}
									className="rail-link mono-label py-0.5"
								>
									{project.index}
								</button>
							</li>
						))}
					</ol>
				</nav>

				<div className="space-y-28 md:space-y-36 xl:pl-20">
					{projects.map((project) => (
						<CaseStudy key={project.slug} project={project} />
					))}
				</div>
			</div>
		</section>
	);
}
