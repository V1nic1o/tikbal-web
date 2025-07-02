import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaSpinner,
} from 'react-icons/fa';
import Footer from '../../sections/Footer/Footer';
import Header from '../../components/Header/Header';
import WhatsAppBubble from '../WhatsAppBubble/WhatsAppBubble';

export default function ProyectoDetalle() {
  const { id } = useParams();
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

  return (
    <>
      <Header redireccionarConHash />

      <section className="bg-white px-4 sm:px-6 md:px-16 pt-28 pb-10 min-h-[calc(100vh-100px)]">
        <div className="flex justify-end mb-6">
          <button
            onClick={irAPortafolio}
            className="flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-[#0b3e7a] to-[#5a7f8c] px-4 py-2 rounded-full shadow hover:opacity-90 transition"
          >
            <FaHome /> Ir al inicio
          </button>
        </div>

        {cargando ? (
          <div className="flex justify-center items-center h-60">
            <FaSpinner className="animate-spin text-3xl text-primary" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
            {proyecto.imagenes.length > 0 && (
              <div className="relative md:w-1/2">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={proyecto.imagenes[imagenActual]}
                    src={proyecto.imagenes[imagenActual]}
                    alt={`Imagen ${imagenActual + 1}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-h-[500px] object-cover rounded-xl shadow-md"
                  />
                </AnimatePresence>

                <button
                  onClick={anteriorImagen}
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md transition"
                  aria-label="Anterior"
                >
                  <FaChevronLeft />
                </button>

                <button
                  onClick={siguienteImagen}
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md transition"
                  aria-label="Siguiente"
                >
                  <FaChevronRight />
                </button>

                <div className="flex justify-center gap-2 mt-5">
                  {proyecto.imagenes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setImagenActual(index)}
                      aria-label={`Imagen ${index + 1}`}
                      className={`w-3 h-3 rounded-full transition-transform duration-200 ${
                        imagenActual === index
                          ? 'bg-primary scale-125'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="md:w-1/2">
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {proyecto.nombre}
              </motion.h2>

              <p className="text-gray-700 text-base sm:text-lg mb-1 italic">
                Cliente: {proyecto.cliente}
              </p>
              <p className="text-gray-600 text-sm sm:text-base mb-6">
                Ubicación: {proyecto.ubicacion}
              </p>
              <p className="text-gray-800 leading-relaxed mb-6">
                {proyecto.descripcion}
              </p>
            </div>
          </div>
        )}
      </section>

      <div className="bg-white px-4 sm:px-6 md:px-16 pt-10">
        <Footer />
      </div>

      <WhatsAppBubble />
    </>
  );
}