import { useEffect, useState } from 'react';
import { ExternalLink, Youtube } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import { fetchChannelVideos } from '../../services/youtube';
import type { YouTubeVideo } from '../../types';
import { Modal } from './Modal';

interface VideoModalProps {
  open: boolean;
  video: YouTubeVideo | null;
  onClose: () => void;
}

export function VideoModal({ open, video, onClose }: VideoModalProps) {
  const [featuredVideo, setFeaturedVideo] = useState<YouTubeVideo | null>(null);
  const [loadingFeatured, setLoadingFeatured] = useState(false);

  useEffect(() => {
    if (!open || video) return;
    let active = true;
    setLoadingFeatured(true);
    fetchChannelVideos(1)
      .then((res) => {
        if (active) {
          setFeaturedVideo(res.videos[0] ?? null);
          setLoadingFeatured(false);
        }
      })
      .catch(() => {
        if (active) {
          setFeaturedVideo(null);
          setLoadingFeatured(false);
        }
      });
    return () => {
      active = false;
    };
  }, [open, video]);

  const activeVideo = video ?? featuredVideo;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={activeVideo ? activeVideo.title : 'ASV Property Management — How We Work'}
    >
      {loadingFeatured && !activeVideo ? (
        <div className="aspect-video w-full rounded-xl bg-[#F7F7F7] flex items-center justify-center text-sm text-[#626262]">
          Loading official ASV channel video...
        </div>
      ) : activeVideo && activeVideo.embeddable ? (
        <div className="space-y-4">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(activeVideo.id)}?rel=0`}
              title={activeVideo.title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#626262]">
            <span>Official ASV Property Management Video</span>
            <a
              href={activeVideo.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-[#101010] hover:text-[#ED1C24]"
            >
              <span>Open on YouTube</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-5 py-2">
          <div className="rounded-xl border border-[#E5E5E5] bg-[#F7F7F7] p-6 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#ED1C24]">
              <Youtube className="h-4 w-4" aria-hidden="true" />
              <span>Official YouTube Channel</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#101010]">
              {activeVideo
                ? 'This video has embedding disabled by the uploader.'
                : 'Watch ASV walkthroughs & property updates on YouTube'}
            </h3>
            <p className="text-sm leading-relaxed text-[#626262]">
              {activeVideo
                ? 'You can watch the full video directly on ASV’s official YouTube channel using the link below.'
                : 'Automatic embedded playback activates once YOUTUBE_API_KEY is configured on the server. Meanwhile, visit our official YouTube channel to view ASV walkthroughs and homeowner updates directly.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#E5E5E5] px-5 py-2.5 text-sm font-semibold text-[#101010] hover:border-[#101010]"
            >
              Close
            </button>
            <a
              href={activeVideo ? activeVideo.watchUrl : COMPANY_INFO.youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#ED1C24] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#C81018] transition-colors"
            >
              <Youtube className="h-4 w-4" aria-hidden="true" />
              <span>{activeVideo ? 'Watch on YouTube' : 'Open Official YouTube Channel'}</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </Modal>
  );
}
