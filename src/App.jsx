import { useEffect } from 'react';
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
    <div className="overflow-y-auto scroll-smooth">
      <Header />
      
      <section id="hero" className="min-h-screen">
        <Hero />
      </section>

      <section id="servicios" className="min-h-screen">
        <Servicios />
      </section>

      <section id="portafolio" className="min-h-screen">
        <Portafolio />
      </section>

      <section id="about" className="min-h-screen">
        <About />
      </section>

      <section id="contacto" className="min-h-screen">
        <Contacto />
      </section>

      {/* ✅ Corregido: el footer ahora usa altura automática */}
      <section id="footer" className="py-10">
        <Footer />
      </section>

      <WhatsAppBubble />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToHashElement />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyecto/:id" element={<ProyectoDetalle />} />
        <Route path="/proyectos" element={<TodosLosProyectos />} />
      </Routes>
    </Router>
  );
}