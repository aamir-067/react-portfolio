"use client";

import PlaceholderImage from "@/components/ui/PlaceholderImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { TransitionLink } from "@/components/providers/TransitionProvider";
import { projects, type Project } from "@/content";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { fadeUp, revealLines } from "@/lib/animations";
import { gsap } from "@/lib/gsap";

// noth.in cadence: cards stagger across two columns, each at its own height,
// so the eye travels instead of scanning a grid.
const LAYOUT = [
	"md:col-span-7",
	"md:col-span-5 md:col-start-8 md:mt-[22vh]",
	"md:col-span-5 md:col-start-2 md:mt-[-8vh]",
	"md:col-span-4 md:col-start-9 md:mt-[14vh]",
	"md:col-span-8 md:col-start-3",
];

function Card({ project, className }: { project: Project; className: string }) {
	return (
		<li className={className}>
			<TransitionLink href={`/work/${project.slug}`} className="card group block" data-card data-cursor="View">
				<p className="mono text-fg/60">{project.title}</p>
				<p className="mt-2 font-sans text-[clamp(1.25rem,1.9vw,1.75rem)] font-medium leading-tight tracking-[-0.02em]">
					{project.tagline}
				</p>
				<div className="mt-5" data-parallax>
					<PlaceholderImage
						id={project.image}
						tag={project.category}
						sizes="(max-width: 768px) 100vw, 60vw"
					/>
				</div>
				<div className="mono mt-3 flex items-center justify-between text-fg/60">
					<span className="hairline">Explore</span>
					<span>{project.year}</span>
				</div>
			</TransitionLink>
		</li>
	);
}

export default function Works() {
	const rootRef = useSectionAnimation<HTMLElement>((root) => {
		revealLines(root, "[data-lines]");
		fadeUp(root, "[data-fade]");
		root.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
			gsap.from(card, {
				y: 60,
				autoAlpha: 0,
				duration: 1.2,
				ease: "expo.out",
				scrollTrigger: { trigger: card, start: "top 88%", once: true },
			});
			const media = card.querySelector("img");
			if (media)
				gsap.fromTo(
					media,
					{ yPercent: -6, scale: 1.12 },
					{
						yPercent: 6,
						scale: 1.12,
						ease: "none",
						scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
					},
				);
		});
	});

	return (
		<section ref={rootRef} id="work" className="gutter py-28 md:py-40">
			<SectionHeading title="Works" aside="Good systems answer. Great systems show their sources." />
			<ul className="mt-24 grid gap-y-20 md:mt-32 md:grid-cols-12 md:gap-x-8 md:gap-y-0" aria-label="Selected projects">
				{projects.map((project, i) => (
					<Card key={project.slug} project={project} className={LAYOUT[i % LAYOUT.length]} />
				))}
			</ul>
		</section>
	);
}
