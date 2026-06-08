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
        <Link to="/" className="flex items-center gap-2">
          <img
            src={`${import.meta.env.BASE_URL}logo_sans.svg`}
            alt=""
            className="h-[14px] w-auto"
          />
          <span className="font-display text-sm text-[#0D0D0D] tracking-widest">
            mr.kloudy
          </span>
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

        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/mrkloudy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0D0D0D]/50 hover:text-[#C4607E] transition-colors duration-200"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <Link
            to="/book"
            className="text-sm tracking-widest px-5 py-2 bg-rose text-ink hover:bg-[#dda5b5] transition-colors duration-200"
          >
            Book now
          </Link>
        </div>
      </div>
    </nav>
  );
}
