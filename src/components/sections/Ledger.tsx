"use client";

import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { TransitionLink } from "@/components/providers/TransitionProvider";
import { capabilities, certifications, experience } from "@/content";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { fadeUp, revealLines } from "@/lib/animations";

export interface LedgerPost {
	slug: string;
	title: string;
	dateTime: string;
	dateLabel: string;
}

interface RowProps {
	tag: string;
	title: string;
	meta?: string;
	right: string;
	detail?: string;
	href?: string;
}

// haoqi register: one long index. Tag, title, years. Everything the same
// height so the content, not the chrome, makes the rhythm.
function Row({ tag, title, meta, right, detail, href }: RowProps) {
	const inner = (
		<>
			<span className="md:col-span-2">
				<span className="tag">{tag}</span>
			</span>
			<span className="md:col-span-6">
				<span className="font-sans text-xl font-medium tracking-tight md:text-2xl">
					{title}
					{href && (
						<ArrowUpRight size={16} className="ml-1 inline-block -translate-y-1 text-fg/50" aria-hidden />
					)}
				</span>
				{meta && <span className="mono mt-1 block text-fg/60">{meta}</span>}
				{detail && (
					<span className="mt-3 block max-w-xl text-[15px] leading-relaxed text-fg/70">{detail}</span>
				)}
			</span>
			<span className="mono text-fg/70 md:col-span-4 md:text-right">{right}</span>
		</>
	);
	const className = "row grid gap-3 border-b border-line py-6 md:grid-cols-12 md:items-baseline md:gap-6";
	return (
		<li data-fade>
			{href ? (
				<TransitionLink href={href} className={className} data-cursor="Read">
					{inner}
				</TransitionLink>
			) : (
				<div className={className}>{inner}</div>
			)}
		</li>
	);
}

export default function Ledger({ posts }: { posts: LedgerPost[] }) {
	const rootRef = useSectionAnimation<HTMLElement>((root) => {
		revealLines(root, "[data-lines]");
		fadeUp(root, "[data-fade]", { stagger: 0.04 });
	});

	return (
		<section ref={rootRef} id="index" className="gutter border-t border-line py-28 md:py-40">
			<SectionHeading title="Index" aside="What I build, where I built it, and what I wrote down along the way." />

			<div className="mt-20 grid gap-16 md:mt-28">
				<div>
					<p data-fade className="mono mb-2 text-fg/60">
						Capabilities / {String(capabilities.length).padStart(2, "0")}
					</p>
					<ul className="border-t border-line">
						{capabilities.map((c) => (
							<Row key={c.id} tag="Capability" title={c.title} detail={c.description} right={c.tech.join(" / ")} />
						))}
					</ul>
				</div>

				<div>
					<p data-fade className="mono mb-2 text-fg/60">
						Experience / {String(experience.length).padStart(2, "0")}
					</p>
					<ul className="border-t border-line">
						{experience.map((job) => (
							<Row
								key={job.company}
								tag="Role"
								title={`${job.role}, ${job.company}`}
								meta={job.location}
								detail={job.highlights.join(" ")}
								right={job.period}
							/>
						))}
					</ul>
					<p data-fade className="mono mt-4 text-fg/50">Certified: {certifications.join(" / ")}</p>
				</div>

				{posts.length > 0 && (
					<div id="writing">
						<p data-fade className="mono mb-2 text-fg/60">
							Writing / {String(posts.length).padStart(2, "0")}
						</p>
						<ul className="border-t border-line">
							{posts.map((post) => (
								<Row key={post.slug} tag="Note" title={post.title} right={post.dateLabel} href={`/blog/${post.slug}`} />
							))}
						</ul>
						<p data-fade className="mt-6">
							<TransitionLink href="/blogs" className="hairline mono inline-flex items-center gap-1 text-fg/70">
								All writing <ArrowUpRight size={12} aria-hidden />
							</TransitionLink>
						</p>
					</div>
				)}
			</div>
		</section>
	);
}
