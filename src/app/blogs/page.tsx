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
		<section className="gutter pb-28 pt-28 md:pt-36">
			<p className="mono text-fg/60">Writing / {String(blogs.length).padStart(2, "0")}</p>
			<h1 className="display mt-6 text-[clamp(3rem,12vw,13rem)]">Notes</h1>

			<ul className="mt-16 border-t border-line">
				{blogs.map((blog) => (
					<li key={blog.slug}>
						<TransitionLink
							href={`/blog/${blog.slug}`}
							className="row grid gap-4 border-b border-line py-7 md:grid-cols-12 md:items-center"
						>
							<span className="md:col-span-2">
								<span className="tag">Note</span>
							</span>
							<span className="font-sans text-2xl font-medium tracking-tight md:col-span-6 md:text-3xl">
								{blog.title}
							</span>
							<span className="flex items-center gap-5 md:col-span-4 md:justify-end">
								<time dateTime={blog.date} className="mono text-fg/60">
									{blog.date ? dateFormatter.format(new Date(blog.date)) : ""}
								</time>
								<ArrowUpRight size={18} strokeWidth={1.5} aria-hidden className="text-fg/60" />
							</span>
						</TransitionLink>
					</li>
				))}
			</ul>
		</section>
	);
}
