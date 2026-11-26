import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';

interface WhyChooseUsCTAProps {
  onConsultClick: () => void;
}

export function WhyChooseUsCTA({ onConsultClick }: WhyChooseUsCTAProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
      className="mt-12 sm:mt-14 lg:mt-16"
    >
      <div className="relative rounded-[24px] lg:rounded-[28px] bg-[#101010] text-white p-7 sm:p-10 lg:px-12 lg:py-11 border border-[#262626] overflow-hidden">
        {/* Crisp top red accent bar */}
        <span
          className="pointer-events-none absolute top-0 left-7 sm:left-10 lg:left-12 h-[3px] w-16 bg-[#ED1C24]"
          aria-hidden="true"
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-7 lg:gap-10">
          <div className="max-w-2xl">
            <h3 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight leading-tight">
              Confidence in Every Step.
            </h3>
            <p className="mt-2.5 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
              Let us manage your property while you focus on what matters most.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
            <button
              type="button"
              onClick={onConsultClick}
              className="btn-press group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#ED1C24] hover:bg-[#C81018] px-7 py-3.5 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 min-h-[48px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight
                className="h-4 w-4 shrink-0 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <Link
              to="/contact"
              className="btn-press inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-transparent hover:bg-white hover:text-[#101010] px-7 py-3.5 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 min-h-[48px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Talk to Our Team</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
