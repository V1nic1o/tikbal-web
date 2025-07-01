// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Servicios from './sections/Servicios/Servicios';
import Portafolio from './sections/Portafolio/Portafolio';
import Contacto from './sections/Contacto/Contacto';
import Footer from './sections/Footer/Footer';
import ProyectoDetalle from './pages/ProyectoDetalle/ProyectoDetalle';

import './index.css';
import WhatsAppBubble from './pages/WhatsAppBubble/WhatsAppBubble';
import Header from './components/Header/Header';

function Home() {
  return (
    <div className="bg-beige min-h-screen text-gray-800 font-sans">
      <Header/>
      <Hero />
      <Servicios />
      <Portafolio />
      <About />
      <Contacto />
      <Footer />
      <WhatsAppBubble/>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyecto/:id" element={<ProyectoDetalle />} />
      </Routes>
    </Router>
  );
}