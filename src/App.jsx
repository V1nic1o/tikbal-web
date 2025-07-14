import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Servicios from './sections/Servicios/Servicios';
import Portafolio from './sections/Portafolio/Portafolio';
import Contacto from './sections/Contacto/Contacto';
import Footer from './sections/Footer/Footer';
import ProyectoDetalle from './pages/ProyectoDetalle/ProyectoDetalle';
import TodosLosProyectos from './pages/TodosLosProyectos/TodosLosProyectos';

import './index.css';
import WhatsAppBubble from './pages/WhatsAppBubble/WhatsAppBubble';
import Header from './components/Header/Header';

// ✅ Scroll automático al hash
function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          const yOffset = -100;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 50);
      }
    }
  }, [location]);

  return null;
}

function Home() {
  return (
    <>
      <Header />

      {/* ✅ Hero sí debe ocupar toda la pantalla */}
      <section id="hero" className="min-h-screen">
        <Hero />
      </section>

      {/* ✅ Servicios y Portafolio pueden mantenerse */}
      <section id="servicios" className="min-h-screen">
        <Servicios />
      </section>

      <section id="portafolio" className="min-h-screen">
        <Portafolio />
      </section>

      {/* ❌ Eliminado min-h-screen en secciones pequeñas */}
      <section id="about">
        <About />
      </section>

      <section id="contacto">
        <Contacto />
      </section>

      <section id="footer">
        <Footer />
      </section>

      <WhatsAppBubble />
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState('light');

  // ✅ Cargar preferencia desde localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);

  // ✅ Alternar tema (lo usaremos desde Header luego)
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className={`${theme}`}>
      <Router>
        <ScrollToHashElement />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyecto/:id" element={<ProyectoDetalle />} />
          <Route path="/proyectos" element={<TodosLosProyectos />} />
        </Routes>
      </Router>
    </div>
  );
}