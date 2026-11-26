import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';
import {
  LEFT_COLUMN_SERVICES,
  ORBIT_SERVICES,
  PHASE_MAP,
  PROCESS_SERVICES,
  RIGHT_COLUMN_SERVICES,
} from '../../data/process';
import type { ProcessPhaseId } from '../../types';
import { MobileWorkflowCanvas } from './MobileWorkflowCanvas';
import { WorkflowCTA } from './WorkflowCTA';
import { WorkflowDetailPanel } from './WorkflowDetailPanel';
import { WorkflowHeading } from './WorkflowHeading';
import { WorkflowOrbit } from './WorkflowOrbit';
import { WorkflowPhaseNavigation } from './WorkflowPhaseNavigation';
import { WorkflowServiceCard } from './WorkflowServiceCard';
import {
  clampNumber,
  computeScrollStepWithHysteresis,
  resolveWorkflowDisplayState,
} from './workflowController';

const ALL_SIDE_SERVICES_TABLET = [
  LEFT_COLUMN_SERVICES[0],
  RIGHT_COLUMN_SERVICES[0],
  LEFT_COLUMN_SERVICES[1],
  RIGHT_COLUMN_SERVICES[1],
  LEFT_COLUMN_SERVICES[2],
  RIGHT_COLUMN_SERVICES[2],
];

const DEFAULT_HEADER_OFFSET = 76;
const STICKY_RUNWAY_PX = 1320;

function readStickyHeaderOffset(): number {
  if (typeof document === 'undefined') return DEFAULT_HEADER_OFFSET;
  const headerEl = document.querySelector('header');
  if (!headerEl) return DEFAULT_HEADER_OFFSET;
  const height = Math.round(headerEl.getBoundingClientRect().height);
  return height > 40 ? height + 8 : DEFAULT_HEADER_OFFSET;
}

