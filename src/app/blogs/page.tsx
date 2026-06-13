import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { TransitionLink } from "@/components/providers/TransitionProvider";
import { loadAllBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
	title: "Writing",
	description:
		"Notes on AI engineering by Muhammad Aamir Khan: agents, retrieval pipelines, automation and the systems around them.",
	alternates: { canonical: "/blogs/" },
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
	day: "2-digit",
	month: "short",
	year: "numeric",
});

export default async function BlogsPage() {
	const blogs = await loadAllBlogs();

	return (
		<section className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
			<p className="mono-label text-fg/60">Writing / {blogs.length} notes</p>
			<h1 className="mt-6 font-serif text-[clamp(2.8rem,8vw,7rem)] leading-[0.95]">
				Field <em className="text-accent">notes</em>
			</h1>

			<ul className="mt-16 border-t border-line">
				{blogs.map((blog) => (
					<li key={blog.slug} className="border-b border-line">
						<TransitionLink
							href={`/blog/${blog.slug}`}
							className="group grid gap-4 py-8 md:grid-cols-12 md:items-center"
						>
							<time
								dateTime={blog.date}
								className="mono-label text-fg/60 md:col-span-2"
							>
								{blog.date ? dateFormatter.format(new Date(blog.date)) : ""}
							</time>
							<span className="font-serif text-2xl transition-transform duration-300 group-hover:translate-x-2 md:col-span-7 md:text-3xl">
								{blog.title}
							</span>
							<span className="flex items-center gap-4 md:col-span-3 md:justify-end">
								{blog.coverImage && (
									<img
										src={blog.coverImage}
										alt=""
										width={88}
										height={56}
										loading="lazy"
										decoding="async"
										className="h-14 w-[88px] border border-line object-cover grayscale transition duration-300 group-hover:grayscale-0"
									/>
								)}
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
		</section>
	);
}
