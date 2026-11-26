import { useEffect, useRef } from 'react';
import { PROCESS_PHASES } from '../../data/process';
import type { ProcessPhaseId } from '../../types';

interface WorkflowPhaseNavigationProps {
  activePhaseId: ProcessPhaseId;
  onSelectPhase: (phaseId: ProcessPhaseId) => void;
}

export function WorkflowPhaseNavigation({
  activePhaseId,
  onSelectPhase,
}: WorkflowPhaseNavigationProps) {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const activeTab = navRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!nav || !activeTab) return;
    nav.scrollTo({
      left: activeTab.offsetLeft - (nav.clientWidth - activeTab.offsetWidth) / 2,
      behavior: 'smooth',
    });
  }, [activePhaseId]);

  return (
    <div
      ref={navRef}
      className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-2.5 md:max-w-5xl md:mx-auto mb-5 md:mb-6 lg:mb-7 p-1.5 rounded-2xl bg-white/95 border border-[#E5E7EB] shadow-[0_6px_24px_-16px_rgba(16,16,16,0.1)] overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Property management workflow phases"
    >
      {PROCESS_PHASES.map((phase) => {
        const isActive = phase.id === activePhaseId;
        return (
          <button
            key={phase.id}
            type="button"
            role="tab"
            title={phase.title}
            aria-label={`Phase ${phase.phaseNumber}: ${phase.title}`}
            aria-selected={isActive}
            onClick={() => onSelectPhase(phase.id)}
            className={`group flex min-w-[228px] md:min-w-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-[background-color,color,box-shadow] duration-300 ease-out min-h-[48px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24] ${
              isActive
                ? 'bg-[#101010] text-white shadow-[0_6px_18px_-8px_rgba(16,16,16,0.45)]'
                : 'bg-transparent text-[#626262] hover:bg-[#F7F7F8] hover:text-[#101010]'
            }`}
          >
            <span
              className={`font-mono-nums text-xs font-bold shrink-0 px-2 py-0.5 rounded-md transition-colors duration-250 ease-out ${
                isActive
                  ? 'bg-[#ED1C24] text-white'
                  : 'bg-[#F0F0F2] text-[#101010] group-hover:bg-[#E5E7EB]'
              }`}
            >
              {phase.phaseNumber}
            </span>
            <span className="text-xs xl:text-[13px] font-semibold leading-tight whitespace-normal">
              {phase.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
