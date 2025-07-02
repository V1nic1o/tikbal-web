import { useEffect, useState } from 'react';
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

  const serviciosDuplicados = [...servicios, ...servicios];

  return (
    <section id="servicios" className="bg-gradient-to-b from-[#f2e8da] to-[#e5dbcb] py-20 px-6 md:px-16 text-center">
      <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#003366] to-[#5a7f8c] bg-clip-text text-transparent mb-6">
        Nuestros Servicios
      </h2>

      <p className="max-w-3xl mx-auto text-lg text-gray-800 mb-12">
        Soluciones ecológicas para crear y cuidar tu jardín con calidad y conciencia.
      </p>

      {!cargando && servicios.length > 0 && (
        <div className="overflow-hidden py-6 mb-12 bg-white/60 rounded-xl shadow-inner group">
          <div className="flex gap-6 px-4 animate-marquee group-hover:[animation-play-state:paused] w-max">
            {serviciosDuplicados.map((serv, i) =>
              serv.imagenes?.[0] ? (
                <div
                  key={i}
                  className="relative flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden shadow-md bg-black/10 border border-gray-300"
                >
                  <img
                    src={serv.imagenes[0]}
                    alt={serv.nombre}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-medium text-base px-4 text-center">
                    {serv.nombre}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {cargando ? (
        <div className="flex justify-center items-center h-40">
          <FaSpinner className="animate-spin text-primary text-3xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {servicios.map((servicio, index) => (
            <div
              key={servicio.id || index}
              className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg text-left hover:border-[#0b3e7a]/30 transition"
            >
              <div className="flex items-center gap-4 mb-4">
                {servicio.imagenes?.[0] && (
                  <img
                    src={servicio.imagenes[0]}
                    alt={servicio.nombre}
                    className="w-16 h-16 object-cover rounded-full border border-gray-300 shadow-sm"
                  />
                )}
                <h3 className="text-lg font-bold text-[#0b3e7a]">
                  {servicio.nombre}
                </h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed border-l-4 border-[#0b3e7a]/20 pl-4 italic">
                {servicio.descripcion}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}