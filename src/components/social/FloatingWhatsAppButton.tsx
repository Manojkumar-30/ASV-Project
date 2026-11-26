import { getSocial } from '../../data/socials';
import { SocialIcon } from './SocialIcon';

interface FloatingWhatsAppButtonProps {
  hidden?: boolean;
}

export function FloatingWhatsAppButton({ hidden = false }: FloatingWhatsAppButtonProps) {
  if (hidden) return null;
  const whatsapp = getSocial('whatsapp');

  return (
    <a
      href={whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={whatsapp.accessibleLabel}
      className="btn-press group fixed right-5 z-30 hidden min-h-12 items-center gap-2.5 rounded-full border border-[#ED1C24]/25 bg-white px-4 text-sm font-semibold text-[#101010] shadow-[0_14px_38px_-14px_rgba(16,16,16,0.3)] hover:border-[#ED1C24] hover:text-[#ED1C24] md:flex lg:right-7"
      style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#ED1C24] text-white transition-transform duration-200 group-hover:scale-105">
        <SocialIcon platform="whatsapp" className="h-4 w-4" aria-hidden="true" />
      </span>
      <span>WhatsApp ASV</span>
    </a>
  );
}
