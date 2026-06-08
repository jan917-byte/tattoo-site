import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BookNowButton() {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <Link
        to="/book"
        className="block bg-[#C4607E] text-white text-xs tracking-[0.2em] px-6 py-4 shadow-lg hover:bg-[#A8516B] active:scale-95 transition-all duration-200"
      >
        Book now
      </Link>
    </motion.div>
  );
}
