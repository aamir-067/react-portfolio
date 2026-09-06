import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import { About, Ledger, Statement, Works, type LedgerPost } from "@/components/sections";
import { loadAllBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
	alternates: { canonical: "/" },
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
	month: "short",
	year: "numeric",
});

export default async function HomePage() {
	const blogs = await loadAllBlogs();
	const posts: LedgerPost[] = blogs.map((blog) => ({
		slug: blog.slug,
		title: blog.title,
		dateTime: blog.date,
		dateLabel: blog.date ? dateFormatter.format(new Date(blog.date)) : "",
	}));

	return (
		<>
			<Hero />
			<Statement />
			<Works />
			<About />
			<Ledger posts={posts} />
		</>
	);
}
