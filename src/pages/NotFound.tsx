import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <section className="pt-36 pb-32 px-6 max-w-7xl mx-auto">
        <motion.h1
          className="font-display text-5xl md:text-7xl font-light text-[#0D0D0D] leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Page not found
        </motion.h1>
        <p className="font-display text-[#0D0D0D]/60 mb-10">
          This page doesn't exist, or it has moved.
        </p>
        <Link
          to="/"
          className="text-sm border-b border-[#C4607E] text-[#C4607E] pb-0.5"
        >
          Back to home
        </Link>
      </section>
    </PageTransition>
  );
}
