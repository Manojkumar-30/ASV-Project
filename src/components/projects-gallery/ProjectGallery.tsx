import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import type { ProjectCommunity } from '../../types';
import { Modal } from '../ui/Modal';
import { SmartImage } from '../ui/SmartImage';
import { FeaturedProject } from './FeaturedProject';
import { ProjectThumbnail } from './ProjectThumbnail';

interface ProjectGalleryProps {
  projects: ProjectCommunity[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

const GROUP_SIZE = 4;

export function ProjectGallery({
  projects,
  activeIndex,
  onPrev,
  onNext,
  onSelect,
}: ProjectGalleryProps) {
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = projects.length;
  const activeProject = projects[activeIndex] ?? projects[0];
  const currentGroup = Math.floor(activeIndex / GROUP_SIZE);
  const groupStart = currentGroup * GROUP_SIZE;
  const visibleProjects = projects.slice(groupStart, groupStart + GROUP_SIZE);
  const totalGroups = Math.ceil(total / GROUP_SIZE);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 45) {
      if (delta < 0) onNext();
      else onPrev();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      onNext();
    }
  };

  const handleEnquireClick = useCallback(() => {
    setLightboxOpen(false);
    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
      consultationSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate('/contact');
  }, [navigate]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Bengaluru residential communities managed by ASV"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="focus-visible:outline-2 rounded-[26px]"
    >
      {/* Featured Wide Architectural Stage */}
      <FeaturedProject
        project={activeProject}
        activeIndex={activeIndex}
        total={total}
        onOpenLightbox={() => setLightboxOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />

      {/* Portfolio Group Selector Header + 4-Card Thumbnail Window */}
      <div className="mt-5 sm:mt-6">
        {totalGroups > 1 && (
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-medium text-[#626262]">
              Showing communities {String(groupStart + 1).padStart(2, '0')}–
              {String(Math.min(groupStart + GROUP_SIZE, total)).padStart(2, '0')} of{' '}
              {String(total).padStart(2, '0')}
            </span>

            <div className="inline-flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white p-1">
              {Array.from({ length: totalGroups }, (_, gIdx) => {
                const startNum = gIdx * GROUP_SIZE + 1;
                const endNum = Math.min((gIdx + 1) * GROUP_SIZE, total);
                const isGroupActive = currentGroup === gIdx;
                return (
                  <button
                    key={gIdx}
                    type="button"
                    onClick={() => onSelect(gIdx * GROUP_SIZE)}
                    aria-pressed={isGroupActive}
                    className={`rounded-lg px-3 py-1.5 font-mono-nums text-xs font-semibold transition-colors ${
                      isGroupActive
                        ? 'bg-[#101010] text-white'
                        : 'text-[#626262] hover:text-[#101010]'
                    }`}
                  >
                    {String(startNum).padStart(2, '0')}–{String(endNum).padStart(2, '0')}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {visibleProjects.map((project, offset) => {
            const actualIndex = groupStart + offset;
            return (
              <ProjectThumbnail
                key={project.id}
                project={project}
                index={actualIndex}
                selected={actualIndex === activeIndex}
                onSelect={() => onSelect(actualIndex)}
              />
            );
          })}
        </div>
      </div>

      {/* Full-Screen Accessible Lightbox Modal */}
      <Modal
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={activeProject.name}
        maxWidthClass="max-w-4xl"
      >
        <div className="space-y-5">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#101010]">
            <SmartImage
              src={activeProject.image}
              alt={`${activeProject.name} in ${activeProject.location}`}
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-y-0 left-3 flex items-center">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous project in lightbox"
                className="btn-press inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/92 text-[#101010] shadow-md hover:bg-[#ED1C24] hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button
                type="button"
                onClick={onNext}
                aria-label="Next project in lightbox"
                className="btn-press inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/92 text-[#101010] shadow-md hover:bg-[#ED1C24] hover:text-white"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#626262]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 font-semibold text-[#ED1C24]">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {activeProject.location}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeProject.corridor}</span>
              </div>
              <span className="font-mono-nums font-semibold text-[#101010]">
                {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
            <p className="text-[15px] text-[#101010] leading-relaxed">{activeProject.note}</p>
            <p className="text-xs text-[#626262] leading-relaxed">
              ASV operates independently on behalf of individual unit owners within{' '}
              {activeProject.name} and does not claim ownership or official developer partnerships.
            </p>
          </div>

          <div className="flex flex-wrap justify-end gap-3 pt-2 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="btn-press rounded-full border border-[#E5E7EB] px-5 py-2.5 text-sm font-semibold text-[#101010] hover:border-[#101010]"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleEnquireClick}
              className="btn-press inline-flex items-center gap-2 rounded-full bg-[#ED1C24] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#C81018]"
            >
              <span>Enquire for {activeProject.name}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
