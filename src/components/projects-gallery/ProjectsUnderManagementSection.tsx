import { useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MANAGED_PROJECTS } from '../../data/projects';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import { ProjectGallery } from './ProjectGallery';
import { ProjectGalleryNavigation } from './ProjectGalleryNavigation';
import { PropertyConsultationCTA } from './PropertyConsultationCTA';

export function ProjectsUnderManagementSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = useReducedMotion();

  const total = MANAGED_PROJECTS.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section
      id="projects"
      aria-label="Projects Under Management"
      className="scroll-mt-20 py-16 sm:py-24 lg:py-28 xl:py-[112px] bg-[#F7F7F8] border-b border-[#E5E7EB] overflow-x-clip"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Top Architectural Header with Right-Aligned Gallery Navigation */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-12">
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
                OUR PROPERTY PORTFOLIO
              </span>
            </motion.div>

            <motion.h2
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
              className="section-heading font-bold text-[#101010] tracking-tight"
            >
              Projects Under <span className="text-[#ED1C24]">Management</span>
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
              className="mt-4 text-sm sm:text-base lg:text-lg text-[#626262] leading-relaxed"
            >
              Professional property care across Bengaluru&apos;s residential communities.
            </motion.p>
          </div>

          <ProjectGalleryNavigation
            activeIndex={activeIndex}
            total={total}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>

        {/* Interactive Featured Gallery + 4-Card Thumbnail Window */}
        <ProjectGallery
          projects={MANAGED_PROJECTS}
          activeIndex={activeIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelect={handleSelect}
        />

        {/* Independent Unit Management Disclaimer */}
        <p className="mt-7 text-xs text-[#626262] leading-relaxed max-w-3xl">
          Note: Communities listed above represent residential developments where ASV manages
          individual homeowner units. ASV operates independently on behalf of unit owners and does
          not claim ownership or official developer partnerships.
        </p>

        {/* Bottom Bengaluru Homeowner CTA */}
        <PropertyConsultationCTA />
      </div>
    </section>
  );
}
