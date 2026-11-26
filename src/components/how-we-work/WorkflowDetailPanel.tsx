import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { EASE_PREMIUM } from '../../lib/motion';
import type { ProcessPhase, ProcessService } from '../../types';
import { PROCESS_ICON_MAP } from './processIconMap';

interface WorkflowDetailPanelProps {
  service: ProcessService;
  phase: ProcessPhase;
  currentIndex: number;
  totalServices: number;
  isLivePolite?: boolean;
  isJourneyComplete?: boolean;
  onPrevService: () => void;
  onNextService: () => void;
  onConsultClick: () => void;
}

export function WorkflowDetailPanel({
  service,
  phase,
  currentIndex,
  totalServices,
  isLivePolite = false,
  isJourneyComplete = false,
  onPrevService,
  onNextService,
  onConsultClick,
}: WorkflowDetailPanelProps) {
  const reduced = useReducedMotion();
  const Icon = PROCESS_ICON_MAP[service.icon];
  const isFirst = currentIndex <= 0;
  const isLast = currentIndex >= totalServices - 1;

  return (
    <div
      className="hidden md:block mt-6 lg:mt-7 rounded-[22px] border border-[#E5E7EB] bg-white p-6 lg:p-7 xl:p-8 shadow-[0_14px_40px_-24px_rgba(16,16,16,0.14)] md:min-h-[272px] lg:min-h-[256px]"
      aria-live={isLivePolite ? 'polite' : 'off'}
    >
      {/* Header Row & Prev/Next Controls remain permanently mounted so focus & geometry never flicker */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-[#E5E7EB]">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#626262]">
          <span className="font-mono-nums font-semibold uppercase tracking-[0.14em] text-[#ED1C24]">
            Phase {phase.phaseNumber}
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-semibold text-[#101010]">{phase.title}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono-nums">
            Step {service.stepNumber} of {String(totalServices).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onPrevService}
            disabled={isFirst}
            aria-label="Previous workflow service"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#101010] hover:border-[#101010] hover:bg-[#F7F7F8] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#E5E7EB] disabled:hover:bg-white focus-visible:outline-2 focus-visible:outline-[#ED1C24]"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="font-mono-nums text-xs font-semibold text-[#626262] px-1.5 min-w-[70px] text-center">
            {isJourneyComplete && isLast ? 'Complete · ' : ''}
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalServices).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={onNextService}
            disabled={isLast}
            aria-label="Next workflow service"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#101010] bg-[#101010] text-white hover:bg-[#ED1C24] hover:border-[#ED1C24] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#101010] disabled:hover:border-[#101010] focus-visible:outline-2 focus-visible:outline-[#ED1C24]"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Only the changing step body fades/translates in 220ms; no exit-blocking queue */}
      <motion.div
        key={service.id}
        initial={reduced ? false : { opacity: 0.15, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: EASE_PREMIUM }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start min-h-[164px]"
      >
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3.5 mb-3.5">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF1F1] border border-[#ED1C24]/25 text-[#ED1C24]">
              <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-xl lg:text-2xl font-bold text-[#101010] leading-tight">
                {service.name}
              </h3>
            </div>
          </div>

          <p className="text-sm lg:text-[15px] text-[#626262] leading-relaxed mb-4">
            {service.detailedDescription}
          </p>

          <button
            type="button"
            onClick={onConsultClick}
            className="btn-press inline-flex items-center gap-2 rounded-full bg-[#101010] hover:bg-[#ED1C24] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]"
          >
            <span>Enquire About This Step</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="lg:col-span-7 lg:border-l lg:border-[#E5E7EB] lg:pl-8">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#626262] mb-3.5">
            Key Activities Included
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.activities.map((activity) => (
              <li
                key={activity}
                className="flex items-start gap-3 rounded-xl border border-[#E5E7EB] bg-[#F7F7F8]/70 p-3 text-sm text-[#101010] leading-snug"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFF1F1] text-[#ED1C24]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
                </span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
