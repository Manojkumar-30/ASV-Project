import { motion, useReducedMotion } from 'motion/react';
import { WHY_CHOOSE_HERO_IMAGE } from '../../data/whyChooseUs';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import { SmartImage } from '../ui/SmartImage';
import { FloatingTrustCard } from './FloatingTrustCard';

export function PropertyImageShowcase() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
      className="group relative w-full"
    >
      <div className="relative w-full overflow-hidden rounded-[24px] lg:rounded-[28px] border border-[#E5E7EB] bg-[#EAEAEA] shadow-[0_24px_60px_-28px_rgba(16,16,16,0.2)] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/4]">
        <SmartImage
          src={WHY_CHOOSE_HERO_IMAGE.src}
          alt={WHY_CHOOSE_HERO_IMAGE.alt}
          loading="lazy"
          width={WHY_CHOOSE_HERO_IMAGE.width}
          height={WHY_CHOOSE_HERO_IMAGE.height}
          fallbackLabel="Contemporary Bengaluru Residence"
          className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
        />

        {/* Subtle architectural contrast gradient along lower edge */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      <FloatingTrustCard />
    </motion.div>
  );
}
