import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import type { CustomerTrustItem } from '../../types';
import { CustomerProfileIcon } from './CustomerProfileIcon';

interface CustomerTrustStripProps {
  items: CustomerTrustItem[];
}

export function CustomerTrustStrip({ items }: CustomerTrustStripProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DURATION.slow, delay: 0.12, ease: EASE_PREMIUM }}
      className="mt-8 lg:mt-10 rounded-[20px] border border-[#E5E7EB] bg-white shadow-[0_12px_34px_-24px_rgba(16,16,16,0.12)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB]">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start sm:items-center gap-4 px-5 py-5 sm:px-7 sm:py-6"
          >
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#ED1C24]/15 bg-[#FFF0F0] text-[#ED1C24]">
              <CustomerProfileIcon icon={item.icon} className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-sm sm:text-base font-bold text-[#101010] leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#626262] mt-0.5 leading-snug">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
