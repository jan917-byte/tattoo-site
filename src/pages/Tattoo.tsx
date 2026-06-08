import { motion } from 'framer-motion';
import WayCard from '../components/WayCard';
import FlashGallery from '../components/FlashGallery';
import PageTransition from '../components/PageTransition';

const ways = [
  {
    title: 'Flash',
    description:
      'A flash is chosen and tattooed only once. Each design is an original piece — when it\'s gone, it\'s gone. Browse the available flashes above.',
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

export default function Tattoo() {
  return (
    <PageTransition>
      {/* Page intro */}
      <section className="pt-36 pb-16 px-6 max-w-7xl mx-auto">
        <motion.h1
          className="font-display text-5xl md:text-7xl font-light text-[#0D0D0D] leading-tight max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Flash & work
        </motion.h1>
      </section>

      {/* Gallery — Flash available + already done */}
      <section className="bg-[#F0EBE4] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <FlashGallery />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-[#0D0D0D]/10 mt-0" />
      </div>

      {/* How we work together */}
      <section className="px-6 max-w-7xl mx-auto pt-20 pb-8">
        <motion.h2
          className="font-display text-4xl md:text-6xl font-light text-[#0D0D0D] leading-tight max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Three ways<br />to get your tattoo
        </motion.h2>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-28">
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
    </PageTransition>
  );
}
