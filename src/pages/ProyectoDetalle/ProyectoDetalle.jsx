// src/pages/ProyectoDetalle.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaHome } from 'react-icons/fa';
import Footer from '../../sections/Footer/Footer';
import Header from '../../components/Header/Header';
import WhatsAppBubble from '../WhatsAppBubble/WhatsAppBubble';

export default function ProyectoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proyecto, setProyecto] = useState(null);
  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    api
      .get(`/proyectos/${id}`)
      .then((res) => setProyecto(res.data))
      .catch((err) => console.error('Error al cargar el proyecto', err));
  }, [id]);

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % proyecto.imagenes.length);
  };

  const anteriorImagen = () => {
    setImagenActual((prev) => (prev - 1 + proyecto.imagenes.length) % proyecto.imagenes.length);
  };

  if (!proyecto) {
    return <div className="text-center py-20 text-lg text-gray-600">Cargando proyecto...</div>;
  }

  return (
    <>
      {/* Header flotante */}
      <Header />

      {/* Contenido principal */}
      <section className="bg-white px-4 sm:px-6 md:px-16 py-10 min-h-[calc(100vh-100px)]">
        {/* Cabecera */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-primary hover:underline text-sm font-medium"
          >
            <FaArrowLeft className="mr-2" /> Volver
          </button>
          <Link
            to="/"
            className="flex items-center text-sm text-primary hover:text-secondary transition"
          >
            <FaHome className="mr-1" /> Ir al inicio
          </Link>
        </div>

        {/* Contenido */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Carrusel */}
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

              {/* Flechas */}
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

              {/* Indicadores */}
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

          {/* Texto del proyecto */}
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
      </section>

      {/* Footer */}
      <div className="bg-white px-4 sm:px-6 md:px-16 pt-10">
        <Footer />
      </div>

      {/* Burbuja de WhatsApp */}
      <WhatsAppBubble />
    </>
  );
}