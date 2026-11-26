import { Play } from 'lucide-react';
import { WHY_CHOOSE_VIDEO_PREVIEW } from '../../data/whyChooseUs';
import { SmartImage } from '../ui/SmartImage';
import { VideoModal } from '../ui/VideoModal';

interface CompanyVideoTriggerProps {
  onOpen: () => void;
}

export function CompanyVideoTrigger({ onOpen }: CompanyVideoTriggerProps) {
  return (
    <div className="pt-6">
      <button
        type="button"
        onClick={onOpen}
        className="group w-full rounded-2xl border border-[#E5E7EB] bg-white p-3.5 sm:p-4 text-left flex items-center gap-4 shadow-[0_10px_28px_-20px_rgba(16,16,16,0.12)] transition-all duration-200 hover:border-[#ED1C24]/50 hover:shadow-[0_16px_34px_-20px_rgba(237,28,36,0.16)] min-h-[68px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ED1C24]"
      >
        <div className="relative h-16 w-24 sm:h-[72px] sm:w-28 shrink-0 overflow-hidden rounded-xl bg-[#101010]">
          <SmartImage
            src={WHY_CHOOSE_VIDEO_PREVIEW.thumbnailSrc}
            alt={WHY_CHOOSE_VIDEO_PREVIEW.thumbnailAlt}
            loading="lazy"
            width={224}
            height={144}
            fallbackLabel="ASV Video"
            className="h-full w-full object-cover opacity-85 transition-transform duration-300 motion-safe:group-hover:scale-105"
          />
          <span
            className="absolute inset-0 flex items-center justify-center bg-black/25"
            aria-hidden="true"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ED1C24] text-white shadow-md transition-transform duration-200 motion-safe:group-hover:scale-110">
              <Play className="h-4 w-4 fill-current ml-0.5" aria-hidden="true" />
            </span>
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="font-mono-nums text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ED1C24]">
            Official Video Walkthrough
          </div>
          <div className="font-display text-sm sm:text-base font-bold text-[#101010] leading-snug mt-0.5">
            {WHY_CHOOSE_VIDEO_PREVIEW.title}
          </div>
          <p className="text-xs sm:text-[13px] text-[#626262] mt-0.5 leading-snug">
            {WHY_CHOOSE_VIDEO_PREVIEW.subtitle}
          </p>
        </div>
      </button>
    </div>
  );
}

interface CompanyVideoDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CompanyVideoDialog({ open, onClose }: CompanyVideoDialogProps) {
  return <VideoModal open={open} video={null} onClose={onClose} />;
}
