/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'van-orange': '#ff8c38',
        'van-dark': '#161616',
        'van-bg': '#fff7ed',
        'van-footer': '#252525',
      }
    },
  },
  plugins: [],
}