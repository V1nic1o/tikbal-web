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
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contáctanos por WhatsApp"
    >
      {/* Efecto de pulso */}
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping z-[-1]"></span>

      {/* Ícono visible */}
      <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300">
        <FaWhatsapp className="text-2xl" />
      </div>
    </a>
  );
}