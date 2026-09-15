import { motion } from 'framer-motion';

const reviews = [
  {
    text: "The tattoo artist is truly talented, professional and caring. The welcome was excellent too: we felt at ease right away. I highly recommend this tattoo studio, you can go with your eyes closed! ✨",
  },
  {
    text: "My friend and I stumbled on this tattoo shop by chance, we wanted to get tattooed together. Needless to say we were not disappointed. Walk-ins are welcome, and we fell in love with Mr. Kloudy's work, especially one flash that really moved us. It was my friend's first tattoo and Théo was very gentle and reassuring. Flawless work and a wonderful person! We highly recommend!",
  },
  {
    text: "I got tattooed by Theo on a whim :) Everything was perfect, the communication over WhatsApp was excellent and I felt completely at ease in the studio. A huge thank you for this incredible work :)",
  },
  {
    text: "Dear Theo, I want to thank you again for the wonderful session and your support. As I said, I was especially moved yesterday. That is not something to take for granted. I look forward to the next time with you.",
  },
  {
    text: "Came all the way from Switzerland to get tattooed by the talented Mr. Kloudy. Always a pleasure and a great job, thank youuuu ☺️",
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
              key={i}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
