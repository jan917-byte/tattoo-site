import heroVideo from '../assets/hero.mov';
import { motion } from 'framer-motion';

export default function VideoHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0D0D0D]">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/20 via-transparent to-[#0D0D0D]/60" />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.img
          src={`${import.meta.env.BASE_URL}logo_sans.svg`}
          alt=""
          className="w-20 md:w-28 brightness-0 invert mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
        />

        <motion.h1
          className="font-display text-6xl md:text-8xl lg:text-9xl text-white font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          mr.kloudy
        </motion.h1>

        <motion.p
          className="text-white/70 text-sm md:text-base font-display mt-8 max-w-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9 }}
        >
          Poetry on skin and lightness in this world.<br />Welcome to my universe
        </motion.p>

        <motion.p
          className="text-white/50 text-xs mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Berlin
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="text-white/40 text-xs">Scroll</span>
        <motion.div
          className="w-px h-10 bg-white/30"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
