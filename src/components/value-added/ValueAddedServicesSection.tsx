import { motion, useReducedMotion } from 'motion/react';
import { VALUE_ADDED_BENTO_SERVICES } from '../../data/services';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import { ServiceBentoGrid } from './ServiceBentoGrid';

export function ValueAddedServicesSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="value-added"
      aria-label="Value Added Services"
      className="scroll-mt-20 py-16 sm:py-24 lg:py-28 xl:py-[112px] bg-white border-b border-[#E5E7EB] overflow-x-clip"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-14">
          <div className="max-w-2xl">
            <motion.div
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: DURATION.standard, ease: EASE_PREMIUM }}
              className="inline-flex items-center gap-3 mb-3 sm:mb-4"
            >
              <span className="h-[1.5px] w-7 bg-[#ED1C24]" aria-hidden="true" />
              <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#C81018]">
                BEYOND PROPERTY MANAGEMENT
              </span>
            </motion.div>

            <motion.h2
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
              className="section-heading font-bold text-[#101010] tracking-tight"
            >
              Value Added <span className="text-[#ED1C24]">Services</span>
            </motion.h2>

            <motion.p
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: DURATION.slow, delay: 0.08, ease: EASE_PREMIUM }}
              className="mt-3 font-display text-lg sm:text-xl lg:text-[22px] font-semibold text-[#101010] leading-snug"
            >
              More Value. Greater Peace of Mind.
            </motion.p>

            <motion.div
              initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: DURATION.slow, delay: 0.12, ease: EASE_PREMIUM }}
              className="mt-4 h-[2.5px] w-16 origin-left bg-[#ED1C24]"
              aria-hidden="true"
            />
          </div>

          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: DURATION.slow, delay: 0.14, ease: EASE_PREMIUM }}
            className="text-sm sm:text-base text-[#626262] leading-relaxed max-w-lg"
          >
            Additional services designed to simplify property ownership and provide organized
            support throughout your property management journey.
          </motion.p>
        </div>

        {/* Asymmetric Bento Grid */}
        <ServiceBentoGrid services={VALUE_ADDED_BENTO_SERVICES} />
      </div>
    </section>
  );
}
