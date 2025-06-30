// src/sections/Portafolio/Portafolio.jsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

export default function Portafolio() {
  const [proyectos, setProyectos] = useState([]);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: 'snap',
    slides: { perView: 1 },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 1 },
      },
    },
    created: () => setTimeout(() => updateDots(), 100),
    slideChanged: (slider) => updateDots(slider.track.details.rel),
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const updateDots = (index = 0) => {
    setCurrentSlide(index);
  };

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

      <div ref={sliderRef} className="keen-slider max-w-6xl mx-auto">
        {proyectos.map((proy, i) => (
          <motion.div
            key={proy.id}
            className="keen-slider__slide relative overflow-hidden rounded-xl group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Link to={`/proyecto/${proy.id}`} className="block h-full w-full">
              <img
                src={proy.imagenes?.[0]}
                alt={proy.nombre}
                className="w-full h-[70vh] object-contain sm:object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className={`
                  absolute inset-0 flex items-center justify-center text-white text-center px-4 transition-opacity duration-300
                  bg-black/40 backdrop-blur-sm
                  sm:opacity-0 sm:group-hover:opacity-100
                `}
              >
                <h3 className="text-xl font-semibold">{proy.nombre}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {proyectos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full transition-transform duration-300 ${
              currentSlide === idx ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}