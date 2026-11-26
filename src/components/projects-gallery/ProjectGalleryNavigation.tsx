import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectGalleryNavigationProps {
  activeIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export function ProjectGalleryNavigation({
  activeIndex,
  total,
  onPrev,
  onNext,
}: ProjectGalleryNavigationProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      <div className="flex items-center gap-2.5">
        <span className="font-mono-nums text-xs font-semibold tracking-wider text-[#101010] mr-1">
          {String(activeIndex + 1).padStart(2, '0')}
          <span className="text-[#858585]"> / {String(total).padStart(2, '0')}</span>
        </span>
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous managed community"
          className="btn-press inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#101010] shadow-xs transition-colors hover:border-[#ED1C24] hover:text-[#ED1C24]"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next managed community"
          className="btn-press inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#101010] shadow-xs transition-colors hover:border-[#ED1C24] hover:text-[#ED1C24]"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <Link
        to="/projects"
        className="btn-press inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#101010] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#ED1C24] group"
      >
        <span>View All Projects</span>
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
