import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { loadAllBlogs, loadBlogBySlug } from '../../../lib/blogs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';

export async function generateStaticParams() {
  const blogs = await loadAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await loadBlogBySlug(slug);
  if (!blog) return { title: 'Not Found' };
  return {
    title: `${blog.title} | Muhammad Aamir Khan`,
    description: blog.content.substring(0, 160).replace(/[#*`]/g, ''),
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await loadBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const processedContent = blog.content
    .replace(/==([^=]+)==/g, '<mark>$1</mark>');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Header - Monochrome */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link
              href="/blogs"
              className="inline-flex items-center text-white/80 hover:text-white text-sm mb-4 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to articles
            </Link>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(blog.date)}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {getReadingTime(blog.content)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto max-w-4xl px-4 md:px-8 py-12">
        <div className="prose prose-lg dark:prose-invert max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
          prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:leading-relaxed
          prose-a:text-zinc-900 dark:prose-a:text-zinc-100 prose-a:underline hover:prose-a:no-underline
          prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-700
          prose-img:rounded-xl prose-img:shadow-lg
          prose-blockquote:border-l-zinc-400 prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-zinc-800/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
        ">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          >
            {processedContent}
          </ReactMarkdown>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Written by</p>
              <p className="font-semibold text-zinc-900 dark:text-white">{blog.author}</p>
            </div>
            <Link
              href="/blogs"
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 text-white rounded-lg font-medium transition-colors"
            >
              Read more articles
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
