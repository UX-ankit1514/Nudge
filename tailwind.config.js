/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Instrument Serif', 'serif'],
        body: ['Inter', 'sans-serif'],
        ui: ['Inter', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      letterSpacing: {
        premium: '-0.02em',
        display: '-0.04em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.2, 0, 0, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
