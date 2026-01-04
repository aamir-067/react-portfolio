import fs from "fs";
import path from "path";
import blogIndex, { BlogEntry } from "../blogs/index";

export interface BlogMeta {
	title: string;
	author: string;
	date: string;
	coverImage: string;
}

export interface Blog extends BlogMeta {
	slug: string;
	content: string;
}

const parseFrontMatter = (markdown: string) => {
	const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
	const match = markdown.match(frontMatterRegex);

	let parsedData: BlogMeta = {
		title: "",
		author: "",
		date: "",
		coverImage: "",
	};
	let content = markdown;

	if (match && match[1]) {
		const frontMatterString = match[1];
		content = markdown.replace(frontMatterRegex, "");

		frontMatterString.split("\n").forEach((line) => {
			const lineMatch = line.match(/^\s*([a-zA-Z0-9_]+):\s*(.*)\s*$/);
			if (lineMatch && lineMatch[1] && lineMatch[2]) {
				const key = lineMatch[1].trim();
				const value = lineMatch[2].trim();
				if (key in parsedData) {
					(parsedData as any)[key] = value;
				}
			}
		});
	}
	return { data: parsedData, content };
};

export async function loadAllBlogs(): Promise<Blog[]> {
	// In Next.js Server Components, we can use fs directly.
	// Assuming entry.file paths start with /blogs/ (relative to public)

	const blogs = await Promise.all(
		blogIndex.map(async (entry) => {
			const filePath = path.join(process.cwd(), "public", entry.file);
			try {
				const md = fs.readFileSync(filePath, "utf-8");
				const { data, content } = parseFrontMatter(md);
				const validDate =
					new Date(data.date).toString() !== "Invalid Date"
						? data.date
						: "";
				return {
					slug: entry.slug,
					content,
					title: data.title,
					author: data.author,
					date: validDate,
					coverImage: data.coverImage,
				} as Blog;
			} catch (err) {
				console.error(`Failed to load blog: ${filePath}`, err);
				return null;
			}
		})
	);

	const validBlogs = blogs.filter((b): b is Blog => b !== null);

	return validBlogs.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
}

export async function loadBlogBySlug(slug: string): Promise<Blog | null> {
	const entry = blogIndex.find((b) => b.slug === slug);
	if (!entry) return null;

	const filePath = path.join(process.cwd(), "public", entry.file);
	try {
		const md = fs.readFileSync(filePath, "utf-8");
		const { data, content } = parseFrontMatter(md);
		const validDate =
			new Date(data.date).toString() !== "Invalid Date" ? data.date : "";
		return {
			slug,
			content,
			title: data.title,
			author: data.author,
			date: validDate,
			coverImage: data.coverImage,
		};
	} catch (err) {
		console.error(`Failed to load blog: ${filePath}`, err);
		return null;
	}
}
