// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#0B3E7A',     // Azul fuerte
        secondary: '#5A7F8C',   // Azul grisáceo
        greenGray: '#A3A88B',   // Verde grisáceo
        beige: '#DBCCC1',       // Fondo general claro
        terracota: '#C17161',   // Acentos o botones especiales
      },
    },
  },
  plugins: [],
};