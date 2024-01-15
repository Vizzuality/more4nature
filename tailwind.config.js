/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{html,js}', './index.html'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Lexend', 'sans-serif'],
      serif: ['serif'],
    },
  },
  plugins: [],
};

module.exports = config;
