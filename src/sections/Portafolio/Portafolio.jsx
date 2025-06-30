// src/sections/Portafolio/Portafolio.jsx
import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../../services/api';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Portafolio() {
  const [proyectos, setProyectos] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation();
  const keenSliderRef = useRef(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: 'snap',
    renderMode: 'performance',
    slides: {
      origin: 'center',
      perView: 1,
      spacing: 0,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 1, spacing: 0 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // ⏱️ Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 10000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  // 🔄 Cargar proyectos
  useEffect(() => {
    api.get('/proyectos')
      .then((res) => setProyectos(res.data))
      .catch((err) => console.error('Error al cargar proyectos', err));
  }, []);

  // 🧼 Reinicializar slider al volver desde otra ruta
  useEffect(() => {
    if (keenSliderRef.current) {
      keenSliderRef.current.destroy?.();
    }
  }, [location.pathname]);

  const moverASlide = (dir) => {
    if (!instanceRef.current) return;
    dir === 'prev'
      ? instanceRef.current.prev()
      : instanceRef.current.next();
  };

  return (
    <section id="portafolio" className="bg-beige py-20 px-6 md:px-16 text-center">
      <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
        Nuestro Portafolio
      </h2>

      <p className="max-w-3xl mx-auto text-lg text-gray-700 mb-12">
        Hemos trabajado con clientes que comparten nuestra visión de sostenibilidad y belleza natural. Estos son algunos de los proyectos destacados:
      </p>

      <div className="relative max-w-6xl mx-auto">
        {/* Slider */}
        <div ref={(ref) => { sliderRef(ref); keenSliderRef.current = ref; }} className="keen-slider">
          {proyectos.map((proy) => (
            <div
              key={proy.id}
              className="keen-slider__slide relative overflow-hidden rounded-xl group"
            >
              <Link to={`/proyecto/${proy.id}`} className="block h-full w-full">
                <img
                  src={proy.imagenes?.[0]}
                  alt={proy.nombre}
                  className="w-full h-[70vh] object-contain sm:object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={
                  `absolute inset-0 flex items-center justify-center text-white text-center px-4 transition-opacity duration-300
                   bg-black/40 backdrop-blur-sm sm:opacity-0 sm:group-hover:opacity-100`
                }>
                  <h3 className="text-xl font-semibold">{proy.nombre}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Flechas */}
        <button
          onClick={() => moverASlide('prev')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-3 text-primary hover:bg-gray-100 transition z-10"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => moverASlide('next')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-3 text-primary hover:bg-gray-100 transition z-10"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Dots */}
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