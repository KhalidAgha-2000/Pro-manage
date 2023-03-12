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
        'orange': '#e04e17',
        // 'orange': '#e14d19',
        'dark': '#151315',
        'light': '#f0f0f0',
      },
    },
  },
  plugins: [],
}