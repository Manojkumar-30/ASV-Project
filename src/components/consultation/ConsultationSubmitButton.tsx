import { ArrowUpRight, Loader2 } from 'lucide-react';

interface ConsultationSubmitButtonProps {
  submitting: boolean;
}

export function ConsultationSubmitButton({ submitting }: ConsultationSubmitButtonProps) {
  return (
    <div className="space-y-3 pt-1">
      <button
        type="submit"
        disabled={submitting}
        className="btn-press group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#ED1C24] px-6 py-3.5 text-sm sm:text-[15px] font-semibold text-white shadow-[0_10px_28px_rgba(237,28,36,0.22)] transition-all duration-200 hover:bg-[#C81018] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101010] disabled:cursor-not-allowed disabled:opacity-65"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Submitting your enquiry...</span>
          </>
        ) : (
          <>
            <span>Request a Free Consultation</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </>
        )}
      </button>

      <p className="text-center text-xs text-[#626262]">Your information stays private.</p>
    </div>
  );
}
