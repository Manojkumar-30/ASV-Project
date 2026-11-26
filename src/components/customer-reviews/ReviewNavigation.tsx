import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CustomerTestimonial } from '../../types';

interface ReviewNavigationProps {
  testimonials: CustomerTestimonial[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export function ReviewNavigation({
  testimonials,
  activeIndex,
  onPrev,
  onNext,
  onSelect,
}: ReviewNavigationProps) {
  return (
    <div className="mt-6 space-y-5">
      {/* Controls & Progress Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono-nums text-xs font-semibold tracking-wider text-[#101010]">
            {String(activeIndex + 1).padStart(2, '0')}
            <span className="text-[#858585]">
              {' '}
              / {String(testimonials.length).padStart(2, '0')}
            </span>
          </span>
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Select customer review">
            {testimonials.map((item, idx) => {
              const selected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-label={`View review ${idx + 1} by ${item.name}`}
                  onClick={() => onSelect(idx)}
                  className="group inline-flex h-8 min-w-[28px] items-center justify-center px-1 focus-visible:outline-2"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      selected
                        ? 'w-7 bg-[#ED1C24]'
                        : 'w-2 bg-[#D4D4D8] group-hover:bg-[#101010]/45'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous customer review"
            className="btn-press inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#101010] shadow-xs transition-colors hover:border-[#ED1C24] hover:text-[#ED1C24]"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next customer review"
            className="btn-press inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#101010] shadow-xs transition-colors hover:border-[#ED1C24] hover:text-[#ED1C24]"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Editorial Customer Switcher Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#E5E7EB] pt-5">
        {testimonials.map((item, idx) => {
          const selected = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(idx)}
              aria-pressed={selected}
              className={`group rounded-2xl border p-3.5 text-left transition-all duration-200 ${
                selected
                  ? 'border-[#ED1C24]/45 bg-[#FFF0F0]/55 shadow-[0_6px_18px_rgba(237,28,36,0.08)]'
                  : 'border-[#E5E7EB] bg-white hover:border-[#101010]/30 hover:bg-[#F7F7F8]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-display text-sm font-bold text-[#101010] truncate">
                  {item.name}
                </span>
                <span
                  className={`font-mono-nums text-[11px] font-semibold ${
                    selected ? 'text-[#ED1C24]' : 'text-[#858585]'
                  }`}
                >
                  0{idx + 1}
                </span>
              </div>
              <p className="mt-1 text-xs text-[#626262] truncate">
                {item.residence} · {item.community}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
