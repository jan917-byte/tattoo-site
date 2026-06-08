import { useState } from 'react';
import type { FormEvent } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function RequestForm() {
  const [searchParams] = useSearchParams();
  const flashParam = searchParams.get('flash');
  const [status, setStatus] = useState<FormState>('idle');
  const [selectedType, setSelectedType] = useState(flashParam ? 'flash' : '');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    // Mock submission, wire up real backend later
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
  };

  const inputClass =
    'w-full border-b border-[#0D0D0D]/20 bg-transparent py-3 text-sm text-[#0D0D0D] placeholder-[#0D0D0D]/30 outline-none focus:border-[#C4607E] transition-colors duration-200';

  const labelClass = 'block text-sm text-[#0D0D0D]/70 mb-2';

  if (status === 'success') {
    return (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="font-display text-4xl font-light text-[#0D0D0D] mb-4">Request received.</p>
        <p className="font-display text-[#0D0D0D]/50 text-sm">I'll be in touch within a few days.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-2xl mx-auto space-y-10">
      {flashParam && (
        <div className="flex items-center gap-3 px-4 py-3 border border-[#1B2A4A]/20 bg-[#1B2A4A]/5">
          <input type="hidden" name="flash_title" value={flashParam} />
          <span className="text-[10px] text-[#1B2A4A]/60">Flash requested</span>
          <span className="font-display text-sm text-[#1B2A4A]">{flashParam}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <label className={labelClass} htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Type of request</label>
        <div className="flex gap-4 flex-wrap mt-1">
          {['Flash', 'Project', 'Freehand'].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value={type.toLowerCase()}
                className="sr-only peer"
                required
                checked={selectedType === type.toLowerCase()}
                onChange={() => setSelectedType(type.toLowerCase())}
              />
              <span className="text-xs px-4 py-2 border border-[#0D0D0D]/20 peer-checked:border-[#C4607E] peer-checked:text-[#C4607E] group-hover:border-[#0D0D0D]/40 transition-colors cursor-pointer">
                {type}
              </span>
            </label>
          ))}
        </div>

        {selectedType === 'flash' && !flashParam && (
          <motion.p
            className="mt-4 text-sm text-[#0D0D0D]/60"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Please choose a flash{' '}
            <Link
              to="/tattoo"
              className="underline text-[#C4607E] hover:text-[#a84d6b] transition-colors"
            >
              from the available designs
            </Link>
            .
          </motion.p>
        )}
      </div>

      <div>
        <label className={labelClass} htmlFor="idea">Your idea</label>
        <textarea
          id="idea"
          name="idea"
          rows={4}
          placeholder="Describe your idea, style references, mood…"
          className={`${inputClass} resize-none`}
          defaultValue={flashParam ? `I'm interested in the flash: ${flashParam}` : ''}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <label className={labelClass} htmlFor="bodyArea">Body area</label>
          <input id="bodyArea" name="bodyArea" type="text" placeholder="e.g. inner forearm, ankle…" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="size">Approximate size</label>
          <input id="size" name="size" type="text" placeholder="e.g. 5×7 cm" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="availability">Your availability</label>
        <input id="availability" name="availability" type="text" placeholder="Preferred months or dates" className={inputClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="inspiration">Inspiration images</label>
        <input
          id="inspiration"
          name="inspiration"
          type="file"
          accept="image/*"
          multiple
          className="text-xs text-[#0D0D0D]/50 file:mr-4 file:py-2 file:px-4 file:border file:border-[#0D0D0D]/20 file:text-xs file:bg-transparent file:cursor-pointer hover:file:border-[#C4607E] hover:file:text-[#C4607E] transition-colors"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 accent-[#C4607E]"
        />
        <label htmlFor="consent" className="font-display text-xs text-[#0D0D0D]/50 leading-relaxed">
          I consent to my data being processed to handle my tattoo request. See{' '}
          <a href="/impressum" className="underline hover:text-[#C4607E] transition-colors">Datenschutz</a>.
        </label>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full md:w-auto px-10 py-4 bg-[#E8B4C4] text-[#0D0D0D] text-xs hover:bg-[#dda5b5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {status === 'submitting' ? 'Sending…' : 'Send request'}
      </button>
    </form>
  );
}
