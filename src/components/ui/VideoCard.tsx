import { Play, ExternalLink } from 'lucide-react';
import type { YouTubeVideo } from '../../types';
import { SmartImage } from './SmartImage';

interface VideoCardProps {
  video: YouTubeVideo;
  onPlay: (video: YouTubeVideo) => void;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function VideoCard({ video, onPlay }: VideoCardProps) {
  const formattedDate = formatDate(video.publishedAt);

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden transition-all duration-300 hover:border-[#101010]/30 hover:shadow-[0_12px_32px_rgba(16,16,16,0.06)]">
      <div>
        <div className="relative aspect-video w-full overflow-hidden bg-[#F7F7F7]">
          <SmartImage
            src={video.thumbnailUrl}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            fallbackLabel={video.title}
          />
          <button
            type="button"
            onClick={() => onPlay(video)}
            aria-label={`Play video: ${video.title}`}
            className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors duration-300 group-hover:bg-black/35"
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#ED1C24] shadow-lg ring-4 ring-white/25 transition-all duration-300 group-hover:scale-110 group-hover:ring-white/40">
              <Play className="h-6 w-6 fill-[#ED1C24] ml-0.5" aria-hidden="true" />
            </span>
          </button>
          {video.duration && (
            <span className="font-mono-nums absolute bottom-3 right-3 rounded bg-black/80 px-2 py-0.5 text-xs font-medium text-white">
              {video.duration}
            </span>
          )}
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs text-[#858585] mb-2">
            {formattedDate && <span>{formattedDate}</span>}
            {formattedDate && <span aria-hidden="true">·</span>}
            <span>ASV YouTube</span>
          </div>
          <h3 className="font-display text-lg font-semibold text-[#101010] leading-snug line-clamp-2 group-hover:text-[#ED1C24] transition-colors duration-200">
            {video.title}
          </h3>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#E5E5E5] px-5 py-3.5 sm:px-6 text-sm">
        <button
          type="button"
          onClick={() => onPlay(video)}
          className="btn-press inline-flex items-center gap-1.5 font-medium text-[#101010] hover:text-[#ED1C24]"
        >
          <Play className="h-4 w-4" aria-hidden="true" />
          <span>{video.embeddable ? 'Watch video' : 'Open on YouTube'}</span>
        </button>
        <a
          href={video.watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex items-center gap-1 text-xs font-medium text-[#626262] hover:text-[#101010]"
        >
          <span>YouTube</span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
