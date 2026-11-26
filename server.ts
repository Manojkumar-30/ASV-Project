import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import compression from 'compression';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const IS_PROD = process.env.NODE_ENV === 'production';
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCAeG716AYl4M5QXXxsXWa2w';
const YOUTUBE_CACHE_TTL_MS = 60 * 60 * 1000; // 60 minutes

interface YouTubeVideoItem {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  watchUrl: string;
  duration?: string;
  embeddable: boolean;
}

interface YouTubeCacheEntry {
  fetchedAt: number;
  videos: YouTubeVideoItem[];
  nextPageToken?: string;
  totalResults?: number;
}

let uploadsPlaylistIdCache: { channelId: string; playlistId: string; fetchedAt: number } | null = null;
const youtubeCache = new Map<string, YouTubeCacheEntry>();

// Consultation rate limiter & duplicate submission tracker
const rateLimitMap = new Map<string, number[]>();
const recentSubmissionsMap = new Map<string, number>();

const consultationSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name.').max(120),
  email: z.string().trim().email('Please enter a valid email address.').max(160),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone or WhatsApp number.')
    .max(28)
    .regex(/^[+\d\s().-]{7,28}$/, 'Use digits, spaces, parentheses, dashes, or a leading +.'),
  country: z.string().trim().min(2, 'Please specify your country of residence.').max(80),
  propertyLocation: z.string().trim().min(2, 'Please specify your property location.').max(140),
  propertyType: z.enum(['Apartment / Flat', 'Villa / Independent House', 'Gated Community Home', 'Commercial / Other']),
  requiredService: z.enum([
    'End-to-End Property Management',
    'NRI Property Management',
    'Tenant Placement & Screening',
    'Rental & Maintenance Coordination',
    'Property Inspection & Documentation',
    'Plans & Commercial Proposal',
  ]),
  preferredContact: z.enum(['WhatsApp', 'Phone Call', 'Email', 'Video Consultation']),
  message: z.string().trim().max(1500).optional().default(''),
  privacyConsent: z.literal(true, {
    message: 'Please confirm your consent so we may respond to your enquiry.',
  }),
  website: z.string().optional().default(''), // Honeypot field
});

function formatIsoDuration(iso?: string): string | undefined {
  if (!iso) return undefined;
  const match = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return undefined;
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${minutes}:${pad(seconds)}`;
}

async function fetchUploadsPlaylistId(apiKey: string, channelId: string): Promise<string> {
  if (
    uploadsPlaylistIdCache &&
    uploadsPlaylistIdCache.channelId === channelId &&
    Date.now() - uploadsPlaylistIdCache.fetchedAt < 24 * 60 * 60 * 1000
  ) {
    return uploadsPlaylistIdCache.playlistId;
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/channels');
  url.searchParams.set('part', 'contentDetails');
  url.searchParams.set('id', channelId);
  url.searchParams.set('key', apiKey);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`YouTube channel lookup failed (${response.status})`);
  }
  const data = (await response.json()) as {
    items?: Array<{ contentDetails?: { relatedPlaylists?: { uploads?: string } } }>;
  };
  const uploadsId = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsId) {
    throw new Error('Uploads playlist not found for configured YouTube channel');
  }

  uploadsPlaylistIdCache = {
    channelId,
    playlistId: uploadsId,
    fetchedAt: Date.now(),
  };
  return uploadsId;
}

async function fetchYouTubeVideos(
  apiKey: string,
  channelId: string,
  limit: number,
  pageToken?: string,
): Promise<YouTubeCacheEntry> {
  const uploadsPlaylistId = await fetchUploadsPlaylistId(apiKey, channelId);

  const playlistUrl = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
  playlistUrl.searchParams.set('part', 'snippet,contentDetails');
  playlistUrl.searchParams.set('playlistId', uploadsPlaylistId);
  playlistUrl.searchParams.set('maxResults', String(limit));
  if (pageToken) {
    playlistUrl.searchParams.set('pageToken', pageToken);
  }
  playlistUrl.searchParams.set('key', apiKey);

  const playlistRes = await fetch(playlistUrl.toString());
  if (!playlistRes.ok) {
    throw new Error(`YouTube playlist lookup failed (${playlistRes.status})`);
  }

  const playlistJson = (await playlistRes.json()) as {
    nextPageToken?: string;
    pageInfo?: { totalResults?: number };
    items?: Array<{
      contentDetails?: { videoId?: string; videoPublishedAt?: string };
      snippet?: {
        title?: string;
        description?: string;
        publishedAt?: string;
        thumbnails?: {
          maxres?: { url?: string };
          high?: { url?: string };
          medium?: { url?: string };
          default?: { url?: string };
        };
      };
    }>;
  };

  const rawItems = playlistJson.items || [];
  const videoIds = rawItems
    .map((item) => item.contentDetails?.videoId)
    .filter((id): id is string => Boolean(id));

  const detailsMap = new Map<string, { duration?: string; embeddable: boolean }>();
  if (videoIds.length > 0) {
    const videosUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    videosUrl.searchParams.set('part', 'contentDetails,status');
    videosUrl.searchParams.set('id', videoIds.join(','));
    videosUrl.searchParams.set('key', apiKey);

    const videosRes = await fetch(videosUrl.toString());
    if (videosRes.ok) {
      const videosJson = (await videosRes.json()) as {
        items?: Array<{
          id?: string;
          contentDetails?: { duration?: string };
          status?: { embeddable?: boolean; privacyStatus?: string };
        }>;
      };
      for (const v of videosJson.items || []) {
        if (v.id) {
          detailsMap.set(v.id, {
            duration: formatIsoDuration(v.contentDetails?.duration),
            embeddable: v.status?.embeddable !== false,
          });
        }
      }
    }
  }

  const videos: YouTubeVideoItem[] = rawItems
    .filter((item) => {
      const title = item.snippet?.title || '';
      return title !== 'Private video' && title !== 'Deleted video';
    })
    .map((item) => {
      const id = item.contentDetails?.videoId || '';
      const meta = detailsMap.get(id);
      const thumbs = item.snippet?.thumbnails;
      const thumbnailUrl =
        thumbs?.maxres?.url ||
        thumbs?.high?.url ||
        thumbs?.medium?.url ||
        thumbs?.default?.url ||
        `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

      return {
        id,
        title: item.snippet?.title || 'ASV Property Management Video',
        description: item.snippet?.description || '',
        publishedAt: item.contentDetails?.videoPublishedAt || item.snippet?.publishedAt || '',
        thumbnailUrl,
        watchUrl: `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`,
        duration: meta?.duration,
        embeddable: meta?.embeddable ?? true,
      };
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return {
    fetchedAt: Date.now(),
    videos,
    nextPageToken: playlistJson.nextPageToken,
    totalResults: playlistJson.pageInfo?.totalResults,
  };
}

