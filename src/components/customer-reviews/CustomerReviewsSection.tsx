import { motion, useReducedMotion } from 'motion/react';
import { Globe, MapPin } from 'lucide-react';
import { CUSTOMER_TESTIMONIALS } from '../../data/testimonials';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import { TestimonialCarousel } from './TestimonialCarousel';

export function CustomerReviewsSection() {
  const reduced = useReducedMotion();

  const communities = Array.from(new Set(CUSTOMER_TESTIMONIALS.map((t) => t.community)));

  return (
    <section
      id="reviews"
      aria-label="Customer Reviews"
      className="scroll-mt-20 py-16 sm:py-24 lg:py-28 xl:py-[112px] bg-white border-b border-[#E5E7EB] overflow-x-clip"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 lg:mb-14">
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: DURATION.standard, ease: EASE_PREMIUM }}
            className="inline-flex items-center gap-3 mb-3 sm:mb-4"
          >
            <span className="h-[1.5px] w-7 bg-[#ED1C24]" aria-hidden="true" />
            <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#C81018]">
              CUSTOMER STORIES
            </span>
          </motion.div>

          <motion.h2
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
            className="section-heading font-bold text-[#101010] tracking-tight"
          >
            Trust That Goes <span className="text-[#ED1C24]">Beyond Borders.</span>
          </motion.h2>

          <motion.div
            initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: DURATION.slow, delay: 0.1, ease: EASE_PREMIUM }}
            className="mt-4 h-[2.5px] w-16 origin-left bg-[#ED1C24]"
            aria-hidden="true"
          />

          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: DURATION.slow, delay: 0.12, ease: EASE_PREMIUM }}
            className="mt-5 text-sm sm:text-base lg:text-lg text-[#626262] leading-relaxed max-w-2xl"
          >
            Real experiences from property owners who trust ASV with their homes in India.
          </motion.p>
        </div>

        {/* Asymmetric 2-Column Editorial Split: Left 40% Dark Trust Card | Right 60% Review Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left 40% Editorial Dark Card */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
            className="lg:col-span-5 relative overflow-hidden rounded-[22px] sm:rounded-[24px] bg-[#101010] p-7 sm:p-9 lg:p-10 text-white flex flex-col justify-between shadow-[0_24px_60px_rgba(16,16,16,0.16)]"
          >
            {/* Subtle Monochrome Cross-Border Meridian Linework */}
            <svg
              viewBox="0 0 420 420"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -bottom-16 h-80 w-80 text-white opacity-[0.07]"
            >
              <circle cx="210" cy="210" r="185" stroke="currentColor" strokeWidth="1" />
              <circle cx="210" cy="210" r="135" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="210" cy="210" r="85" stroke="currentColor" strokeWidth="1" />
              <ellipse cx="210" cy="210" rx="185" ry="72" stroke="currentColor" strokeWidth="1" />
              <ellipse cx="210" cy="210" rx="72" ry="185" stroke="currentColor" strokeWidth="1" />
              <path d="M25 210H395M210 25V395" stroke="currentColor" strokeWidth="1" />
            </svg>

            <div className="relative z-10">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ED1C24]/35 bg-[#ED1C24]/15 text-[#ED1C24]">
                <Globe className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
              </div>

              <p className="mt-7 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#ED1C24]">
                NRI &amp; HOMEOWNER TRUST
              </p>

              <h3 className="mt-3 font-display text-2xl sm:text-3xl lg:text-[34px] font-bold leading-[1.12] tracking-[-0.025em] text-white">
                Across Borders. Close to Home.
              </h3>

              <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-neutral-300 max-w-md">
                Building lasting relationships through professional property care and personal attention.
              </p>
            </div>

            <div className="relative z-10 mt-10 pt-6 border-t border-white/12">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-400 mb-3">
                Featured Homeowner Communities
              </p>
              <div className="flex flex-wrap gap-2">
                {communities.map((community) => (
                  <span
                    key={community}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-neutral-200"
                  >
                    <MapPin className="h-3 w-3 text-[#ED1C24] shrink-0" aria-hidden="true" />
                    <span>{community}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right 60% Interactive Testimonial Carousel */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: DURATION.slow, delay: 0.08, ease: EASE_PREMIUM }}
            className="lg:col-span-7"
          >
            <TestimonialCarousel testimonials={CUSTOMER_TESTIMONIALS} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
