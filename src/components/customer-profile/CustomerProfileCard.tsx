import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import type { CustomerProfileItem } from '../../types';
import { SmartImage } from '../ui/SmartImage';
import { CustomerBenefit } from './CustomerBenefit';
import { CustomerProfileCTA } from './CustomerProfileCTA';

interface CustomerProfileCardProps {
  profile: CustomerProfileItem;
  index: number;
}

export function CustomerProfileCard({ profile, index }: CustomerProfileCardProps) {
  const reduced = useReducedMotion();
  const isDark = profile.theme === 'dark';

  return (
    <motion.article
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{
        duration: DURATION.slow,
        delay: index * 0.1,
        ease: EASE_PREMIUM,
      }}
      className="h-full"
    >
      <div
        className={`group h-full flex flex-col rounded-[24px] border overflow-hidden transition-all duration-300 motion-safe:hover:-translate-y-1 ${
          isDark
            ? 'bg-[#101010] border-[#262626] text-white shadow-[0_22px_56px_-28px_rgba(16,16,16,0.45)] hover:shadow-[0_28px_68px_-26px_rgba(16,16,16,0.6)]'
            : 'bg-white border-[#E5E7EB] text-[#101010] shadow-[0_18px_50px_-28px_rgba(16,16,16,0.14)] hover:shadow-[0_26px_62px_-28px_rgba(16,16,16,0.22)]'
        }`}
      >
        {/* Top Photographic Lifestyle Area */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#1A1A1A]">
          <SmartImage
            src={profile.image}
            alt={profile.imageAlt}
            loading="lazy"
            width={1280}
            height={720}
            fallbackLabel={profile.fullCategoryName}
            className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
          />

          {/* Subtle gradient scrim for floating glass caption legibility */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/65"
            aria-hidden="true"
          />

          {/* Subtle Floating Glass Label */}
          <div
            className={`absolute bottom-4 left-4 sm:bottom-5 sm:left-5 rounded-xl px-3.5 py-2 text-xs font-medium backdrop-blur-md shadow-sm transition-transform duration-300 ${
              isDark
                ? 'bg-[#101010]/75 text-white border border-white/15'
                : 'bg-white/90 text-[#101010] border border-white/60'
            }`}
          >
            {profile.floatingBadge}
          </div>
        </div>

        {/* Card Content Body */}
        <div className="flex-1 p-5 sm:p-7 lg:p-8 xl:p-9 flex flex-col justify-between">
          <div>
            {/* Unboxed Metadata Line */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span
                className={`font-mono-nums text-xs font-semibold tracking-[0.14em] uppercase ${
                  isDark ? 'text-[#FF5A60]' : 'text-[#C81018]'
                }`}
              >
                {profile.eyebrowLabel}
              </span>
              <span
                className={`text-xs font-medium ${
                  isDark ? 'text-neutral-400' : 'text-[#626262]'
                }`}
              >
                {profile.fullCategoryName}
              </span>
            </div>

            {/* Category & Editorial Headline */}
            <div className="mb-3">
              <div
                className={`font-display text-sm font-bold uppercase tracking-[0.1em] mb-1.5 ${
                  isDark ? 'text-neutral-300' : 'text-[#626262]'
                }`}
              >
                {profile.category}
              </div>
              <h3
                className={`font-display text-2xl sm:text-[26px] lg:text-[28px] font-bold leading-[1.18] tracking-tight ${
                  isDark ? 'text-white' : 'text-[#101010]'
                }`}
              >
                {profile.headline}
              </h3>
            </div>

            {/* Description */}
            <p
              className={`text-sm sm:text-[15px] leading-relaxed ${
                isDark ? 'text-neutral-300' : 'text-[#626262]'
              }`}
            >
              {profile.description}
            </p>
          </div>

          {/* Four Key Benefits + Primary CTA */}
          <div className="mt-6">
            <ul
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3.5 pt-5 border-t ${
                isDark ? 'border-[#262626]' : 'border-[#E5E7EB]'
              }`}
            >
              {profile.benefits.map((benefit) => (
                <CustomerBenefit key={benefit.id} benefit={benefit} theme={profile.theme} />
              ))}
            </ul>

            <div className="mt-7">
              <CustomerProfileCTA
                label={profile.ctaLabel}
                href={profile.ctaHref}
                theme={profile.theme}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
