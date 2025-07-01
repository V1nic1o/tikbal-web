import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaPhone,
  FaEnvelope,
  FaLeaf,
  FaUser
} from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0b3e7a] to-[#5a7f8c] text-white pt-16 pb-10 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo y descripción */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaLeaf className="text-white text-xl" />
            <h3 className="text-2xl font-bold">Tikb’al</h3>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            Diseño orgánico, ecológico y sostenible. Damos vida a tus espacios conectándolos con la naturaleza.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: 'Nosotros', link: '#nosotros' },
              { label: 'Servicios', link: '#servicios' },
              { label: 'Portafolio', link: '#portafolio' },
              { label: 'Contacto', link: '#contacto' }
            ].map(({ label, link }) => (
              <li key={link}>
                <a
                  href={link}
                  className="hover:underline hover:text-terracota transition-all duration-300"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contacto directo</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <FaUser /> Emilio Orozco
            </li>
            <li>
              <a
                href="tel:+50230367561"
                className="flex items-center gap-2 hover:text-terracota transition-all duration-300"
              >
                <FaPhone /> +502 3036 7561
              </a>
            </li>
            <li>
              <a
                href="mailto:tikbalagricultura@gmail.com"
                className="flex items-center gap-2 hover:text-terracota transition-all duration-300"
              >
                <FaEnvelope /> tikbalagricultura@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
          <div className="flex gap-4 items-center">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300 text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300 text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300 text-xl"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Línea divisora + derechos */}
      <div className="border-t border-white/20 mt-12 pt-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Tikb’al. Todos los derechos reservados.
      </div>
    </footer>
  );
}