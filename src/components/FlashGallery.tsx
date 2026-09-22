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
}: {
  flash: Flash;
  index: number;
  onOpen: () => void;
}) {
  const bookTo = `/book?flash=${encodeURIComponent(flash.title)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
    >
      <div className="group relative w-full aspect-square overflow-hidden bg-[#E8E4DF]">
        {/* Image : ouvre la lightbox */}
        <button
          onClick={onOpen}
          className="block w-full h-full text-left"
          aria-label={`View: ${flash.title}`}
        >
          {flash.image ? (
            <img
              src={flash.image}
              alt={flash.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center text-xs transition-transform duration-500 group-hover:scale-105 ${flash.available === 'taken' ? 'text-[#0D0D0D]/15' : 'text-[#0D0D0D]/20'}`}>
              [ {flash.title} ]
            </div>
          )}
        </button>

        {/* Badge */}
        {flash.available === 'taken' ? (
          <span className="pointer-events-none absolute top-3 right-3 text-xs px-2 py-1 bg-[#1B2A4A]/20 text-[#1B2A4A]/60">
            Done
          </span>
        ) : flash.available === 'booked' ? (
          <span className="pointer-events-none absolute top-3 right-3 text-xs px-2 py-1 bg-[#C4607E]/80 text-white">
            Booked
          </span>
        ) : (
          <span className="pointer-events-none absolute top-3 right-3 text-xs px-2 py-1 bg-[#6B9AC4] text-white">
            Available
          </span>
        )}

        {/* Bouton Book au centre, au survol : desktop seulement */}
        {flash.available === 'available' && (
          <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <Link
              to={bookTo}
              className="pointer-events-none group-hover:pointer-events-auto bg-[#E8B4C4] text-[#0D0D0D] px-6 py-3 font-display text-sm hover:bg-[#dda5b5] transition-colors duration-200 flex items-center gap-2"
            >
              Book this flash
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}

        {/* Infos au survol */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0D0D0D]/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="font-display text-white text-lg font-light">{flash.title}</p>
          {flash.size && <p className="text-white/60 text-sm mt-1">{flash.size}</p>}
          {flash.notes && <p className="text-white/50 text-sm mt-0.5">{flash.notes}</p>}
        </div>
      </div>

      {/* Mobile : pas de survol, donc titre et lien de réservation sous l'image */}
      {flash.available === 'available' && (
        <div className="md:hidden mt-2 flex items-center justify-between gap-2">
          <p className="font-display text-sm text-[#0D0D0D] truncate">{flash.title}</p>
          <Link
            to={bookTo}
            className="shrink-0 text-sm text-[#C4607E] border-b border-[#C4607E] pb-0.5"
          >
            Book
          </Link>
        </div>
      )}
    </motion.div>
  );
}

function FlashSection({
  id,
  title,
  items,
  emptyText,
  onOpen,
}: {
  id?: string;
  title: string;
  items: Flash[];
  emptyText?: string;
  onOpen: (flash: Flash) => void;
}) {
  return (
    <div id={id} className="mb-16 last:mb-0 scroll-mt-24">
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-4xl md:text-5xl font-light">{title}</h2>
      </motion.div>

      {items.length === 0 && emptyText && (
        <p className="text-sm text-[#0D0D0D]/60">{emptyText}</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((flash, i) => (
          <FlashCard key={flash.title} flash={flash} index={i} onOpen={() => onOpen(flash)} />
        ))}
      </div>
    </div>
  );
}

export default function FlashGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const isOpen = (f: Flash) => f.available === 'available' || f.available === 'booked';
  const isOrnamental = (f: Flash) => f.category === 'ornamental';

  const classic = flashItems.filter((f) => isOpen(f) && !isOrnamental(f));
  const ornamental = flashItems.filter((f) => isOpen(f) && isOrnamental(f));
  const done = flashItems.filter((f) => f.available === 'taken');

  const allSlides = flashItems.map((f) => ({
    src: f.image || 'https://placehold.co/800x800/E8E4DF/0D0D0D?text=' + encodeURIComponent(f.title),
    alt: f.title,
  }));

  const open = (flash: Flash) => setLightboxIndex(flashItems.indexOf(flash));

  return (
    <>
      <FlashSection
        title="Flash Available now"
        items={classic}
        emptyText="No flash available right now. New designs are coming soon, follow along on Instagram."
        onOpen={open}
      />

      {/* Ornamental flash : section masquée s'il n'y en a aucun */}
      {ornamental.length > 0 && (
        <FlashSection id="ornamental-flash" title="Ornamental flash" items={ornamental} onOpen={open} />
      )}

      {done.length > 0 && <FlashSection title="Past work" items={done} onOpen={open} />}

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
