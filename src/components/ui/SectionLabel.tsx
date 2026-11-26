import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';

interface SectionLabelProps {
  text: string;
  dark?: boolean;
  immediate?: boolean;
  className?: string;
}

export function SectionLabel({ text, dark = false, immediate = false, className = '' }: SectionLabelProps) {
  const reduced = useReducedMotion();

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {reduced ? (
        <span className="h-[1.5px] w-7 bg-[#ED1C24]" aria-hidden="true" />
      ) : (
        <motion.span
          className="h-[1.5px] w-7 bg-[#ED1C24] origin-left"
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          {...(immediate
            ? { animate: { scaleX: 1 } }
            : { whileInView: { scaleX: 1 }, viewport: VIEWPORT_ONCE })}
          transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
        />
      )}
      <span
        className={`text-[12px] font-medium tracking-[0.14em] uppercase ${
          dark ? 'text-neutral-300' : 'text-[#626262]'
        }`}
      >
        {text}
      </span>
    </div>
  );
}
