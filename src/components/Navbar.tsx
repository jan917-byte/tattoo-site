import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        solid
          ? 'bg-[#F7F3EE] border-[#0D0D0D]/10 shadow-sm'
          : 'bg-[#F7F3EE]/95 border-[#0D0D0D]/8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-xl text-[#0D0D0D] tracking-widest"
        >
          {/* Replace with SVG logo */}
          mr.kloudy
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {[
            { to: '/tattoo', label: 'Tattoo' },
            { to: '/art', label: 'Art' },
            { to: '/about', label: 'About' },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `text-sm tracking-widest transition-colors duration-200 ${
                    isActive ? 'text-[#C4607E]' : 'text-[#0D0D0D]/60 hover:text-[#0D0D0D]'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/book"
          className="text-sm tracking-widest px-5 py-2 border border-[#C4607E] text-[#C4607E] hover:bg-[#C4607E] hover:text-white transition-colors duration-200"
        >
          Book now
        </Link>
      </div>
    </nav>
  );
}
