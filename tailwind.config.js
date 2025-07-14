// tailwind.config.js
export default {
  darkMode: 'class', // ✅ ACTÍVALO AQUÍ
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#0B3E7A',
        secondary: '#5A7F8C',
        greenGray: '#A3A88B',
        beige: '#DBCCC1',
        terracota: '#C17161',
      },
    },
  },
  plugins: [],
};