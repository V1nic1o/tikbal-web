import { useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import api from '../../services/api';
import stickerContacto from '../../assets/animations/contact.json';

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
    <section
      id="contacto"
      className="bg-[#f7f7f7] dark:bg-[#0B1229] py-20 px-4 md:px-10 transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-[#0b3e7a] to-[#5a7f8c] text-white px-6 md:px-12 py-12 flex flex-col md:flex-row gap-10 items-center">

        {/* Animación tipo sticker */}
        <motion.div
          className="w-full md:w-1/2 flex items-center justify-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
            <Lottie animationData={stickerContacto} loop className="w-full h-full" />
          </div>
        </motion.div>

        {/* Formulario */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">Contáctanos</h2>
            <div className="flex gap-4 text-xl">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:scale-110 transition text-[#E1306C] animate-bounce"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:scale-110 transition text-[#1877F2] animate-bounce [animation-delay:0.2s]"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="hover:scale-110 transition text-black animate-bounce [animation-delay:0.4s]"
              >
                <FaXTwitter />
              </a>
            </div>
          </motion.div>

          {/* Datos de contacto */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 text-white/90">
              <FaPhoneAlt />
              <span>+502 30367561</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <FaEnvelope />
              <span>tikbalagricultura@gmail.com</span>
            </div>
          </div>

          <motion.p
            className="text-white/80 text-base md:text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            ¿Tienes preguntas o deseas una propuesta personalizada? Llena el formulario y te responderemos pronto.
          </motion.p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={handleChange}
                placeholder="Nombre completo"
                className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
              <input
                type="email"
                name="correo"
                value={formulario.correo}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="w-full pl-12 pr-4 py-3 rounded-md bg-white/10 placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>

            <div className="relative">
              <FaCommentDots className="absolute left-4 top-4 text-white/70" />
              <textarea
                name="mensaje"
                value={formulario.mensaje}
                onChange={handleChange}
                placeholder="Tu mensaje..."
                rows="4"
                className="w-full pl-12 pr-4 pt-4 pb-4 rounded-md bg-white/10 placeholder-white/70 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-white text-[#0b3e7a] font-semibold py-3 px-6 rounded-md hover:opacity-90 transition"
            >
              {enviando ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </form>

          {/* Feedback */}
          {exito && (
            <p className="text-green-200 text-center mt-4">¡Mensaje enviado correctamente!</p>
          )}
          {error && (
            <p className="text-red-200 text-center mt-4">{error}</p>
          )}
        </div>
      </div>
    </section>
  );
}