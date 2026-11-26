import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Youtube } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import { fetchChannelVideos, type YouTubeVideosResponse } from '../../services/youtube';
import type { YouTubeVideo } from '../../types';
import { Container } from '../ui/Container';
import { EditorialReveal, MaskedLine } from '../ui/MotionPrimitives';
import { SectionLabel } from '../ui/SectionLabel';
import { VideoCard } from '../ui/VideoCard';

interface YouTubeSectionProps {
  onPlayVideo: (video: YouTubeVideo) => void;
}

export function YouTubeSection({ onPlayVideo }: YouTubeSectionProps) {
  const [state, setState] = useState<{
    loading: boolean;
    data: YouTubeVideosResponse | null;
    error: string | null;
  }>({ loading: true, data: null, error: null });

  useEffect(() => {
    let active = true;
    fetchChannelVideos(3)
      .then((data) => {
        if (active) setState({ loading: false, data, error: null });
      })
      .catch((err) => {
        if (active) {
          setState({
            loading: false,
            data: null,
            error: err instanceof Error ? err.message : 'Unable to load channel videos.',
          });
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const videos = state.data?.videos ?? [];

  return (
    <section id="insights" className="scroll-mt-20 py-14 sm:py-20 lg:py-28 bg-[#F7F7F7] border-b border-[#E5E5E5] overflow-x-clip">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <SectionLabel text="Videos & Insights" className="mb-4" />
            <h2 className="section-heading font-bold text-[#101010]">
              <MaskedLine>Property insights,</MaskedLine>
              <MaskedLine delay={0.1}>tours &amp; updates.</MaskedLine>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/insights"
              className="btn-press inline-flex items-center gap-2 rounded-full bg-[#101010] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#ED1C24] group"
            >
              <span>All Videos &amp; Insights</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href={COMPANY_INFO.youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-5 py-2.5 text-sm font-semibold text-[#101010] hover:border-[#101010]"
            >
              <Youtube className="h-4 w-4 text-[#ED1C24]" aria-hidden="true" />
              <span>Official Channel</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {state.loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Loading latest videos">
            {[0, 1, 2].map((slot) => (
              <div key={slot} className="rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden animate-pulse">
                <div className="aspect-video bg-[#EAEAEA]" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-24 rounded bg-[#EAEAEA]" />
                  <div className="h-5 w-4/5 rounded bg-[#EAEAEA]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!state.loading && videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, idx) => (
              <EditorialReveal key={video.id} delay={idx * 0.08} distance={16}>
                <VideoCard video={video} onPlay={onPlayVideo} />
              </EditorialReveal>
            ))}
          </div>
        )}

        {!state.loading && videos.length === 0 && (
          <EditorialReveal className="rounded-2xl border border-[#E5E5E5] bg-white p-8 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#ED1C24]">
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                  <span>ASV Official YouTube Channel · {COMPANY_INFO.youtubeChannelId}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#101010]">
                  {state.data?.configured === false
                    ? 'Automatic YouTube feed ready for server API key.'
                    : state.error
                      ? 'YouTube feed temporarily unavailable.'
                      : 'No public uploads available yet.'}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#626262] max-w-2xl">
                  {state.data?.configured === false
                    ? 'This section automatically displays the latest three public videos from ASV’s official YouTube channel with 60-minute server caching once YOUTUBE_API_KEY is configured in environment variables. In the meantime, explore walkthroughs and insights directly on our official channel.'
                    : state.error ||
                      'Visit the official ASV Property Management YouTube channel directly to watch our latest walkthroughs and homeowner updates.'}
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <a
                  href={COMPANY_INFO.youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press inline-flex items-center gap-2 rounded-full bg-[#ED1C24] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#C81018]"
                >
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                  <span>Visit ASV YouTube Channel</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </EditorialReveal>
        )}
      </Container>
    </section>
  );
}
