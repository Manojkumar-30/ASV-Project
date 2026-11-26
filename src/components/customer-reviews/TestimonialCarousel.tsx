import { useCallback, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { CustomerTestimonial } from '../../types';
import { EASE_PREMIUM } from '../../lib/motion';
import { CustomerReviewCard } from './CustomerReviewCard';
import { ReviewNavigation } from './ReviewNavigation';

interface TestimonialCarouselProps {
  testimonials: CustomerTestimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStartX = useRef<number | null>(null);
  const reduced = useReducedMotion();

  const total = testimonials.length;
  const current = testimonials[activeIndex];

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  const handleSelect = useCallback(
    (idx: number) => {
      setDirection(idx >= activeIndex ? 1 : -1);
      setActiveIndex(idx);
    },
    [activeIndex],
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 45) {
      if (delta < 0) handleNext();
      else handlePrev();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div
      className="flex h-full flex-col justify-between focus-visible:outline-2 rounded-[24px]"
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Homeowner testimonials"
      onKeyDown={handleKeyDown}
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex-1 overflow-hidden touch-pan-y"
        aria-live="polite"
      >
        <motion.div
          key={current.id}
          initial={reduced ? false : { opacity: 0.25, x: direction * 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.22, ease: EASE_PREMIUM }}
          className="h-full"
        >
          <CustomerReviewCard testimonial={current} index={activeIndex} total={total} />
        </motion.div>
      </div>

      <ReviewNavigation
        testimonials={testimonials}
        activeIndex={activeIndex}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelect={handleSelect}
      />
    </div>
  );
}
