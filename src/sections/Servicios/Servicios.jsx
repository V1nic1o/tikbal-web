// src/sections/Servicios/Servicios.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import api from '../../services/api';

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api.get('/servicios')
      .then((res) => {
        setServicios(res.data);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al obtener servicios:', err);
        setCargando(false);
      });
  }, []);

  return (
    <section id="servicios" className="bg-beige py-20 px-6 md:px-16 text-center">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-primary mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Nuestros Servicios
      </motion.h2>

      <motion.p
        className="max-w-3xl mx-auto text-lg text-gray-700 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Te ofrecemos soluciones especializadas para cada etapa de tu jardín, desde su creación hasta su mantenimiento, siempre con insumos de alta calidad y compromiso ecológico.
      </motion.p>

      {cargando ? (
        <div className="flex justify-center items-center h-40">
          <FaSpinner className="animate-spin text-primary text-3xl" />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {servicios.map((servicio, index) => (
            <motion.div
              key={servicio.id || index}
              className="bg-[#fdfdfd] border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {servicio.imagenes?.[0] && (
                <img
                  src={servicio.imagenes[0]}
                  alt={servicio.nombre}
                  className="w-20 h-20 object-cover rounded-full mx-auto mb-4 border border-gray-300 shadow-sm"
                />
              )}
              <h3 className="text-xl font-semibold text-secondary mb-2">{servicio.nombre}</h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {servicio.descripcion}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}