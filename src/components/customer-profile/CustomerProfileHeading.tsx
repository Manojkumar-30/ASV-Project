import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';

export function CustomerProfileHeading() {
  const reduced = useReducedMotion();

  return (
    <div className="mx-auto max-w-3xl text-center mb-12 lg:mb-14">
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.standard, ease: EASE_PREMIUM }}
        className="inline-flex items-center justify-center gap-3 mb-3 sm:mb-4"
      >
        <span className="h-[1.5px] w-6 bg-[#ED1C24]" aria-hidden="true" />
        <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#C81018]">
          WHO WE SERVE
        </span>
        <span className="h-[1.5px] w-6 bg-[#ED1C24]" aria-hidden="true" />
      </motion.div>

      <motion.h2
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
        className="section-heading font-bold text-[#101010] tracking-tight"
      >
        Our Customer <span className="text-[#ED1C24]">Profile</span>
      </motion.h2>

      {/* Small animated red accent underline */}
      <div className="mt-4 sm:mt-5 flex justify-center" aria-hidden="true">
        {reduced ? (
          <span className="block h-[3px] w-14 rounded-full bg-[#ED1C24]" />
        ) : (
          <motion.span
            className="block h-[3px] w-14 rounded-full bg-[#ED1C24] origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: DURATION.slow, delay: 0.12, ease: EASE_PREMIUM }}
          />
        )}
      </div>

      <motion.p
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.slow, delay: 0.14, ease: EASE_PREMIUM }}
        className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-[17px] text-[#626262] leading-relaxed max-w-2xl mx-auto"
      >
        Different lifestyles. Different ambitions. One trusted property management partner.
      </motion.p>
    </div>
  );
}
