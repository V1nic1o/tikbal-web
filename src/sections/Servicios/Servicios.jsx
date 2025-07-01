// src/sections/Servicios/Servicios.jsx
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

  return (
    <section id="servicios" className="bg-gradient-to-b from-[#f2e8da] to-[#e5dbcb] py-20 px-6 md:px-16 text-center">
      <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#003366] to-[#5a7f8c] bg-clip-text text-transparent mb-6">
        Nuestros Servicios
      </h2>

      <p className="max-w-3xl mx-auto text-lg text-gray-800 mb-12">
        Te ofrecemos soluciones especializadas para cada etapa de tu jardín, desde su creación hasta su mantenimiento, siempre con insumos de alta calidad y compromiso ecológico.
      </p>

      {cargando ? (
        <div className="flex justify-center items-center h-40">
          <FaSpinner className="animate-spin text-primary text-3xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {servicios.map((servicio, index) => (
            <div
              key={servicio.id || index}
              className="bg-gradient-to-br from-[#ffffff] to-[#f5f0ea] border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]"
            >
              {servicio.imagenes?.[0] && (
                <img
                  src={servicio.imagenes[0]}
                  alt={servicio.nombre}
                  className="w-20 h-20 object-cover rounded-full mx-auto mb-4 border border-gray-300 shadow-sm"
                />
              )}
              <h3 className="text-xl font-bold bg-gradient-to-r from-[#003366] to-[#5a7f8c] bg-clip-text text-transparent mb-2">
                {servicio.nombre}
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {servicio.descripcion}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}