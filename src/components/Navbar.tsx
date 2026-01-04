import React from 'react';
import Link from 'next/link';

interface NavBarProps {
  toggleTheme: () => void;
  currentTheme: string;
}

const NavBar: React.FC<NavBarProps> = ({ toggleTheme, currentTheme }) => {
  return (
    <header className="flex py-4 md:py-6 items-center justify-between px-6 md:px-12 lg:px-24 bg-transparent">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-lg font-bold text-zinc-900 dark:text-white">Aamir Khan</span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:inline">| Zoviotech</span>
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          href="/#about"
          className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors hidden md:inline"
        >
          About
        </Link>
        <Link
          href="/#services"
          className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors hidden md:inline"
        >
          Services
        </Link>
        <Link
          href="/blogs"
          className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          Insights
        </Link>
        <a
          href="https://zoviotech.com"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors hidden md:inline"
        >
          Zoviotech
        </a>

        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600 transition-colors"
        >
          {currentTheme === 'dark' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 3V1M12 23V21M21 12H23M1 12H3M18.36 5.64L19.78 4.22M4.22 19.78L5.64 18.36M18.36 18.36L19.78 19.78M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
