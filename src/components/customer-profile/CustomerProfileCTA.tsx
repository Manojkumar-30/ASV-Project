import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CustomerProfileCTAProps {
  label: string;
  href: string;
  theme: 'light' | 'dark';
}

export function CustomerProfileCTA({ label, href, theme }: CustomerProfileCTAProps) {
  const isDark = theme === 'dark';

  return (
    <Link
      to={href}
      className={`btn-press group/cta inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 min-h-[48px] focus-visible:outline-2 focus-visible:outline-offset-2 ${
        isDark
          ? 'bg-white text-[#101010] hover:bg-[#F2F2F2] focus-visible:outline-white'
          : 'bg-[#ED1C24] text-white hover:bg-[#C81018] focus-visible:outline-[#ED1C24]'
      }`}
    >
      <span>{label}</span>
      <ArrowRight
        className={`h-4 w-4 shrink-0 transition-transform duration-200 motion-safe:group-hover/cta:translate-x-1 ${
          isDark ? 'text-[#ED1C24]' : 'text-white'
        }`}
        aria-hidden="true"
      />
    </Link>
  );
}
