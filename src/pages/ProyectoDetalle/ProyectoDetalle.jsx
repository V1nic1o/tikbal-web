import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaThList,
  FaSpinner,
} from 'react-icons/fa';
import Footer from '../../sections/Footer/Footer';
import Header from '../../components/Header/Header';
import WhatsAppBubble from '../WhatsAppBubble/WhatsAppBubble';

export default function ProyectoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proyecto, setProyecto] = useState(null);
  const [imagenActual, setImagenActual] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api
      .get(`/proyectos/${id}`)
      .then((res) => {
        setProyecto(res.data);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al cargar el proyecto', err);
        setCargando(false);
      });
  }, [id]);

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % proyecto.imagenes.length);
  };

  const anteriorImagen = () => {
    setImagenActual(
      (prev) => (prev - 1 + proyecto.imagenes.length) % proyecto.imagenes.length
    );
  };

  const irAPortafolio = () => {
    window.location.href = '/#portafolio';
  };

  const irATodosLosProyectos = () => {
    navigate('/proyectos');
  };

  return (
    <>
      <Header redireccionarConHash />

      <section className="bg-white dark:bg-[#0B1229] text-[#1f1f1f] dark:text-white px-4 sm:px-6 md:px-16 pt-28 pb-16 transition-colors duration-700 min-h-[calc(100vh-120px)] font-sans">
        {/* Botones navegación */}
        <div className="flex flex-wrap justify-end gap-3 mb-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={irAPortafolio}
            className="flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-[#4F46E5] to-[#6366F1] px-4 py-2 rounded-full shadow-lg transition"
          >
            <FaHome /> Ir al inicio
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={irATodosLosProyectos}
            className="flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-[#4F46E5] to-[#6366F1] px-4 py-2 rounded-full shadow-lg transition"
          >
            <FaThList /> Ver todos los proyectos
          </motion.button>
        </div>

        {/* Cargando */}
        {cargando ? (
          <div className="flex justify-center items-center h-60">
            <FaSpinner className="animate-spin text-4xl text-[#4F46E5]" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-10 items-start justify-between">
            {/* Imagen principal con animaciones */}
            {proyecto.imagenes.length > 0 && (
              <div className="relative w-full md:w-1/2">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={proyecto.imagenes[imagenActual]}
                    src={proyecto.imagenes[imagenActual]}
                    alt={`Imagen ${imagenActual + 1}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-none object-cover max-h-[500px] rounded-xl md:rounded-2xl shadow-xl"
                  />
                </AnimatePresence>

                {/* Flechas navegación */}
                <button
                  onClick={anteriorImagen}
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 dark:bg-white/10 hover:bg-white text-[#4F46E5] dark:text-white p-2 rounded-full shadow-md transition"
                  aria-label="Anterior"
                >
                  <FaChevronLeft />
                </button>

                <button
                  onClick={siguienteImagen}
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 dark:bg-white/10 hover:bg-white text-[#4F46E5] dark:text-white p-2 rounded-full shadow-md transition"
                  aria-label="Siguiente"
                >
                  <FaChevronRight />
                </button>

                {/* Paginador de puntos */}
                <div className="flex justify-center gap-2 mt-5">
                  {proyecto.imagenes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setImagenActual(index)}
                      aria-label={`Imagen ${index + 1}`}
                      className={`w-3 h-3 rounded-full transition-transform duration-200 ${
                        imagenActual === index
                          ? 'bg-[#4F46E5] scale-125'
                          : 'bg-gray-300 dark:bg-white/20 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Información del proyecto */}
            <div className="md:w-1/2">
              <motion.h2
                className="text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white mb-6 tracking-tight leading-snug"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {proyecto.nombre}
              </motion.h2>

              <p className="text-gray-700 dark:text-white/80 text-lg font-medium italic mb-1">
                Cliente: {proyecto.cliente}
              </p>
              <p className="text-gray-600 dark:text-white/60 text-base mb-6">
                Ubicación: {proyecto.ubicacion}
              </p>
              <p className="text-gray-800 dark:text-white/90 leading-relaxed text-base sm:text-lg">
                {proyecto.descripcion}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <div className="bg-white dark:bg-[#0B1229] transition-colors duration-700">
        <Footer />
      </div>

      <WhatsAppBubble />
    </>
  );
}