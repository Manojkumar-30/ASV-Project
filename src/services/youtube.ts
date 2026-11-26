import type { YouTubeVideo } from '../types';

export interface YouTubeVideosResponse {
  configured: boolean;
  channelId: string;
  channelUrl: string;
  videos: YouTubeVideo[];
  nextPageToken?: string;
  totalResults?: number;
  cached?: boolean;
  stale?: boolean;
  lastUpdatedAt?: string;
  message?: string;
  warning?: string;
  error?: string;
}

export async function fetchChannelVideos(limit = 3, pageToken?: string): Promise<YouTubeVideosResponse> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (pageToken) {
    params.set('pageToken', pageToken);
  }
  const response = await fetch(`/api/youtube/videos?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  });
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return {
      configured: false,
      channelId: 'UCAeG716AYl4M5QXXxsXWa2w',
      channelUrl: 'https://www.youtube.com/channel/UCAeG716AYl4M5QXXxsXWa2w',
      videos: [],
    };
  }
  const data = (await response.json()) as YouTubeVideosResponse;
  if (!response.ok && !data.videos) {
    throw new Error(data.error || 'Unable to load YouTube videos right now.');
  }
  return data;
}
