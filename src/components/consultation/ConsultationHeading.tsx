import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, MessageCircle, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';

export function ConsultationHeading() {
  const reduced = useReducedMotion();

  return (
    <div>
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.standard, ease: EASE_PREMIUM }}
        className="inline-flex items-center gap-3 mb-4"
      >
        <span className="h-[1.5px] w-7 bg-[#ED1C24]" aria-hidden="true" />
        <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#ED1C24]">
          LET&apos;S GET STARTED
        </span>
      </motion.div>

      <motion.h2
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
        className="section-heading font-bold tracking-tight text-white"
      >
        <span className="block">Your property.</span>
        <span className="block text-[#ED1C24]">Our responsibility.</span>
      </motion.h2>

      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.slow, delay: 0.08, ease: EASE_PREMIUM }}
        className="mt-5 space-y-3.5 max-w-xl"
      >
        <p className="text-base sm:text-lg font-medium leading-relaxed text-white">
          Whether you&apos;re in Bengaluru or living abroad, we&apos;re here to simplify your
          property ownership experience.
        </p>
        <p className="text-sm sm:text-[15px] leading-relaxed text-[#BDBDBD]">
          Tell us about your property and our team will help you understand the available
          management services, fee structure and onboarding process.
        </p>
      </motion.div>

      {/* Mobile Quick Call & WhatsApp Actions (shown only below lg breakpoint per mobile hierarchy) */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
        <a
          href={COMPANY_INFO.phoneHref}
          className="btn-press inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl border border-[#303030] bg-[#191919] px-4 py-3 text-sm font-semibold text-white hover:border-[#ED1C24]"
        >
          <Phone className="h-4 w-4 text-[#ED1C24] shrink-0" aria-hidden="true" />
          <span className="font-mono-nums">{COMPANY_INFO.phoneDisplay}</span>
        </a>
        <a
          href={COMPANY_INFO.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-press inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#303030] bg-[#191919] px-4 py-3 text-sm font-semibold text-white hover:border-[#ED1C24]"
        >
          <MessageCircle className="h-4 w-4 text-[#ED1C24] shrink-0" aria-hidden="true" />
          <span>Chat with Our Team</span>
          <ArrowUpRight className="h-4 w-4 text-[#BDBDBD]" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
