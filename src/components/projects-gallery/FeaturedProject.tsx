import { motion, useReducedMotion } from 'motion/react';
import { MapPin, Maximize2 } from 'lucide-react';
import type { ProjectCommunity } from '../../types';
import { EASE_PREMIUM } from '../../lib/motion';
import { SmartImage } from '../ui/SmartImage';

interface FeaturedProjectProps {
  project: ProjectCommunity;
  activeIndex: number;
  total: number;
  onOpenLightbox: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

export function FeaturedProject({
  project,
  activeIndex,
  total,
  onOpenLightbox,
  onTouchStart,
  onTouchEnd,
}: FeaturedProjectProps) {
  const reduced = useReducedMotion();

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="group relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] lg:max-h-[540px] w-full overflow-hidden rounded-[20px] sm:rounded-[26px] bg-[#101010] shadow-[0_24px_64px_rgba(16,16,16,0.12)] touch-pan-y"
    >
      <motion.div
        key={project.id}
        initial={reduced ? false : { opacity: 0.65 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: EASE_PREMIUM }}
        className="h-full w-full"
      >
        <SmartImage
          src={project.image}
          alt={`${project.name} residential community in ${project.location}`}
          width={1600}
          height={900}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          fallbackLabel={project.name}
        />
      </motion.div>

      {/* Bottom Cinematic Gradient Overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/15"
        aria-hidden="true"
      />

      {/* Top Overlay Controls */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-black/55 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md">
          <span className="font-mono-nums font-semibold text-[#ED1C24]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="text-white/40" aria-hidden="true">
            |
          </span>
          <span className="truncate max-w-[140px] min-[375px]:max-w-[180px] sm:max-w-none">
            {project.corridor}
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenLightbox}
          aria-label={`Open full-screen gallery view for ${project.name}`}
          className="btn-press inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/92 text-[#101010] shadow-md backdrop-blur-xs transition-colors hover:bg-[#ED1C24] hover:border-[#ED1C24] hover:text-white"
        >
          <Maximize2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Bottom Architectural Community Caption */}
      <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-200 mb-2">
            <MapPin className="h-4 w-4 text-[#ED1C24] shrink-0" aria-hidden="true" />
            <span>{project.location}</span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl lg:text-[42px] font-bold leading-tight tracking-[-0.025em] text-white">
            {project.name}
          </h3>
          <p className="mt-2 hidden sm:block text-sm text-neutral-300 max-w-xl leading-relaxed">
            {project.note}
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenLightbox}
          className="btn-press self-start sm:self-end inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/25 bg-black/55 px-4 py-2 text-xs sm:text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-[#ED1C24] hover:bg-[#ED1C24]"
        >
          <span>Inspect Community</span>
          <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
