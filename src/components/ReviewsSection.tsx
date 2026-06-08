import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'Sofia M.',
    location: 'Berlin',
    text: "The most delicate work I've ever seen on skin. Theo turned my idea into something that feels like it always belonged there.",
    date: 'March 2025',
  },
  {
    name: 'Léa R.',
    location: 'Paris',
    text: 'I traveled from Paris for this tattoo and I would do it again in a heartbeat. The attention to detail is unreal.',
    date: 'January 2025',
  },
  {
    name: 'Jonas K.',
    location: 'Berlin',
    text: 'A truly calm and precise experience. Theo has a rare ability to translate feeling into line. My botanical piece is everything.',
    date: 'November 2024',
  },
  {
    name: 'Ana V.',
    location: 'Madrid',
    text: "Fine-line done right, no bleeding, perfect healing, and the design itself is quietly stunning. Couldn't ask for more.",
    date: 'September 2024',
  },
];

export default function ReviewsSection() {
  return (
    <section className="bg-cream py-20 px-6 border-t border-ink/10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-display text-3xl md:text-4xl text-ink text-center mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          What people say
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              className="bg-rose/10 border border-rose/20 p-8 flex flex-col gap-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex gap-3 grow">
                <span className="text-8xl text-rouge/70 leading-none shrink-0 -mt-3" style={{ fontFamily: 'Georgia, serif' }}>"</span>
                <p className="text-ink text-base leading-relaxed">{r.text}</p>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <div>
                  <p className="font-display text-ink/40 text-xs">{r.name}</p>
                  <p className="text-ink/30 text-xs">{r.location}</p>
                </div>
                <p className="text-ink/25 text-xs">{r.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
