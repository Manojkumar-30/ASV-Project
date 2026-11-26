import { CheckCircle2, Cloud, Layers } from 'lucide-react';

const CONCEPTUAL_WORKFLOW_STEPS = [
  { stage: '01 · Onboarding', detail: 'Key takeover & annexure logs', active: true },
  { stage: '02 · Tenancy', detail: 'Lease milestones & rent records', active: true },
  { stage: '03 · Upkeep', detail: 'Maintenance ticket history', active: true },
  { stage: '04 · Renewal', detail: 'Quarterly checks & exit audit', active: false },
] as const;

export function CRMIllustration() {
  return (
    <div
      className="mt-6 rounded-2xl border border-white/12 bg-white/[0.04] p-4 sm:p-5 backdrop-blur-xs"
      aria-label="Conceptual Salesforce CRM property workflow diagram"
    >
      <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#ED1C24]/20 text-[#ED1C24]">
            <Cloud className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="font-mono-nums text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-300">
            Salesforce Workflow Overview
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-medium tracking-wider uppercase text-neutral-400">
          <Layers className="h-3 w-3 text-[#ED1C24]" aria-hidden="true" />
          Conceptual
        </span>
      </div>

      <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {CONCEPTUAL_WORKFLOW_STEPS.map((item) => (
          <div
            key={item.stage}
            className="rounded-xl border border-white/10 bg-[#171717] px-3 py-2.5 flex items-start justify-between gap-2"
          >
            <div className="min-w-0">
              <p className="font-mono-nums text-[10px] font-semibold tracking-wider uppercase text-[#ED1C24]">
                {item.stage}
              </p>
              <p className="mt-0.5 text-xs font-medium text-neutral-200 leading-snug">
                {item.detail}
              </p>
            </div>
            <CheckCircle2
              className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${
                item.active ? 'text-[#ED1C24]' : 'text-neutral-500'
              }`}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
