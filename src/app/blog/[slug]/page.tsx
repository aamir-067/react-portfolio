import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { TransitionLink } from "@/components/providers/TransitionProvider";
import { loadAllBlogs, loadBlogBySlug } from "@/lib/blogs";
import { site } from "@/content";

export async function generateStaticParams() {
	const blogs = await loadAllBlogs();
	return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const blog = await loadBlogBySlug(slug);
	if (!blog) return { title: "Not Found" };
	const description = blog.content.substring(0, 160).replace(/[#*`]/g, "");
	return {
		title: blog.title,
		description,
		alternates: { canonical: `/blog/${slug}/` },
		openGraph: {
			type: "article",
			title: blog.title,
			description,
			url: `${site.url}/blog/${slug}/`,
			publishedTime: blog.date || undefined,
			authors: [site.name],
			images: blog.coverImage ? [{ url: blog.coverImage }] : undefined,
		},
		twitter: {
			card: "summary_large_image",
			title: blog.title,
			description,
			images: blog.coverImage ? [blog.coverImage] : undefined,
		},
	};
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
	day: "2-digit",
	month: "long",
	year: "numeric",
});

export default async function BlogDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const blog = await loadBlogBySlug(slug);
	if (!blog) notFound();

	const processedContent = blog.content.replace(
		/==([^=]+)==/g,
		"<mark>$1</mark>",
	);
	const dateLabel = blog.date ? dateFormatter.format(new Date(blog.date)) : "";
	const readingTime = `${Math.ceil(
		blog.content.split(/\s+/).length / 200,
	)} min read`;

	const jsonLdArticle = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: blog.title,
		datePublished: blog.date || undefined,
		image: blog.coverImage ? [`${site.url}${blog.coverImage}`] : undefined,
		author: { "@id": `${site.url}/#person` },
		publisher: { "@id": `${site.url}/#person` },
		mainEntityOfPage: `${site.url}/blog/${slug}/`,
	};

	const jsonLdBreadcrumbs = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: site.url },
			{
				"@type": "ListItem",
				position: 2,
				name: "Writing",
				item: `${site.url}/blogs/`,
			},
			{ "@type": "ListItem", position: 3, name: blog.title },
		],
	};

	return (
		<article className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLdBreadcrumbs),
				}}
			/>
			<div className="mx-auto max-w-3xl">
				<TransitionLink
					href="/blogs"
					className="mono-label inline-flex items-center gap-2 text-fg/60 transition-colors hover:text-accent"
				>
					<ArrowLeft size={13} strokeWidth={1.5} aria-hidden />
					All writing
				</TransitionLink>

				<h1 className="mt-8 font-serif text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02]">
					{blog.title}
				</h1>

				<p className="mono-label mt-6 flex flex-wrap gap-x-6 gap-y-2 text-fg/60">
					<span>{blog.author}</span>
					{dateLabel && <time dateTime={blog.date}>{dateLabel}</time>}
					<span>{readingTime}</span>
				</p>

				{blog.coverImage && (
					<div className="mt-10 overflow-hidden border border-line">
						<img
							src={blog.coverImage}
							alt=""
							width={1600}
							height={900}
							className="w-full object-cover"
						/>
					</div>
				)}

				<div className="prose prose-paper prose-lg mt-12">
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeRaw, rehypeHighlight]}
					>
						{processedContent}
					</ReactMarkdown>
				</div>
			</div>
		</article>
	);
}
