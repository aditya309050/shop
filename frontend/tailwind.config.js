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
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Cinzel', 'Georgia', 'serif'],
        display: ['Cinzel', 'Italiana', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
