/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				// Static artifacts: veils, frames, fallbacks keep their physical color
				paper: { DEFAULT: "#f2efe8", soft: "#e9e5da" },
				ink: { DEFAULT: "#15130e", soft: "#5b574c" },
				accent: { DEFAULT: "#ff4d00", soft: "#ff7a40" },
				// Live theme channels, tweened paper <-> ink on scroll
				surface: "rgb(var(--bg-rgb) / <alpha-value>)",
				fg: "rgb(var(--fg-rgb) / <alpha-value>)",
				line: "rgb(var(--fg-rgb) / 0.14)",
			},
			fontFamily: {
				serif: ["var(--font-serif)", "Georgia", "serif"],
				sans: ["var(--font-sans)", "system-ui", "sans-serif"],
				mono: [
					"var(--font-mono)",
					"ui-monospace",
					"SFMono-Regular",
					"monospace",
				],
			},
			typography: () => ({
				paper: {
					css: {
						"--tw-prose-body": "rgb(var(--fg-rgb) / 0.82)",
						"--tw-prose-headings": "rgb(var(--fg-rgb))",
						"--tw-prose-links": "rgb(var(--fg-rgb))",
						"--tw-prose-bold": "rgb(var(--fg-rgb))",
						"--tw-prose-counters": "#ff4d00",
						"--tw-prose-bullets": "#ff4d00",
						"--tw-prose-hr": "rgb(var(--fg-rgb) / 0.14)",
						"--tw-prose-quotes": "rgb(var(--fg-rgb))",
						"--tw-prose-quote-borders": "#ff4d00",
						"--tw-prose-captions": "rgb(var(--fg-rgb) / 0.6)",
						"--tw-prose-code": "rgb(var(--fg-rgb))",
						"--tw-prose-pre-code": "#e8e4d8",
						"--tw-prose-pre-bg": "#15130e",
						"--tw-prose-th-borders": "rgb(var(--fg-rgb) / 0.14)",
						"--tw-prose-td-borders": "rgb(var(--fg-rgb) / 0.14)",
						maxWidth: "none",
						h1: { fontFamily: "var(--font-serif)", fontWeight: "400" },
						h2: { fontFamily: "var(--font-serif)", fontWeight: "400" },
						h3: { fontFamily: "var(--font-serif)", fontWeight: "400" },
						h4: { fontFamily: "var(--font-serif)", fontWeight: "400" },
						a: {
							textDecoration: "underline",
							textDecorationColor: "#ff4d00",
							textUnderlineOffset: "3px",
							"&:hover": { color: "#ff4d00" },
						},
						code: {
							backgroundColor: "rgb(var(--fg-rgb) / 0.07)",
							borderRadius: "2px",
							padding: "0.15em 0.35em",
							fontWeight: "400",
						},
						"code::before": { content: "none" },
						"code::after": { content: "none" },
						pre: {
							borderRadius: "2px",
							border: "1px solid rgb(var(--fg-rgb) / 0.14)",
						},
						img: { border: "1px solid rgb(var(--fg-rgb) / 0.14)" },
						blockquote: {
							fontFamily: "var(--font-serif)",
							fontStyle: "italic",
							fontWeight: "400",
						},
					},
				},
			}),
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
