import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import type { ProcessPhaseId, ProcessService } from '../../types';
import { OrbitSvgTracks } from './WorkflowConnector';
import { WorkflowNode } from './WorkflowNode';

interface WorkflowOrbitProps {
  orbitServices: ProcessService[];
  activeServiceId: string;
  activePhaseId: ProcessPhaseId;
  visitedServiceIds: Set<string>;
  orbitProgress: number;
  isJourneyComplete?: boolean;
  canHover: boolean;
  onSelectService: (serviceId: string) => void;
  onHoverStart?: (serviceId: string) => void;
  onHoverEnd?: () => void;
  onFocusStart?: (serviceId: string) => void;
  onFocusEnd?: () => void;
  forceDesktopGeometry?: boolean;
}

const CLOCKWISE_ORDER: Record<string, number> = {
  top: 0,
  'upper-right': 1,
  'lower-right': 2,
  bottom: 3,
  'lower-left': 4,
  'upper-left': 5,
};

export function WorkflowOrbit({
  orbitServices,
  activeServiceId,
  activePhaseId,
  visitedServiceIds,
  orbitProgress,
  isJourneyComplete = false,
  canHover,
  onSelectService,
  onHoverStart,
  onHoverEnd,
  onFocusStart,
  onFocusEnd,
  forceDesktopGeometry = false,
}: WorkflowOrbitProps) {
  const reduced = useReducedMotion();

  return (
    <div className="relative w-full max-w-[460px] lg:max-w-[450px] xl:max-w-[480px] 2xl:max-w-[540px] aspect-square mx-auto select-none">
      {/* Animated Circular Dotted Orbit, Scroll Progress Arc & 6 Radial Connecting Arrows */}
      <OrbitSvgTracks
        orbitServices={orbitServices}
        activeServiceId={activeServiceId}
        activePhaseId={activePhaseId}
        visitedServiceIds={visitedServiceIds}
        orbitProgress={orbitProgress}
        isJourneyComplete={isJourneyComplete}
      />

      {/* Central Architectural Property Management Illustration */}
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex ${forceDesktopGeometry ? 'h-[156px] w-[156px]' : 'h-[136px] w-[136px] sm:h-[164px] sm:w-[164px] lg:h-[138px] lg:w-[138px] xl:h-[156px] xl:w-[156px] 2xl:h-[172px] 2xl:w-[172px]'} items-center justify-center rounded-full bg-white border border-[#E5E7EB] shadow-[0_20px_50px_-22px_rgba(16,16,16,0.22)]`}
      >
        <div className="flex flex-col items-center justify-center p-3 text-center">
          {/* Minimalist Architectural Villa / Residential Elevation Illustration */}
          <svg
            viewBox="0 0 112 92"
            className="w-[74px] h-[60px] sm:w-[88px] sm:h-[72px] lg:w-[74px] lg:h-[60px] xl:w-[84px] xl:h-[68px] 2xl:w-[92px] 2xl:h-[74px]"
            aria-label="Architectural residential property management emblem"
            role="img"
          >
            {/* Architectural Ground Plane */}
            <line
              x1="10"
              y1="78"
              x2="102"
              y2="78"
              stroke="#101010"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Secondary Side Wing */}
            <rect
              x="16"
              y="42"
              width="28"
              height="36"
              rx="1.5"
              fill="#F7F7F8"
              stroke="#101010"
              strokeWidth="1.8"
            />
            <line x1="22" y1="52" x2="38" y2="52" stroke="#101010" strokeWidth="1.4" />
            <line x1="22" y1="60" x2="38" y2="60" stroke="#101010" strokeWidth="1.4" />

            {/* Primary Modern Architectural Tower */}
            <rect
              x="44"
              y="24"
              width="48"
              height="54"
              rx="2"
              fill="#FFFFFF"
              stroke="#101010"
              strokeWidth="2"
            />

            {/* ASV Red Cantilevered Roofline Accent */}
            <path
              d="M 40 24 L 68 10 L 96 24"
              fill="none"
              stroke="#ED1C24"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="64" y="18" width="8" height="3" rx="1" fill="#ED1C24" />

            {/* Glass Facade Grid Lines */}
            <rect
              x="52"
              y="33"
              width="14"
              height="14"
              rx="1"
              fill="#FFF1F1"
              stroke="#ED1C24"
              strokeWidth="1.4"
            />
            <rect
              x="72"
              y="33"
              width="12"
              height="14"
              rx="1"
              fill="#F7F7F8"
              stroke="#101010"
              strokeWidth="1.4"
            />

            {/* Entrance Doorway & Key Care Detail */}
            <rect
              x="61"
              y="56"
              width="14"
              height="22"
              rx="1"
              fill="#101010"
            />
            <circle cx="71" cy="67" r="1.5" fill="#ED1C24" />

            {/* Architectural Tree / Landscape Minimalist Outline */}
            <circle cx="96" cy="64" r="6" fill="#F7F7F8" stroke="#101010" strokeWidth="1.5" />
            <line x1="96" y1="70" x2="96" y2="78" stroke="#101010" strokeWidth="1.5" />
          </svg>
          <span className="mt-0.5 font-mono-nums text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.16em] text-[#626262]">
            ASV Care
          </span>
        </div>
      </motion.div>

      {/* Six Clockwise Hexagonal Nodes */}
      {orbitServices.map((service) => {
        const clockwiseIndex = CLOCKWISE_ORDER[service.orbitPosition ?? 'top'] ?? 0;
        return (
          <WorkflowNode
            key={service.id}
            service={service}
            isActive={service.id === activeServiceId}
            isVisited={visitedServiceIds.has(service.id)}
            isInActivePhase={service.phaseId === activePhaseId}
            clockwiseIndex={clockwiseIndex}
            canHover={canHover}
            onSelect={onSelectService}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            onFocusStart={onFocusStart}
            onFocusEnd={onFocusEnd}
            forceDesktopGeometry={forceDesktopGeometry}
          />
        );
      })}
    </div>
  );
}
