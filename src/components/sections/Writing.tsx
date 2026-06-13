"use client";

import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { TransitionLink } from "@/components/providers/TransitionProvider";
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import { fadeUp, revealLines } from "@/lib/animations";

export interface WritingPost {
	slug: string;
	title: string;
	dateTime: string;
	dateLabel: string;
	coverImage: string;
}

export default function Writing({ posts }: { posts: WritingPost[] }) {
	const rootRef = useSectionAnimation<HTMLElement>((root) => {
		revealLines(root, "[data-lines]");
		fadeUp(root, "[data-fade]");
	});

	if (!posts.length) return null;

	return (
		<section
			ref={rootRef}
			id="writing"
			className="px-5 pb-28 md:px-10 md:pb-40"
		>
			<SectionHeading
				index="05"
				label="Writing"
				title={
					<>
						Field <em className="text-accent">notes</em>
					</>
				}
			/>

			<ul className="mt-14 border-t border-line">
				{posts.map((post) => (
					<li key={post.slug} data-fade className="border-b border-line">
						<TransitionLink
							href={`/blog/${post.slug}`}
							className="group flex items-center justify-between gap-6 py-6"
						>
							<span className="flex min-w-0 items-center gap-5">
								{post.coverImage && (
									<img
										src={post.coverImage}
										alt=""
										width={72}
										height={48}
										loading="lazy"
										decoding="async"
										className="hidden h-12 w-[72px] shrink-0 border border-line object-cover grayscale transition duration-300 group-hover:grayscale-0 sm:block"
									/>
								)}
								<span className="truncate font-serif text-2xl leading-snug transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
									{post.title}
								</span>
							</span>
							<span className="flex shrink-0 items-center gap-5">
								<time
									dateTime={post.dateTime}
									className="mono-label hidden text-fg/60 sm:block"
								>
									{post.dateLabel}
								</time>
								<ArrowUpRight
									size={18}
									strokeWidth={1.5}
									aria-hidden
									className="text-fg/60 transition-colors duration-300 group-hover:text-accent"
								/>
							</span>
						</TransitionLink>
					</li>
				))}
			</ul>

			<p data-fade className="mt-10">
				<TransitionLink
					href="/blogs"
					className="mono-label inline-flex items-center gap-2 text-fg/60 transition-colors hover:text-accent"
				>
					All writing
					<ArrowUpRight size={13} strokeWidth={1.5} aria-hidden />
				</TransitionLink>
			</p>
		</section>
	);
}
