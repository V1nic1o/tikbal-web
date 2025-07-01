// src/sections/Hero/Hero.jsx
import { motion } from 'framer-motion';
import fondo from '../../assets/FONDO.jpg';

export default function Hero() {
  const scrollTo = (id) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden font-sans scroll-smooth">
      {/* Fondo animado */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${fondo})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6 }}
      />

      {/* Capa oscura suavizada */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

      {/* Contenido central */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 h-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          Cultiva belleza<br className="hidden sm:block" /> y sostenibilidad
        </h1>

        <motion.button
          onClick={() => scrollTo('#servicios')}
          className="mt-4 px-8 py-3 bg-terracota text-white font-medium rounded-full shadow-md hover:scale-105 transition-transform"
          whileHover={{ scale: 1.08 }}
        >
          Descubre más
        </motion.button>
      </motion.div>
    </section>
  );
}