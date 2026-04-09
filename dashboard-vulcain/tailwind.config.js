/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vulcain: '#002B49', // Le bleu officiel Vulcain
      }
    },
  },
  plugins: [],
}
