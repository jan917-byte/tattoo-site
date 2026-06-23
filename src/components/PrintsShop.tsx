import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ArtPiece } from '../lib/cms';
import {
  printBundlePrice,
  printTiers,
  paypalLink,
  isPaypalConfigured,
} from '../lib/shop';

function PrintCard({
  item,
  index,
  qty,
  onView,
  onAdd,
  onRemove,
}: {
  item: ArtPiece;
  index: number;
  qty: number;
  onView: () => void;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
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

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="font-display text-base font-light text-[#0D0D0D]">{item.title}</p>

        {qty === 0 ? (
          <button
            onClick={onAdd}
            className="shrink-0 px-4 py-2 text-sm border border-[#0D0D0D]/20 hover:border-[#C4607E] hover:text-[#C4607E] transition-colors"
          >
            Ajouter
          </button>
        ) : (
          <div className="shrink-0 flex items-center border border-[#C4607E] text-[#C4607E]">
            <button
              onClick={onRemove}
              className="px-3 py-2 text-sm hover:bg-[#C4607E]/10 transition-colors"
              aria-label={`Retirer un ${item.title}`}
            >
              –
            </button>
            <span className="px-1 text-sm tabular-nums min-w-5 text-center">{qty}</span>
            <button
              onClick={onAdd}
              className="px-3 py-2 text-sm hover:bg-[#C4607E]/10 transition-colors"
              aria-label={`Ajouter un ${item.title}`}
            >
              +
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function PrintsShop({
  prints,
  baseIndex,
  onView,
}: {
  prints: ArtPiece[];
  baseIndex: number;
  onView: (globalIndex: number) => void;
}) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);

  const totalCount = Object.values(qty).reduce((a, b) => a + b, 0);
  const total = printBundlePrice(totalCount);

  const add = (title: string) =>
    setQty((prev) => ({ ...prev, [title]: (prev[title] ?? 0) + 1 }));
  const remove = (title: string) =>
    setQty((prev) => ({ ...prev, [title]: Math.max(0, (prev[title] ?? 0) - 1) }));

  const selected = prints.filter((p) => (qty[p.title] ?? 0) > 0);
  const orderSummary =
    `Commande prints (${totalCount}) : ` +
    selected.map((p) => `${qty[p.title]}x ${p.title}`).join(', ') +
    ` | Total ${total} EUR`;

  const handlePay = async () => {
    try {
      await navigator.clipboard.writeText(
        orderSummary + '\n\nAdresse de livraison :\n'
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch {
      /* clipboard indisponible : on ouvre quand même PayPal */
    }
    window.open(paypalLink(total), '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-4xl md:text-5xl font-light">Prints</h2>
        <p className="mt-3 text-sm text-[#0D0D0D]/60 max-w-xl">
          Tirages encre sur papier kraft. Composez librement : le prix dépend du
          nombre total de prints choisis.
        </p>
      </motion.div>

      {/* Grille tarifaire */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 mb-8 text-sm text-[#0D0D0D]/70">
        {printTiers.map((t) => (
          <span key={t.count}>
            {t.count} print{t.count > 1 ? 's' : ''} :{' '}
            <span className="text-[#0D0D0D]">{t.price}€</span>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-8">
        {prints.map((item, i) => (
          <PrintCard
            key={item.title}
            item={item}
            index={i}
            qty={qty[item.title] ?? 0}
            onView={() => onView(baseIndex + i)}
            onAdd={() => add(item.title)}
            onRemove={() => remove(item.title)}
          />
        ))}
      </div>

      {/* Barre panier sticky */}
      {totalCount > 0 && (
        <motion.div
          className="sticky bottom-4 z-30 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mx-auto max-w-3xl bg-[#F7F3EE] border border-[#0D0D0D]/15 shadow-lg shadow-[#0D0D0D]/5 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm text-[#0D0D0D]">
                {totalCount} print{totalCount > 1 ? 's' : ''} ·{' '}
                <span className="text-[#C4607E]">{total}€</span>
              </p>
              <p className="text-sm text-[#0D0D0D]/50 truncate">
                {selected.map((p) => `${qty[p.title]}× ${p.title}`).join(', ')}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {copied && (
                <span className="text-xs text-[#0D0D0D]/50">
                  Récap copié, collez-le dans la note PayPal
                </span>
              )}
              <button
                onClick={handlePay}
                disabled={!isPaypalConfigured}
                title={
                  isPaypalConfigured
                    ? undefined
                    : 'Pseudo PayPal.me à configurer dans src/lib/shop.ts'
                }
                className="px-6 py-3 bg-[#E8B4C4] text-[#0D0D0D] text-sm hover:bg-[#dda5b5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Régler sur PayPal
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
