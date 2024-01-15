/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{html,js}', './index.html'],
  theme: {
    extend: {
      fontSize: {
        '2xs': '.65rem', // 10px
      },
    },
    fontFamily: {
      sans: ['Lexend', 'sans-serif'],
      serif: ['serif'],
    },
  },
  plugins: [],
};

module.exports = config;
