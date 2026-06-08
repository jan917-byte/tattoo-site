import { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import PageTransition from '../components/PageTransition';
import { tattooItems, artItems, type Tattoo, type ArtPiece } from '../lib/cms';

function PortfolioCard({
  item,
  index,
  onOpen,
}: {
  item: Tattoo | ArtPiece;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      onClick={onOpen}
      className="group relative w-full aspect-square overflow-hidden bg-[#E8E4DF] text-left"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      aria-label={`View: ${item.title}`}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-xs tracking-widest text-[#0D0D0D]/20">
          [ {item.title} ]
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0D0D0D]/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="font-display text-white text-lg font-light">{item.title}</p>
        {'style' in item && item.style && (
          <p className="text-white/60 text-xs mt-1 capitalize">{item.style}</p>
        )}
        {'type' in item && item.type && (
          <p className="text-white/60 text-xs mt-1 capitalize">{item.type}</p>
        )}
      </div>
    </motion.button>
  );
}

export default function Art() {
  const [tattooLightboxIndex, setTattooLightboxIndex] = useState(-1);
  const [artLightboxIndex, setArtLightboxIndex] = useState(-1);

  const tattooSlides = tattooItems.map((t) => ({
    src: t.image || 'https://placehold.co/800x800/E8E4DF/0D0D0D?text=' + encodeURIComponent(t.title),
    alt: t.title,
  }));

  const artSlides = artItems.map((a) => ({
    src: a.image || 'https://placehold.co/800x800/E8E4DF/0D0D0D?text=' + encodeURIComponent(a.title),
    alt: a.title,
  }));

  return (
    <PageTransition>
      <section className="pt-36 pb-20 px-6 max-w-7xl mx-auto">
        <motion.h1
          className="font-display text-5xl md:text-7xl font-light text-[#0D0D0D] leading-tight mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Art & Sculpture
        </motion.h1>

        {/* Portfolio tatouages */}
        {tattooItems.length > 0 && (
          <div className="mb-24">
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-light">Portfolio</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {tattooItems.map((item, i) => (
                <PortfolioCard
                  key={item.title}
                  item={item}
                  index={i}
                  onOpen={() => setTattooLightboxIndex(i)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Art / Sculpture */}
        {artItems.length > 0 && (
          <div>
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-light">Sculpture & Peinture</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {artItems.map((item, i) => (
                <PortfolioCard
                  key={item.title}
                  item={item}
                  index={i}
                  onOpen={() => setArtLightboxIndex(i)}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      <Lightbox
        open={tattooLightboxIndex >= 0}
        close={() => setTattooLightboxIndex(-1)}
        index={tattooLightboxIndex}
        slides={tattooSlides}
        styles={{ root: { '--yarl__color_backdrop': 'rgba(13,13,13,0.95)' } }}
      />

      <Lightbox
        open={artLightboxIndex >= 0}
        close={() => setArtLightboxIndex(-1)}
        index={artLightboxIndex}
        slides={artSlides}
        styles={{ root: { '--yarl__color_backdrop': 'rgba(13,13,13,0.95)' } }}
      />
    </PageTransition>
  );
}
