import { ArrowRight, Check, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import type { TenantServiceItem } from '../../types';
import { Modal } from '../ui/Modal';
import { ServiceIcon } from './ServiceIcon';

interface TenantServiceDetailsProps {
  service: TenantServiceItem | null;
  totalServices: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onConsultClick: () => void;
}

export function TenantServiceDetails({
  service,
  totalServices,
  onClose,
  onPrev,
  onNext,
  onConsultClick,
}: TenantServiceDetailsProps) {
  return (
    <Modal
      open={Boolean(service)}
      onClose={onClose}
      title={service ? `${service.stepNumber} · ${service.title}` : 'Service Details'}
      maxWidthClass="max-w-2xl"
    >
      {service && (
        <div className="space-y-6">
          {/* Header summary */}
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F0] border border-[#ED1C24]/20 text-[#ED1C24]">
              <ServiceIcon icon={service.icon} className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <div className="font-mono-nums text-xs font-semibold uppercase tracking-[0.14em] text-[#ED1C24] mb-1">
                Service {service.stepNumber} of {String(totalServices).padStart(2, '0')}
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#101010] leading-tight">
                {service.title}
              </h3>
              <p className="mt-2.5 text-sm sm:text-[15px] text-[#626262] leading-relaxed">
                {service.fullDescription}
              </p>
            </div>
          </div>

          {/* Detailed Activities Checklist */}
          <div className="rounded-2xl border border-[#E8E8E8] bg-[#F8F8F8] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#101010] mb-3.5">
              Detailed Activities Included
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.activities.map((activity) => (
                <li
                  key={activity}
                  className="flex items-start gap-2.5 text-sm text-[#101010] leading-snug"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFF0F0] text-[#ED1C24]">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contractual Terms / Notes where applicable */}
          {service.contractualNote && (
            <div className="flex items-start gap-3 rounded-xl border border-[#E8E8E8] bg-white px-4 py-3 text-xs sm:text-[13px] text-[#626262] leading-relaxed">
              <Info className="h-4 w-4 text-[#ED1C24] shrink-0 mt-0.5" aria-hidden="true" />
              <span>{service.contractualNote}</span>
            </div>
          )}

          {/* Footer Actions: Step Cycling + Primary Consultation CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#E8E8E8]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous service"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E8E8] bg-white text-[#101010] hover:border-[#101010] transition-colors focus-visible:outline-2 focus-visible:outline-[#ED1C24]"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="font-mono-nums text-xs font-semibold text-[#626262] px-1">
                {service.stepNumber} / {String(totalServices).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next service"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#101010] bg-[#101010] text-white hover:bg-[#ED1C24] hover:border-[#ED1C24] transition-colors focus-visible:outline-2 focus-visible:outline-[#ED1C24]"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full border border-[#E8E8E8] px-5 py-2.5 text-sm font-semibold text-[#626262] hover:border-[#101010] hover:text-[#101010] transition-colors min-h-[44px]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={onConsultClick}
                className="btn-press inline-flex items-center justify-center gap-2 rounded-full bg-[#ED1C24] hover:bg-[#C81018] px-6 py-2.5 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
