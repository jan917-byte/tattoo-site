import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export default function About() {
  return (
    <PageTransition>
      <section className="pt-36 pb-24 px-6 max-w-7xl mx-auto">
        <motion.h1
          className="font-display text-5xl md:text-7xl font-light text-[#0D0D0D] leading-tight mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          About
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            {/* Replace with real artist photo */}
            <div className="aspect-[3/4] bg-[#E8E4DF] flex items-center justify-center text-[#0D0D0D]/20 text-xs tracking-widest mb-8">
              [ Artist photo ]
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="font-display text-2xl font-light mb-4">The artist</h2>
              {/* Replace with real bio */}
              <p className="font-display text-[#0D0D0D]/60 leading-relaxed">
                [Artist bio placeholder. Describe background, training, style philosophy, what inspires the work.]
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light mb-4">Hygiene & safety</h2>
              <ul className="font-display text-[#0D0D0D]/60 space-y-2 text-sm leading-relaxed">
                <li>Single-use needles, sterile equipment</li>
                <li>Medical-grade aftercare instructions provided</li>
                <li>[Add specific studio certifications]</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light mb-4">Studio</h2>
              <address className="not-italic font-display text-[#0D0D0D]/60 text-sm leading-relaxed">
                Baby Berlin Tattoo Studio<br />
                Wipperstr. 14<br />
                12055 Berlin, DE
              </address>
            </div>

            <div>
              <h2 className="font-display text-2xl font-light mb-4">FAQ</h2>
              <div className="font-display space-y-6 text-sm text-[#0D0D0D]/60">
                <div>
                  <p className="font-medium text-[#0D0D0D] mb-1">How long does healing take?</p>
                  <p>[Answer placeholder]</p>
                </div>
                <div>
                  <p className="font-medium text-[#0D0D0D] mb-1">What are your rates?</p>
                  <p>[Answer placeholder]</p>
                </div>
                <div>
                  <p className="font-medium text-[#0D0D0D] mb-1">Do you work with colour?</p>
                  <p>[Answer placeholder]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
