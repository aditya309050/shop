/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#f3e5ab',
          DEFAULT: '#c5a059',
          dark: '#9a7632',
          rich: '#eaddc5'
        },
        royal: {
          crimson: '#8A1C2C',
          maroon: '#4A0E17',
          wine: '#5B1425',
          navy: '#0E1A38',
          emerald: '#0B3C2D'
        },
        obsidian: {
          DEFAULT: '#09090b',
          light: '#141418',
          card: '#18181d',
          darker: '#060608'
        }
      },
      fontFamily: {
        display: ['Italiana', 'Cinzel', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        editorial: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
