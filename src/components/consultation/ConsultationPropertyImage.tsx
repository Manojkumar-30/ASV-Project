import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import { SmartImage } from '../ui/SmartImage';

export function ConsultationPropertyImage() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DURATION.slow, delay: 0.1, ease: EASE_PREMIUM }}
      className="relative overflow-hidden rounded-[22px] sm:rounded-[24px] border border-[#303030] bg-[#191919] aspect-[4/3] sm:aspect-[16/10]"
    >
      <SmartImage
        src="/src/assets/images/project_modern_towers_1795592750557.webp"
        alt="Contemporary residential apartment towers in Bengaluru managed by ASV Property Management"
        width={1600}
        height={1000}
        loading="lazy"
        className="h-full w-full object-cover"
        fallbackLabel="ASV Bengaluru Property Portfolio"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
        aria-hidden="true"
      />

      {/* Subtle Floating Glass Card */}
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.slow, delay: 0.2, ease: EASE_PREMIUM }}
        className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5 rounded-2xl border border-white/18 bg-[#101010]/80 p-3.5 sm:p-4 backdrop-blur-md shadow-xl"
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#ED1C24]/35 bg-[#ED1C24]/15 text-[#ED1C24]">
            <ShieldCheck className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-sm sm:text-[15px] font-bold text-white leading-snug">
              Managed Locally. Connected Globally.
            </h3>
            <p className="text-xs text-[#BDBDBD] mt-0.5 leading-snug">
              Your trusted property management partner.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
