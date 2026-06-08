import { motion } from 'framer-motion';
import RequestForm from '../components/RequestForm';
import PageTransition from '../components/PageTransition';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const FormIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

export default function Book() {
  return (
    <PageTransition>
      <section className="pt-36 pb-24 px-6 max-w-7xl mx-auto">
        <motion.h1
          className="font-display text-5xl md:text-7xl font-light text-[#0D0D0D] leading-tight mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Book a session
        </motion.h1>

        <div className="flex flex-col md:flex-row items-stretch gap-0 mb-20 max-w-2xl mx-auto">
          <motion.a
            href="https://ig.me/m/mrkloudy"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-start gap-5 p-8 border border-[#0D0D0D]/15 hover:border-[#C4607E]/60 transition-colors duration-300 flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <span className="text-[#0D0D0D]/40 group-hover:text-[#C4607E] transition-colors duration-300">
              <InstagramIcon />
            </span>
            <div>
              <p className="font-display text-lg text-[#0D0D0D] mb-1">DM me on Instagram</p>
              <p className="text-xs text-[#0D0D0D]/40">@mrkloudy</p>
            </div>
          </motion.a>

          <motion.div
            className="flex items-center justify-center px-5 py-4 md:py-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <span className="font-display text-sm text-[#0D0D0D]/30">or</span>
          </motion.div>

          <motion.button
            onClick={() => {
              const el = document.getElementById('form');
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="group flex flex-col items-start gap-5 p-8 border border-[#0D0D0D]/15 hover:border-[#C4607E]/60 transition-colors duration-300 flex-1 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <span className="text-[#0D0D0D]/40 group-hover:text-[#C4607E] transition-colors duration-300">
              <FormIcon />
            </span>
            <div>
              <p className="font-display text-lg text-[#0D0D0D] mb-1">Fill out the form</p>
              <p className="text-xs text-[#0D0D0D]/40">Detailed request</p>
            </div>
          </motion.button>
        </div>

        <motion.div
          id="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <RequestForm />
        </motion.div>
      </section>
    </PageTransition>
  );
}
