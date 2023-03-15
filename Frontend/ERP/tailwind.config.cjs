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
        'success': '#4bb543',
        'failed': '#ff3333',
      },
      animation: {
        spin: 'rotate 3s linear infinite',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'scale(1) rotate(360deg)' },
          '50%': { transform: 'scale(0.8) rotate(-360deg)' },
          '100%': { transform: 'scale(1) rotate(360deg)' },
        }
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}