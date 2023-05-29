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
        'alkatra': ['Alkatra', 'cursive'],
      },
      colors: {
        'sidebar': '#dfd6d3',
        'orange': 'hsl(20, 84%, 50%)',
        // 'orange': '#e04e17',
        'light': 'hsl(0, 0%, 94%)',
        // 'light': '#0066CC',
        'dark': 'hsl(0, 0%, 9%)',
        // // 'dark': '#171717',
        'success': 'hsl(120, 60%, 41%)',
        // 'success': '#4bb543',
        'failed': 'hsl(0, 100%, 60%)',
        // 'failed': '#ff3333',

        'card': '#F8F6F4',
      },
      boxShadow: {
        'floating-shadow': '0px 26px 27px 0px #e04e17',
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