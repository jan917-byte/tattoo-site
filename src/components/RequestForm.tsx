import { useState } from 'react';
import type { FormEvent } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

// Le formulaire est géré par Netlify Forms.
// Netlify détecte le formulaire au build via public/__forms.html (le React rendu
// côté client n'est pas scanné), puis intercepte ce POST et envoie la demande
// par e-mail à l'artiste. Voir la section "Formulaire" dans CLAUDE.md.
const FORM_NAME = 'tattoo-request';
const FORM_ACTION = '/__forms.html';

// Netlify Forms limite la requête ENTIÈRE à 8 Mo (image + champs texte).
// On garde une marge : 7 Mo pour l'image.
const MAX_FILE_SIZE = 7 * 1024 * 1024;
const GENERIC_ERROR = 'Something went wrong. Please try again or reach out on Instagram.';

// Le <form> porte noValidate (les bulles natives du navigateur jurent avec la
// charte), donc les attributs `required` ne bloquent rien : la validation est
// faite ici, à la main. L'e-mail est le champ critique : sans lui, aucun moyen
// de recontacter la personne.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Ordre = ordre d'affichage : le focus va sur le premier champ en erreur.
type Field = 'name' | 'email' | 'type' | 'consent';
type FieldErrors = Partial<Record<Field, string>>;

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};

  if (!String(data.get('name') ?? '').trim()) {
    errors.name = 'Please tell me your name.';
  }

  const email = String(data.get('email') ?? '').trim();
  if (!email) {
    errors.email = 'An email address is required, otherwise I have no way to reply.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'This email address looks incomplete. Please double check it.';
  }

  if (!data.get('type')) {
    errors.type = 'Please choose a type of request.';
  }

  if (!data.get('consent')) {
    errors.consent = 'Please give your consent so I can handle your request.';
  }

  return errors;
}

export default function RequestForm() {
  const [searchParams] = useSearchParams();
  const flashParam = searchParams.get('flash');
  const [status, setStatus] = useState<FormState>('idle');
  const [selectedType, setSelectedType] = useState(flashParam ? 'flash' : '');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState(GENERIC_ERROR);
  const [errors, setErrors] = useState<FieldErrors>({});

  const clearError = (field: Field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const fieldErrors = validate(data);
    setErrors(fieldErrors);
    const firstInvalid = Object.keys(fieldErrors)[0];
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const file = data.get('inspiration');
    if (file instanceof File && file.size > MAX_FILE_SIZE) {
      setErrorMessage('That image is over 7 MB. Please attach a smaller one.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(FORM_ACTION, { method: 'POST', body: data });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
    } catch (err) {
      console.error('Échec de l’envoi du formulaire', err);
      setErrorMessage(GENERIC_ERROR);
      setStatus('error');
    }
  };

  const inputClass =
    'w-full border-b border-[#0D0D0D]/20 bg-transparent py-3 text-sm text-[#0D0D0D] placeholder-[#0D0D0D]/30 outline-none focus:border-[#C4607E] transition-colors duration-200';

  const labelClass = 'block text-sm text-[#0D0D0D]/70 mb-2';
  const requiredMark = <span className="text-[#C4607E]">(required)</span>;
  const errorClass = (field: Field) => (errors[field] ? 'border-[#C4607E]' : '');
  const fieldError = (field: Field) =>
    errors[field] && (
      <p id={`${field}-error`} className="mt-2 text-xs text-[#C4607E]">
        {errors[field]}
      </p>
    );

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
    <form
      name={FORM_NAME}
      method="POST"
      action={FORM_ACTION}
      encType="multipart/form-data"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      noValidate
      className="max-w-2xl mx-auto space-y-10"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <input
        type="hidden"
        name="subject"
        value={name ? `New tattoo request from ${name}` : 'New tattoo request'}
        readOnly
      />
      {/* Piège à bots : invisible pour un humain, rempli par les robots. */}
      <p className="hidden">
        <label>
          Leave this field empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {flashParam && (
        <div className="flex items-center gap-3 px-4 py-3 border border-[#1B2A4A]/20 bg-[#1B2A4A]/5">
          <span className="text-xs text-[#1B2A4A]/60">Flash requested</span>
          <span className="font-display text-sm text-[#1B2A4A]">{flashParam}</span>
        </div>
      )}
      <input type="hidden" name="flash_title" value={flashParam ?? ''} readOnly />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <label className={labelClass} htmlFor="name">Name {requiredMark}</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={`${inputClass} ${errorClass('name')}`}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'name-error' : undefined}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearError('name');
            }}
          />
          {fieldError('name')}
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email {requiredMark}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={`${inputClass} ${errorClass('email')}`}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby="email-help"
            onChange={() => clearError('email')}
          />
          <p id="email-help" className="mt-2 text-xs text-[#0D0D0D]/40">
            {errors.email ? (
              <span className="text-[#C4607E]">{errors.email}</span>
            ) : (
              'This is the only way I can get back to you about your request.'
            )}
          </p>
        </div>
      </div>

      <div>
        <p className={labelClass} id="type-label">Type of request {requiredMark}</p>
        <div
          className="flex gap-4 flex-wrap mt-1"
          role="radiogroup"
          aria-labelledby="type-label"
          aria-describedby={errors.type ? 'type-error' : undefined}
        >
          {['Flash', 'Project', 'Freehand'].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value={type.toLowerCase()}
                className="sr-only peer"
                required
                checked={selectedType === type.toLowerCase()}
                onChange={() => {
                  setSelectedType(type.toLowerCase());
                  clearError('type');
                }}
              />
              <span className="text-sm px-4 py-2 border border-[#0D0D0D]/20 peer-focus-visible:border-[#C4607E] peer-checked:border-[#C4607E] peer-checked:text-[#C4607E] group-hover:border-[#0D0D0D]/40 transition-colors cursor-pointer">
                {type}
              </span>
            </label>
          ))}
        </div>
        {fieldError('type')}

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
        <label className={labelClass} htmlFor="inspiration">Inspiration image</label>
        <input
          id="inspiration"
          name="inspiration"
          type="file"
          accept="image/*"
          className="text-sm text-[#0D0D0D]/50 file:mr-4 file:py-2 file:px-4 file:border file:border-[#0D0D0D]/20 file:text-sm file:bg-transparent file:cursor-pointer hover:file:border-[#C4607E] hover:file:text-[#C4607E] transition-colors"
        />
        <p className="mt-2 text-xs text-[#0D0D0D]/40">
          One image, 7 MB max. Got more references? Send them over once I reply.
        </p>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            className="mt-1 accent-[#C4607E]"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            onChange={() => clearError('consent')}
          />
          <label htmlFor="consent" className="font-display text-sm text-[#0D0D0D]/50 leading-relaxed">
            I consent to my data being processed to handle my tattoo request. See{' '}
            <Link to="/impressum" className="underline hover:text-[#C4607E] transition-colors">Datenschutz</Link>.
          </label>
        </div>
        {fieldError('consent')}
      </div>

      {status === 'error' && (
        <p className="text-sm text-[#C4607E]">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full md:w-auto px-10 py-4 bg-[#E8B4C4] text-[#0D0D0D] text-sm hover:bg-[#dda5b5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {status === 'submitting' ? 'Sending…' : 'Send request'}
      </button>
    </form>
  );
}
