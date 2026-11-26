import { motion, useReducedMotion } from 'motion/react';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import type { ProcessOrbitPosition, ProcessPhaseId, ProcessService } from '../../types';

interface OrbitSvgTracksProps {
  orbitServices: ProcessService[];
  activeServiceId: string;
  activePhaseId: ProcessPhaseId;
  visitedServiceIds: Set<string>;
  orbitProgress: number;
  isJourneyComplete?: boolean;
}

const POSITION_ANGLES: Record<ProcessOrbitPosition, number> = {
  top: -90,
  'upper-right': -30,
  'lower-right': 30,
  bottom: 90,
  'lower-left': 150,
  'upper-left': 210,
};

function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

export function OrbitSvgTracks({
  orbitServices,
  activeServiceId,
  activePhaseId,
  visitedServiceIds,
  orbitProgress,
  isJourneyComplete = false,
}: OrbitSvgTracksProps) {
  const reduced = useReducedMotion();
  const center = 300;
  const orbitRadius = 212;
  const orbitCircumference = 2 * Math.PI * orbitRadius;
  const clampedProgress = Math.min(1, Math.max(0.05, orbitProgress));
  const progressDashOffset = orbitCircumference * (1 - clampedProgress);

  return (
    <svg
      viewBox="0 0 600 600"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {/* Subtle inner framing ring around the central illustration */}
      <circle
        cx={center}
        cy={center}
        r={104}
        fill="none"
        stroke={isJourneyComplete ? '#ED1C24' : '#E5E7EB'}
        strokeOpacity={isJourneyComplete ? 0.35 : 1}
        strokeWidth={isJourneyComplete ? 1.75 : 1.25}
        style={
          reduced
            ? undefined
            : { transition: 'stroke 350ms ease-out, stroke-opacity 350ms ease-out' }
        }
      />

      {/* Base circular dotted orbit — mounts once cleanly without remounting */}
      <motion.circle
        cx={center}
        cy={center}
        r={orbitRadius}
        fill="none"
        stroke="#D1D5DB"
        strokeWidth="2"
        strokeDasharray="5 8"
        strokeLinecap="round"
        initial={reduced ? false : { opacity: 0.25 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.65, ease: EASE_PREMIUM }}
      />

      {/* Scroll-driven clockwise progress stroke along the circular orbit */}
      <circle
        cx={center}
        cy={center}
        r={orbitRadius}
        fill="none"
        stroke="#ED1C24"
        strokeOpacity={isJourneyComplete ? 0.9 : 0.72}
        strokeWidth={isJourneyComplete ? 2.5 : 2.2}
        strokeDasharray={orbitCircumference}
        strokeDashoffset={progressDashOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
        style={
          reduced
            ? undefined
            : {
                transition:
                  'stroke-dashoffset 450ms cubic-bezier(0.22, 1, 0.36, 1), stroke-opacity 300ms ease-out',
              }
        }
      />

      {/* 6 radiating directional arrows — permanently mounted, single CSS transition controller */}
      {orbitServices.map((service) => {
        const angle = POSITION_ANGLES[service.orbitPosition ?? 'top'];
        const start = polarToCartesian(center, center, 108, angle);
        const end = polarToCartesian(center, center, 148, angle);
        const arrowLeft = polarToCartesian(end.x, end.y, 7, angle + 148);
        const arrowRight = polarToCartesian(end.x, end.y, 7, angle - 148);

        const isDirectActive = service.id === activeServiceId;
        const isVisited = visitedServiceIds.has(service.id);
        const isPhaseActive = service.phaseId === activePhaseId;

        const baseStroke = isPhaseActive
          ? '#101010'
          : isVisited
            ? 'rgba(16, 16, 16, 0.55)'
            : '#CBD5E1';

        const arrowLength = 40;
        const arrowHeadPath = `M ${arrowLeft.x} ${arrowLeft.y} L ${end.x} ${end.y} L ${arrowRight.x} ${arrowRight.y}`;

        return (
          <g key={service.id}>
            <line
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke={baseStroke}
              strokeWidth={1.75}
              strokeLinecap="round"
              style={reduced ? undefined : { transition: 'stroke 320ms ease-out' }}
            />
            <path
              d={arrowHeadPath}
              fill="none"
              stroke={baseStroke}
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={reduced ? undefined : { transition: 'stroke 320ms ease-out' }}
            />

            {/* Permanently mounted active red directional overlay (never unmounted/remounted) */}
            <line
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="#ED1C24"
              strokeWidth={2.35}
              strokeLinecap="round"
              strokeDasharray={arrowLength}
              strokeDashoffset={isDirectActive ? 0 : arrowLength}
              strokeOpacity={isDirectActive ? 1 : 0}
              style={
                reduced
                  ? undefined
                  : {
                      transition:
                        'stroke-dashoffset 440ms cubic-bezier(0.22, 1, 0.36, 1), stroke-opacity 240ms ease-out',
                    }
              }
            />
            <path
              d={arrowHeadPath}
              fill="none"
              stroke="#ED1C24"
              strokeWidth={2.35}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity={isDirectActive ? 1 : 0}
              style={reduced ? undefined : { transition: 'stroke-opacity 280ms ease-out' }}
            />
          </g>
        );
      })}
    </svg>
  );
}

interface SideCardConnectorProps {
  side: 'left' | 'right';
  isActive: boolean;
  isVisited: boolean;
  isInActivePhase: boolean;
}

/**
 * Permanently mounted SVG directional arrow bridging the orbit and side cards on desktop (lg+).
 * Uses a single interruptible CSS transition controller with zero remounting or Motion clashes.
 */
export function SideCardConnector({
  side,
  isActive,
  isVisited,
  isInActivePhase,
}: SideCardConnectorProps) {
  const reduced = useReducedMotion();
  const baseColor = isInActivePhase
    ? '#101010'
    : isVisited
      ? 'rgba(16, 16, 16, 0.5)'
      : '#CBD5E1';

  const isLeftCard = side === 'left';
  const lineStartX = isLeftCard ? 34 : 2;
  const lineEndX = isLeftCard ? 5 : 31;
  const arrowHeadPath = isLeftCard
    ? 'M 10 3.5 L 4.5 8 L 10 12.5'
    : 'M 26 3.5 L 31.5 8 L 26 12.5';

  return (
    <svg
      viewBox="0 0 36 16"
      className={`pointer-events-none hidden lg:block absolute top-1/2 -translate-y-1/2 w-6 xl:w-9 h-4 ${
        isLeftCard ? '-right-6 xl:-right-9' : '-left-6 xl:-left-9'
      }`}
      aria-hidden="true"
    >
      <line
        x1={lineStartX}
        y1="8"
        x2={lineEndX}
        y2="8"
        stroke={baseColor}
        strokeWidth={1.6}
        strokeLinecap="round"
        style={reduced ? undefined : { transition: 'stroke 320ms ease-out' }}
      />
      <path
        d={arrowHeadPath}
        fill="none"
        stroke={baseColor}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={reduced ? undefined : { transition: 'stroke 320ms ease-out' }}
      />

      {/* Permanently mounted active red directional overlay */}
      <line
        x1={lineStartX}
        y1="8"
        x2={lineEndX}
        y2="8"
        stroke="#ED1C24"
        strokeWidth={2.3}
        strokeLinecap="round"
        strokeDasharray="30"
        strokeDashoffset={isActive ? 0 : 30}
        strokeOpacity={isActive ? 1 : 0}
        style={
          reduced
            ? undefined
            : {
                transition:
                  'stroke-dashoffset 440ms cubic-bezier(0.22, 1, 0.36, 1), stroke-opacity 240ms ease-out',
              }
        }
      />
      <path
        d={arrowHeadPath}
        fill="none"
        stroke="#ED1C24"
        strokeWidth={2.3}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={isActive ? 1 : 0}
        style={reduced ? undefined : { transition: 'stroke-opacity 280ms ease-out' }}
      />
    </svg>
  );
}
