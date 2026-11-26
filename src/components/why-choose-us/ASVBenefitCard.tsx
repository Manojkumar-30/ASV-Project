import { motion, useReducedMotion } from 'motion/react';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import type { WhyChooseBenefitItem } from '../../types';
import { WhyChooseIcon } from './WhyChooseIcon';

interface ASVBenefitCardProps {
  benefit: WhyChooseBenefitItem;
  index: number;
}

export function ASVBenefitCard({ benefit, index }: ASVBenefitCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{
        duration: 0.45,
        delay: Math.min(index, 5) * 0.07,
        ease: EASE_PREMIUM,
      }}
      className="h-full"
    >
      <div className="group h-full flex flex-col justify-between rounded-[20px] border border-[#E5E7EB] bg-white p-6 lg:p-7 shadow-[0_12px_32px_-22px_rgba(16,16,16,0.12)] transition-all duration-200 motion-safe:hover:-translate-y-1 hover:border-[#ED1C24]/55 hover:shadow-[0_20px_44px_-22px_rgba(237,28,36,0.18)]">
        <div>
          <div className="flex items-center justify-between gap-3 mb-5">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F0] border border-[#ED1C24]/15 text-[#ED1C24] transition-colors duration-200 group-hover:bg-[#ED1C24] group-hover:text-white group-hover:border-[#ED1C24]">
              <WhyChooseIcon icon={benefit.icon} className="h-[22px] w-[22px]" strokeWidth={1.75} />
            </span>
            <span className="font-mono-nums text-xs font-semibold text-[#858585] group-hover:text-[#ED1C24] transition-colors">
              {benefit.number}
            </span>
          </div>

          <h4 className="font-display text-lg lg:text-[19px] font-bold text-[#101010] leading-snug mb-2.5">
            {benefit.title}
          </h4>

          <p className="text-sm text-[#626262] leading-relaxed">{benefit.description}</p>
        </div>
      </div>
    </motion.article>
  );
}
