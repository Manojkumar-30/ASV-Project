import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';

export function FooterBrandStatement() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  const handleConsultClick = useCallback(() => {
    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
      consultationSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate('/contact');
  }, [navigate]);

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 mb-12 border-b border-[#303030]">
      <div className="max-w-3xl">
        {/* Exact Original ASV Logo on Compact Neutral Framing */}
        <Link
          to="/"
          aria-label="ASV Property Management Home"
          className="inline-flex w-fit items-center rounded-lg bg-white px-3 py-1.5 shadow-xs"
        >
          <img
            src={COMPANY_INFO.logoPath}
            alt="ASV Property Management"
            className="h-7 sm:h-8 w-auto object-contain"
          />
        </Link>

        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: DURATION.standard, ease: EASE_PREMIUM }}
          className="mt-7 inline-flex items-center gap-3"
        >
          <span className="h-[1.5px] w-7 bg-[#ED1C24]" aria-hidden="true" />
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#BDBDBD]">
            YOUR TRUSTED PROPERTY PARTNER
          </span>
        </motion.div>

        <motion.h2
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
          className="mt-3 font-display text-3xl sm:text-4xl lg:text-[46px] font-bold leading-[1.1] tracking-[-0.025em] text-white"
        >
          Miles apart. Always <span className="text-[#ED1C24]">Connected.</span>
        </motion.h2>

        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#BDBDBD] max-w-xl">
          Professional residential property management in Bengaluru, for homeowners around the
          world.
        </p>
      </div>

      {/* Circular Red Consultation CTA */}
      <div className="flex items-center gap-4 shrink-0">
        <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#BDBDBD] hidden sm:inline">
          Get Started
        </span>
        <button
          type="button"
          onClick={handleConsultClick}
          aria-label="Request a property management consultation"
          className="btn-press group inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#ED1C24] text-white shadow-[0_12px_32px_rgba(237,28,36,0.28)] transition-colors duration-200 hover:bg-[#C81018]"
        >
          <ArrowUpRight
            className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}
