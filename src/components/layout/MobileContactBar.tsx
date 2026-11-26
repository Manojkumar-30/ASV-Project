import { MessageCircle, Phone, CalendarCheck } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';

interface MobileContactBarProps {
  hidden: boolean;
  onConsultClick: () => void;
}

export function MobileContactBar({ hidden, onConsultClick }: MobileContactBarProps) {
  if (hidden) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-30 md:hidden border-t border-[#E5E5E5] bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(16,16,16,0.08)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Quick Contact Actions"
    >
      <div className="grid grid-cols-3 h-14">
        <a
          href={COMPANY_INFO.phoneHref}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#101010] border-r border-[#E5E5E5] active:bg-[#F7F7F7]"
        >
          <Phone className="h-4 w-4 text-[#ED1C24]" aria-hidden="true" />
          <span>Call</span>
        </a>
        <a
          href={COMPANY_INFO.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#101010] border-r border-[#E5E5E5] active:bg-[#F7F7F7]"
        >
          <MessageCircle className="h-4 w-4 text-[#ED1C24]" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
        <button
          type="button"
          onClick={onConsultClick}
          className="flex items-center justify-center gap-1.5 bg-[#ED1C24] text-xs font-semibold text-white active:bg-[#C81018]"
        >
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          <span>Consult</span>
        </button>
      </div>
    </div>
  );
}
