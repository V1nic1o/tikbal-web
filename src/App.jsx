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

// ✅ Scroll al elemento con hash (ajustado para el header flotante)
function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          const yOffset = -100; // compensación por el header
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'auto' }); // sin animación
        }, 50);
      }
    }
  }, [location]);

  return null;
}

function Home() {
  return (
    <div className="bg-beige min-h-screen text-gray-800 font-sans">
      <Header />
      <Hero />
      <Servicios />
      <Portafolio />
      <About />
      <Contacto />
      <Footer />
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