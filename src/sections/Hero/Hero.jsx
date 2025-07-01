// src/sections/Hero/Hero.jsx
import { motion } from 'framer-motion';
import fondo from '../../assets/FONDO.jpg';
import logo from '../../assets/logo-tikbal.jpg';
import { FaLeaf, FaTools, FaSeedling } from 'react-icons/fa';

export default function Hero() {
  const scrollTo = (id) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden font-sans scroll-smooth bg-gradient-to-r from-[#e8ede4] to-[#f8f4ed] pt-28 sm:pt-28 lg:pt-32"
    >
      {/* Fondo decorativo difuso */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${fondo})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6 }}
      />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between text-left px-6 md:px-16 py-12 lg:py-32 max-w-7xl mx-auto">
        {/* Columna izquierda */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b3e7a] leading-snug mb-6 drop-shadow-sm">
            Transformamos tus espacios <br className="hidden sm:block" /> en jardines vivos y sostenibles
          </h1>

          <ul className="text-base sm:text-lg text-gray-700 space-y-3 mb-8">
            <li className="flex items-center gap-2 justify-center lg:justify-start">
              <FaLeaf className="text-terracota text-xl shrink-0" /> Diseño ecológico personalizado
            </li>
            <li className="flex items-center gap-2 justify-center lg:justify-start">
              <FaSeedling className="text-terracota text-xl shrink-0" /> Regeneración del suelo y asesoría
            </li>
            <li className="flex items-center gap-2 justify-center lg:justify-start">
              <FaTools className="text-terracota text-xl shrink-0" /> Mantenimiento orgánico integral
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.button
              onClick={() => scrollTo('#contacto')}
              className="px-6 py-3 bg-terracota text-white rounded-full shadow hover:shadow-md transition hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              Solicita una visita
            </motion.button>

            <motion.button
              onClick={() => scrollTo('#portafolio')}
              className="px-6 py-3 border border-terracota text-terracota rounded-full hover:bg-terracota hover:text-white transition hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              Ver proyectos
            </motion.button>
          </div>
        </motion.div>

        {/* Columna derecha (logo destacado animado) */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center items-center mb-12 lg:mb-0"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-white border border-gray-200 shadow-2xl rounded-3xl p-4 sm:p-6 w-56 sm:w-72 md:w-96 hover:shadow-terracota/30 transition-shadow duration-300">
            <img
              src={logo}
              alt="Logo Tikb’al"
              className="w-full h-auto object-contain rounded-xl"
            />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-terracota text-white text-xs px-4 py-1 rounded-full shadow-md whitespace-nowrap">
              Desde 2020 • Jardines conscientes
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}