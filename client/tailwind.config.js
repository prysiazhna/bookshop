/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
      screens: {
        'big': '900px',
        'xs': '540px',
        'xss': '200px',
      },
    },
  },
  plugins: [],
}