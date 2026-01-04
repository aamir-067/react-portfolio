import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Could not find requested resource</p>
      <Link href="/" className="text-violet-500 hover:text-violet-600 underline">
        Return Home
      </Link>
    </div>
  );
}
