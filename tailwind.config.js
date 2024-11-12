/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        bebas : ["Bebas Neue", 'sans-serif'],
        oswald: ["Oswald", "sans-serif"],
        number : ["Kanit", "sans-serif"]
      },
      animation: {
        'fade-in-out': 'fade-in-out 1.5s ease-in-out infinite',
      },
      keyframes: {
        'fade-in-out': {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

