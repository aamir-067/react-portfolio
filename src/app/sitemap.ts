import type { MetadataRoute } from "next";
import { site } from "@/content";
import { loadAllBlogs } from "@/lib/blogs";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const blogs = await loadAllBlogs();
	const latest = blogs[0]?.date ? new Date(blogs[0].date) : new Date();

	const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
		url: `${site.url}/blog/${blog.slug}/`,
		lastModified: blog.date ? new Date(blog.date) : latest,
		changeFrequency: "monthly",
		priority: 0.7,
		images: blog.coverImage ? [`${site.url}${blog.coverImage}`] : undefined,
	}));

	return [
		{
			url: `${site.url}/`,
			lastModified: latest,
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${site.url}/blogs/`,
			lastModified: latest,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		...blogEntries,
	];
}
