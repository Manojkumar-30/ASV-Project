import { Container } from '../ui/Container';
import { FooterBrandStatement } from './FooterBrandStatement';
import { FooterLegalBar } from './FooterLegalBar';
import { FooterNavigation } from './FooterNavigation';

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#0A0A0A] text-white border-t border-[#303030] pt-16 sm:pt-20 pb-24 md:pb-12">
      {/* Subtle Minimal Architectural Skyline Outline Decoration (~4% opacity) */}
      <svg
        viewBox="0 0 1200 180"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] max-w-none text-white opacity-[0.04]"
      >
        <path
          d="M0 179H1200M60 179V98H126V179M146 179V64H218V179M238 179V112H296V179M330 179V44H420V179M442 179V82H510V179M550 179V30H646V179M668 179V74H738V179M772 179V52H854V179M876 179V96H948V179M982 179V62H1066V179M1090 179V106H1154V179"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </svg>

      <Container className="relative z-10">
        <FooterBrandStatement />
        <FooterNavigation />
        <FooterLegalBar />
      </Container>
    </footer>
  );
}
