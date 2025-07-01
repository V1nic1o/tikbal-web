// src/sections/About/About.jsx
import { motion } from 'framer-motion';
import { FaSearch, FaUsers, FaLeaf } from 'react-icons/fa';

const METODOS = [
  {
    icon: <FaSearch className="text-4xl text-primary mb-4" />,
    title: 'Diagnóstico Inicial',
    desc: 'Reunión para conocer tus necesidades y condiciones del jardín. A partir de ahí, elaboramos una propuesta única.',
  },
  {
    icon: <FaUsers className="text-4xl text-primary mb-4" />,
    title: 'Trabajo en Equipo',
    desc: 'Entrenamos a tu personal y colaboramos con tu equipo para lograr resultados duraderos.',
  },
  {
    icon: <FaLeaf className="text-4xl text-primary mb-4" />,
    title: 'Sustentabilidad del Suelo',
    desc: 'Regeneramos el ecosistema natural del jardín comenzando desde la base: el suelo.',
  },
];

export default function About() {
  return (
    <section
      id="nosotros"
      className="bg-beige py-20 px-6 md:px-16 text-center text-gray-800"
    >
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-primary mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Nuestra Misión
      </motion.h2>

      <motion.p
        className="max-w-4xl mx-auto text-lg sm:text-xl leading-relaxed mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Creamos y cuidamos jardines espectaculares y sostenibles con un enfoque personalizado, 
        aplicando principios ecológicos, permacultura y prácticas orgánicas.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.2 }}
        viewport={{ once: true }}
      >
        {METODOS.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white text-gray-800 p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {item.icon}
            <h3 className="text-xl font-semibold text-secondary mb-2">{item.title}</h3>
            <p className="text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}