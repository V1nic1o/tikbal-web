// src/components/Header.jsx
import { useEffect, useState } from 'react';
import {
  FaLeaf,
  FaTools,
  FaImages,
  FaEnvelope,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const navItems = [
  { id: '#nosotros', label: 'Nosotros', icon: <FaLeaf /> },
  { id: '#servicios', label: 'Servicios', icon: <FaTools /> },
  { id: '#portafolio', label: 'Portafolio', icon: <FaImages /> },
  { id: '#contacto', label: 'Contacto', icon: <FaEnvelope /> },
];

export default function Header() {
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const section = document.querySelector(item.id);
        if (section && scrollPosition >= section.offsetTop) {
          setActive(item.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* HEADER PRINCIPAL */}
      <header
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50
        bg-gradient-to-r from-[#0b3e7a] to-[#5a7f8c] text-white shadow-2xl
        backdrop-blur-md border border-white/20 rounded-full px-4 py-2
        flex items-center justify-between sm:justify-start gap-4 sm:gap-6
        text-sm font-medium w-[90%] sm:w-auto max-w-[95%] sm:max-w-max transition-colors duration-500"
      >
        <button
          onClick={() => scrollTo('#hero')}
          className="font-bold text-white text-base sm:text-lg hover:underline transition-colors"
        >
          Tikb’al
        </button>

        {/* Botón hamburguesa solo móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-white text-xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menú horizontal (PC) */}
        <nav className="hidden sm:flex items-center gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-300 relative
                ${active === item.id
                  ? 'bg-white/20 text-white font-semibold shadow-inner'
                  : 'hover:text-white/80'}
              `}
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Menú desplegable móvil */}
      {menuOpen && (
        <div className="fixed top-20 right-6 z-40 w-[85%] max-w-sm bg-gradient-to-br from-[#0b3e7a] to-[#5a7f8c] text-white rounded-2xl shadow-2xl px-6 py-6 flex flex-col gap-4 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-3 py-2 px-4 rounded-xl transition-all duration-300 text-left
                ${
                  active === item.id
                    ? 'bg-white/20 font-semibold shadow-inner'
                    : 'hover:bg-white/10'
                }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}