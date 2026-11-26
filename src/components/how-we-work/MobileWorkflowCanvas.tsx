import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Maximize2, Minus, Plus, RotateCcw, X } from 'lucide-react';
import {
  LEFT_COLUMN_SERVICES,
  ORBIT_SERVICES,
  RIGHT_COLUMN_SERVICES,
} from '../../data/process';
import type { ProcessPhaseId } from '../../types';
import { WorkflowOrbit } from './WorkflowOrbit';
import { WorkflowPhaseNavigation } from './WorkflowPhaseNavigation';
import { WorkflowServiceCard } from './WorkflowServiceCard';

const CANVAS_WIDTH = 1160;
const CANVAS_HEIGHT = 560;

interface MobileWorkflowCanvasProps {
  activeServiceId: string;
  activePhaseId: ProcessPhaseId;
  visitedServiceIds: Set<string>;
  orbitProgress: number;
  isJourneyComplete: boolean;
  canHover: boolean;
  onSelectService: (serviceId: string) => void;
  onSelectPhase: (phaseId: ProcessPhaseId) => void;
  onHoverStart?: (serviceId: string) => void;
  onHoverEnd?: () => void;
  onFocusStart?: (serviceId: string) => void;
  onFocusEnd?: () => void;
}

export function MobileWorkflowCanvas(props: MobileWorkflowCanvasProps) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const viewportRef = useRef<HTMLDivElement>(null);
  const fullscreenViewportRef = useRef<HTMLDivElement>(null);
  const fullscreenButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const centerViewport = useCallback((viewport: HTMLDivElement | null, behavior: ScrollBehavior = 'auto') => {
    if (!viewport) return;
    viewport.scrollTo({
      left: Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2),
      top: Math.max(0, (viewport.scrollHeight - viewport.clientHeight) / 2),
      behavior,
    });
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => centerViewport(viewportRef.current));
    return () => cancelAnimationFrame(frame);
  }, [centerViewport]);

  useEffect(() => {
    if (!fullscreenOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => {
      centerViewport(fullscreenViewportRef.current);
      closeButtonRef.current?.focus();
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFullscreenOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      fullscreenButtonRef.current?.focus();
    };
  }, [centerViewport, fullscreenOpen]);

  useEffect(() => {
    const panActiveIntoView = (viewport: HTMLDivElement | null) => {
      const active = viewport?.querySelector<HTMLElement>(
        `[data-workflow-service="${props.activeServiceId}"]`,
      );
      if (!viewport || !active) return;
      const viewportRect = viewport.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      const activeCenterInContent =
        viewport.scrollLeft + activeRect.left - viewportRect.left + activeRect.width / 2;
      viewport.scrollTo({
        left: activeCenterInContent - viewport.clientWidth / 2,
        behavior: 'smooth',
      });
    };
    const frame = requestAnimationFrame(() => {
      panActiveIntoView(viewportRef.current);
      if (fullscreenOpen) panActiveIntoView(fullscreenViewportRef.current);
    });
    return () => cancelAnimationFrame(frame);
  }, [fullscreenOpen, props.activeServiceId]);

  const renderCanvas = (scale: number) => (
    <div
      className="relative shrink-0"
      style={{ width: CANVAS_WIDTH * scale, height: CANVAS_HEIGHT * scale }}
    >
      <div
        className="grid grid-cols-[300px_480px_300px] items-center gap-10 px-0"
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <div className="space-y-4">
          {LEFT_COLUMN_SERVICES.map((service, index) => (
            <WorkflowServiceCard
              key={service.id}
              service={service}
              side="left"
              index={index}
              isActive={service.id === props.activeServiceId}
              isVisited={props.visitedServiceIds.has(service.id)}
              isInActivePhase={service.phaseId === props.activePhaseId}
              canHover={props.canHover}
              onSelect={props.onSelectService}
              onHoverStart={props.onHoverStart}
              onHoverEnd={props.onHoverEnd}
              onFocusStart={props.onFocusStart}
              onFocusEnd={props.onFocusEnd}
            />
          ))}
        </div>

        <WorkflowOrbit
          orbitServices={ORBIT_SERVICES}
          activeServiceId={props.activeServiceId}
          activePhaseId={props.activePhaseId}
          visitedServiceIds={props.visitedServiceIds}
          orbitProgress={props.orbitProgress}
          isJourneyComplete={props.isJourneyComplete}
          canHover={props.canHover}
          onSelectService={props.onSelectService}
          onHoverStart={props.onHoverStart}
          onHoverEnd={props.onHoverEnd}
          onFocusStart={props.onFocusStart}
          onFocusEnd={props.onFocusEnd}
          forceDesktopGeometry
        />

        <div className="space-y-4">
          {RIGHT_COLUMN_SERVICES.map((service, index) => (
            <WorkflowServiceCard
              key={service.id}
              service={service}
              side="right"
              index={index}
              isActive={service.id === props.activeServiceId}
              isVisited={props.visitedServiceIds.has(service.id)}
              isInActivePhase={service.phaseId === props.activePhaseId}
              canHover={props.canHover}
              onSelect={props.onSelectService}
              onHoverStart={props.onHoverStart}
              onHoverEnd={props.onHoverEnd}
              onFocusStart={props.onFocusStart}
              onFocusEnd={props.onFocusEnd}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="md:hidden">
      <WorkflowPhaseNavigation
        activePhaseId={props.activePhaseId}
        onSelectPhase={props.onSelectPhase}
      />

      <p className="mb-3 text-center text-xs font-medium text-[#626262]">
        Swipe to explore the complete property management workflow.
      </p>

      <div className="relative rounded-[22px] border border-[#E5E7EB] bg-white shadow-[0_14px_36px_-24px_rgba(16,16,16,0.2)]">
        <div
          ref={viewportRef}
          className="workflow-canvas-scroll h-[570px] overflow-x-auto overflow-y-hidden overscroll-x-contain rounded-[22px] touch-pan-x"
          tabIndex={0}
          aria-label="Interactive property management workflow. Swipe horizontally to explore."
        >
          {renderCanvas(1)}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-between px-3">
          <button
            type="button"
            onClick={() => viewportRef.current?.scrollBy({ left: -280, behavior: 'smooth' })}
            aria-label="Pan workflow left"
            className="btn-press pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white/95 text-[#101010] shadow-md"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => viewportRef.current?.scrollBy({ left: 280, behavior: 'smooth' })}
            aria-label="Pan workflow right"
            className="btn-press pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white/95 text-[#101010] shadow-md"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <button
        ref={fullscreenButtonRef}
        type="button"
        onClick={() => setFullscreenOpen(true)}
        className="btn-press mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-[#101010] bg-white px-5 text-sm font-semibold text-[#101010] hover:bg-[#101010] hover:text-white"
      >
        <Maximize2 className="h-4 w-4" aria-hidden="true" />
        Fullscreen Workflow
      </button>

      {fullscreenOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex flex-col bg-white"
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen property management workflow"
          >
            <div
              className="flex shrink-0 items-center justify-between gap-3 border-b border-[#E5E7EB] bg-white px-3 py-2"
              style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top))' }}
            >
              <div className="min-w-0">
                <div className="font-display text-sm font-bold text-[#101010]">ASV Workflow</div>
                <div className="text-[11px] text-[#626262]">Pan to explore · zoom {Math.round(zoom * 100)}%</div>
              </div>
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => setZoom((value) => Math.max(0.8, value - 0.1))} aria-label="Zoom out" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB]"><Minus className="h-4 w-4" /></button>
                <button type="button" onClick={() => setZoom((value) => Math.min(1.5, value + 0.1))} aria-label="Zoom in" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB]"><Plus className="h-4 w-4" /></button>
                <button type="button" onClick={() => { setZoom(1); requestAnimationFrame(() => centerViewport(fullscreenViewportRef.current, 'smooth')); }} aria-label="Reset workflow view" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB]"><RotateCcw className="h-4 w-4" /></button>
                <button ref={closeButtonRef} type="button" onClick={() => setFullscreenOpen(false)} aria-label="Close fullscreen workflow" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#101010] text-white"><X className="h-5 w-5" /></button>
              </div>
            </div>

            <div className="shrink-0 px-3 pt-3">
              <WorkflowPhaseNavigation
                activePhaseId={props.activePhaseId}
                onSelectPhase={props.onSelectPhase}
              />
            </div>

            <div
              ref={fullscreenViewportRef}
              className="workflow-canvas-scroll min-h-0 flex-1 overflow-auto overscroll-contain touch-pan-x touch-pan-y"
              tabIndex={0}
            >
              {renderCanvas(zoom)}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
