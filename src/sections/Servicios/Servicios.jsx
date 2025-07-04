import { useEffect, useState } from 'react';
import { FaSpinner, FaTimes } from 'react-icons/fa';
import api from '../../services/api';

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalServicio, setModalServicio] = useState(null); // Servicio activo en modal

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
    <section id="servicios" className="bg-white py-20 px-6 md:px-16 text-center relative">
      <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#003366] to-[#5a7f8c] bg-clip-text text-transparent mb-6">
        Nuestros Servicios
      </h2>

      <p className="max-w-3xl mx-auto text-lg text-gray-800 mb-12">
        Soluciones ecológicas para crear y cuidar tu jardín con calidad y conciencia.
      </p>

      {!cargando && servicios.length > 0 && (
        <div className="overflow-hidden py-6 mb-12 bg-white rounded-xl shadow-xl group">
          <div className="flex gap-6 px-4 animate-marquee group-hover:[animation-play-state:paused] w-max">
            {serviciosDuplicados.map((serv, i) =>
              serv.imagenes?.[0] ? (
                <div
                  key={i}
                  className="relative flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden shadow-lg bg-black/10 border border-gray-200"
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
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm mx-auto"
            >
              {servicio.imagenes?.[0] && (
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={servicio.imagenes[0]}
                  alt={servicio.nombre}
                />
              )}
              <div className="p-5 text-left">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {servicio.nombre}
                </h5>
                <p className="mb-3 font-normal text-gray-700 italic line-clamp-3">
                  {servicio.descripcion}
                </p>
                <button
                  onClick={() => setModalServicio(servicio)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-[#0b3e7a] rounded-lg hover:bg-[#0a3669] focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Leer más
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalServicio && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white max-w-2xl w-full rounded-xl shadow-2xl overflow-hidden relative animate-fade-in">
            <div className="relative">
              {/* Imagen más visible */}
              {modalServicio.imagenes?.[0] && (
                <img
                  src={modalServicio.imagenes[0]}
                  alt={modalServicio.nombre}
                  className="w-full h-[350px] object-cover"
                />
              )}
              {/* Botón cerrar blanco con fondo oscuro para visibilidad */}
              <button
                onClick={() => setModalServicio(null)}
                className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full"
                aria-label="Cerrar modal"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <div className="p-6 text-left max-h-[70vh] overflow-y-auto">
              <h3 className="text-3xl font-bold text-[#0b3e7a] mb-4">{modalServicio.nombre}</h3>
              <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                {modalServicio.descripcion}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}