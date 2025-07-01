export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0b3e7a] to-[#5a7f8c] text-white py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Logo y descripción */}
        <div>
          <h3 className="text-2xl font-bold mb-3">Tikb’al</h3>
          <p className="text-sm leading-relaxed text-white/80">
            Jardines ecológicos, diseño orgánico y soluciones sostenibles que respetan la naturaleza y embellecen tus espacios.
          </p>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contacto</h4>
          <ul className="space-y-1 text-sm">
            <li>Emilio Orozco</li>
            <li>
              <a
                href="tel:+50230367561"
                className="hover:text-terracota transition-colors duration-300"
              >
                +502 3036 7561
              </a>
            </li>
            <li>
              <a
                href="mailto:tikbalagricultura@gmail.com"
                className="hover:text-terracota transition-colors duration-300"
              >
                tikbalagricultura@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Navegación */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Navegación</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href="#nosotros"
                className="hover:text-terracota transition-colors duration-300"
              >
                Nosotros
              </a>
            </li>
            <li>
              <a
                href="#servicios"
                className="hover:text-terracota transition-colors duration-300"
              >
                Servicios
              </a>
            </li>
            <li>
              <a
                href="#portafolio"
                className="hover:text-terracota transition-colors duration-300"
              >
                Portafolio
              </a>
            </li>
            <li>
              <a
                href="#contacto"
                className="hover:text-terracota transition-colors duration-300"
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs mt-12 text-white/60">
        © {new Date().getFullYear()} Tikb’al. Todos los derechos reservados.
      </div>
    </footer>
  );
}