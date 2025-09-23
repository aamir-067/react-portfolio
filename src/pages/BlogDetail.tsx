import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { loadBlogBySlug, Blog } from './blogs/index';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (!slug) return;
      try {
        const b = await loadBlogBySlug(slug);
        if (isMounted) setBlog(b);
        if (isMounted && !b) setError('Blog not found');
      } catch (e: any) {
        if (isMounted) setError(e?.message || 'Failed to load blog');
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!blog) return <div className="text-center py-8">Loading blog post...</div>;

  // Lightweight enhancements to mimic ChatGPT-style formatting
  const processedContent = blog.content
    // Support ==highlight== syntax by converting to <mark>
    .replace(/==([^=]+)==/g, '<mark>$1</mark>');

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto bg-transparent">
        <img src={blog.coverImage} alt={blog.title} className="w-full h-64 object-cover rounded-lg" />
        <div className="pt-6">
          <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
          <div className="text-sm mb-6 text-gray-700 dark:text-gray-300">
            By {blog.author} on {new Date(blog.date).toLocaleDateString()}
          </div>
          <div className="prose dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
            >
              {processedContent}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
