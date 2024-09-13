/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{ts,tsx}",
    "./src/components/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'victor': ['Victor Mono', 'monospace']
      }
    },
  },
  plugins: [],
  darkMode: "class"
}

