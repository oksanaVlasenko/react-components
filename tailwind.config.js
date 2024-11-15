/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx, scss}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'xs': '12rem', 
        'sm': '15rem'
      },
    },
  },
  plugins: [],
}

