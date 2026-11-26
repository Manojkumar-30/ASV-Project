import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import type { ProcessOrbitPosition, ProcessService } from '../../types';
import { PROCESS_ICON_MAP } from './processIconMap';

interface WorkflowNodeProps {
  service: ProcessService;
  isActive: boolean;
  isVisited: boolean;
  isInActivePhase: boolean;
  clockwiseIndex: number;
  canHover: boolean;
  onSelect: (serviceId: string) => void;
  onHoverStart?: (serviceId: string) => void;
  onHoverEnd?: () => void;
  onFocusStart?: (serviceId: string) => void;
  onFocusEnd?: () => void;
  forceDesktopGeometry?: boolean;
}

const POSITION_STYLES: Record<ProcessOrbitPosition, string> = {
  top: 'left-1/2 top-[13.5%]',
  'upper-right': 'left-[81.6%] top-[31.75%]',
  'lower-right': 'left-[81.6%] top-[68.25%]',
  bottom: 'left-1/2 top-[86.5%]',
  'lower-left': 'left-[18.4%] top-[68.25%]',
  'upper-left': 'left-[18.4%] top-[31.75%]',
};

const ROUNDED_HEXAGON_PATH =
  'M 64 4 C 67 4 70 5 73 6.7 L 116 31.5 C 121.5 34.7 124 38.5 124 44.5 L 124 95.5 C 124 101.5 121.5 105.3 116 108.5 L 73 133.3 C 70 135 67 136 64 136 C 61 136 58 135 55 133.3 L 12 108.5 C 6.5 105.3 4 101.5 4 95.5 L 4 44.5 C 4 38.5 6.5 34.7 12 31.5 L 55 6.7 C 58 5 61 4 64 4 Z';

export function WorkflowNode({
  service,
  isActive,
  isVisited,
  isInActivePhase,
  clockwiseIndex,
  canHover,
  onSelect,
  onHoverStart,
  onHoverEnd,
  onFocusStart,
  onFocusEnd,
  forceDesktopGeometry = false,
}: WorkflowNodeProps) {
  const reduced = useReducedMotion();
  const Icon = PROCESS_ICON_MAP[service.icon];
  const posClass = POSITION_STYLES[service.orbitPosition ?? 'top'];

  const fillColor = isActive
    ? '#ED1C24'
    : isInActivePhase
      ? '#FFF7F7'
      : isVisited
        ? '#FAFAFB'
        : '#FFFFFF';

  const strokeColor = isActive
    ? '#C81018'
    : isInActivePhase
      ? '#ED1C24'
      : isVisited
        ? 'rgba(16, 16, 16, 0.35)'
        : '#E5E7EB';

  return (
    <motion.div
      data-workflow-service={service.id}
      className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 ${posClass}`}
      initial={reduced ? false : { opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{
        duration: DURATION.standard,
        delay: 0.1 + clockwiseIndex * 0.06,
        ease: EASE_PREMIUM,
      }}
    >
      <button
        type="button"
        onClick={() => onSelect(service.id)}
        onMouseEnter={canHover ? () => onHoverStart?.(service.id) : undefined}
        onMouseLeave={canHover ? () => onHoverEnd?.() : undefined}
        onFocus={() => onFocusStart?.(service.id)}
        onBlur={() => onFocusEnd?.()}
        aria-pressed={isActive}
        aria-current={isActive ? 'step' : undefined}
        aria-label={`${service.name} — Step ${service.stepNumber}`}
        className={`group relative flex flex-col items-center justify-center ${forceDesktopGeometry ? 'w-[122px] h-[134px]' : 'w-[98px] h-[108px] sm:w-[116px] sm:h-[126px] lg:w-[100px] lg:h-[110px] xl:w-[122px] xl:h-[134px]'} transition-[transform,filter] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ED1C24] rounded-2xl ${
          isActive
            ? reduced
              ? 'drop-shadow-[0_12px_24px_rgba(237,28,36,0.24)]'
              : 'scale-[1.03] drop-shadow-[0_14px_26px_rgba(237,28,36,0.24)]'
            : canHover
              ? 'hover:-translate-y-0.5 drop-shadow-[0_10px_22px_rgba(16,16,16,0.08)] hover:drop-shadow-[0_14px_26px_rgba(16,16,16,0.13)]'
              : 'drop-shadow-[0_10px_22px_rgba(16,16,16,0.08)]'
        }`}
      >
        {/* Rounded Hexagon SVG Backdrop */}
        <svg
          viewBox="0 0 128 140"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d={ROUNDED_HEXAGON_PATH}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={isActive || isInActivePhase ? 2.2 : isVisited ? 1.9 : 1.75}
            style={
              reduced
                ? undefined
                : { transition: 'fill 280ms ease-out, stroke 280ms ease-out' }
            }
          />
        </svg>

        {/* Node Content */}
        <span className="relative z-10 flex flex-col items-center justify-center text-center px-2.5">
          <Icon
            className={`${forceDesktopGeometry ? 'h-6 w-6' : 'h-5 w-5 sm:h-6 sm:w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6'} mb-1.5 transition-[color,transform] duration-200 ease-out ${
              isActive
                ? 'text-white scale-105'
                : 'text-[#ED1C24] group-hover:scale-105'
            }`}
            strokeWidth={1.85}
            aria-hidden="true"
          />
          <span
            className={`font-display ${forceDesktopGeometry ? 'text-[12.5px]' : 'text-[11px] sm:text-xs lg:text-[11px] xl:text-[12.5px]'} font-bold leading-[1.2] tracking-tight transition-colors duration-250 ease-out ${
              isActive ? 'text-white' : 'text-[#101010]'
            }`}
          >
            {service.name}
          </span>
        </span>
      </button>
    </motion.div>
  );
}
