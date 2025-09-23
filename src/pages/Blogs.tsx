import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadAllBlogs, Blog } from './blogs/index';

const Blogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const result = await loadAllBlogs();
        if (isMounted) {
          setAllBlogs(result);
        }
      } catch (e: any) {
        if (isMounted) setError(e?.message || 'Failed to load blogs');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = allBlogs.filter((blog: Blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'date') {
      filtered.sort((a: Blog, b: Blog) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'name') {
      filtered.sort((a: Blog, b: Blog) => a.title.localeCompare(b.title));
    }
    return filtered;
  }, [searchTerm, sortBy, allBlogs]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading Confessions...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl md:text-2xl  lg:text-4xl font-bold text-center mb-8">My Mind Confessions</h1>

      <p className="text-left text-gray-500 mb-10 text-sm dark:text-gray-400">
        This is the place where I don't care about peoples and formal writing, I just write everything what I think about. maybe you find something useful but most of the time you will hate me if you read this.
        So read this at your own risk.
      </p>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search thoughts..."
          className="p-2 text-sm border border-gray-300 rounded-md w-full md:w-1/3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-4">
          <label htmlFor="sort-by" className="sr-only">Sort by</label>
          <select
            id="sort-by"
            className="p-2 border text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
          >
            <option className='text0=-sm' value="date">Sort by Date</option>
            <option className='text0=-sm' value="name">Sort by Title</option>
          </select>
        </div>
      </div>

      {
        filteredAndSortedBlogs?.length === 0 && <div className="text-center text-gray-500 dark:text-gray-400">You are lucky there's no trash for now..</div>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {

          filteredAndSortedBlogs.map((blog: Blog) => (
            <Link to={`/blog/${blog.slug}`} key={blog.slug}>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col bg-transparent">
                <img src={blog.coverImage} alt={blog.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">By {blog.author} on {new Date(blog.date).toLocaleDateString()}</p>
                  <p className="flex-grow text-sm">Click to read more...</p>
                </div>
              </div>
            </Link>
          ))
        }


      </div>
    </div>
  );
};

export default Blogs;
