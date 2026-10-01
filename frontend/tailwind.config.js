/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        manyavar: {
          bg: '#fbf8f2',
          card: '#ffffff',
          cream: '#f5efe4',
          orange: '#e25822',
          orangeDark: '#c84412',
          maroon: '#3b1812',
          maroonDark: '#260e0a',
          gold: '#c5a059',
          border: '#e8dfd1',
          text: '#221e1a',
          textMuted: '#786e62'
        },
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
        cinzel: ['Cinzel', 'serif'],
        serif: ['Cormorant Garamond', 'Cinzel', 'Georgia', 'serif'],
        display: ['Italiana', 'Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
