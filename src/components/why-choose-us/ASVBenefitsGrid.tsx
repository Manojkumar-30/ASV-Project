import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import type { WhyChooseBenefitItem } from '../../types';
import { ASVBenefitCard } from './ASVBenefitCard';

interface ASVBenefitsGridProps {
  benefits: WhyChooseBenefitItem[];
}

export function ASVBenefitsGrid({ benefits }: ASVBenefitsGridProps) {
  const reduced = useReducedMotion();

  return (
    <div className="mt-16 sm:mt-20 lg:mt-24 pt-12 sm:pt-14 border-t border-[#E5E7EB]">
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
        className="max-w-2xl mb-8 sm:mb-10 lg:mb-12"
      >
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="h-[1.5px] w-6 bg-[#ED1C24]" aria-hidden="true" />
          <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#C81018]">
            BUILT AROUND YOUR NEEDS
          </span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#101010] tracking-tight">
          Six Reasons to Trust ASV
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {benefits.map((benefit, index) => (
          <ASVBenefitCard key={benefit.id} benefit={benefit} index={index} />
        ))}
      </div>
    </div>
  );
}
