export type SocialPlatform =
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'x'
  | 'whatsapp'
  | 'linkedin'
  | 'linktree'
  | 'website';

export type SocialVerificationStatus =
  | 'verified-linktree'
  | 'verified-owner-provided'
  | 'verified-profile-match';

export interface SocialMediaEntry {
  platform: SocialPlatform;
  name: string;
  url: string;
  icon: SocialPlatform;
  accessibleLabel: string;
  displayOrder: number;
  enabled: boolean;
  verificationStatus: SocialVerificationStatus;
}

/**
 * Single source of truth for ASV's public social and messaging destinations.
 * Facebook and WhatsApp were taken directly from the official ASV Linktree
 * structured data. LinkedIn was matched to ASV's Bengaluru company details.
 */
export const SOCIAL_MEDIA: readonly SocialMediaEntry[] = [
  {
    platform: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/officialasv/',
    icon: 'instagram',
    accessibleLabel: 'Follow ASV Property Management on Instagram',
    displayOrder: 10,
    enabled: true,
    verificationStatus: 'verified-linktree',
  },
  {
    platform: 'facebook',
    name: 'Facebook',
    url: 'https://www.facebook.com/officialASV',
    icon: 'facebook',
    accessibleLabel: 'Follow ASV Property Management on Facebook',
    displayOrder: 20,
    enabled: true,
    verificationStatus: 'verified-linktree',
  },
  {
    platform: 'youtube',
    name: 'YouTube',
    url: 'https://www.youtube.com/channel/UCAeG716AYl4M5QXXxsXWa2w',
    icon: 'youtube',
    accessibleLabel: 'Watch ASV Property Management on YouTube',
    displayOrder: 30,
    enabled: true,
    verificationStatus: 'verified-linktree',
  },
  {
    platform: 'x',
    name: 'X / Twitter',
    url: 'https://twitter.com/officialASVprop',
    icon: 'x',
    accessibleLabel: 'Follow ASV Property Management on X',
    displayOrder: 40,
    enabled: true,
    verificationStatus: 'verified-linktree',
  },
  {
    platform: 'whatsapp',
    name: 'WhatsApp',
    url: 'https://api.whatsapp.com/send?phone=917411001523',
    icon: 'whatsapp',
    accessibleLabel: 'Message ASV Property Management on WhatsApp',
    displayOrder: 50,
    enabled: true,
    verificationStatus: 'verified-linktree',
  },
  {
    platform: 'linkedin',
    name: 'LinkedIn',
    url: 'https://in.linkedin.com/company/asv-property-management',
    icon: 'linkedin',
    accessibleLabel: 'Follow ASV Property Management on LinkedIn',
    displayOrder: 60,
    enabled: true,
    verificationStatus: 'verified-profile-match',
  },
  {
    platform: 'linktree',
    name: 'Linktree',
    url: 'https://linktr.ee/officalasv',
    icon: 'linktree',
    accessibleLabel: 'View all official ASV Property Management social links',
    displayOrder: 70,
    enabled: true,
    verificationStatus: 'verified-owner-provided',
  },
  {
    platform: 'website',
    name: 'Website',
    url: 'https://asvpropertymanagement.com/',
    icon: 'website',
    accessibleLabel: 'Visit the ASV Property Management website',
    displayOrder: 80,
    enabled: true,
    verificationStatus: 'verified-linktree',
  },
] as const;

export const ENABLED_SOCIAL_MEDIA = SOCIAL_MEDIA.filter((entry) => entry.enabled).sort(
  (a, b) => a.displayOrder - b.displayOrder,
);

export function getSocial(platform: SocialPlatform): SocialMediaEntry {
  const entry = SOCIAL_MEDIA.find((item) => item.platform === platform && item.enabled);
  if (!entry) throw new Error(`Enabled social destination not configured: ${platform}`);
  return entry;
}
