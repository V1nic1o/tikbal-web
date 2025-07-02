import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppBubble() {
  const numero = '30367561';
  const mensaje = 'Hola, estoy interesado en sus servicios de jardinería. ¿Podrían brindarme más información?';

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex flex-col items-center"
      aria-label="Contáctanos por WhatsApp"
    >
      {/* 🗨️ Mensaje arriba */}
      <div className="mb-2 px-4 py-1 text-xs sm:text-sm text-white bg-green-600 rounded-full shadow-lg animate-fade-in-out">
        ¡Contáctanos!
      </div>

      {/* 🟢 Burbuja de mensaje animada */}
      <div className="relative">
        {/* Pulso animado detrás */}
        <span className="absolute inset-0 rounded-full bg-green-500 opacity-70 animate-ping z-[-1]"></span>

        {/* Icono visible */}
        <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300">
          <FaWhatsapp className="text-2xl" />
        </div>
      </div>

      {/* 🎨 Animaciones personalizadas */}
      <style >{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; transform: translateY(6px); }
          50% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out infinite;
        }
      `}</style>
    </a>
  );
}