"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Blog } from '../../lib/blogs';

interface BlogsClientProps {
  initialBlogs: Blog[];
}

const BlogsClient: React.FC<BlogsClientProps> = ({ initialBlogs }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');

  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = initialBlogs.filter((blog: Blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'date') {
      filtered.sort((a: Blog, b: Blog) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'name') {
      filtered.sort((a: Blog, b: Blog) => a.title.localeCompare(b.title));
    }
    return filtered;
  }, [searchTerm, sortBy, initialBlogs]);

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
      {/* Hero Section - Monochrome */}
      <div className="bg-zinc-900 dark:bg-zinc-950 text-white py-16 md:py-24 border-b border-zinc-800">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Insights
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            Thoughts on AI automation, technology leadership, and building intelligent systems.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
          <div className="relative w-full md:w-96">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 text-sm border border-zinc-200 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 dark:text-white focus:ring-2 focus:ring-zinc-400 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Sort by:</span>
            <select
              className="px-4 py-2.5 text-sm border border-zinc-200 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 dark:text-white focus:ring-2 focus:ring-zinc-400 transition-all cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
            >
              <option value="date">Latest First</option>
              <option value="name">Title A-Z</option>
            </select>
          </div>
        </div>

        {/* Blog Grid */}
        {filteredAndSortedBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2">No articles found</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Try adjusting your search or check back later for new content.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedBlogs.map((blog: Blog) => (
              <Link href={`/blog/${blog.slug}`} key={blog.slug} className="group block h-full">
                <article className="h-full bg-white dark:bg-zinc-800/50 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  {/* Image Container */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                      <span className="px-3 py-1 text-xs font-medium bg-zinc-900 text-white rounded-full">
                        Article
                      </span>
                      <span className="text-xs text-white/90">
                        {getReadingTime(blog.content)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <time className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">
                      {formatDate(blog.date)}
                    </time>
                    <h2 className="text-xl font-bold mt-2 mb-3 text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
                      By {blog.author}
                    </p>
                    <div className="flex items-center text-zinc-700 dark:text-zinc-300 text-sm font-medium group-hover:gap-2 transition-all">
                      <span>Read article</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {filteredAndSortedBlogs.length > 0 && (
          <div className="mt-16 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Showing {filteredAndSortedBlogs.length} {filteredAndSortedBlogs.length === 1 ? 'article' : 'articles'}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsClient;
