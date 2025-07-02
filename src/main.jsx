// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ✅ Redirigir al hash #hero si hay recarga o acceso directo con otra sección
if (window.location.pathname === '/' && window.location.hash && window.location.hash !== '#hero') {
  window.location.replace('/#hero');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)