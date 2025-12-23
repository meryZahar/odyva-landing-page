/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        caveat: ["Caveat", "cursive"],
        epilogue: ["Epilogue", "sans-serif"],
      },
      fontSize: {
        'odyva-h1': ['4rem', { lineHeight: '61.6px', letterSpacing: '-0.5%' }], // 64px
        'odyva-h2': ['2.5rem', { lineHeight: 'auto', letterSpacing: '0%' }], // 40px
        'odyva-body': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0%' }], // 18px
        'odyva-ui': ['0.875rem', { lineHeight: 'auto', letterSpacing: '0%' }], // 14px
        'odyva-caption': ['0.875rem', { lineHeight: 'auto', letterSpacing: '0%' }], // 14px
      },
      letterSpacing: {
        tightest: '-0.5px',
        normal: '0px',
      },
    },
  },
  plugins: [],
} 