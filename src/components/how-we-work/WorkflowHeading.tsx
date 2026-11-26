import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';

export function WorkflowHeading() {
  const reduced = useReducedMotion();

  return (
    <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-10 lg:mb-12">
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.standard, ease: EASE_PREMIUM }}
        className="inline-flex items-center justify-center gap-3 mb-3 sm:mb-4"
      >
        <span className="h-[1.5px] w-6 bg-[#ED1C24]" aria-hidden="true" />
        <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#626262]">
          OUR PROCESS
        </span>
        <span className="h-[1.5px] w-6 bg-[#ED1C24]" aria-hidden="true" />
      </motion.div>

      <motion.h2
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
        className="section-heading font-bold text-[#101010] tracking-tight"
      >
        How We <span className="text-[#ED1C24]">Work</span>
      </motion.h2>

      <motion.p
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.slow, delay: 0.08, ease: EASE_PREMIUM }}
        className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-[17px] text-[#626262] leading-relaxed max-w-2xl mx-auto"
      >
        From property onboarding to long-term care, we manage every step so you can enjoy
        hassle-free property ownership.
      </motion.p>

      {/* Short animated red underline */}
      <div className="mt-5 sm:mt-6 flex justify-center" aria-hidden="true">
        {reduced ? (
          <span className="block h-[3px] w-14 rounded-full bg-[#ED1C24]" />
        ) : (
          <motion.span
            className="block h-[3px] w-14 rounded-full bg-[#ED1C24] origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: DURATION.slow, delay: 0.16, ease: EASE_PREMIUM }}
          />
        )}
      </div>
    </div>
  );
}
