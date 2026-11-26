import { Phone } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import { SocialLinks } from '../social/SocialLinks';

interface FooterSocialLinksProps {
  className?: string;
}

export function FooterSocialLinks({ className = '' }: FooterSocialLinksProps) {
  return (
    <div className={className}>
      <h3 className="mb-3 font-display text-sm font-semibold tracking-wide text-white">
        Follow ASV
      </h3>
      <SocialLinks theme="dark" />

      <div className="mt-3">
      <a
        href={COMPANY_INFO.phoneHref}
        aria-label={`Call ASV Property Management at ${COMPANY_INFO.phoneDisplay}`}
        className="btn-press inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#303030] bg-[#141414] text-neutral-200 transition-colors duration-200 hover:border-[#ED1C24] hover:text-[#ED1C24]"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
      </a>
      </div>
    </div>
  );
}
