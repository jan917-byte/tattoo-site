import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { aboutContent } from '../lib/cms';

export default function About() {
  const {
    page_title,
    photo,
    artist_title,
    bio,
    hygiene_title,
    hygiene_points,
    studio_title,
    studio_name,
    studio_address,
    faq_title,
    faq,
  } = aboutContent;

  return (
    <PageTransition>
      <section className="pt-36 pb-24 px-6 max-w-7xl mx-auto">
        <motion.h1
          className="font-display text-5xl md:text-7xl font-light text-[#0D0D0D] leading-tight mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {page_title}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            {photo ? (
              <img
                src={photo}
                alt={studio_name || artist_title}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover mb-8"
              />
            ) : (
              <div className="aspect-[3/4] bg-[#E8E4DF] flex items-center justify-center text-[#0D0D0D]/20 text-sm mb-8">
                [ Artist photo ]
              </div>
            )}
          </div>

          <div className="space-y-12">
            {bio && (
              <div>
                <h2 className="font-display text-2xl font-light mb-4">{artist_title}</h2>
                <p className="font-display text-[#0D0D0D]/60 leading-relaxed whitespace-pre-line">
                  {bio}
                </p>
              </div>
            )}

            {hygiene_points.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-light mb-4">{hygiene_title}</h2>
                <ul className="font-display text-[#0D0D0D]/60 space-y-2 text-base leading-relaxed">
                  {hygiene_points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {(studio_name || studio_address) && (
              <div>
                <h2 className="font-display text-2xl font-light mb-4">{studio_title}</h2>
                <address className="not-italic font-display text-[#0D0D0D]/60 text-base leading-relaxed whitespace-pre-line">
                  {[studio_name, studio_address].filter(Boolean).join('\n')}
                </address>
              </div>
            )}

            {faq.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-light mb-4">{faq_title}</h2>
                <div className="font-display space-y-6 text-base text-[#0D0D0D]/60">
                  {faq.map((entry) => (
                    <div key={entry.question}>
                      <p className="font-medium text-[#0D0D0D] mb-1">{entry.question}</p>
                      <p className="whitespace-pre-line">{entry.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
