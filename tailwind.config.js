/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Bookman Old Style', 'Book Antiqua', 'Palatino Linotype', 'Georgia', 'serif'],
        'serif': ['Bookman Old Style', 'Book Antiqua', 'Palatino Linotype', 'Georgia', 'serif'],
        'bookman': ['Bookman Old Style', 'Book Antiqua', 'Palatino Linotype', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};