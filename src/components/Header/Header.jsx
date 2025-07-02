// src/components/Header/Header.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaLeaf,
  FaTools,
  FaImages,
  FaEnvelope,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

const AnimatedIcon = ({ children, delay = 0 }) => (
  <motion.span
    animate={{ y: [0, -4, 0] }}
    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay }}
    className="inline-block"
  >
    {children}
  </motion.span>
);

const navItems = [
  { id: '#servicios', label: 'Servicios', icon: <FaTools />, delay: 0 },
  { id: '#portafolio', label: 'Portafolio', icon: <FaImages />, delay: 0.2 },
  { id: '#nosotros', label: 'Nosotros', icon: <FaLeaf />, delay: 0.4 },
  { id: '#contacto', label: 'Contacto', icon: <FaEnvelope />, delay: 0.6 },
];

export default function Header({ redireccionarConHash = false }) {
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (redireccionarConHash) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      let found = false;
      for (const item of navItems) {
        const section = document.querySelector(item.id);
        if (section && scrollPosition >= section.offsetTop) {
          setActive(item.id);
          found = true;
        }
      }
      if (!found) setActive('#hero');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [redireccionarConHash]);

  const handleNavigation = (id) => {
    const target = document.querySelector(id);
    if (target && !redireccionarConHash) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(id);
      setMenuOpen(false);
    } else {
      window.location.href = `/${id}`;
    }
  };

  return (
    <>
      <header
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50
        bg-gradient-to-r from-[#0b3e7a] to-[#5a7f8c] text-white shadow-2xl
        backdrop-blur-md border border-white/20 rounded-full px-4 py-2
        flex items-center justify-between sm:justify-start gap-4 sm:gap-6
        text-sm font-medium w-[90%] sm:w-auto max-w-[95%] sm:max-w-max transition-colors duration-500"
      >
        {/* Logo Tikb’al */}
        <button
          onClick={() =>
            redireccionarConHash
              ? (window.location.href = '/#hero')
              : handleNavigation('#hero')
          }
          className={`font-bold text-white text-base sm:text-lg transition-all duration-300 px-2 py-1 rounded-md ${
            active === '#hero'
              ? 'bg-white/20 shadow-inner'
              : 'hover:text-white/80'
          }`}
        >
          Tikb’al
        </button>

        {/* Botón menú móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-white text-xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menú horizontal */}
        <nav className="hidden sm:flex items-center gap-4">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-300 relative ${
                active === item.id
                  ? 'bg-white/20 text-white font-semibold shadow-inner'
                  : 'hover:text-white/80'
              }`}
            >
              <AnimatedIcon delay={item.delay}>{item.icon}</AnimatedIcon>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="fixed top-20 right-6 z-40 w-[85%] max-w-sm bg-gradient-to-br from-[#0b3e7a] to-[#5a7f8c] text-white rounded-2xl shadow-2xl px-6 py-6 flex flex-col gap-4 animate-fadeIn">
          {[{ id: '#hero', label: 'Inicio', icon: <FaLeaf />, delay: 0 }, ...navItems].map(
            (item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex items-center gap-3 py-2 px-4 rounded-xl transition-all duration-300 text-left ${
                  active === item.id
                    ? 'bg-white/20 font-semibold shadow-inner'
                    : 'hover:bg-white/10'
                }`}
              >
                <AnimatedIcon delay={item.delay || idx * 0.2}>
                  {item.icon}
                </AnimatedIcon>
                <span>{item.label}</span>
              </button>
            )
          )}
        </div>
      )}
    </>
  );
}