import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type WayCardProps = {
  index: number;
  title: string;
  description: string;
  cta?: { label: string; to: string };
};

export default function WayCard({ index, title, description, cta }: WayCardProps) {
  return (
    <motion.article
      className="border-t border-[#0D0D0D]/10 py-10 md:py-14 flex flex-col md:flex-row gap-6 md:gap-16 items-start"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="font-display text-6xl text-[#0D0D0D]/10 font-light leading-none select-none min-w-[60px]">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="flex-1">
        <h3 className="font-display text-3xl md:text-4xl font-light mb-4">{title}</h3>
        <p className="font-display text-[#0D0D0D]/60 leading-relaxed max-w-prose">{description}</p>
        {cta && (
          <Link
            to={cta.to}
            className="inline-block mt-6 text-xs border-b border-[#C4607E] text-[#C4607E] pb-0.5 hover:border-b-2 transition-all duration-200"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </motion.article>
  );
}
