import { ENABLED_SOCIAL_MEDIA, type SocialPlatform } from '../../data/socials';
import { SocialIcon } from './SocialIcon';

interface SocialLinksProps {
  platforms?: readonly SocialPlatform[];
  theme?: 'light' | 'dark';
  showLabels?: boolean;
  className?: string;
  linkClassName?: string;
}

export function SocialLinks({
  platforms,
  theme = 'light',
  showLabels = false,
  className = '',
  linkClassName = '',
}: SocialLinksProps) {
  const entries = platforms
    ? ENABLED_SOCIAL_MEDIA.filter((entry) => platforms.includes(entry.platform))
    : ENABLED_SOCIAL_MEDIA.filter((entry) => entry.platform !== 'website');

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {entries.map((entry) => (
        <a
          key={entry.platform}
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={entry.accessibleLabel}
          title={entry.name}
          className={`btn-press group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-3 transition-colors duration-200 ${
            showLabels ? 'min-w-11' : 'h-11 w-11 px-0'
          } ${
            theme === 'dark'
              ? 'border-[#303030] bg-[#141414] text-neutral-200 hover:border-[#ED1C24] hover:text-[#ED1C24]'
              : 'border-[#E5E5E5] bg-white text-[#626262] hover:border-[#ED1C24] hover:text-[#ED1C24]'
          } ${linkClassName}`}
        >
          <SocialIcon platform={entry.icon} className="h-4 w-4 shrink-0" aria-hidden="true" />
          {showLabels && <span className="text-xs font-semibold">{entry.name}</span>}
        </a>
      ))}
    </div>
  );
}
