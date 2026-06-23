import { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import PageTransition from '../components/PageTransition';
import PrintsShop from '../components/PrintsShop';
import { artItems, type ArtPiece } from '../lib/cms';
import { paypalLink, isPaypalConfigured } from '../lib/shop';

function DrawingCard({
  item,
  index,
  onView,
}: {
  item: ArtPiece;
  index: number;
  onView: () => void;
}) {
  const price = item.price ? Number(item.price) : 0;
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <button
        onClick={onView}
        className="block w-full aspect-square overflow-hidden bg-[#E8E4DF]"
        aria-label={`Voir : ${item.title}`}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </button>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-base font-light text-[#0D0D0D]">{item.title}</p>
          {item.details && (
            <p className="text-xs text-[#0D0D0D]/50 mt-0.5">{item.details}</p>
          )}
        </div>

        {item.for_sale && price > 0 && (
          <div className="shrink-0 text-right">
            <p className="font-display text-sm text-[#0D0D0D]">{price}€</p>
            <a
              href={isPaypalConfigured ? paypalLink(price) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!isPaypalConfigured}
              title={
                isPaypalConfigured
                  ? undefined
                  : 'Pseudo PayPal.me à configurer dans src/lib/shop.ts'
              }
              className={`inline-block mt-1 px-4 py-2 text-xs border transition-colors ${
                isPaypalConfigured
                  ? 'border-[#0D0D0D]/20 hover:border-[#C4607E] hover:text-[#C4607E]'
                  : 'border-[#0D0D0D]/10 text-[#0D0D0D]/30 pointer-events-none'
              }`}
            >
              Acheter
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Art() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const drawings = artItems.filter((a) => a.type === 'drawing');
  const prints = artItems.filter((a) => a.type === 'print');

  // Ordre global, partagé par la lightbox.
  const ordered: ArtPiece[] = [...drawings, ...prints];
  const printsBase = drawings.length;

  const slides = ordered.map((a) => ({
    src:
      a.image ||
      'https://placehold.co/800x800/E8E4DF/0D0D0D?text=' +
        encodeURIComponent(a.title),
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

        {drawings.length > 0 && (
          <div className="mb-24">
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-light">Originaux</h2>
              <p className="mt-3 text-sm text-[#0D0D0D]/60 max-w-xl">
                Dessins originaux encadrés, pièces uniques.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-8">
              {drawings.map((item, i) => (
                <DrawingCard
                  key={item.title}
                  item={item}
                  index={i}
                  onView={() => setLightboxIndex(i)}
                />
              ))}
            </div>
          </div>
        )}

        {prints.length > 0 && (
          <div>
            <PrintsShop
              prints={prints}
              baseIndex={printsBase}
              onView={(i) => setLightboxIndex(i)}
            />
          </div>
        )}
      </section>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        styles={{ root: { '--yarl__color_backdrop': 'rgba(13,13,13,0.95)' } }}
      />
    </PageTransition>
  );
}
