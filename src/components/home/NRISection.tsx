import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Globe } from 'lucide-react';
import { useIsDesktopPointer } from '../../lib/motion';
import { Container } from '../ui/Container';
import { ClipImageReveal, EditorialReveal, MaskedLine } from '../ui/MotionPrimitives';
import { SectionLabel } from '../ui/SectionLabel';
import { SmartImage } from '../ui/SmartImage';

interface NRISectionProps {
  onConsultClick: () => void;
}

const NRI_NEEDS = [
  'Managing residential properties remotely from overseas',
  'Finding, verifying, and onboarding suitable tenants',
  'Coordinating monthly rent and security deposits',
  'Periodic on-site inspections with photographic updates',
  'Coordinating plumbing, electrical, and carpentry repairs',
  'Rental agreement preparation and renewal paperwork',
  'Structured tenant exit checks and final settlement',
  'Dedicated local assistance in Bengaluru',
];

export function NRISection({ onConsultClick }: NRISectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isDesktopPointer = useIsDesktopPointer();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-22, 24]);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 lg:py-32 bg-[#F5F4F2] border-b border-[#E5E5E5] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            <SectionLabel text="Designed for NRI Homeowners" className="mb-5" />

            <h2 className="section-heading font-bold text-[#101010] mb-6">
              <MaskedLine>Miles away.</MaskedLine>
              <MaskedLine delay={0.1} className="text-[#ED1C24]">
                Never disconnected.
              </MaskedLine>
            </h2>

            <EditorialReveal delay={0.12} className="max-w-xl mb-10">
              <p className="text-base sm:text-lg leading-relaxed text-[#626262]">
                Living overseas should not make owning property in India uncertain. ASV serves as your
                accountable local presence in Bengaluru—handling tenant coordination, maintenance oversight,
                inspections, and clear communication.
              </p>
            </EditorialReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 divide-y divide-[#E5E5E5] sm:divide-y-0 border-y border-[#E5E5E5] py-6 mb-10">
              {NRI_NEEDS.map((need, idx) => (
                <EditorialReveal
                  key={need}
                  delay={0.06 + idx * 0.035}
                  direction="left"
                  distance={10}
                  className="flex items-baseline gap-3 py-2.5 text-[15px] text-[#101010]"
                >
                  <span className="font-mono-nums text-xs text-[#ED1C24] shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-snug">{need}</span>
                </EditorialReveal>
              ))}
            </div>

            <EditorialReveal delay={0.2} className="flex flex-wrap items-center gap-4">
              <Link
                to="/nri-property-management"
                className="btn-press inline-flex items-center gap-2 rounded-full bg-[#ED1C24] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#C81018] hover:shadow-md group"
              >
                <span>Explore NRI Property Management</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </Link>

              <button
                type="button"
                onClick={onConsultClick}
                className="btn-press inline-flex items-center gap-2 rounded-full border border-[#101010]/20 bg-white px-6 py-3.5 text-sm font-semibold text-[#101010] hover:border-[#101010]"
              >
                <span>International Enquiry</span>
              </button>
            </EditorialReveal>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <ClipImageReveal className="relative h-full min-h-[360px] lg:min-h-[600px] rounded-2xl overflow-hidden bg-[#EAEAEA]">
              <motion.div
                style={isDesktopPointer ? { y: imageY } : undefined}
                className="h-full w-full will-change-transform"
              >
                <SmartImage
                  src="/src/assets/images/nri_editorial_living_1795592749819.webp"
                  alt="Sunlit minimalist apartment living room overlooking Bengaluru greenery"
                  className="h-full w-full object-cover scale-[1.06]"
                  fallbackLabel="NRI Residence Oversight"
                />
              </motion.div>

              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-[260px] rounded-2xl border border-white/80 bg-white/80 backdrop-blur-xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono-nums text-[11px] uppercase tracking-wider text-[#858585]">
                    Bengaluru · IST
                  </span>
                  <Globe className="h-4 w-4 text-[#ED1C24]" strokeWidth={1.6} aria-hidden="true" />
                </div>
                <div className="font-display text-sm font-semibold text-[#101010]">
                  Dedicated Ground Team
                </div>
                <p className="text-xs text-[#626262] mt-0.5">
                  On-site inspections &amp; key custody while you live abroad.
                </p>
              </div>
            </ClipImageReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
