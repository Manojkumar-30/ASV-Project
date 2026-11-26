import { useEffect, useState } from 'react';
import { ExternalLink, Youtube } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { fetchChannelVideos } from '../services/youtube';
import type { YouTubeVideo } from '../types';
import { usePageMeta } from '../hooks/usePageMeta';
import { Container } from '../components/ui/Container';
import { SectionLabel } from '../components/ui/SectionLabel';
import { VideoCard } from '../components/ui/VideoCard';
import { ConsultationSection } from '../components/home/ConsultationSection';

interface InsightsPageProps {
  onPlayVideo: (video: YouTubeVideo) => void;
}

export function InsightsPage({ onPlayVideo }: InsightsPageProps) {
  usePageMeta({
    title: 'Videos & Property Management Insights | ASV Property Management',
    description:
      'Watch official ASV Property Management videos, property tours, and practical guidance for NRI homeowners managing residential properties in Bengaluru.',
    canonicalPath: '/insights',
  });

  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const [configured, setConfigured] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchChannelVideos(6)
      .then((res) => {
        if (!active) return;
        setConfigured(res.configured);
        setVideos(res.videos);
        setNextPageToken(res.nextPageToken);
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Unable to load videos.');
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleLoadMore = async () => {
    if (!nextPageToken || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetchChannelVideos(6, nextPageToken);
      setVideos((prev) => {
        const seen = new Set(prev.map((v) => v.id));
        return [...prev, ...res.videos.filter((v) => !seen.has(v.id))];
      });
      setNextPageToken(res.nextPageToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load additional videos.');
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <>
      <section className="pt-12 sm:pt-16 lg:pt-24 pb-12 bg-[#FAFAFA] border-b border-[#E5E5E5]">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <SectionLabel text="Videos & Insights" className="mb-4" />
              <h1 className="hero-headline font-bold text-[#101010] mb-5">
                Property insights, tours &amp; <span className="text-[#ED1C24]">homeowner updates.</span>
              </h1>
              <p className="text-lg text-[#626262] leading-relaxed">
                Public uploads synced directly from the official ASV Property Management YouTube channel.
              </p>
            </div>

            <a
              href={COMPANY_INFO.youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#101010] px-6 py-3 text-sm font-semibold text-white hover:bg-[#ED1C24] transition-colors self-start"
            >
              <Youtube className="h-4 w-4 text-[#ED1C24]" aria-hidden="true" />
              <span>Subscribe on YouTube</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20 bg-white border-b border-[#E5E5E5]">
        <Container>
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="rounded-2xl border border-[#E5E5E5] overflow-hidden animate-pulse">
                  <div className="aspect-video bg-[#EAEAEA]" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-24 rounded bg-[#EAEAEA]" />
                    <div className="h-5 w-4/5 rounded bg-[#EAEAEA]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && videos.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} onPlay={onPlayVideo} />
                ))}
              </div>

              {nextPageToken && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="rounded-full border border-[#101010] px-7 py-3 text-sm font-semibold text-[#101010] hover:bg-[#101010] hover:text-white disabled:opacity-50 transition-colors"
                  >
                    {loadingMore ? 'Loading more videos...' : 'Load More Videos'}
                  </button>
                </div>
              )}
            </>
          )}

          {!loading && videos.length === 0 && (
            <div className="rounded-2xl border border-[#E5E5E5] bg-[#F7F7F7] p-8 sm:p-10 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#ED1C24]">
                <Youtube className="h-4 w-4" aria-hidden="true" />
                <span>Channel ID: {COMPANY_INFO.youtubeChannelId}</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-[#101010]">
                {!configured
                  ? 'YouTube Data API v3 Integration Ready'
                  : error
                    ? 'Unable to load channel videos'
                    : 'No public videos returned'}
              </h2>
              <p className="text-base text-[#626262] max-w-2xl leading-relaxed">
                {!configured
                  ? 'Set YOUTUBE_API_KEY in your server environment variables to automatically fetch, cache (60-minute TTL), and paginate public uploads from ASV’s official channel.'
                  : error ||
                    'Please check the official YouTube channel directly for the latest uploads.'}
              </p>
              <a
                href={COMPANY_INFO.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#ED1C24] px-6 py-3 text-sm font-semibold text-white hover:bg-[#C81018] transition-colors"
              >
                <span>Open Official YouTube Channel</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          )}
        </Container>
      </section>

      <ConsultationSection />
    </>
  );
}
