"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { capabilities, marqueeTerms } from "@/content";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { fadeUp, revealLines } from "@/lib/animations";

export default function Capabilities() {
	const rootRef = useSectionAnimation<HTMLElement>((root) => {
		revealLines(root, "[data-lines]");
		fadeUp(root, "[data-fade]");

		const track = root.querySelector<HTMLElement>(".marquee-track");
		if (track) {
			track.style.animation = "none";
			const loop = gsap.to(track, {
				xPercent: -50,
				repeat: -1,
				ease: "none",
				duration: 26,
			});
			ScrollTrigger.create({
				trigger: root,
				start: "top bottom",
				end: "bottom top",
				onToggle: (self) => loop.paused(!self.isActive),
				onUpdate: (self) => {
					const boost = gsap.utils.clamp(
						1,
						3.4,
						1 + Math.abs(self.getVelocity()) / 1800,
					);
					if (boost > Number(loop.timeScale())) {
						loop.timeScale(boost);
						gsap.to(loop, {
							timeScale: 1,
							duration: 0.9,
							ease: "power2.out",
							overwrite: true,
						});
					}
				},
			});
		}
	});

	return (
		<section ref={rootRef} id="build" className="py-28 md:py-40">
			<div
				aria-hidden
				className="select-none overflow-hidden border-y border-line py-4"
			>
				<div className="marquee-track flex w-max">
					{[0, 1].map((copy) => (
						<ul key={copy} className="flex items-center">
							{marqueeTerms.map((term) => (
								<li
									key={term}
									className="mono-label flex items-center whitespace-nowrap text-fg/60"
								>
									<span className="px-6">{term}</span>
									<span className="inline-block h-1 w-1 rounded-full bg-accent" />
								</li>
							))}
						</ul>
					))}
				</div>
			</div>

			<div className="mt-24 px-5 md:px-10">
				<SectionHeading
					index="03"
					label="What I Build"
					title={
						<>
							Capability, not <em className="text-accent">buzzwords</em>
						</>
					}
				/>

				<ul className="mt-16 border-t border-line md:mt-20">
					{capabilities.map((capability) => (
						<li
							key={capability.index}
							data-fade
							className="group grid gap-3 border-b border-line py-8 md:grid-cols-12 md:items-baseline md:gap-6 md:py-10"
						>
							<span className="mono-label text-accent md:col-span-1">
								{capability.index}
							</span>
							<h3 className="font-serif text-3xl transition-transform duration-300 group-hover:translate-x-2 md:col-span-4 md:text-4xl">
								{capability.title}
							</h3>
							<p className="leading-relaxed text-fg/75 md:col-span-4">
								{capability.description}
							</p>
							<p className="mono-label text-fg/60 md:col-span-3 md:text-right">
								{capability.tech.join(" · ")}
							</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
