import { loadAllBlogs } from '../../lib/blogs';
import BlogsClient from './BlogsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Insights | Muhammad Aamir Khan - AI & Technology Articles",
  description: "Articles on AI automation, agentic AI, vector databases, RAG systems, and technology leadership by Muhammad Aamir Khan, Founder & CEO of Zoviotech.",
  openGraph: {
    title: "Insights | Muhammad Aamir Khan",
    description: "Articles on AI automation, technology leadership, and building intelligent systems.",
  },
};

export default async function BlogsPage() {
  const blogs = await loadAllBlogs();
  return <BlogsClient initialBlogs={blogs} />;
}
