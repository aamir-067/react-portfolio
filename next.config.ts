/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   // output: "export", // Removed to allow dynamic SSR/SSG hybrid and fix build error with empty params
//   // If they want SSR, 'export' isn't needed, but often for portfolios "static" implies usage with GitHub Pages etc.
//   // However, the user request says: "do a SSR rather thenn CSR".
//   // "data is static anddont comes form db or server" -> This implies SSG (Static Site Generation).
//   // Next.js terminology:
//   // SSR = dynamic server rendering per request.
//   // SSG = static generation at build time.
//   // Since content is static, SSG is better.
//   // The user said "SSR rather thenn CSR". They likely mean "Pre-rendered".
//   // If I use 'output: "export"', it produces a purely static site (no Node server needed).
//   // If I omit it, it supports both SSR and SSG.
//   // Let's omit 'output: "export"' for now to allow full flexibility (including image optimization which requires a server or specific config).
//   // BUT, often "static portfolio" = "output: export".
//   // Let's stick to standard config first.
//   images: {
//     unoptimized: true, // often needed for static exports if we go that route later
//   },
// };

// export default nextConfig;

const nextConfig = {
	output: "export",
	distDir: "build",
	images: {
		unoptimized: true,
	},
	reactStrictMode: true,
};

export default nextConfig;
