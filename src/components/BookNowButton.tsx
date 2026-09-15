import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function BookNowButton() {
  const [footerVisible, setFooterVisible] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.01 }
    );
    observerRef.current.observe(footer);

    return () => observerRef.current?.disconnect();
  }, []);

  // Hide while a flash bottom sheet is open
  useEffect(() => {
    const onSheet = (e: Event) => setSheetOpen((e as CustomEvent<boolean>).detail);
    window.addEventListener('flash-sheet', onSheet);
    return () => window.removeEventListener('flash-sheet', onSheet);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!sheetOpen && (
          <motion.div
            className="md:hidden fixed bottom-8 right-8 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1, duration: 0.5 } }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.15 } }}
          >
            <Link
              to="/book"
              className="block bg-[#E8B4C4] text-[#0D0D0D] text-sm px-6 py-4 shadow-lg hover:bg-[#dda5b5] active:scale-95 transition-all duration-200"
            >
              Book now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!footerVisible && (
          <motion.div
            className="hidden md:block fixed bottom-8 right-8 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1, duration: 0.5 } }}
            exit={{ opacity: 0, y: 20, transition: { delay: 0, duration: 0.2 } }}
          >
            <Link
              to="/book"
              className="block bg-[#E8B4C4] text-[#0D0D0D] text-sm px-6 py-4 shadow-lg hover:bg-[#dda5b5] active:scale-95 transition-all duration-200"
            >
              Book now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
