// Central manifest of blog entries. Add new posts here.
// Each file path points to a markdown file under /public/blogs

export interface BlogEntry {
	slug: string;
	file: string; // Public path to the .md file, starting with /blogs/
}

export const blogIndex: BlogEntry[] = [
	{ slug: "my-tech-journey", file: "/blogs/my-tech-journey.md" },
	{ slug: "agentic-ai", file: "/blogs/agentic-ai.md" },
	{ slug: "rag-vector-search", file: "/blogs/rag-vector-search.md" },
	{ slug: "ai-automation-2026", file: "/blogs/ai-automation-2026.md" },
];

export default blogIndex;
