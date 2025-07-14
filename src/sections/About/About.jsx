import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

import diagnosticoSticker from '../../assets/animations/diagnostico.json';
import equipoSticker from '../../assets/animations/equipo.json';
import sueloSticker from '../../assets/animations/suelo.json';

const METODOS = [
  {
    title: 'Diagnóstico Inicial',
    desc: 'Reunión para conocer tus necesidades y condiciones del jardín. A partir de ahí, elaboramos una propuesta única.',
    sticker: diagnosticoSticker,
  },
  {
    title: 'Trabajo en Equipo',
    desc: 'Entrenamos a tu personal y colaboramos con tu equipo para lograr resultados duraderos.',
    sticker: equipoSticker,
  },
  {
    title: 'Sustentabilidad del Suelo',
    desc: 'Regeneramos el ecosistema natural del jardín comenzando desde la base: el suelo.',
    sticker: sueloSticker,
  },
];

export default function About() {
  return (
    <section
      id="nosotros"
      className="bg-[#f7f7f7] dark:bg-[#0B1229] py-20 px-6 md:px-16 text-center transition-colors duration-700"
    >
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Nuestra Misión
      </motion.h2>

      <motion.p
        className="max-w-4xl mx-auto text-lg sm:text-xl leading-relaxed mb-12 text-gray-700 dark:text-slate-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Creamos y cuidamos jardines espectaculares y sostenibles con un enfoque personalizado, 
        aplicando principios ecológicos, permacultura y prácticas orgánicas.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.2 }}
        viewport={{ once: true }}
      >
        {METODOS.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg text-center p-6 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-4">
              <Lottie animationData={item.sticker} loop />
            </div>
            <h3 className="text-xl font-bold text-[#003366] dark:text-white mb-2">
              {item.title}
            </h3>
            <p className="text-gray-700 dark:text-slate-300 text-sm italic leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}