import { motion } from 'framer-motion';
import RequestForm from '../components/RequestForm';
import PageTransition from '../components/PageTransition';

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

        <RequestForm />
      </section>
    </PageTransition>
  );
}
