# ASV Property Management — Corporate Website

Modern, responsive corporate web application for **ASV Property Management** (Bengaluru), built with React 19, TypeScript, Tailwind CSS v4, and an Express API server.

## Routes Implemented

- `/` — Home (17-section architectural landing experience)
- `/about` — About ASV & Regional Coverage
- `/services` — Core Property Management Services (all 12 original services preserved across 6 pillars) & Value Added Services
- `/nri-property-management` — Dedicated NRI Property Management
- `/how-it-works` — 6-Stage Management Timeline
- `/projects` — Residential Communities Under Management
- `/pricing` — Plans & Pricing (Basic, Premium, Advanced)
- `/insights` — Videos & Property Insights (YouTube Data API v3 integration)
- `/contact` — Office Details & Consultation Form
- `/privacy-policy` — Privacy Policy
- `/terms-and-conditions` — Terms & Conditions

## Environment Configuration

Copy `.env.example` to `.env` or configure environment secrets on your host:

```env
YOUTUBE_API_KEY=
YOUTUBE_CHANNEL_ID=UCAeG716AYl4M5QXXxsXWa2w
SITE_URL=https://asvpropertymanagement.com
CRM_API_URL=
CRM_API_TOKEN=
```

- **YouTube Integration (`/api/youtube/videos`)**: Server-side proxy using YouTube Data API v3 (`channels` -> `playlistItems` -> `videos`) with a 60-minute in-memory cache, stale-cache fallback, pagination support, and privacy-enhanced `youtube-nocookie.com` embeds loaded only on user click.
- **Consultation Intake (`/api/consultations`)**: Zod validation, honeypot spam protection, per-IP rate limiting, duplicate submission prevention, and CRM forwarding via `CRM_API_URL` / `CRM_API_TOKEN` (with safe local `.intake/consultations.jsonl` fallback when CRM credentials are not yet set).

## Development & Production

```bash
npm install
npm run dev      # Starts Express + Vite middleware on port 3000
npm run lint     # Runs tsc --noEmit
npm run build    # Builds Vite production bundle to dist/
npm start        # Runs production server (NODE_ENV=production node server.ts)
```

## Items Requiring Direct Business Confirmation Before Final Launch

1. Official corporate email address (`asvpropertymanagement.com`) if you want a `mailto:` link displayed alongside the online consultation form.
2. Exact street addresses and active coverage confirmation for **Chennai** and **Hyderabad** operations.
3. Applicable GST rate, fire safety insurance policy terms (Advanced plan), and early cancellation fee schedules for the Terms & Conditions page.
4. `YOUTUBE_API_KEY` and `CRM_API_URL` / `CRM_API_TOKEN` credentials in production environment secrets.
