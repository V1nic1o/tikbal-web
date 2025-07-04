// src/sections/About/About.jsx
import { motion } from 'framer-motion';
import { FaSearch, FaUsers, FaLeaf } from 'react-icons/fa';

const METODOS = [
  {
    icon: <FaSearch className="text-white text-xl" />,
    title: 'Diagnóstico Inicial',
    desc: 'Reunión para conocer tus necesidades y condiciones del jardín. A partir de ahí, elaboramos una propuesta única.',
  },
  {
    icon: <FaUsers className="text-white text-xl" />,
    title: 'Trabajo en Equipo',
    desc: 'Entrenamos a tu personal y colaboramos con tu equipo para lograr resultados duraderos.',
  },
  {
    icon: <FaLeaf className="text-white text-xl" />,
    title: 'Sustentabilidad del Suelo',
    desc: 'Regeneramos el ecosistema natural del jardín comenzando desde la base: el suelo.',
  },
];

export default function About() {
  return (
    <section
      id="nosotros"
      className="bg-white py-20 px-6 md:px-16 text-center"
    >
      <motion.h2
        className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#002850] to-[#3b6b8e] bg-clip-text text-transparent mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Nuestra Misión
      </motion.h2>

      <motion.p
        className="max-w-4xl mx-auto text-lg sm:text-xl leading-relaxed mb-12 text-[#1f1f1f]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Creamos y cuidamos jardines espectaculares y sostenibles con un enfoque personalizado, 
        aplicando principios ecológicos, permacultura y prácticas orgánicas.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.2 }}
        viewport={{ once: true }}
      >
        {METODOS.map((item, index) => (
          <motion.div
            key={index}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm text-left mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="p-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#003366] to-[#5a7f8c] flex items-center justify-center mb-4 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[#003366] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm italic leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}