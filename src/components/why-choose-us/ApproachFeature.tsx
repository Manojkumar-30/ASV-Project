import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import { WhyChooseIcon } from './WhyChooseIcon';

export function ApproachFeature() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DURATION.slow, delay: 0.08, ease: EASE_PREMIUM }}
      className="group py-6 border-b border-[#E5E7EB] transition-colors"
    >
      <div className="flex items-start gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F0] border border-[#ED1C24]/15 text-[#ED1C24] transition-colors duration-200 group-hover:bg-[#ED1C24] group-hover:text-white group-hover:border-[#ED1C24]">
          <WhyChooseIcon icon="target" className="h-5 w-5" strokeWidth={1.75} />
        </span>

        <div className="min-w-0">
          <h3 className="font-display text-lg sm:text-xl font-bold text-[#101010] leading-snug">
            Our Approach
          </h3>
          <p className="mt-1.5 text-sm sm:text-[15px] text-[#626262] leading-relaxed">
            Property management is more than just completing tasks. We take pride in the solutions
            we deliver, focus on high standards and approach every property with care, responsibility
            and attention to detail.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
