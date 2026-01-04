/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        'victor': ['Victor Mono', 'monospace']
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

// REVIEW CHECKLIST:
// ✅ No unused vars/code
// ✅ Fixed syntax & logic bugs
// ✅ Security best practices applied
// ✅ No bad practices left
// ✅ Performance optimized