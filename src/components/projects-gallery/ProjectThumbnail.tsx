import { MapPin } from 'lucide-react';
import type { ProjectCommunity } from '../../types';
import { SmartImage } from '../ui/SmartImage';

interface ProjectThumbnailProps {
  project: ProjectCommunity;
  index: number;
  selected: boolean;
  onSelect: () => void;
}

export function ProjectThumbnail({
  project,
  index,
  selected,
  onSelect,
}: ProjectThumbnailProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Select ${project.name} in ${project.location}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white p-2.5 text-left transition-all duration-200 ${
        selected
          ? 'border-[#ED1C24] shadow-[0_10px_28px_rgba(237,28,36,0.12)] ring-1 ring-[#ED1C24]/30'
          : 'border-[#E5E7EB] hover:border-[#101010]/35 hover:-translate-y-0.5'
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#F0F0F2]">
        <SmartImage
          src={project.image}
          alt={`${project.name} residential exterior`}
          width={640}
          height={400}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          fallbackLabel={project.name}
        />
        <span
          className={`absolute top-2 right-2 rounded-lg px-2 py-0.5 font-mono-nums text-[10px] font-semibold backdrop-blur-xs ${
            selected ? 'bg-[#ED1C24] text-white' : 'bg-black/60 text-white'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-2.5 px-1 pb-0.5">
        <h4
          className={`font-display text-sm sm:text-[15px] font-bold leading-snug truncate transition-colors ${
            selected ? 'text-[#ED1C24]' : 'text-[#101010] group-hover:text-[#ED1C24]'
          }`}
        >
          {project.name}
        </h4>
        <div className="mt-1 flex items-center gap-1 text-xs text-[#626262] truncate">
          <MapPin className="h-3 w-3 text-[#ED1C24] shrink-0" aria-hidden="true" />
          <span className="truncate">{project.location}</span>
        </div>
      </div>
    </button>
  );
}
