import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';

export function FloatingTrustCard() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DURATION.slow, delay: 0.18, ease: EASE_PREMIUM }}
      className="mt-3 sm:mt-0 sm:absolute sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[320px] rounded-2xl border border-[#E5E7EB] sm:border-white/75 bg-white sm:bg-white/90 sm:backdrop-blur-md p-4 sm:p-5 shadow-[0_12px_28px_-18px_rgba(16,16,16,0.16)] sm:shadow-[0_18px_40px_-16px_rgba(16,16,16,0.28)]"
    >
      <div className="flex items-start gap-3.5">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F0] border border-[#ED1C24]/20 text-[#ED1C24]">
          <ShieldCheck className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <div className="font-display text-sm sm:text-base font-bold text-[#101010] leading-snug">
            Your Property. Our Priority.
          </div>
          <p className="text-xs sm:text-[13px] text-[#626262] mt-1 leading-snug">
            Professional care. Personal attention.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
