import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/tattoo', label: 'Tattoo' },
  { to: '/art', label: 'Art' },
  { to: '/about', label: 'About' },
];

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);


  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          solid
            ? 'bg-[#F7F3EE] border-[#0D0D0D]/10 shadow-sm'
            : 'bg-[#F7F3EE]/95 border-[#0D0D0D]/8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}logo_sans.svg`}
              alt=""
              className="h-[14px] w-auto"
            />
            <span className="font-display text-sm text-[#0D0D0D]">
              mr.kloudy
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `text-sm transition-colors duration-200 ${
                      isActive ? 'text-[#C4607E]' : 'text-[#0D0D0D]/60 hover:text-[#0D0D0D]'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/mrkloudy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D0D0D]/50 hover:text-[#C4607E] transition-colors duration-200"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <Link
              to="/book"
              className="hidden md:inline-block text-sm px-5 py-2 bg-rose text-ink hover:bg-[#dda5b5] transition-colors duration-200"
            >
              Book now
            </Link>
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
              onClick={() => setIsMenuOpen(v => !v)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
            >
              <motion.span
                className="block w-5 h-px bg-ink"
                animate={isMenuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-5 h-px bg-ink"
                animate={isMenuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed top-16 left-0 right-0 z-40 bg-cream border-b border-ink/10 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } }}
          >
            <ul className="flex flex-col px-6 py-6 gap-5">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `font-display text-2xl font-light transition-colors duration-200 ${
                        isActive ? 'text-rouge' : 'text-ink/60 hover:text-ink'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
