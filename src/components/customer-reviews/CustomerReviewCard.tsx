import { useState } from 'react';
import { Building2, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import type { CustomerTestimonial } from '../../types';
import { CustomerAvatar } from './CustomerAvatar';

interface CustomerReviewCardProps {
  testimonial: CustomerTestimonial;
  index: number;
  total: number;
}

const EXPAND_THRESHOLD = 280;

export function CustomerReviewCard({ testimonial, index, total }: CustomerReviewCardProps) {
  const isLong = testimonial.quote.length > EXPAND_THRESHOLD;
  const [expanded, setExpanded] = useState(false);

  const displayQuote =
    isLong && !expanded
      ? `${testimonial.quote.slice(0, EXPAND_THRESHOLD).trimEnd()}...`
      : testimonial.quote;

  return (
    <article className="flex h-full min-h-[340px] sm:min-h-[370px] flex-col justify-between rounded-[22px] sm:rounded-[24px] border border-[#E5E7EB] bg-white/95 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-[0_18px_48px_rgba(16,16,16,0.06)]">
      <div>
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#F0F0F2]">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0F0] border border-[#ED1C24]/15">
            <Quote className="h-6 w-6 text-[#ED1C24]" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <span className="font-mono-nums text-xs font-semibold tracking-[0.16em] uppercase text-[#626262]">
            Verified Owner · {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        <blockquote className="mt-7 font-display text-lg sm:text-xl lg:text-[23px] font-medium leading-[1.48] tracking-[-0.015em] text-[#101010]">
          “{displayQuote}”
        </blockquote>

        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#C81018] hover:text-[#ED1C24] transition-colors"
          >
            <span>{expanded ? 'Show less' : 'Read full review'}</span>
            {expanded ? (
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <CustomerAvatar name={testimonial.name} />
          <div>
            <h3 className="font-display text-base sm:text-lg font-bold text-[#101010]">
              {testimonial.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#626262]">{testimonial.residence}</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F7F7F8] px-3.5 py-2 text-xs font-semibold text-[#101010] self-start sm:self-auto">
          <Building2 className="h-3.5 w-3.5 text-[#ED1C24] shrink-0" aria-hidden="true" />
          <span>{testimonial.community}</span>
        </div>
      </div>
    </article>
  );
}
