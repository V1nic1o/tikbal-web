// src/sections/Portafolio/Portafolio.jsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Portafolio() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    api.get('/proyectos')
      .then((res) => setProyectos(res.data))
      .catch((err) => console.error('Error al cargar proyectos', err));
  }, []);

  return (
    <section id="portafolio" className="bg-beige py-20 px-6 md:px-16 text-center">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-primary mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Nuestro Portafolio
      </motion.h2>

      <motion.p
        className="max-w-3xl mx-auto text-lg text-gray-700 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Hemos trabajado con clientes que comparten nuestra visión de sostenibilidad y belleza natural. Estos son algunos de los proyectos destacados:
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.2 }}
        viewport={{ once: true }}
      >
        {proyectos.map((proy, i) => (
          <motion.div
            key={proy.id}
            className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Link to={`/proyecto/${proy.id}`} className="block h-full">
              <img
                src={proy.imagenes?.[0]}
                alt={proy.nombre}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Capa overlay: visible en hover (desktop) y siempre visible en móvil */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition duration-300
                opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                <h3 className="text-xl font-semibold text-white text-center px-4">
                  {proy.nombre}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}