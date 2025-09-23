// Centralized blog loader that reads markdown files from /public/blogs
import blogIndex from "../../blogs/index";

export interface BlogMeta {
	title: string;
	author: string;
	date: string; // ISO date string
	coverImage: string; // public URL or absolute path from /public
}

export interface Blog extends BlogMeta {
	slug: string;
	content: string;
}

// Custom function to parse simple YAML-like front matter
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

// Load blog entries from a TypeScript manifest under src/blogs/index.ts

async function fetchMarkdown(path: string): Promise<string> {
	const response = await fetch(path);
	if (!response.ok) {
		throw new Error(`Failed to load markdown: ${path}`);
	}
	return await response.text();
}

export async function loadAllBlogs(): Promise<Blog[]> {
	const manifest = blogIndex;
	const contents = await Promise.all(
		manifest.map(async (entry) => {
			const md = await fetchMarkdown(entry.file);
			const { data, content } = parseFrontMatter(md);
			const validDate =
				new Date(data.date).toString() !== "Invalid Date" ? data.date : "";
			return {
				slug: entry.slug,
				content,
				title: data.title,
				author: data.author,
				date: validDate,
				coverImage: data.coverImage,
			} as Blog;
		})
	);

	// Sort latest first by default
	return contents.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
}

export async function loadBlogBySlug(slug: string): Promise<Blog | null> {
	const manifest = blogIndex;
	const entry = manifest.find((b) => b.slug === slug);
	if (!entry) return null;
	const md = await fetchMarkdown(entry.file);
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
}

export async function getBlogSlugs(): Promise<string[]> {
	return blogIndex.map((b) => b.slug);
}
