import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WayCard from '../components/WayCard';
import FlashGallery from '../components/FlashGallery';
import PageTransition from '../components/PageTransition';
import { tattooItems } from '../lib/cms';

const PLACEHOLDERS_PER_BATCH = 8;

const ways = [
  {
    title: 'Flash',
    description:
      'A flash is chosen and tattooed only once. Each design is an original piece. When it\'s gone, it\'s gone.',
    cta: { label: 'See available flashes', scrollTo: 'flash-gallery' },
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

function RecentWorkCard({ item, index }: { item: { title: string; image: string; style?: string } | null; index: number }) {
  return (
    <motion.div
      className="group relative w-full aspect-square overflow-hidden bg-[#E8E4DF]"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
    >
      {item?.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[10px] text-[#0D0D0D]/20 border border-dashed border-[#0D0D0D]/10">
          {item ? `[ ${item.title} ]` : '[  ]'}
        </div>
      )}

      {item && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0D0D0D]/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="font-display text-white text-lg font-light">{item.title}</p>
          {item.style && (
            <p className="text-white/60 text-xs mt-1 capitalize">{item.style}</p>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function Tattoo() {
  const [extraBatches, setExtraBatches] = useState(0);

  const placeholders = Array.from(
    { length: extraBatches * PLACEHOLDERS_PER_BATCH },
    () => null
  );

  const allItems: ({ title: string; image: string; style?: string } | null)[] = [
    ...tattooItems,
    ...placeholders,
  ];

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

      {/* Flash gallery */}
      <section id="flash-gallery" className="bg-[#F0EBE4] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <FlashGallery />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-[#0D0D0D]/10 mt-0" />
      </div>

      {/* Recent work */}
      <section className="px-6 max-w-7xl mx-auto pt-20 pb-20">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-light text-[#0D0D0D]">
            Recent work
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence initial={false}>
            {allItems.map((item, i) => (
              <RecentWorkCard key={i} item={item} index={i} />
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={() => setExtraBatches((n) => n + 1)}
            className="font-display text-sm border border-[#0D0D0D]/30 text-[#0D0D0D] px-10 py-3.5 hover:border-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#F7F3EE] transition-all duration-300"
          >
            Show more
          </button>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-[#0D0D0D]/10" />
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
