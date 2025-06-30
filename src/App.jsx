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

function Home() {
  return (
    <div className="bg-beige min-h-screen text-gray-800 font-sans">
      <Hero />
      <About />
      <Servicios />
      <Portafolio />
      <Contacto />
      <Footer />
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