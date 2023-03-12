/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'orange': '#df5b28',
        'dark': '#020202',
        'light': '#f0f0f0',
      },
    },
  },
  plugins: [],
}