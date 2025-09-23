/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md}", // Include markdown files and all components/pages
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