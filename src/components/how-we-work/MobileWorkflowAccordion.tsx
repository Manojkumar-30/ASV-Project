import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROCESS_PHASES, PROCESS_SERVICES } from '../../data/process';
import { DURATION, EASE_PREMIUM } from '../../lib/motion';
import type { ProcessPhaseId } from '../../types';
import { PROCESS_ICON_MAP } from './processIconMap';
import { pickNearestMobileStepWithHysteresis } from './workflowController';

interface MobileWorkflowAccordionProps {
  activeServiceId: string;
  activePhaseId: ProcessPhaseId;
  visitedServiceIds: Set<string>;
  currentIndex: number;
  onScrollStepActivate: (serviceId: string) => void;
  onSelectService: (serviceId: string) => void;
  onSelectPhase: (phaseId: ProcessPhaseId) => void;
  onPrevService: () => void;
  onNextService: () => void;
  onConsultClick: () => void;
}

export function MobileWorkflowAccordion({
  activeServiceId,
  activePhaseId,
  visitedServiceIds,
  currentIndex,
  onScrollStepActivate,
  onSelectService,
  onSelectPhase,
  onPrevService,
  onNextService,
  onConsultClick,
}: MobileWorkflowAccordionProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const suppressObserverUntilRef = useRef<number>(0);
  const activeServiceIdRef = useRef<string>(activeServiceId);
  const onScrollStepActivateRef = useRef(onScrollStepActivate);

  useEffect(() => {
    activeServiceIdRef.current = activeServiceId;
  }, [activeServiceId]);

  useEffect(() => {
    onScrollStepActivateRef.current = onScrollStepActivate;
  }, [onScrollStepActivate]);

  // Keep all 4 phases open initially so scrolling sequentially activates Steps 01 -> 12 naturally.
  const [openPhaseIds, setOpenPhaseIds] = useState<Set<ProcessPhaseId>>(
    () => new Set(PROCESS_PHASES.map((phase) => phase.id)),
  );
  const [expandedDetailId, setExpandedDetailId] = useState<string | null>(null);

  const togglePhase = (phaseId: ProcessPhaseId) => {
    setOpenPhaseIds((prev) => {
      const next = new Set(prev);
      if (next.has(phaseId)) {
        next.delete(phaseId);
      } else {
        next.add(phaseId);
        onSelectPhase(phaseId);
      }
      return next;
    });
  };

  const handleTapStep = (serviceId: string) => {
    suppressObserverUntilRef.current = performance.now() + 450;
    onSelectService(serviceId);
    setExpandedDetailId((prev) => (prev === serviceId ? null : serviceId));
  };

  const scrollStepIntoCenter = (serviceId: string) => {
    const container = containerRef.current;
    if (!container) return;
    const el = container.querySelector<HTMLElement>(`[data-mobile-step-id="${serviceId}"]`);
    if (!el) return;
    suppressObserverUntilRef.current = performance.now() + 750;
    el.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'center',
    });
  };

  const handleMobilePrev = () => {
    if (currentIndex <= 0) return;
    const prevService = PROCESS_SERVICES[currentIndex - 1];
    setOpenPhaseIds((prev) => new Set(prev).add(prevService.phaseId));
    onPrevService();
    requestAnimationFrame(() => scrollStepIntoCenter(prevService.id));
  };

  const handleMobileNext = () => {
    if (currentIndex >= PROCESS_SERVICES.length - 1) return;
    const nextService = PROCESS_SERVICES[currentIndex + 1];
    setOpenPhaseIds((prev) => new Set(prev).add(nextService.phaseId));
    onNextService();
    requestAnimationFrame(() => scrollStepIntoCenter(nextService.id));
  };

  // Single stable IntersectionObserver + rAF evaluation with 28px hysteresis so adjacent steps never ping-pong
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === 'undefined') return;

    const visibleIds = new Set<string>();
    let rafId = 0;

    const evaluateNearest = () => {
      rafId = 0;
      if (window.innerWidth >= 768) return;
      if (performance.now() < suppressObserverUntilRef.current) return;

      const targetCenter = window.innerHeight * 0.42;
      const candidates: Array<{ id: string; distance: number }> = [];

      visibleIds.forEach((stepId) => {
        const el = container.querySelector<HTMLElement>(`[data-mobile-step-id="${stepId}"]`);
        if (!el || el.offsetParent === null) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        candidates.push({ id: stepId, distance: Math.abs(elCenter - targetCenter) });
      });

      const winnerId = pickNearestMobileStepWithHysteresis(
        candidates,
        activeServiceIdRef.current,
        28,
      );

      if (winnerId && winnerId !== activeServiceIdRef.current) {
        onScrollStepActivateRef.current(winnerId);
      }
    };

    const scheduleEval = () => {
      if (rafId !== 0) return;
      rafId = requestAnimationFrame(evaluateNearest);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.mobileStepId;
          if (!id) continue;
          if (entry.isIntersecting) {
            visibleIds.add(id);
          } else {
            visibleIds.delete(id);
          }
        }
        scheduleEval();
      },
      {
        rootMargin: '-24% 0px -34% 0px',
        threshold: [0.15, 0.5],
      },
    );

    const observeAllVisibleSteps = () => {
      observer.disconnect();
      visibleIds.clear();
      const stepNodes = container.querySelectorAll<HTMLElement>('[data-mobile-step-id]');
      stepNodes.forEach((node) => observer.observe(node));
    };

    observeAllVisibleSteps();
    const mutationObserver =
      typeof MutationObserver !== 'undefined'
        ? new MutationObserver(() => observeAllVisibleSteps())
        : undefined;
    mutationObserver?.observe(container, { childList: true, subtree: true });

    window.addEventListener('scroll', scheduleEval, { passive: true });

    return () => {
      if (rafId !== 0) cancelAnimationFrame(rafId);
      observer.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener('scroll', scheduleEval);
    };
  }, []);

  const activePhaseIndex = PROCESS_PHASES.findIndex((p) => p.id === activePhaseId);
  const progressRatio = (currentIndex + 1) / PROCESS_SERVICES.length;

  return (
    <div ref={containerRef} className="md:hidden space-y-5">
      {/* Compact Circular Lifecycle Overview Card (no shrinking of desktop diagram) */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_6px_20px_-16px_rgba(16,16,16,0.12)]">
        <div className="flex items-center gap-3.5">
          <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0" aria-hidden="true">
            <circle cx="32" cy="32" r="26" fill="#F7F7F8" stroke="#E5E7EB" strokeWidth="1.5" />
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="#ED1C24"
              strokeWidth="2.5"
              strokeDasharray={2 * Math.PI * 26}
              strokeDashoffset={2 * Math.PI * 26 * (1 - progressRatio)}
              strokeLinecap="round"
              transform="rotate(-90 32 32)"
              style={
                reduced
                  ? undefined
                  : { transition: 'stroke-dashoffset 400ms cubic-bezier(0.22, 1, 0.36, 1)' }
              }
            />
            <path
              d="M23 35 L32 25 L41 35 M26 33 V41 H38 V33"
              fill="none"
              stroke="#101010"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ED1C24]">
              4-Phase Circular Journey · Step {String(currentIndex + 1).padStart(2, '0')} / 12
            </div>
            <p className="text-xs sm:text-sm text-[#626262] leading-snug mt-0.5">
              Scroll to follow all 12 steps sequentially, or tap any step to view full activities.
            </p>
          </div>
        </div>
      </div>

      {/* Vertical Connecting Timeline with 4 Expandable Phases */}
      <div className="relative pl-7 space-y-4">
        {/* Base Track Line */}
        <div
          className="pointer-events-none absolute left-[11px] top-6 bottom-6 w-[2px] bg-[#E5E7EB]"
          aria-hidden="true"
        />
        {/* Active Progress Track Line */}
        <div
          className="pointer-events-none absolute left-[11px] top-6 bottom-6 w-[2px] bg-[#ED1C24] origin-top"
          style={{
            transform: `scaleY(${Math.max(0.05, progressRatio)})`,
            transition: reduced ? undefined : 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          aria-hidden="true"
        />

        {PROCESS_PHASES.map((phase, phaseIdx) => {
          const isOpen = openPhaseIds.has(phase.id);
          const isCurrentPhase = phase.id === activePhaseId;
          const isVisitedPhase = phaseIdx < activePhaseIndex;
          const phaseServices = PROCESS_SERVICES.filter((s) => s.phaseId === phase.id);
          const panelId = `mobile-workflow-phase-${phase.id}`;

          return (
            <div key={phase.id} className="relative">
              {/* Vertical Timeline Node */}
              <span
                className={`absolute -left-7 top-4 flex h-6 w-6 items-center justify-center rounded-full border font-mono-nums text-[10px] font-bold transition-colors duration-250 ${
                  isCurrentPhase
                    ? 'border-[#ED1C24] bg-[#ED1C24] text-white ring-4 ring-[#FFF1F1]'
                    : isVisitedPhase
                      ? 'border-[#101010] bg-[#101010] text-white'
                      : 'border-[#E5E7EB] bg-white text-[#101010]'
                }`}
                aria-hidden="true"
              >
                {phase.phaseNumber}
              </span>

              <div
                className={`rounded-2xl border bg-white overflow-hidden transition-[border-color,box-shadow] duration-250 ${
                  isCurrentPhase
                    ? 'border-[#101010] shadow-[0_10px_24px_-18px_rgba(16,16,16,0.16)]'
                    : 'border-[#E5E7EB]'
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => togglePhase(phase.id)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left min-h-[56px] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#ED1C24]"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#626262]">
                      <span className="font-mono-nums font-semibold text-[#ED1C24]">
                        Phase {phase.phaseNumber}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-nums">{phaseServices.length} Services</span>
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#101010] mt-0.5 leading-snug">
                      {phase.title}
                    </h3>
                  </div>

                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#626262] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#ED1C24]' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={reduced ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: DURATION.standard, ease: EASE_PREMIUM }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 border-t border-[#F0F0F2]">
                        <p className="text-xs sm:text-sm text-[#626262] leading-relaxed mt-3 mb-3.5">
                          {phase.summary}
                        </p>

                        <div className="space-y-2.5">
                          {phaseServices.map((service) => {
                            const Icon = PROCESS_ICON_MAP[service.icon];
                            const isActiveStep = activeServiceId === service.id;
                            const isVisitedStep = visitedServiceIds.has(service.id);
                            const isDetailExpanded = expandedDetailId === service.id;
                            const detailId = `mobile-service-detail-${service.id}`;

                            return (
                              <div
                                key={service.id}
                                data-mobile-step-id={service.id}
                                className={`rounded-xl border transition-[border-color,background-color] duration-250 ${
                                  isActiveStep
                                    ? 'border-[#ED1C24] bg-white shadow-[0_6px_16px_-12px_rgba(237,28,36,0.22)]'
                                    : isVisitedStep
                                      ? 'border-[#101010]/25 bg-white'
                                      : 'border-[#E5E7EB] bg-[#F7F7F8]'
                                }`}
                              >
                                <button
                                  type="button"
                                  aria-expanded={isDetailExpanded}
                                  aria-current={isActiveStep ? 'step' : undefined}
                                  aria-controls={detailId}
                                  onClick={() => handleTapStep(service.id)}
                                  className="flex w-full items-start justify-between gap-3 p-3.5 text-left min-h-[52px] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#ED1C24]"
                                >
                                  <div className="flex items-start gap-3 min-w-0">
                                    <span
                                      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-250 ${
                                        isActiveStep
                                          ? 'border-[#ED1C24] bg-[#ED1C24] text-white'
                                          : isVisitedStep
                                            ? 'border-[#ED1C24]/30 bg-[#FFF5F5] text-[#ED1C24]'
                                            : 'border-[#E5E7EB] bg-white text-[#ED1C24]'
                                      }`}
                                    >
                                      <Icon className="h-4 w-4" strokeWidth={1.85} aria-hidden="true" />
                                    </span>
                                    <div className="min-w-0">
                                      <span className="block font-mono-nums text-[11px] font-medium text-[#626262]">
                                        Step {service.stepNumber}
                                      </span>
                                      <span className="block font-display text-sm font-bold text-[#101010] leading-snug">
                                        {service.name}
                                      </span>
                                      <span className="mt-1 block text-xs text-[#626262] leading-relaxed">
                                        {service.shortDescription}
                                      </span>
                                    </div>
                                  </div>

                                  <ChevronDown
                                    className={`mt-1 h-4 w-4 shrink-0 text-[#626262] transition-transform duration-200 ${
                                      isDetailExpanded ? 'rotate-180 text-[#ED1C24]' : ''
                                    }`}
                                    aria-hidden="true"
                                  />
                                </button>

                                <AnimatePresence initial={false}>
                                  {isDetailExpanded && (
                                    <motion.div
                                      id={detailId}
                                      initial={reduced ? false : { opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                                      transition={{ duration: DURATION.fast, ease: EASE_PREMIUM }}
                                      className="overflow-hidden"
                                    >
                                      <div className="px-3.5 pb-4 pt-2 border-t border-[#F0F0F2] space-y-3">
                                        <p className="text-xs sm:text-sm text-[#626262] leading-relaxed">
                                          {service.detailedDescription}
                                        </p>

                                        <ul className="space-y-2">
                                          {service.activities.map((activity) => (
                                            <li
                                              key={activity}
                                              className="flex items-start gap-2 text-xs text-[#101010] leading-snug"
                                            >
                                              <Check
                                                className="h-3.5 w-3.5 text-[#ED1C24] mt-0.5 shrink-0"
                                                strokeWidth={2.2}
                                                aria-hidden="true"
                                              />
                                              <span>{activity}</span>
                                            </li>
                                          ))}
                                        </ul>

                                        <button
                                          type="button"
                                          onClick={onConsultClick}
                                          className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#101010] hover:bg-[#ED1C24] px-4 py-2.5 text-xs font-semibold text-white transition-colors min-h-[44px]"
                                        >
                                          <span>Enquire About This Step</span>
                                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                        </button>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Sequential Prev / Next Controls */}
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-[0_6px_20px_-16px_rgba(16,16,16,0.12)]">
        <button
          type="button"
          onClick={handleMobilePrev}
          disabled={currentIndex <= 0}
          aria-label="Previous workflow step"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-3.5 py-2 text-xs font-semibold text-[#101010] min-h-[44px] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#ED1C24]"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span>Prev</span>
        </button>

        <span className="font-mono-nums text-xs font-semibold text-[#626262]">
          {String(currentIndex + 1).padStart(2, '0')} / {String(PROCESS_SERVICES.length).padStart(2, '0')}
        </span>

        <button
          type="button"
          onClick={handleMobileNext}
          disabled={currentIndex >= PROCESS_SERVICES.length - 1}
          aria-label="Next workflow step"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#101010] bg-[#101010] px-3.5 py-2 text-xs font-semibold text-white min-h-[44px] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#ED1C24]"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
