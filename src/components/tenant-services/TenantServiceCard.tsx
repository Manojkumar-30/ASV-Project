import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, ChevronRight } from 'lucide-react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import type { TenantServiceItem } from '../../types';
import { ServiceIcon } from './ServiceIcon';

interface TenantServiceCardProps {
  service: TenantServiceItem;
  index: number;
  isSelectedDesktop: boolean;
  isExpandedMobile: boolean;
  onCardClick: (service: TenantServiceItem) => void;
  onConsultClick: () => void;
}

export function TenantServiceCard({
  service,
  index,
  isSelectedDesktop,
  isExpandedMobile,
  onCardClick,
  onConsultClick,
}: TenantServiceCardProps) {
  const reduced = useReducedMotion();
  const detailPanelId = `mobile-tenant-service-${service.id}`;

  return (
    <motion.article
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{
        duration: 0.45,
        delay: Math.min(index, 11) * 0.065,
        ease: EASE_PREMIUM,
      }}
      className="h-full"
    >
      <div
        className={`group relative h-full flex flex-col rounded-[22px] border bg-white transition-all duration-300 ${
          isSelectedDesktop || isExpandedMobile
            ? 'border-[#ED1C24]/70 shadow-[0_20px_44px_-22px_rgba(237,28,36,0.22)]'
            : 'border-[#E8E8E8] shadow-[0_12px_30px_-20px_rgba(16,16,16,0.12)] hover:-translate-y-1.5 hover:border-[#ED1C24]/45 hover:shadow-[0_22px_44px_-22px_rgba(237,28,36,0.18)]'
        }`}
      >
        {/* Small red accent line along the upper-left edge */}
        <span
          className={`pointer-events-none absolute top-0 left-6 h-[3px] rounded-b-full bg-[#ED1C24] transition-all duration-300 ${
            isSelectedDesktop || isExpandedMobile ? 'w-16' : 'w-10 group-hover:w-16'
          }`}
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={() => onCardClick(service)}
          aria-expanded={isExpandedMobile}
          aria-controls={isExpandedMobile ? detailPanelId : undefined}
          aria-label={`Inspect ${service.title} service details`}
          className="flex-1 w-full p-5 sm:p-6 lg:p-6 xl:p-7 text-left flex flex-col justify-between rounded-[22px] min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]"
        >
          <div className="w-full">
            {/* Top Header Row: Icon Box + Title + Small Arrow Button */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <span
                  className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] transition-colors duration-200 ${
                    isSelectedDesktop || isExpandedMobile
                      ? 'bg-[#ED1C24] text-white'
                      : 'bg-[#FFF0F0] text-[#ED1C24] group-hover:bg-[#ED1C24] group-hover:text-white'
                  }`}
                >
                  <ServiceIcon icon={service.icon} className="h-[22px] w-[22px]" strokeWidth={1.75} />
                </span>

                <div className="min-w-0 pt-0.5">
                  <span className="block font-mono-nums text-[11px] font-medium text-[#858585] mb-0.5">
                    {service.stepNumber}
                  </span>
                  <h3 className="font-display text-[17px] xl:text-[18px] font-bold text-[#101010] leading-snug">
                    {service.title}
                  </h3>
                </div>
              </div>

              <span
                className={`mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                  isSelectedDesktop || isExpandedMobile
                    ? 'border-[#ED1C24] bg-[#ED1C24] text-white translate-x-0.5'
                    : 'border-[#F0E4E4] bg-[#FFF8F8] text-[#ED1C24] group-hover:border-[#ED1C24] group-hover:bg-[#ED1C24] group-hover:text-white group-hover:translate-x-1'
                }`}
                aria-hidden="true"
              >
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isExpandedMobile ? 'rotate-90 md:rotate-0' : ''
                  }`}
                />
              </span>
            </div>

            {/* Short Description */}
            <p className="mt-4 text-sm text-[#626262] leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </button>

        {/* Mobile Inline Expandable Service Details (< md) */}
        <div className="md:hidden">
          <AnimatePresence initial={false}>
            {isExpandedMobile && (
              <motion.div
                id={detailPanelId}
                initial={reduced ? { opacity: 1 } : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={{ duration: DURATION.standard, ease: EASE_PREMIUM }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-3 border-t border-[#F0F0F0] space-y-3.5">
                  <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#101010] mb-2">
                      Key Activities Included
                    </div>
                    <ul className="space-y-2">
                      {service.activities.map((activity) => (
                        <li
                          key={activity}
                          className="flex items-start gap-2 text-xs sm:text-sm text-[#101010] leading-snug"
                        >
                          <Check
                            className="h-4 w-4 text-[#ED1C24] shrink-0 mt-0.5"
                            strokeWidth={2.2}
                            aria-hidden="true"
                          />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {service.contractualNote && (
                    <p className="rounded-xl bg-[#F8F8F8] border border-[#E8E8E8] px-3 py-2.5 text-[11px] sm:text-xs text-[#626262] leading-relaxed">
                      {service.contractualNote}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={onConsultClick}
                    className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ED1C24] hover:bg-[#C81018] px-5 py-3 text-xs sm:text-sm font-semibold text-white transition-colors min-h-[44px]"
                  >
                    <span>Get a Free Consultation</span>
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}
