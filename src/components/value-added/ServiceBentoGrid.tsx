import { motion, useReducedMotion } from 'motion/react';
import type { ValueAddedBentoItem } from '../../types';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import { ValueAddedServiceCard } from './ValueAddedServiceCard';

interface ServiceBentoGridProps {
  services: ValueAddedBentoItem[];
}

export function ServiceBentoGrid({ services }: ServiceBentoGridProps) {
  const reduced = useReducedMotion();
  const [featured, ...secondary] = services;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
      {/* Featured Dark Left Card (5 cols on desktop, 2 cols on tablet) */}
      {featured && (
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
          className="md:col-span-2 lg:col-span-5"
        >
          <ValueAddedServiceCard service={featured} index={0} />
        </motion.div>
      )}

      {/* Right Stacked White Photo Cards (7 cols on desktop, 2 separate columns on tablet) */}
      <div className="md:col-span-2 lg:col-span-7 flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col gap-6 lg:gap-8">
        {secondary.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: DURATION.slow, delay: 0.08 * (idx + 1), ease: EASE_PREMIUM }}
            className="flex flex-1"
          >
            <ValueAddedServiceCard service={item} index={idx + 1} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
