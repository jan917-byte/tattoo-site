import { motion } from 'framer-motion';

const reviews = [
  {
    text: "Le tatoueur est vraiment talentueux, professionnel et attentionné. L'accueil était également excellent : nous nous sommes tout de suite senties à l'aise. Je recommande vivement ce salon de tatouage, vous pouvez y aller les yeux fermés ! ✨",
  },
  {
    text: "Nous sommes tombées par hasard sur ce tattoo shop avec mon amie, nous voulions nous faire un tatouage ensemble. Autant dire que nous n'avons pas été déçues, walk-in acceptés, nous avons flashé sur le travail de Mr. Kloudy et en particulier un flash qui nous a beaucoup touché. C'était le premier tatouage de mon amie et Théo a été très doux et rassurant, travail impeccable et super chouette personne ! Nous recommandons vivement !",
  },
  {
    text: "Je me suis fait tatouer par Theo sur un coup de tête :) Tout était parfait, la communication via WhatsApp était excellente et je me suis sentie totalement à l'aise au studio. Un grand merci pour ce travail incroyable :)",
  },
  {
    text: 'Lieber Theo, ich möchte mich nochmal für die tolle Session und deine Unterstützung bedanken. Wie gesagt, war ich gestern besonders emotional berührt. Das ist nicht selbstverständlich. Ich freue mich auf das nächste Mal bei dir.',
  },
  {
    text: 'Venu depuis la Suisse pour se faire tatouer par le talentueux Mr.Kloudy. Toujours un plaisir et un super job, merciiiii ☺️',
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
