import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import garden from '../../assets/animations/garden.json';
import planting from '../../assets/animations/planting.json';
import earth from '../../assets/animations/earth.json';
import fondo from '../../assets/FONDO.jpg'; // ✅ Imagen del logo
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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
      bg: '#DCFCE7',
      mensaje: 'Diseñamos jardines vivos y en armonía con la naturaleza.',
      isImage: false,
    },
    {
      anim: planting,
      bg: '#FEF3C7',
      mensaje: 'Asesoramos en el cultivo orgánico y sostenible.',
      isImage: false,
    },
    {
      anim: fondo, // ✅ Imagen como sticker
      bg: '#DBEAFE',
      mensaje: 'Llevamos vida verde hasta la puerta de tu hogar o empresa.',
      isImage: true,
    },
    {
      anim: earth,
      bg: '#F3E8FF',
      mensaje: 'Creamos un futuro más verde desde cada rincón del país.',
      isImage: false,
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % stickerData.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + stickerData.length) % stickerData.length);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % stickerData.length);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden font-sans bg-[#f7f7f7] dark:bg-[#0B1229] text-gray-900 dark:text-white"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col-reverse lg:flex-row items-center justify-center gap-10 pt-24 sm:pt-28 lg:pt-36 xl:pt-44">
        
        {/* Texto principal */}
        <div className="w-full lg:w-[55%] text-left order-2 lg:order-1">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-xl sm:text-2xl font-semibold mb-3 text-gray-800 dark:text-white"
          >
            Transformamos tus espacios
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-extrabold text-4xl sm:text-6xl md:text-7xl leading-tight tracking-wide drop-shadow mb-5 text-gray-900 dark:text-white"
          >
            EN JARDINES VIVOS Y SOSTENIBLES
          </motion.h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="text-gray-700 dark:text-slate-300 mb-6 text-lg sm:text-xl"
            >
              {stickerData[current].mensaje}
            </motion.p>
          </AnimatePresence>

          <div className="flex flex-wrap sm:flex-nowrap gap-4 mb-6">
            <motion.button
              onClick={() => scrollTo('#contacto')}
              className="flex-1 sm:flex-none px-6 py-3 bg-[#4F46E5] text-white rounded-md shadow hover:shadow-lg transition-all duration-300 hover:scale-105 text-base font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              SOLICITA UNA VISITA
            </motion.button>
            <motion.button
              onClick={() => scrollTo('#portafolio')}
              className="flex-1 sm:flex-none px-6 py-3 bg-[#6366F1] text-white rounded-md shadow hover:shadow-lg transition-all duration-300 hover:scale-105 text-base font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              VER PROYECTOS
            </motion.button>
          </div>

          <div className="flex gap-4">
            <a href="https://wa.me/50200000000" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="text-green-400 hover:scale-125 transition-all duration-300 text-2xl" />
            </a>
            <a href="https://facebook.com/tikbal" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-blue-500 hover:scale-125 transition-all duration-300 text-2xl" />
            </a>
            <a href="https://instagram.com/tikbal" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-pink-500 hover:scale-125 transition-all duration-300 text-2xl" />
            </a>
          </div>
        </div>

        {/* Sticker dinámico (animación o imagen) */}
        <div className="w-full lg:w-[45%] flex items-center justify-center relative order-1 lg:order-2">
          <button
            onClick={goPrev}
            className="absolute left-[-1.5rem] md:left-[-2rem] z-10 text-2xl text-gray-700 dark:text-white hover:text-gray-300 transition"
          >
            <IoIosArrowBack />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="w-80 h-80 sm:w-[350px] sm:h-[350px] rounded-xl shadow-lg flex items-center justify-center overflow-hidden"
              style={{ background: stickerData[current].bg }}
            >
              {stickerData[current].isImage ? (
                <img
                  src={stickerData[current].anim}
                  alt="Sticker visual"
                  className="object-contain w-full h-full" // ✅ Aquí el cambio
                />
              ) : (
                <Lottie animationData={stickerData[current].anim} loop className="w-full h-full" />
              )}
            </motion.div>
          </AnimatePresence>

          <button
            onClick={goNext}
            className="absolute right-[-1.5rem] md:right-[-2rem] z-10 text-2xl text-gray-700 dark:text-white hover:text-gray-300 transition"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </section>
  );
}