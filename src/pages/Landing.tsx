import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideoHero from '../components/VideoHero';
import WayCard from '../components/WayCard';
import PageTransition from '../components/PageTransition';
import { flashItems, tattooItems } from '../lib/cms';

const ways = [
  {
    title: 'Flash',
    description:
      "A flash is chosen and tattooed only once. Each design is an original piece. When it's gone, it's gone.",
    cta: { label: 'See available flash', to: '/tattoo' },
  },
  {
    title: 'Project',
    description:
      'You can send your ideas in the request form and the artist will draw your wishes. Perfect for custom, personal pieces built around your vision.',
    cta: { label: 'Send a request', to: '/book' },
  },
  {
    title: 'Freehand',
    description:
      'You can send references or inspiration and the artist prepares a plan, then draws directly on the skin. Organic, alive, unique.',
    cta: { label: 'Send a request', to: '/book' },
  },
];

const recentWork = tattooItems.filter((t) => t.show_on_homepage !== false).slice(0, 4);
const availableFlash = flashItems.filter((f) => f.available === 'available' && f.show_on_homepage !== false).slice(0, 4);

function PreviewCard({
  title,
  image,
  size,
  notes,
  badge,
  index,
  done,
  bookTo,
}: {
  title: string;
  image?: string;
  size?: string;
  notes?: string;
  badge?: string;
  index: number;
  done?: boolean;
  bookTo?: string;
}) {
  return (
    <motion.div
      className="group relative aspect-square overflow-hidden bg-[#E8E4DF]"
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center text-xs transition-transform duration-500 group-hover:scale-105 ${done ? 'text-[#0D0D0D]/15' : 'text-[#0D0D0D]/20'}`}>
          [ {title} ]
        </div>
      )}

      {badge && (
        <span className={`absolute top-3 right-3 text-[10px] px-2 py-1 ${done ? 'bg-[#1B2A4A]/20 text-[#1B2A4A]/60' : 'bg-[#6B9AC4] text-white'}`}>
          {badge}
        </span>
      )}

      {/* Book button, center */}
      {bookTo && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={bookTo}
            className="bg-[#E8B4C4] text-[#0D0D0D] px-6 py-3 font-display text-sm hover:bg-[#dda5b5] transition-colors duration-200 flex items-center gap-2"
          >
            Book this flash
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0D0D0D]/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="font-display text-white text-lg font-light">{title}</p>
        {size && <p className="text-white/60 text-xs mt-1">{size}</p>}
        {notes && <p className="text-white/50 text-xs mt-0.5">{notes}</p>}
      </div>
    </motion.div>
  );
}

export default function Landing() {
  return (
    <PageTransition>
      <VideoHero />

      {/* Recent works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-end justify-between mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-light">Recent works</h2>
            </div>
            <Link
              to="/tattoo"
              className="hidden md:flex items-center gap-2 text-xs text-[#0D0D0D]/40 hover:text-[#C4607E] transition-colors duration-200"
            >
              See all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {recentWork.map((work, i) => (
              <PreviewCard
                key={work.title}
                title={work.title}
                image={work.image}
                index={i}
              />
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/tattoo"
              className="text-xs border-b border-[#C4607E] text-[#C4607E] pb-0.5"
            >
              See all work
            </Link>
          </div>
        </div>
      </section>

      {/* Available flash */}
      <section className="bg-[#F0EBE4] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-end justify-between mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-light">Flash Available now</h2>
            </div>
            <Link
              to="/tattoo"
              className="hidden md:flex items-center gap-2 text-xs text-[#0D0D0D]/40 hover:text-[#C4607E] transition-colors duration-200"
            >
              View all flash
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableFlash.map((flash, i) => (
              <PreviewCard
                key={flash.title}
                title={flash.title}
                image={flash.image}
                size={flash.size}
                badge="Available"
                index={i}
                bookTo={`/book?flash=${encodeURIComponent(flash.title)}`}
              />
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/tattoo"
              className="text-xs border-b border-[#C4607E] text-[#C4607E] pb-0.5"
            >
              View full collection
            </Link>
          </div>
        </div>
      </section>

      {/* How we work together */}
      <section className="pt-24 pb-8 px-6 max-w-7xl mx-auto">
        <motion.h2
          className="font-display text-5xl md:text-7xl font-light text-[#0D0D0D] leading-tight max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Three ways<br />to work together
        </motion.h2>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-24">
        {ways.map((way, i) => (
          <WayCard
            key={way.title}
            index={i}
            title={way.title}
            description={way.description}
            cta={way.cta}
          />
        ))}
        <div className="border-t border-[#0D0D0D]/10" />
      </section>

      {/* Art gateway */}
      <Link
        to="/art"
        className="group relative flex h-[50vh] overflow-hidden items-end"
      >
        <div className="absolute inset-0 bg-[#1B2A4A] transition-transform duration-700 group-hover:scale-105">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/15 text-sm">[ Image placeholder ]</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-transparent transition-opacity duration-500 group-hover:from-[#0D0D0D]/60" />
        <div className="absolute bottom-0 left-0 w-full h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-[#E8B4C4]" />
        <motion.div
          className="relative z-10 p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display text-5xl md:text-6xl text-white font-light group-hover:text-white/90 transition-colors">
            Art & Sculpture
          </p>
          <p className="text-white/40 text-xs mt-4 flex items-center gap-2">
            Explore
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </p>
        </motion.div>
      </Link>
    </PageTransition>
  );
}
