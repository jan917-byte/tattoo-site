import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { flashItems, type Flash } from '../lib/cms';

function FlashCard({
  flash,
  index,
  onOpen,
  done,
}: {
  flash: Flash;
  index: number;
  onOpen: () => void;
  done?: boolean;
}) {
  return (
    <motion.button
      onClick={onOpen}
      className="group relative w-full aspect-square overflow-hidden bg-[#E8E4DF] text-left"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      aria-label={`View: ${flash.title}`}
    >
      {/* Image */}
      {flash.image ? (
        <img
          src={flash.image}
          alt={flash.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center text-xs tracking-widest transition-transform duration-500 group-hover:scale-105 ${done ? 'text-[#0D0D0D]/15' : 'text-[#0D0D0D]/20'}`}>
          [ {flash.title} ]
        </div>
      )}

      {/* Badge */}
      {done ? (
        <span className="absolute top-3 right-3 text-[10px] tracking-widest px-2 py-1 bg-[#1B2A4A]/20 text-[#1B2A4A]/60">
          Done
        </span>
      ) : (
        <span className="absolute top-3 right-3 text-[10px] tracking-widest px-2 py-1 bg-[#1B2A4A] text-white">
          Available
        </span>
      )}

      {/* Info on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0D0D0D]/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="font-display text-white text-lg font-light">{flash.title}</p>
        {flash.size && <p className="text-white/60 text-xs mt-1">{flash.size}</p>}
        {flash.notes && <p className="text-white/50 text-xs mt-0.5">{flash.notes}</p>}
        {!done && (
          <Link
            to={`/book?flash=${encodeURIComponent(flash.title)}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 mt-3 text-[10px] tracking-[0.2em] text-white/80 border-b border-white/40 hover:text-white hover:border-white transition-colors duration-200"
          >
            Book this flash
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        )}
      </div>
    </motion.button>
  );
}

export default function FlashGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const available = flashItems.filter((f) => f.available === 'available');
  const done = flashItems.filter((f) => f.available === 'taken');

  const allSlides = flashItems.map((f) => ({
    src: f.image || 'https://placehold.co/800x800/E8E4DF/0D0D0D?text=' + encodeURIComponent(f.title),
    alt: f.title,
  }));

  return (
    <>
      {/* Available flash */}
      <div className="mb-16">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-light">Flash Available now</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {available.map((flash, i) => (
            <FlashCard
              key={flash.title}
              flash={flash}
              index={i}
              onOpen={() => setLightboxIndex(flashItems.indexOf(flash))}
            />
          ))}
        </div>
      </div>

      {/* Already done */}
      {done.length > 0 && (
        <div>
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-light">Past work</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {done.map((flash, i) => (
              <FlashCard
                key={flash.title}
                flash={flash}
                index={i}
                onOpen={() => setLightboxIndex(flashItems.indexOf(flash))}
                done
              />
            ))}
          </div>
        </div>
      )}

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={allSlides}
        styles={{ root: { '--yarl__color_backdrop': 'rgba(13,13,13,0.95)' } }}
      />
    </>
  );
}
