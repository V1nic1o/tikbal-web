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

      <section className="pt-28 px-6 md:px-16 pb-20 bg-white min-h-screen">
        <h1 className="text-3xl md:text-5xl font-bold text-primary text-center mb-6">
          Todos los Proyectos
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Explora a detalle cada uno de nuestros proyectos. Todos reflejan nuestra pasión por el diseño natural, funcional y sostenible.
        </p>

        {cargando ? (
          <div className="flex justify-center items-center h-60">
            <FaSpinner className="animate-spin text-3xl text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectos.map((proy) => (
              <div
                key={proy.id}
                className="flex flex-col rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white group"
              >
                <Link to={`/proyecto/${proy.id}`}>
                  <img
                    src={proy.imagenes?.[0] || '/fallback.jpg'}
                    alt={proy.nombre}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="flex flex-col justify-between flex-1 p-5">
                  <div>
                    <h2 className="text-xl font-semibold text-primary mb-2">
                      <FaLeaf className="inline-block mr-2 text-green-600" />
                      {proy.nombre}
                    </h2>
                    <p className="text-sm text-gray-600 flex items-center gap-1 mb-4">
                      <FaMapMarkerAlt className="text-primary" />
                      {proy.ubicacion}
                    </p>
                  </div>

                  <Link
                    to={`/proyecto/${proy.id}`}
                    className="mt-auto inline-flex items-center gap-2 bg-gradient-to-r from-[#0b3e7a] to-[#5a7f8c] text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300"
                  >
                    <FaEye /> Ver más
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
      <WhatsAppBubble />
    </>
  );
}