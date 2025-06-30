import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import api from '../../services/api';

export default function Contacto() {
  const [formulario, setFormulario] = useState({ nombre: '', correo: '', mensaje: '' });
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setExito(false);
    setError(null);

    try {
      await api.post('/contacto', formulario);
      setExito(true);
      setFormulario({ nombre: '', correo: '', mensaje: '' });
    } catch (err) {
      setError('Ocurrió un error. Intenta nuevamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="contacto" className="bg-beige py-20 px-6 md:px-16">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-primary text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Contáctanos
      </motion.h2>

      <motion.p
        className="max-w-2xl mx-auto text-center text-lg text-gray-700 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        ¿Tienes preguntas o deseas una propuesta personalizada? Llena el siguiente formulario y te responderemos pronto.
      </motion.p>

      <form
        className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {/* Nombre */}
        <div className="relative">
          <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            placeholder="Nombre completo"
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary transition"
            required
          />
        </div>

        {/* Correo */}
        <div className="relative">
          <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="correo"
            value={formulario.correo}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary transition"
            required
          />
        </div>

        {/* Mensaje */}
        <div className="relative md:col-span-2">
          <FaCommentDots className="absolute left-4 top-4 text-gray-400" />
          <textarea
            name="mensaje"
            value={formulario.mensaje}
            onChange={handleChange}
            placeholder="Tu mensaje..."
            rows="5"
            className="w-full pl-12 pr-4 pt-4 pb-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary transition"
            required
          ></textarea>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={enviando}
          className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition md:col-span-2"
        >
          {enviando ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>

      {exito && (
        <p className="text-green-600 text-center mt-6">¡Mensaje enviado correctamente!</p>
      )}
      {error && (
        <p className="text-red-600 text-center mt-6">{error}</p>
      )}
    </section>
  );
}