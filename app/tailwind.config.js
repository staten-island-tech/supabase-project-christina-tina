/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './main.ts', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'], // or custom themes
  },
}
