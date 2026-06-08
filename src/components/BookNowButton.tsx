import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BookNowButton() {
  return (
    <motion.div
      className="hidden md:block fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <Link
        to="/book"
        className="block bg-[#E8B4C4] text-[#0D0D0D] text-xs tracking-[0.05em] px-6 py-4 shadow-lg hover:bg-[#dda5b5] active:scale-95 transition-all duration-200"
      >
        Book now
      </Link>
    </motion.div>
  );
}
