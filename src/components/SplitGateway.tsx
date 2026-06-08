import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function GatewayPanel({
  to,
  label,
  sub,
  accent,
}: {
  to: string;
  label: string;
  sub: string;
  accent: string;
}) {
  return (
    <Link to={to} className="group relative flex-1 min-h-[50vh] md:min-h-[70vh] overflow-hidden flex items-end">
      {/* Placeholder image background */}
      <div className="absolute inset-0 bg-[#1B2A4A] transition-transform duration-700 group-hover:scale-105">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/15 text-sm tracking-widest">[ Image placeholder ]</span>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-transparent transition-opacity duration-500 group-hover:from-[#0D0D0D]/60`} />

      {/* Accent stripe on hover */}
      <div
        className="absolute bottom-0 left-0 w-full h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ backgroundColor: accent }}
      />

      {/* Text */}
      <motion.div
        className="relative z-10 p-8 md:p-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-white/50 text-xs tracking-[0.3em] mb-3">{sub}</p>
        <p className="font-display text-5xl md:text-6xl text-white font-light group-hover:text-white/90 transition-colors">{label}</p>
        <p className="text-white/40 text-xs tracking-widest mt-4 flex items-center gap-2">
          Explore
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </p>
      </motion.div>
    </Link>
  );
}

export default function SplitGateway() {
  return (
    <section className="flex flex-col md:flex-row w-full">
      <GatewayPanel
        to="/tattoo"
        label="Tattoo"
        sub="Fine-line botanical"
        accent="#C4607E"
      />
      <GatewayPanel
        to="/art"
        label="Art & Sculpture"
        sub="Original works"
        accent="#E8B4C4"
      />
    </section>
  );
}
