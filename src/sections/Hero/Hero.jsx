// src/sections/Hero/Hero.jsx
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import fondo from '../../assets/FONDO.jpg';
import garden from '../../assets/animations/garden.json';
import planting from '../../assets/animations/planting.json';
import vehicle from '../../assets/animations/vehicle.json';
import earth from '../../assets/animations/earth.json';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Hero() {
  const scrollTo = (id) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const stickerData = [
    {
      anim: garden,
      bg: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    },
    {
      anim: planting,
      bg: '#B5F3CF',
    },
    {
      anim: vehicle,
      bg: '#80C2AF',
    },
    {
      anim: earth,
      bg: 'linear-gradient(135deg, #60a5fa, #93c5fd)',
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden font-sans bg-[#fef9ed] pt-24 sm:pt-28"
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
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Texto */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[#1a1a1a] text-xl sm:text-2xl font-serif mb-2 transition duration-300 hover:opacity-80 hover:translate-x-1">
            Transformamos tus espacios
          </h2>
          <h1 className="text-[#2776f3] font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-wide drop-shadow mb-6 transition duration-300 hover:opacity-90 hover:-translate-y-1">
            EN JARDINES <br className="hidden sm:block" /> VIVOS Y <br className="hidden sm:block" /> SOSTENIBLES
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
            <motion.button
              onClick={() => scrollTo('#contacto')}
              className="px-6 py-3 bg-[#f97f4e] text-white rounded-full shadow hover:shadow-md transition-all duration-300 hover:scale-110 text-sm font-semibold"
              whileHover={{ scale: 1.1 }}
            >
              SOLICITA UNA VISITA
            </motion.button>
            <motion.button
              onClick={() => scrollTo('#portafolio')}
              className="px-6 py-3 bg-[#fd9b6b] text-white rounded-full shadow hover:shadow-md transition-all duration-300 hover:scale-110 text-sm font-semibold"
              whileHover={{ scale: 1.1 }}
            >
              VER PROYECTOS
            </motion.button>
          </div>

          {/* Redes sociales */}
          <div className="flex gap-4 justify-center lg:justify-start">
            <a href="https://wa.me/50200000000" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="text-green-500 hover:scale-125 transition-all duration-300 text-2xl sm:text-3xl" />
            </a>
            <a href="https://facebook.com/tikbal" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-blue-600 hover:scale-125 transition-all duration-300 text-2xl sm:text-3xl" />
            </a>
            <a href="https://instagram.com/tikbal" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-pink-500 hover:scale-125 transition-all duration-300 text-2xl sm:text-3xl" />
            </a>
          </div>
        </motion.div>

        {/* Stickers animados con burbujas redondas */}
        <motion.div
          className="grid grid-cols-2 gap-6 sm:gap-8 justify-items-center w-full lg:w-1/2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          {stickerData.map(({ anim, bg }, i) => (
            <motion.div
              key={i}
              className="rounded-full shadow-xl p-4 sm:p-6 flex items-center justify-center w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 transition-all duration-300 cursor-pointer"
              style={{ background: bg }}
              whileHover={{
                scale: 1.1,
                rotate: 3,
                transition: { duration: 0.4, ease: 'easeInOut' },
              }}
            >
              <Lottie animationData={anim} loop className="w-full h-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}