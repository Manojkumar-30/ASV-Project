import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building2 } from 'lucide-react';

export function PropertyConsultationCTA() {
  const navigate = useNavigate();

  const handleAction = useCallback(() => {
    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
      consultationSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate('/contact');
  }, [navigate]);

  return (
    <div className="mt-10 sm:mt-12 relative overflow-hidden rounded-[22px] sm:rounded-[24px] bg-[#101010] px-6 py-7 sm:px-10 sm:py-9 text-white shadow-[0_24px_60px_rgba(16,16,16,0.14)]">
      <div
        className="pointer-events-none absolute inset-0 architectural-grid-dark opacity-70"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4 max-w-2xl">
          <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#ED1C24]/35 bg-[#ED1C24]/15 text-[#ED1C24]">
            <Building2 className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-xl sm:text-2xl lg:text-[26px] font-bold tracking-tight text-white">
              Own a Property in Bengaluru?
            </h3>
            <p className="mt-1.5 text-sm sm:text-[15px] leading-relaxed text-neutral-300">
              Discover how ASV can help manage your property while you enjoy peace of mind.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleAction}
            className="btn-press inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#ED1C24] px-6 py-3 text-sm font-semibold text-white hover:bg-[#C81018]"
          >
            <span>List Your Property</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={handleAction}
            className="btn-press inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white hover:border-white hover:bg-white/[0.12]"
          >
            <span>Get a Free Consultation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
