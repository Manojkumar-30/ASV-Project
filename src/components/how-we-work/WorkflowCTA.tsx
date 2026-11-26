import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Building2, Phone } from 'lucide-react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';

interface WorkflowCTAProps {
  onGetStarted: () => void;
}

export function WorkflowCTA({ onGetStarted }: WorkflowCTAProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
      className="mt-10 sm:mt-12 lg:mt-14"
    >
      <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 sm:p-8 lg:px-10 lg:py-8 shadow-[0_16px_44px_-24px_rgba(16,16,16,0.14)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
          {/* Left Icon + Heading */}
          <div className="flex items-start sm:items-center gap-4 lg:gap-5 lg:pr-8 lg:border-r lg:border-[#E5E7EB] shrink-0">
            <span className="inline-flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-[#ED1C24]/20 bg-[#FFF5F5] text-[#ED1C24]">
              <Building2 className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#101010] leading-tight">
                Your Property.{' '}
                <span className="text-[#ED1C24]">Our Responsibility.</span>
              </h3>
              <Link
                to="/pricing"
                className="link-underline mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#626262] hover:text-[#101010]"
              >
                <span>View Terms &amp; Charges</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#ED1C24]" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Center Description */}
          <p className="text-sm sm:text-[15px] text-[#626262] leading-relaxed max-w-md">
            Let us handle the complexities of property management while you enjoy peace of mind.
          </p>

          {/* Right CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onGetStarted}
              className="btn-press inline-flex items-center justify-center gap-2 rounded-full bg-[#ED1C24] hover:bg-[#C81018] px-6 py-3 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 min-h-[46px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </button>

            <Link
              to="/contact"
              className="btn-press inline-flex items-center justify-center gap-2 rounded-full border border-[#E5E7EB] bg-white hover:border-[#101010] hover:bg-[#F7F7F8] px-6 py-3 text-sm font-semibold text-[#101010] transition-colors whitespace-nowrap shrink-0 min-h-[46px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]"
            >
              <Phone className="h-4 w-4 text-[#ED1C24] shrink-0" aria-hidden="true" />
              <span>Talk to Our Team</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
