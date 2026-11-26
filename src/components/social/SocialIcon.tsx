import {
  ExternalLink,
  Facebook,
  Instagram,
  Link as LinkIcon,
  Linkedin,
  MessageCircle,
  Twitter,
  Youtube,
  type LucideProps,
} from 'lucide-react';
import type { SocialPlatform } from '../../data/socials';

interface SocialIconProps extends LucideProps {
  platform: SocialPlatform;
}

export function SocialIcon({ platform, ...props }: SocialIconProps) {
  const icons = {
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
    x: Twitter,
    whatsapp: MessageCircle,
    linkedin: Linkedin,
    linktree: LinkIcon,
    website: ExternalLink,
  } as const;
  const Icon = icons[platform];
  return <Icon {...props} />;
}