export function HowWeWorkSection() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  const [scrollActiveIndex, setScrollActiveIndex] = useState<number>(0);
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const [focusedServiceId, setFocusedServiceId] = useState<string | null>(null);
  const [interactionSource, setInteractionSource] = useState<'scroll' | 'explicit'>('scroll');
  const [canHover, setCanHover] = useState<boolean>(false);
  const [isStickyMode, setIsStickyMode] = useState<boolean>(false);
  const [stickyTopOffset, setStickyTopOffset] = useState<number>(DEFAULT_HEADER_OFFSET);
  const [stageHeight, setStageHeight] = useState<number>(0);

  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);

  // Authoritative refs so scroll calculations never tear down and rebuild event listeners
  const rawScrollProgressRef = useRef<number>(0);
  const scrollActiveIndexRef = useRef<number>(0);
  const hoveredServiceIdRef = useRef<string | null>(null);
  const suppressHoverUntilPointerMoveRef = useRef<boolean>(false);
  const lastPointerPosRef = useRef<{ x: number; y: number } | null>(null);
  const isStickyModeRef = useRef<boolean>(false);
  const stickyTopOffsetRef = useRef<number>(DEFAULT_HEADER_OFFSET);
  const stageHeightRef = useRef<number>(0);
  const programmaticScrollRef = useRef<{ active: boolean; targetY: number; expiresAt: number }>({
    active: false,
    targetY: 0,
    expiresAt: 0,
  });

  useEffect(() => {
    hoveredServiceIdRef.current = hoveredServiceId;
  }, [hoveredServiceId]);

  // Detect genuine hover capabilities (`(hover: hover) and (pointer: fine)`)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      setCanHover(false);
      return;
    }

    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const syncHover = () => setCanHover(mq.matches);
    syncHover();
    mq.addEventListener('change', syncHover);
    return () => mq.removeEventListener('change', syncHover);
  }, []);

  // Measure sticky header height + stage height with 2px deadband to prevent subpixel feedback
  useEffect(() => {
    const stageEl = stickyStageRef.current;
    if (!stageEl || typeof window === 'undefined') return;

    const evaluateFit = () => {
      const measuredHeight = Math.round(stageEl.scrollHeight);
      const headerOffset = readStickyHeaderOffset();

      if (Math.abs(measuredHeight - stageHeightRef.current) > 2) {
        stageHeightRef.current = measuredHeight;
        setStageHeight(measuredHeight);
      }

      if (headerOffset !== stickyTopOffsetRef.current) {
        stickyTopOffsetRef.current = headerOffset;
        setStickyTopOffset(headerOffset);
      }

      const fitsDesktopViewport =
        !reduced &&
        window.innerWidth >= 1024 &&
        measuredHeight > 0 &&
        measuredHeight + headerOffset + 16 <= window.innerHeight;

      if (fitsDesktopViewport !== isStickyModeRef.current) {
        isStickyModeRef.current = fitsDesktopViewport;
        setIsStickyMode(fitsDesktopViewport);
      }
    };

    evaluateFit();

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(evaluateFit);
      resizeObserver.observe(stageEl);
    }

    window.addEventListener('resize', evaluateFit, { passive: true });
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', evaluateFit);
    };
  }, [reduced]);

  // One authoritative scroll-progress controller mounted once (no effect churn during scrolling)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId = 0;

    const computeScrollStep = () => {
      rafId = 0;
      if (window.innerWidth < 768) return;

      const trackEl = scrollTrackRef.current;
      if (!trackEl) return;

      const now = performance.now();
      const lock = programmaticScrollRef.current;
      if (lock.active) {
        if (Math.abs(window.scrollY - lock.targetY) <= 10 || now >= lock.expiresAt) {
          lock.active = false;
        } else {
          return;
        }
      }

      const trackRect = trackEl.getBoundingClientRect();
      let progress = 0;

      if (isStickyModeRef.current && stageHeightRef.current > 0) {
        const totalTravel = Math.max(1, trackRect.height - stageHeightRef.current);
        progress = clampNumber(
          0,
          1,
          (stickyTopOffsetRef.current - trackRect.top) / totalTravel,
        );
      } else {
        const startOffset = window.innerHeight * 0.45;
        const travel = Math.max(1, trackRect.height - window.innerHeight * 0.25);
        progress = clampNumber(0, 1, (startOffset - trackRect.top) / travel);
      }

      rawScrollProgressRef.current = progress;

      const nextIndex = computeScrollStepWithHysteresis(
        progress,
        scrollActiveIndexRef.current,
        PROCESS_SERVICES.length,
      );

      if (nextIndex !== scrollActiveIndexRef.current) {
        scrollActiveIndexRef.current = nextIndex;
        setInteractionSource('scroll');
        setScrollActiveIndex(nextIndex);

        // If cursor is stationary over an item while scrolling moves the page, prioritize scroll until pointer moves
        if (hoveredServiceIdRef.current !== null) {
          suppressHoverUntilPointerMoveRef.current = true;
          setHoveredServiceId(null);
        }
      }
    };

    const scheduleUpdate = () => {
      if (rafId !== 0) return;
      rafId = requestAnimationFrame(computeScrollStep);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!suppressHoverUntilPointerMoveRef.current) {
        lastPointerPosRef.current = { x: event.clientX, y: event.clientY };
        return;
      }
      const last = lastPointerPosRef.current;
      if (!last) {
        lastPointerPosRef.current = { x: event.clientX, y: event.clientY };
        suppressHoverUntilPointerMoveRef.current = false;
        return;
      }
      if (Math.hypot(event.clientX - last.x, event.clientY - last.y) > 3) {
        lastPointerPosRef.current = { x: event.clientX, y: event.clientY };
        suppressHoverUntilPointerMoveRef.current = false;
      }
    };

    const cancelProgrammaticScroll = () => {
      if (programmaticScrollRef.current.active) {
        programmaticScrollRef.current.active = false;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp' ||
        event.key === 'PageDown' ||
        event.key === 'PageUp' ||
        event.key === 'Home' ||
        event.key === 'End' ||
        event.key === ' '
      ) {
        cancelProgrammaticScroll();
      }
    };

    computeScrollStep();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('wheel', cancelProgrammaticScroll, { passive: true });
    window.addEventListener('touchstart', cancelProgrammaticScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown, { passive: true });

    return () => {
      if (rafId !== 0) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('wheel', cancelProgrammaticScroll);
      window.removeEventListener('touchstart', cancelProgrammaticScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Synchronize explicit click / phase jump / Prev-Next with deterministic scroll target
  const scrollToStep = useCallback(
    (targetIndex: number) => {
      const clampedIndex = clampNumber(0, PROCESS_SERVICES.length - 1, targetIndex);
      setHoveredServiceId(null);
      setInteractionSource('explicit');
      scrollActiveIndexRef.current = clampedIndex;
      setScrollActiveIndex(clampedIndex);

      if (typeof window === 'undefined' || window.innerWidth < 768) return;
      const trackEl = scrollTrackRef.current;
      if (!trackEl) return;

      const trackRect = trackEl.getBoundingClientRect();
      const trackDocTop = window.scrollY + trackRect.top;
      let targetScrollY = window.scrollY;

      if (isStickyModeRef.current && stageHeightRef.current > 0) {
        const totalTravel = Math.max(1, trackRect.height - stageHeightRef.current);
        const targetProgress =
          clampedIndex === 0
            ? 0.02
            : clampedIndex === PROCESS_SERVICES.length - 1
              ? 0.98
              : (clampedIndex + 0.5) / PROCESS_SERVICES.length;
        targetScrollY = Math.max(
          0,
          trackDocTop - stickyTopOffsetRef.current + targetProgress * totalTravel,
        );
      } else {
        const startOffset = window.innerHeight * 0.45;
        const travel = Math.max(1, trackRect.height - window.innerHeight * 0.25);
        const targetProgress =
          clampedIndex === 0
            ? 0
            : clampedIndex === PROCESS_SERVICES.length - 1
              ? 1
              : (clampedIndex + 0.5) / PROCESS_SERVICES.length;
        targetScrollY = Math.max(0, trackDocTop - startOffset + targetProgress * travel);
      }

      if (Math.abs(window.scrollY - targetScrollY) > 6) {
        programmaticScrollRef.current = {
          active: true,
          targetY: targetScrollY,
          expiresAt: performance.now() + 850,
        };
        window.scrollTo({
          top: targetScrollY,
          behavior: reduced ? 'auto' : 'smooth',
        });
      }
    },
    [reduced],
  );

  const {
    displayedIndex,
    activeService,
    activePhaseId,
    isPreviewActive,
    isJourneyComplete,
  } = useMemo(
    () =>
      resolveWorkflowDisplayState({
        scrollActiveIndex,
        hoveredServiceId,
        focusedServiceId,
        services: PROCESS_SERVICES,
      }),
    [scrollActiveIndex, hoveredServiceId, focusedServiceId],
  );

  const activeServiceId = activeService.id;
  const activePhase = PHASE_MAP[activePhaseId];

  const visitedServiceIds = useMemo(() => {
    return new Set(PROCESS_SERVICES.slice(0, displayedIndex).map((service) => service.id));
  }, [displayedIndex]);

  const orbitProgress = (displayedIndex + 1) / PROCESS_SERVICES.length;

  const handleSelectService = useCallback(
    (serviceId: string) => {
      const idx = PROCESS_SERVICES.findIndex((service) => service.id === serviceId);
      if (idx >= 0) {
        scrollToStep(idx);
      }
    },
    [scrollToStep],
  );

  const handleSelectPhase = useCallback(
    (phaseId: ProcessPhaseId) => {
      const targetPhase = PHASE_MAP[phaseId];
      if (targetPhase && targetPhase.serviceIds.length > 0) {
        const firstStepId = targetPhase.serviceIds[0];
        const idx = PROCESS_SERVICES.findIndex((service) => service.id === firstStepId);
        if (idx >= 0) {
          scrollToStep(idx);
        }
      }
    },
    [scrollToStep],
  );

  const handlePrevService = useCallback(() => {
    const baseIdx = isPreviewActive ? displayedIndex : scrollActiveIndexRef.current;
    if (baseIdx <= 0) return;
    scrollToStep(baseIdx - 1);
  }, [displayedIndex, isPreviewActive, scrollToStep]);

  const handleNextService = useCallback(() => {
    const baseIdx = isPreviewActive ? displayedIndex : scrollActiveIndexRef.current;
    if (baseIdx >= PROCESS_SERVICES.length - 1) return;
    scrollToStep(baseIdx + 1);
  }, [displayedIndex, isPreviewActive, scrollToStep]);

  const handleHoverStart = useCallback((serviceId: string) => {
    if (suppressHoverUntilPointerMoveRef.current) return;
    setHoveredServiceId(serviceId);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredServiceId(null);
  }, []);

  const handleFocusStart = useCallback((serviceId: string) => {
    setFocusedServiceId(serviceId);
  }, []);

  const handleFocusEnd = useCallback(() => {
    setFocusedServiceId(null);
  }, []);

  const handleConsultClick = useCallback(() => {
    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
      consultationSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate('/contact');
  }, [navigate]);

  return (
    <section
      id="how-we-work"
      className="relative scroll-mt-20 py-16 sm:py-24 lg:py-28 bg-gradient-to-b from-white via-[#F7F7F8] to-white border-b border-[#E5E7EB] overflow-x-clip"
    >
      {/* Subtle Low-Opacity Architectural Building Outlines on Left & Right Edges */}
      <svg
        viewBox="0 0 260 220"
        className="pointer-events-none hidden md:block absolute left-0 top-6 w-[200px] lg:w-[260px] text-[#101010] opacity-[0.045]"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="20" y="70" width="44" height="140" />
          <rect x="74" y="30" width="58" height="180" />
          <rect x="142" y="95" width="48" height="115" />
          <line x1="88" y1="55" x2="118" y2="55" />
          <line x1="88" y1="75" x2="118" y2="75" />
          <line x1="88" y1="95" x2="118" y2="95" />
          <line x1="88" y1="115" x2="118" y2="115" />
          <line x1="30" y1="90" x2="54" y2="90" />
          <line x1="30" y1="110" x2="54" y2="110" />
          <line x1="154" y1="115" x2="178" y2="115" />
        </g>
      </svg>

      <svg
        viewBox="0 0 260 220"
        className="pointer-events-none hidden md:block absolute right-0 top-6 w-[200px] lg:w-[260px] text-[#101010] opacity-[0.045]"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="196" y="60" width="44" height="150" />
          <rect x="128" y="25" width="58" height="185" />
          <rect x="70" y="90" width="48" height="120" />
          <line x1="142" y1="50" x2="172" y2="50" />
          <line x1="142" y1="70" x2="172" y2="70" />
          <line x1="142" y1="90" x2="172" y2="90" />
          <line x1="142" y1="110" x2="172" y2="110" />
          <line x1="206" y1="85" x2="230" y2="85" />
          <line x1="206" y1="105" x2="230" y2="105" />
          <line x1="82" y1="115" x2="106" y2="115" />
        </g>
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Heading */}
        <WorkflowHeading />

        {/* Desktop & Tablet Scroll-Driven Interactive Stage */}
        <div
          ref={scrollTrackRef}
          className="hidden md:block relative"
          style={
            isStickyMode && stageHeight > 0
              ? { minHeight: `${stageHeight + STICKY_RUNWAY_PX}px` }
              : undefined
          }
        >
          <div
            ref={stickyStageRef}
            className={isStickyMode ? 'lg:sticky' : undefined}
            style={isStickyMode ? { top: `${stickyTopOffset}px` } : undefined}
          >
            {/* Compact 4-Phase Navigation (Tablet + Desktop) */}
            <WorkflowPhaseNavigation
              activePhaseId={activePhaseId}
              onSelectPhase={handleSelectPhase}
            />

            {/* DESKTOP (1024px+): 3-Column Composition (28% Left / 44% Center Orbit / 28% Right) */}
            <div className="hidden lg:grid lg:grid-cols-[28fr_44fr_28fr] items-center gap-6 xl:gap-10">
              {/* Left Service Column */}
              <div className="space-y-4 xl:space-y-5 min-w-0">
                {LEFT_COLUMN_SERVICES.map((service, idx) => (
                  <WorkflowServiceCard
                    key={service.id}
                    service={service}
                    side="left"
                    index={idx}
                    isActive={service.id === activeServiceId}
                    isVisited={visitedServiceIds.has(service.id)}
                    isInActivePhase={service.phaseId === activePhaseId}
                    canHover={canHover}
                    onSelect={handleSelectService}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                    onFocusStart={handleFocusStart}
                    onFocusEnd={handleFocusEnd}
                  />
                ))}
              </div>

              {/* Central Circular Workflow */}
              <div className="px-2 min-w-0">
                <WorkflowOrbit
                  orbitServices={ORBIT_SERVICES}
                  activeServiceId={activeServiceId}
                  activePhaseId={activePhaseId}
                  visitedServiceIds={visitedServiceIds}
                  orbitProgress={orbitProgress}
                  isJourneyComplete={isJourneyComplete}
                  canHover={canHover}
                  onSelectService={handleSelectService}
                  onHoverStart={handleHoverStart}
                  onHoverEnd={handleHoverEnd}
                  onFocusStart={handleFocusStart}
                  onFocusEnd={handleFocusEnd}
                />
              </div>

              {/* Right Service Column */}
              <div className="space-y-4 xl:space-y-5 min-w-0">
                {RIGHT_COLUMN_SERVICES.map((service, idx) => (
                  <WorkflowServiceCard
                    key={service.id}
                    service={service}
                    side="right"
                    index={idx}
                    isActive={service.id === activeServiceId}
                    isVisited={visitedServiceIds.has(service.id)}
                    isInActivePhase={service.phaseId === activePhaseId}
                    canHover={canHover}
                    onSelect={handleSelectService}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                    onFocusStart={handleFocusStart}
                    onFocusEnd={handleFocusEnd}
                  />
                ))}
              </div>
            </div>

            {/* TABLET (768px–1023px): Central Circular Workflow First, Balanced 2-Column Grid Below */}
            <div className="hidden md:block lg:hidden">
              <WorkflowOrbit
                orbitServices={ORBIT_SERVICES}
                activeServiceId={activeServiceId}
                activePhaseId={activePhaseId}
                visitedServiceIds={visitedServiceIds}
                orbitProgress={orbitProgress}
                isJourneyComplete={isJourneyComplete}
                canHover={canHover}
                onSelectService={handleSelectService}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                onFocusStart={handleFocusStart}
                onFocusEnd={handleFocusEnd}
              />

              <div className="mt-8 grid grid-cols-2 gap-4">
                {ALL_SIDE_SERVICES_TABLET.map((service, idx) => (
                  <WorkflowServiceCard
                    key={service.id}
                    service={service}
                    side={idx % 2 === 0 ? 'left' : 'right'}
                    index={idx}
                    isActive={service.id === activeServiceId}
                    isVisited={visitedServiceIds.has(service.id)}
                    isInActivePhase={service.phaseId === activePhaseId}
                    canHover={canHover}
                    onSelect={handleSelectService}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                    onFocusStart={handleFocusStart}
                    onFocusEnd={handleFocusEnd}
                    showConnector={false}
                  />
                ))}
              </div>
            </div>

            {/* Expandable Interactive Detail Panel (Tablet + Desktop) */}
            <WorkflowDetailPanel
              service={activeService}
              phase={activePhase}
              currentIndex={displayedIndex}
              totalServices={PROCESS_SERVICES.length}
              isLivePolite={isPreviewActive || interactionSource === 'explicit'}
              isJourneyComplete={isJourneyComplete}
              onPrevService={handlePrevService}
              onNextService={handleNextService}
              onConsultClick={handleConsultClick}
            />
          </div>
        </div>

        {/* MOBILE (320px–767px): Dedicated Vertical Connecting Timeline & Accordion */}
        <MobileWorkflowCanvas
          activeServiceId={activeServiceId}
          activePhaseId={activePhaseId}
          visitedServiceIds={visitedServiceIds}
          orbitProgress={orbitProgress}
          isJourneyComplete={isJourneyComplete}
          canHover={canHover}
          onSelectService={handleSelectService}
          onSelectPhase={handleSelectPhase}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          onFocusStart={handleFocusStart}
          onFocusEnd={handleFocusEnd}
        />

        {/* Bottom Conversion Banner */}
        <WorkflowCTA onGetStarted={handleConsultClick} />
      </div>
    </section>
  );
}