function getClientIp(req: express.Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 5;
  const entries = (rateLimitMap.get(ip) || []).filter((ts) => now - ts < windowMs);
  if (entries.length >= maxRequests) {
    rateLimitMap.set(ip, entries);
    return true;
  }
  entries.push(now);
  rateLimitMap.set(ip, entries);
  return false;
}

async function createApp() {
  const app = express();
  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(compression());

  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com data:",
        "img-src 'self' data: https://i.ytimg.com https://yt3.ggpht.com",
        "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com",
        IS_PROD
          ? "connect-src 'self'"
          : "connect-src 'self' ws://127.0.0.1:* ws://localhost:*",
      ].join('; '),
    );
    next();
  });

  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      youtubeConfigured: Boolean(process.env.YOUTUBE_API_KEY?.trim()),
      crmConfigured: Boolean(process.env.CRM_API_URL?.trim()),
    });
  });

  app.get('/api/youtube/videos', async (req, res) => {
    const apiKey = process.env.YOUTUBE_API_KEY?.trim();
    const limitParam = Number(req.query.limit || 6);
    const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 24) : 6;
    const pageToken = typeof req.query.pageToken === 'string' && req.query.pageToken.trim() ? req.query.pageToken.trim() : undefined;
    const cacheKey = `${limit}:${pageToken || 'first'}`;
    const channelUrl = `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}`;

    if (!apiKey) {
      res.status(200).json({
        configured: false,
        channelId: YOUTUBE_CHANNEL_ID,
        channelUrl,
        videos: [],
        cached: false,
        message: 'YouTube Data API v3 is not configured yet. Set YOUTUBE_API_KEY on the server to display live channel uploads automatically.',
      });
      return;
    }

    const existing = youtubeCache.get(cacheKey);
    if (existing && Date.now() - existing.fetchedAt < YOUTUBE_CACHE_TTL_MS) {
      res.json({
        configured: true,
        channelId: YOUTUBE_CHANNEL_ID,
        channelUrl,
        videos: existing.videos,
        nextPageToken: existing.nextPageToken,
        totalResults: existing.totalResults,
        cached: true,
        lastUpdatedAt: new Date(existing.fetchedAt).toISOString(),
      });
      return;
    }

    try {
      const fresh = await fetchYouTubeVideos(apiKey, YOUTUBE_CHANNEL_ID, limit, pageToken);
      youtubeCache.set(cacheKey, fresh);
      res.json({
        configured: true,
        channelId: YOUTUBE_CHANNEL_ID,
        channelUrl,
        videos: fresh.videos,
        nextPageToken: fresh.nextPageToken,
        totalResults: fresh.totalResults,
        cached: false,
        lastUpdatedAt: new Date(fresh.fetchedAt).toISOString(),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to fetch YouTube videos';
      if (existing) {
        res.json({
          configured: true,
          channelId: YOUTUBE_CHANNEL_ID,
          channelUrl,
          videos: existing.videos,
          nextPageToken: existing.nextPageToken,
          totalResults: existing.totalResults,
          cached: true,
          stale: true,
          lastUpdatedAt: new Date(existing.fetchedAt).toISOString(),
          warning: 'Showing previously cached videos while YouTube API is temporarily unreachable.',
        });
        return;
      }

      res.status(502).json({
        configured: true,
        channelId: YOUTUBE_CHANNEL_ID,
        channelUrl,
        videos: [],
        cached: false,
        error: message,
      });
    }
  });

  app.post('/api/consultations', async (req, res) => {
    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        ok: false,
        error: 'Too many consultation requests from your connection. Please wait a few minutes or call +91 74110 01523.',
      });
      return;
    }

    const parsed = consultationSchema.safeParse(req.body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      res.status(400).json({
        ok: false,
        error: firstIssue?.message || 'Please check the required form fields and try again.',
        fieldErrors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const data = parsed.data;

    // Honeypot check: silently reject automated spam bots without forwarding
    if (data.website && data.website.trim().length > 0) {
      res.status(400).json({
        ok: false,
        error: 'Submission could not be verified. Please refresh and try again.',
      });
      return;
    }

    // Duplicate submission protection within 5 minutes
    const dedupeKey = crypto
      .createHash('sha256')
      .update(`${data.email.toLowerCase()}|${data.phone}|${data.requiredService}|${data.propertyLocation.toLowerCase()}`)
      .digest('hex');

    const now = Date.now();
    for (const [k, ts] of recentSubmissionsMap.entries()) {
      if (now - ts > 5 * 60 * 1000) {
        recentSubmissionsMap.delete(k);
      }
    }

    const previousSubmission = recentSubmissionsMap.get(dedupeKey);
    if (previousSubmission && now - previousSubmission < 5 * 60 * 1000) {
      res.status(409).json({
        ok: false,
        error: 'A similar consultation request was already received a moment ago. Please call +91 74110 01523 if you need immediate updates.',
      });
      return;
    }

    const referenceId = `ASV-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const crmUrl = process.env.CRM_API_URL?.trim();
    const crmToken = process.env.CRM_API_TOKEN?.trim();

    const intakePayload = {
      referenceId,
      submittedAt: new Date().toISOString(),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      propertyLocation: data.propertyLocation,
      propertyType: data.propertyType,
      requiredService: data.requiredService,
      preferredContact: data.preferredContact,
      message: data.message,
      privacyConsent: data.privacyConsent,
      source: 'asv-web-redesign',
    };

    if (crmUrl) {
      try {
        const parsedCrmUrl = new URL(crmUrl);
        if (parsedCrmUrl.protocol !== 'https:' && parsedCrmUrl.protocol !== 'http:') {
          throw new Error('Invalid CRM_API_URL protocol');
        }
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        if (crmToken) {
          headers.Authorization = `Bearer ${crmToken}`;
        }
        const crmRes = await fetch(parsedCrmUrl.toString(), {
          method: 'POST',
          headers,
          body: JSON.stringify(intakePayload),
        });
        if (!crmRes.ok) {
          res.status(502).json({
            ok: false,
            error: 'We could not deliver your request to our CRM right now. Please contact us directly on WhatsApp or +91 74110 01523.',
          });
          return;
        }

        recentSubmissionsMap.set(dedupeKey, now);
        res.status(201).json({
          ok: true,
          referenceId,
          mode: 'crm',
          message: 'Your consultation request has been submitted to our property management team.',
        });
        return;
      } catch {
        res.status(502).json({
          ok: false,
          error: 'CRM delivery failed temporarily. Please call or WhatsApp +91 74110 01523 directly.',
        });
        return;
      }
    }

    // No external CRM_API_URL configured yet: persist safely in server-side intake directory (never silently discard)
    const intakeDir = path.resolve(__dirname, '.intake');
    const intakeFile = path.join(intakeDir, 'consultations.jsonl');
    try {
      fs.mkdirSync(intakeDir, { recursive: true });
      fs.appendFileSync(intakeFile, `${JSON.stringify(intakePayload)}\n`, { encoding: 'utf8', mode: 0o600 });
      recentSubmissionsMap.set(dedupeKey, now);
      res.status(201).json({
        ok: true,
        referenceId,
        mode: 'local_intake',
        message:
          'Your consultation request has been recorded on the server. Note: external CRM webhook forwarding (CRM_API_URL) is not yet configured—for fastest response, you may also reach us on WhatsApp at +91 74110 01523.',
      });
    } catch {
      res.status(500).json({
        ok: false,
        error: 'Unable to record consultation request at the moment. Please contact +91 74110 01523.',
      });
    }
  });

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir, { index: false }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ASV Property Management server running on http://0.0.0.0:${PORT}`);
  });
}

createApp();
