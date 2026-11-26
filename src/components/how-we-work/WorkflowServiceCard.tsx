import { motion, useReducedMotion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import type { ProcessService } from '../../types';
import { PROCESS_ICON_MAP } from './processIconMap';
import { SideCardConnector } from './WorkflowConnector';

interface WorkflowServiceCardProps {
  service: ProcessService;
  side?: 'left' | 'right';
  index: number;
  isActive: boolean;
  isVisited: boolean;
  isInActivePhase: boolean;
  canHover: boolean;
  onSelect: (serviceId: string) => void;
  onHoverStart?: (serviceId: string) => void;
  onHoverEnd?: () => void;
  onFocusStart?: (serviceId: string) => void;
  onFocusEnd?: () => void;
  showConnector?: boolean;
}

export function WorkflowServiceCard({
  service,
  side = 'left',
  index,
  isActive,
  isVisited,
  isInActivePhase,
  canHover,
  onSelect,
  onHoverStart,
  onHoverEnd,
  onFocusStart,
  onFocusEnd,
  showConnector = true,
}: WorkflowServiceCardProps) {
  const reduced = useReducedMotion();
  const Icon = PROCESS_ICON_MAP[service.icon];
  const slideOffset = side === 'left' ? -18 : 18;

  return (
    <motion.div
      data-workflow-service={service.id}
      initial={reduced ? false : { opacity: 0, x: slideOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{
        duration: DURATION.standard,
        delay: 0.1 + index * 0.06,
        ease: EASE_PREMIUM,
      }}
      className="relative"
    >
      {showConnector && (
        <SideCardConnector
          side={side}
          isActive={isActive}
          isVisited={isVisited}
          isInActivePhase={isInActivePhase}
        />
      )}

      <button
        type="button"
        onClick={() => onSelect(service.id)}
        onMouseEnter={canHover ? () => onHoverStart?.(service.id) : undefined}
        onMouseLeave={canHover ? () => onHoverEnd?.() : undefined}
        onFocus={() => onFocusStart?.(service.id)}
        onBlur={() => onFocusEnd?.()}
        aria-pressed={isActive}
        aria-current={isActive ? 'step' : undefined}
        className={`group w-full rounded-[20px] border p-4 lg:p-4 xl:p-5 text-left transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out min-h-[88px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24] ${
          isActive
            ? `border-[#ED1C24] bg-white shadow-[0_16px_34px_-18px_rgba(237,28,36,0.26)] ring-1 ring-[#ED1C24]/20 ${
                reduced ? '' : '-translate-y-1'
              }`
            : isInActivePhase
              ? 'border-[#101010]/35 bg-white shadow-[0_12px_28px_-18px_rgba(16,16,16,0.14)] hover:-translate-y-0.5 hover:border-[#ED1C24]/60'
              : isVisited
                ? 'border-[#101010]/25 bg-white shadow-[0_10px_24px_-18px_rgba(16,16,16,0.11)] hover:border-[#ED1C24]/50 hover:-translate-y-0.5'
                : 'border-[#E5E7EB] bg-white/95 shadow-[0_10px_24px_-18px_rgba(16,16,16,0.09)] hover:bg-white hover:border-[#101010]/25 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_rgba(16,16,16,0.15)]'
        }`}
      >
        <div className="flex items-start gap-3.5 xl:gap-4">
          <span
            className={`inline-flex h-10 w-10 xl:h-12 xl:w-12 shrink-0 items-center justify-center rounded-xl border transition-[background-color,border-color,color] duration-250 ease-out ${
              isActive
                ? 'border-[#ED1C24] bg-[#ED1C24] text-white'
                : isInActivePhase || isVisited
                  ? 'border-[#ED1C24]/35 bg-[#FFF5F5] text-[#ED1C24]'
                  : 'border-[#E5E7EB] bg-[#F7F7F8] text-[#ED1C24] group-hover:border-[#ED1C24]/35 group-hover:bg-[#FFF5F5]'
            }`}
          >
            <Icon
              className={`h-5 w-5 xl:h-[22px] xl:w-[22px] transition-transform duration-200 ease-out ${
                isActive ? 'scale-105' : 'group-hover:scale-105'
              }`}
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-sm lg:text-[15px] xl:text-base font-bold text-[#101010] leading-snug">
                {service.name}
              </h3>
              <ChevronRight
                className={`h-4 w-4 shrink-0 transition-[color,transform] duration-250 ease-out ${
                  isActive
                    ? 'text-[#ED1C24] translate-x-0.5'
                    : isVisited
                      ? 'text-[#101010]/65 group-hover:translate-x-0.5'
                      : 'text-[#9CA3AF] group-hover:text-[#101010] group-hover:translate-x-0.5'
                }`}
                aria-hidden="true"
              />
            </div>

            <p className="mt-1 text-xs xl:text-[13px] text-[#626262] leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </button>
    </motion.div>
  );
}
