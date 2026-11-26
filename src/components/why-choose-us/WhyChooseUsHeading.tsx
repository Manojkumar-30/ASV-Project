import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';

export function WhyChooseUsHeading() {
  const reduced = useReducedMotion();

  return (
    <div>
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.standard, ease: EASE_PREMIUM }}
        className="inline-flex items-center gap-3 mb-3 sm:mb-4"
      >
        <span className="h-[1.5px] w-7 bg-[#ED1C24]" aria-hidden="true" />
        <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#C81018]">
          THE ASV ADVANTAGE
        </span>
      </motion.div>

      <motion.h2
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
        className="section-heading font-bold text-[#101010] tracking-tight"
      >
        Why Choose <span className="text-[#ED1C24]">Us</span>?
      </motion.h2>

      <motion.p
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.slow, delay: 0.08, ease: EASE_PREMIUM }}
        className="mt-3 sm:mt-4 font-display text-lg sm:text-xl lg:text-[22px] font-semibold text-[#101010] leading-snug"
      >
        More than property management. A partnership built on trust.
      </motion.p>

      <motion.p
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.slow, delay: 0.14, ease: EASE_PREMIUM }}
        className="mt-3.5 text-sm sm:text-base text-[#626262] leading-relaxed max-w-2xl"
      >
        Choosing the right property management partner makes all the difference. At ASV, we combine
        local expertise, structured processes and responsive support to give you peace of mind. We
        focus on building lasting relationships and delivering professional care for your property.
      </motion.p>
    </div>
  );
}
