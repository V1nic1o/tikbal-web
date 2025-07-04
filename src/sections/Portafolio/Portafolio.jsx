import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { FaChevronLeft, FaChevronRight, FaFolderOpen } from 'react-icons/fa';

export default function Portafolio() {
  const [proyectos, setProyectos] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: 'snap',
    slides: {
      perView: 1,
      spacing: 0,
    },
    defaultAnimation: {
      duration: 700,
      easing: (t) => t,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    api
      .get('/proyectos')
      .then((res) => {
        setProyectos(res.data);
        setTimeout(() => {
          instanceRef.current?.update();
        }, 150);
      })
      .catch(console.error);
  }, []);

  const moverASlide = (dir) => {
    if (instanceRef.current) {
      dir === 'prev' ? instanceRef.current.prev() : instanceRef.current.next();
    }
  };

  return (
    <section
      id="portafolio"
      className="relative bg-white py-20 px-4 sm:px-6 md:px-16 text-center scroll-mt-[110px]"
    >
      {/* Fondo decorativo opcional */}
      <div className="absolute inset-0 bg-[url('/textura-fondo.jpg')] bg-cover bg-center opacity-5 pointer-events-none"></div>

      <h2 className="text-4xl md:text-6xl font-extrabold text-[#0b3e7a] drop-shadow-sm mb-4 relative z-10">
        Nuestro Portafolio
      </h2>
      <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-800 mb-12 px-2 relative z-10">
        Hemos trabajado con clientes que comparten nuestra visión de sostenibilidad y belleza natural.
      </p>

      <div className="relative max-w-6xl mx-auto z-10">
        {proyectos.length > 0 && (
          <div ref={sliderRef} className="keen-slider">
            {proyectos.map((proy) => (
              <div
                key={proy.id}
                className="keen-slider__slide slide-custom relative rounded-3xl overflow-hidden group shadow-lg"
              >
                <Link to={`/proyecto/${proy.id}`} className="block relative w-full h-[55vh] sm:h-[70vh]">
                  <img
                    src={proy.imagenes?.[0] || '/fallback.jpg'}
                    alt={proy.nombre}
                    className="w-full h-full object-cover absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-between px-8 py-6 z-10">
                    <div className="flex items-start gap-3">
                      <figure className="w-8 h-8 bg-white rounded-full shadow-md"></figure>
                      <figure
                        className="h-8 bg-no-repeat bg-contain"
                        style={{
                          backgroundImage: `url(${proy.logo || '/logo-placeholder.png'})`,
                          width: '170px',
                        }}
                      ></figure>
                    </div>

                    <div className="text-left">
                      <h3 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
                        {proy.nombre}
                      </h3>
                      <div className="inline-block bg-white text-primary font-semibold px-6 py-3 rounded-full text-lg hover:scale-105 transition-transform shadow-lg">
                        Ver proyecto
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Botones de navegación */}
        <button
          onClick={() => moverASlide('prev')}
          title="Proyecto anterior"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-primary border border-gray-300 hover:bg-gray-100 rounded-full p-3 shadow-md z-20"
        >
          <FaChevronLeft className="text-lg" />
        </button>
        <button
          onClick={() => moverASlide('next')}
          title="Siguiente proyecto"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-primary border border-gray-300 hover:bg-gray-100 rounded-full p-3 shadow-md z-20"
        >
          <FaChevronRight className="text-lg" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-8 gap-3 z-10 relative">
        {proyectos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-4 h-4 rounded-full transition-transform duration-300 ${
              currentSlide === idx
                ? 'bg-[#0b3e7a] scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Ver todos */}
      <div className="mt-12 flex justify-center z-10 relative">
        <Link
          to="/proyectos"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0b3e7a] to-[#5a7f8c] text-white px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform text-lg font-semibold"
        >
          <FaFolderOpen className="text-xl" />
          Ver todos los proyectos
        </Link>
      </div>
    </section>
  );
}