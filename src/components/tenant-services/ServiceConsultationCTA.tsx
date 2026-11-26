import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Building2 } from 'lucide-react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';

interface ServiceConsultationCTAProps {
  onConsultClick: () => void;
}

export function ServiceConsultationCTA({ onConsultClick }: ServiceConsultationCTAProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
      className="mt-10 sm:mt-12 lg:mt-14"
    >
      <div className="rounded-[24px] border border-[#E8E8E8] bg-white p-6 sm:p-8 lg:px-10 lg:py-8 shadow-[0_14px_40px_-24px_rgba(16,16,16,0.12)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
          <div className="flex items-start sm:items-center gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F0] border border-[#ED1C24]/20 text-[#ED1C24]">
              <Building2 className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#101010] leading-tight">
                Complete Property Care. One Trusted Partner.
              </h3>
              <p className="mt-1.5 text-sm sm:text-[15px] text-[#626262] leading-relaxed max-w-2xl">
                From finding the right tenant to managing your property&apos;s everyday needs, ASV
                takes care of every detail.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onConsultClick}
              className="btn-press inline-flex items-center justify-center gap-2 rounded-full bg-[#ED1C24] hover:bg-[#C81018] px-6 py-3 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 min-h-[46px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </button>

            <Link
              to="/pricing"
              className="btn-press inline-flex items-center justify-center gap-1.5 rounded-full border border-[#E8E8E8] bg-white hover:border-[#101010] hover:bg-[#F8F8F8] px-5 py-3 text-sm font-semibold text-[#101010] transition-colors whitespace-nowrap shrink-0 min-h-[46px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]"
            >
              <span>View Terms &amp; Charges</span>
              <ArrowUpRight className="h-4 w-4 text-[#ED1C24] shrink-0" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
