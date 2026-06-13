import type { Metadata } from "next";
import {
	About,
	Capabilities,
	Experience,
	Hero,
	Work,
	Writing,
	type WritingPost,
} from "@/components/sections";
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
	const posts: WritingPost[] = blogs.map((blog) => ({
		slug: blog.slug,
		title: blog.title,
		dateTime: blog.date,
		dateLabel: blog.date ? dateFormatter.format(new Date(blog.date)) : "",
		coverImage: blog.coverImage,
	}));

	return (
		<>
			<Hero />
			<About />
			<Work />
			<Capabilities />
			<Experience />
			<Writing posts={posts} />
		</>
	);
}
