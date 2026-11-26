import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  FileCheck,
  LayoutDashboard,
  TicketCheck,
} from 'lucide-react';
import type { ValueAddedBentoIcon, ValueAddedBentoItem } from '../../types';
import { SmartImage } from '../ui/SmartImage';
import { CRMIllustration } from './CRMIllustration';

interface ValueAddedServiceCardProps {
  service: ValueAddedBentoItem;
  index: number;
}

const ICON_MAP: Record<ValueAddedBentoIcon, typeof LayoutDashboard> = {
  'layout-dashboard': LayoutDashboard,
  'ticket-check': TicketCheck,
  'file-check': FileCheck,
};

export function ValueAddedServiceCard({ service, index }: ValueAddedServiceCardProps) {
  const navigate = useNavigate();
  const Icon = ICON_MAP[service.icon] || FileCheck;

  const handleAnchorAction = useCallback(
    (href: string) => {
      if (href.startsWith('#')) {
        const target = document.getElementById(href.slice(1));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          return;
        }
        navigate('/contact');
      }
    },
    [navigate],
  );

  if (service.variant === 'featured-dark') {
    return (
      <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[22px] sm:rounded-[24px] bg-[#101010] p-6 sm:p-8 lg:p-9 text-white shadow-[0_24px_60px_rgba(16,16,16,0.16)] transition-transform duration-300 hover:-translate-y-1">
        <div
          className="pointer-events-none absolute inset-0 architectural-grid-dark opacity-70"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ED1C24]/35 bg-[#ED1C24]/15 text-[#ED1C24] transition-colors duration-300 group-hover:bg-[#ED1C24] group-hover:text-white">
              <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
            </div>
            <span className="font-mono-nums text-xs font-semibold text-neutral-400">
              0{index + 1}
            </span>
          </div>

          <p className="mt-6 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#ED1C24]">
            {service.label}
          </p>
          <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {service.title}
          </h3>
          <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-neutral-300">
            {service.description}
          </p>

          <CRMIllustration />

          <ul className="mt-6 space-y-2.5">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-sm text-neutral-200">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#ED1C24]/20 text-[#ED1C24]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 mt-7 pt-5 border-t border-white/12 flex flex-col gap-4">
          {service.disclaimerNote && (
            <p className="text-[11px] leading-relaxed text-neutral-400">
              {service.disclaimerNote}
            </p>
          )}
          <Link
            to={service.actionHref}
            className="btn-press inline-flex items-center justify-center gap-2 rounded-full bg-[#ED1C24] px-6 py-3 text-sm font-semibold text-white hover:bg-[#C81018] self-start"
          >
            <span>{service.actionLabel}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-1 flex-col overflow-hidden rounded-[22px] sm:rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_12px_36px_rgba(16,16,16,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ED1C24]/45 hover:shadow-[0_20px_48px_rgba(16,16,16,0.09)] sm:grid sm:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      {/* Framed Architectural / Operational Image */}
      {service.image && (
        <div className="relative aspect-[16/10] sm:aspect-auto sm:h-full w-full overflow-hidden bg-[#F7F7F8]">
          <SmartImage
            src={service.image}
            alt={service.imageAlt || service.title}
            width={1280}
            height={720}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            fallbackLabel={service.title}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/10"
            aria-hidden="true"
          />
          <div className="absolute top-3.5 left-3.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 text-[#ED1C24] shadow-sm backdrop-blur-xs transition-colors duration-300 group-hover:bg-[#ED1C24] group-hover:text-white">
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </div>
        </div>
      )}

      {/* Structured Copy & Checklist */}
      <div className="flex flex-col justify-between p-6 sm:p-7">
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C81018]">
              {service.label}
            </p>
            <span className="font-mono-nums text-xs font-semibold text-[#858585] group-hover:text-[#ED1C24] transition-colors">
              0{index + 1}
            </span>
          </div>

          <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-[#101010] tracking-tight">
            {service.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-[#626262]">
            {service.description}
          </p>

          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 border-t border-[#F0F0F2] pt-4">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-xs sm:text-[13px] text-[#101010]">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#FFF0F0] text-[#ED1C24]">
                  <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="leading-snug">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 pt-4 border-t border-[#F0F0F2] flex flex-wrap items-center justify-between gap-3">
          {service.disclaimerNote && (
            <p className="text-[11px] leading-snug text-[#626262] max-w-sm">
              {service.disclaimerNote}
            </p>
          )}
          <button
            type="button"
            onClick={() => handleAnchorAction(service.actionHref)}
            className="btn-press inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#101010] hover:text-[#ED1C24] transition-colors ml-auto"
          >
            <span>{service.actionLabel}</span>
            <ArrowRight className="h-4 w-4 text-[#ED1C24] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
