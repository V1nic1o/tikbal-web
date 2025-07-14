// src/pages/TodosLosProyectos/TodosLosProyectos.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/Header/Header';
import Footer from '../../sections/Footer/Footer';
import WhatsAppBubble from '../WhatsAppBubble/WhatsAppBubble';

import {
  FaMapMarkerAlt,
  FaLeaf,
  FaEye,
  FaSpinner,
} from 'react-icons/fa';

export default function TodosLosProyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.get('/proyectos')
      .then((res) => {
        setProyectos(res.data);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setCargando(false);
      });
  }, []);

  return (
    <>
      <Header redireccionarConHash />

      <section className="pt-28 px-4 sm:px-6 md:px-16 pb-20 bg-white dark:bg-[#0B1229] transition-colors duration-700 min-h-screen font-sans">
        {/* ✅ Título y subtítulo adaptado estilo Hero */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#0F172A] dark:text-white mb-4">
            Todos los Proyectos
          </h1>
          <p className="text-lg text-[#334155] dark:text-white/70 max-w-2xl mx-auto font-normal leading-relaxed">
            Explora a detalle cada uno de nuestros proyectos. Todos reflejan nuestra pasión por el diseño natural, funcional y sostenible.
          </p>
        </div>

        {/* Loader */}
        {cargando ? (
          <div className="flex justify-center items-center h-60">
            <FaSpinner className="animate-spin text-4xl text-[#4F46E5]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {proyectos.map((proy) => (
              <div
                key={proy.id}
                className="flex flex-col rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl bg-white dark:bg-[#101C3D] transition-all duration-300 group"
              >
                <Link to={`/proyecto/${proy.id}`}>
                  <img
                    src={proy.imagenes?.[0] || '/fallback.jpg'}
                    alt={proy.nombre}
                    className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-col justify-between flex-1 p-6">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#0F172A] dark:text-white mb-2">
                      <FaLeaf className="inline-block mr-2 text-green-600" />
                      {proy.nombre}
                    </h2>
                    <p className="text-sm text-[#475569] dark:text-white/70 flex items-center gap-2 mb-4">
                      <FaMapMarkerAlt className="text-[#4F46E5]" />
                      {proy.ubicacion}
                    </p>
                  </div>

                  <Link
                    to={`/proyecto/${proy.id}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4F46E5] to-[#6366F1] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:scale-105 transition-transform duration-300"
                  >
                    <FaEye /> Ver más
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="bg-white dark:bg-[#0B1229] transition-colors duration-700">
        <Footer />
      </div>

      <WhatsAppBubble />
    </>
  );
}