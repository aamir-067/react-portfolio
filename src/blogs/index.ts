// Central manifest of blog entries. Add new posts here.
// Each file path points to a markdown file under /public/blogs

export interface BlogEntry {
	slug: string;
	file: string; // Public path to the .md file, starting with /blogs/
}

export const blogIndex: BlogEntry[] = [
	// { slug: "getting-started-react", file: "/blogs/getting-started-react.md" },
	// { slug: "typescript-tips", file: "/blogs/typescript-tips.md" },
	// { slug: "tailwind-setup", file: "/blogs/tailwind-setup.md" },
	// { slug: "tailwind-setup-two", file: "/blogs/tailwind-setup-two.md" },
];

export default blogIndex;
