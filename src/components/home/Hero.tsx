import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowUpRight, Globe, Home, PlayCircle, ShieldCheck } from 'lucide-react';
import {
  DURATION,
  EASE_PREMIUM,
  hasHeroEntrancePlayed,
  markHeroEntrancePlayed,
  useIsDesktopPointer,
} from '../../lib/motion';
import { Container } from '../ui/Container';
import { MaskedLine } from '../ui/MotionPrimitives';
import { SectionLabel } from '../ui/SectionLabel';
import { SmartImage } from '../ui/SmartImage';
import heroImageUrl from '../../assets/images/hero_architecture_villa_1795592748862.webp';

interface HeroProps {
  onConsultClick: () => void;
  onWatchVideoClick: () => void;
}

const HERO_IMAGE = heroImageUrl;

export function Hero({ onConsultClick, onWatchVideoClick }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const isDesktopPointer = useIsDesktopPointer();
  const isHeroInView = useInView(heroRef, { amount: 0.1 });

  const [skipEntrance] = useState<boolean>(() => hasHeroEntrancePlayed());

  useEffect(() => {
    markHeroEntrancePlayed();
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const cardsParallaxY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 110, damping: 24, mass: 0.5 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 110, damping: 24, mass: 0.5 });

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!isDesktopPointer || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(nx * -12);
    pointerY.set(ny * -10);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const floatAnimate = !prefersReduced && isDesktopPointer && isHeroInView;

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[#F9F9F9] border-b border-[#E5E5E5]"
    >
      {/* Desktop Atmospheric Architectural Composition (1440px+) */}
      <div className="hidden lg:block relative min-h-[820px] xl:min-h-[880px]">
        {/* Architectural Background Canvas */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          style={
            isDesktopPointer
              ? { y: imageParallaxY, x: smoothPointerX, translateY: smoothPointerY }
              : undefined
          }
        >
          <SmartImage
            src={HERO_IMAGE}
            alt="Contemporary residential architecture representing modern Bengaluru homes managed by ASV Property Management"
            loading="eager"
            fetchPriority="high"
            width={1376}
            height={768}
            className="h-full w-full object-cover object-right-bottom scale-[1.03]"
            fallbackLabel="Contemporary Bengaluru Residence"
          />
          {/* Sculpted atmospheric scrims preserving architectural clarity on right while keeping left type effortless */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#F9F9F9] via-[#F9F9F9]/92 via-38% to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F9F9F9]/90 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/15 to-transparent"
            aria-hidden="true"
          />
        </motion.div>

        {/* Desktop Foreground Architectural Layer */}
        <Container className="relative z-10 pt-16 xl:pt-20 pb-16 min-h-[820px] xl:min-h-[880px] flex flex-col justify-between">
          <div className="max-w-3xl">
            <SectionLabel text="Professional Property Management · Bengaluru" immediate className="mb-7" />

            <h1 className="hero-headline font-bold text-[#101010] mb-7">
              <MaskedLine immediate skipAnimation={skipEntrance} delay={0.14}>
                Your Property.
              </MaskedLine>
              <MaskedLine immediate skipAnimation={skipEntrance} delay={0.26}>
                Our Management.
              </MaskedLine>
              <MaskedLine immediate skipAnimation={skipEntrance} delay={0.38} className="text-[#ED1C24]">
                Your Peace of Mind.
              </MaskedLine>
            </h1>

            <motion.p
              initial={skipEntrance || prefersReduced ? false : { opacity: 0.01, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.slow, delay: skipEntrance ? 0 : 0.65, ease: EASE_PREMIUM }}
              className="text-lg leading-relaxed text-[#626262] max-w-lg mb-9"
            >
              End-to-end residential property management in Bengaluru for NRIs, investors, and homeowners—from
              verified tenant placement to periodic on-site inspections.
            </motion.p>

            <motion.div
              initial={skipEntrance || prefersReduced ? false : { opacity: 0.01, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.slow, delay: skipEntrance ? 0 : 0.78, ease: EASE_PREMIUM }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={onConsultClick}
                className="btn-press inline-flex items-center gap-2.5 rounded-full bg-[#ED1C24] px-7 py-4 text-sm font-semibold text-white shadow-sm hover:bg-[#C81018] hover:shadow-md group"
              >
                <span>Get a Free Consultation</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={onWatchVideoClick}
                className="btn-press inline-flex items-center gap-2.5 rounded-full border border-[#101010]/15 bg-white/85 backdrop-blur-md px-6 py-4 text-sm font-semibold text-[#101010] hover:border-[#101010] group"
              >
                <PlayCircle
                  className="h-4 w-4 text-[#ED1C24] transition-transform duration-200 group-hover:scale-110"
                  aria-hidden="true"
                />
                <span>Watch How We Work</span>
              </button>
            </motion.div>
          </div>

          {/* Architectural Glassmorphism Callouts (refined typography, no pink icon boxes, zero fake stats) */}
          <motion.div
            style={isDesktopPointer ? { y: cardsParallaxY } : undefined}
            className="relative mt-12 flex items-end justify-between gap-6"
          >
            {/* Card 1: Tenant Management */}
            <motion.div
              initial={skipEntrance || prefersReduced ? false : { opacity: 0.01, y: 18 }}
              animate={{
                opacity: 1,
                y: floatAnimate ? [0, -5, 0] : 0,
              }}
              transition={
                floatAnimate
                  ? {
                      opacity: { duration: 0.5, delay: skipEntrance ? 0 : 0.55, ease: EASE_PREMIUM },
                      y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 },
                    }
                  : { duration: 0.5, delay: skipEntrance ? 0 : 0.55, ease: EASE_PREMIUM }
              }
              className="max-w-[270px] rounded-[20px] border border-white/80 bg-white/75 backdrop-blur-xl px-5 py-4 shadow-[0_16px_40px_rgba(16,16,16,0.08)]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-nums text-[11px] font-medium tracking-wider uppercase text-[#858585]">
                  01 · Occupancy
                </span>
                <ShieldCheck className="h-4 w-4 text-[#ED1C24]" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="font-display text-sm font-semibold text-[#101010]">Tenant Management</div>
              <p className="text-xs leading-relaxed text-[#626262] mt-1">
                Screening, agreements and coordination.
              </p>
            </motion.div>

            <div className="flex items-end gap-4">
              {/* Card 2: Property Care */}
              <motion.div
                initial={skipEntrance || prefersReduced ? false : { opacity: 0.01, y: 18 }}
                animate={{
                  opacity: 1,
                  y: floatAnimate ? [0, -5, 0] : 0,
                }}
                transition={
                  floatAnimate
                    ? {
                        opacity: { duration: 0.5, delay: skipEntrance ? 0 : 0.68, ease: EASE_PREMIUM },
                        y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.2 },
                      }
                    : { duration: 0.5, delay: skipEntrance ? 0 : 0.68, ease: EASE_PREMIUM }
                }
                className="max-w-[265px] rounded-[20px] border border-white/80 bg-white/75 backdrop-blur-xl px-5 py-4 shadow-[0_16px_40px_rgba(16,16,16,0.08)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-nums text-[11px] font-medium tracking-wider uppercase text-[#858585]">
                    02 · Upkeep
                  </span>
                  <Home className="h-4 w-4 text-[#ED1C24]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div className="font-display text-sm font-semibold text-[#101010]">Property Care</div>
                <p className="text-xs leading-relaxed text-[#626262] mt-1">
                  Quarterly inspections and maintenance support.
                </p>
              </motion.div>

              {/* Card 3: NRI Support */}
              <motion.div
                initial={skipEntrance || prefersReduced ? false : { opacity: 0.01, y: 18 }}
                animate={{
                  opacity: 1,
                  y: floatAnimate ? [0, -4, 0] : 0,
                }}
                transition={
                  floatAnimate
                    ? {
                        opacity: { duration: 0.5, delay: skipEntrance ? 0 : 0.8, ease: EASE_PREMIUM },
                        y: { duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 1.7 },
                      }
                    : { duration: 0.5, delay: skipEntrance ? 0 : 0.8, ease: EASE_PREMIUM }
                }
                className="hidden xl:block max-w-[265px] rounded-[20px] border border-white/80 bg-white/75 backdrop-blur-xl px-5 py-4 shadow-[0_16px_40px_rgba(16,16,16,0.08)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-nums text-[11px] font-medium tracking-wider uppercase text-[#858585]">
                    03 · Overseas
                  </span>
                  <Globe className="h-4 w-4 text-[#ED1C24]" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div className="font-display text-sm font-semibold text-[#101010]">NRI Support</div>
                <p className="text-xs leading-relaxed text-[#626262] mt-1">
                  Local management in Bengaluru while abroad.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Dedicated Mobile Composition (390px optimized) */}
      <div className="lg:hidden pt-8 pb-10">
        <Container>
          <SectionLabel text="Professional Property Management" immediate className="mb-4" />

          <h1 className="font-display text-[clamp(2rem,8.8vw,2.875rem)] font-bold leading-[1.06] tracking-[-0.03em] text-[#101010] mb-4">
            <MaskedLine immediate skipAnimation={skipEntrance} delay={0.08}>
              Your Property.
            </MaskedLine>
            <MaskedLine immediate skipAnimation={skipEntrance} delay={0.18}>
              Our Management.
            </MaskedLine>
            <MaskedLine immediate skipAnimation={skipEntrance} delay={0.28} className="text-[#ED1C24]">
              Your Peace of Mind.
            </MaskedLine>
          </h1>

          <motion.p
            initial={skipEntrance || prefersReduced ? false : { opacity: 0.01, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.standard, delay: skipEntrance ? 0 : 0.35, ease: EASE_PREMIUM }}
            className="text-[15px] sm:text-base leading-relaxed text-[#626262] mb-6"
          >
            End-to-end property management in Bengaluru for NRIs, investors and homeowners. From finding the
            right tenants to maintaining your property, we take care of the details.
          </motion.p>

          <motion.div
            initial={skipEntrance || prefersReduced ? false : { opacity: 0.01, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.standard, delay: skipEntrance ? 0 : 0.42, ease: EASE_PREMIUM }}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            <button
              type="button"
              onClick={onConsultClick}
              className="btn-press flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#ED1C24] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#C81018]"
            >
              <span>Get a Free Consultation</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onWatchVideoClick}
              className="btn-press flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-6 py-3.5 text-sm font-semibold text-[#101010] hover:border-[#101010]"
            >
              <PlayCircle className="h-4 w-4 text-[#ED1C24]" aria-hidden="true" />
              <span>Watch How We Work</span>
            </button>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-[#E5E5E5] bg-white aspect-[4/3]">
              <SmartImage
                src={HERO_IMAGE}
                alt="Contemporary residential architecture managed with ASV Property Management standards"
                loading="eager"
                fetchPriority="high"
                width={1376}
                height={768}
                className="h-full w-full object-cover object-right"
                fallbackLabel="Contemporary Bengaluru Residence"
              />
            </div>
            <div className="mt-3 sm:mt-0 sm:absolute sm:bottom-3 sm:right-3 sm:max-w-[270px] rounded-2xl border border-[#E5E5E5] sm:border-white/85 bg-white sm:bg-white/85 sm:backdrop-blur-md px-4 py-3 shadow-sm sm:shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-display text-xs font-semibold text-[#101010]">NRI Property Care</div>
                  <p className="text-[11px] leading-snug text-[#626262]">
                    Periodic inspections &amp; local support in Bengaluru
                  </p>
                </div>
                <Globe className="h-4 w-4 text-[#ED1C24] shrink-0" strokeWidth={1.75} aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
