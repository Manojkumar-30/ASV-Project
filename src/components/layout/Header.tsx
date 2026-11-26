import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ChevronDown, Share2 } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import { NAV_LINKS, SERVICES_DROPDOWN_ITEMS } from '../../data/navigation';
import { DURATION, EASE_PREMIUM } from '../../lib/motion';
import { getSocial } from '../../data/socials';

interface HeaderProps {
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onConsultClick: () => void;
}

export function Header({ mobileMenuOpen, onToggleMobileMenu, onConsultClick }: HeaderProps) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    if (path === '/services') {
      return pathname === '/services' || pathname === '/nri-property-management' || pathname === '/pricing';
    }
    return pathname === path;
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.standard, ease: EASE_PREMIUM }}
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#E5E5E5] shadow-[0_6px_24px_rgba(16,16,16,0.05)]'
          : 'bg-white/75 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[#101010] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      <div
        className={`mx-auto flex max-w-[1360px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-12 transition-[height] duration-300 ${
          scrolled ? 'h-16 lg:h-[68px]' : 'h-16 lg:h-20'
        }`}
      >
        {/* Zone 1: Original ASV Logo */}
        <Link to="/" className="inline-flex items-center shrink-0" aria-label="ASV Property Management Home">
          <img
            src={COMPANY_INFO.logoPath}
            alt="ASV Property Management"
            className={`w-auto object-contain transition-all duration-300 ${
              scrolled ? 'h-8 lg:h-9' : 'h-8 sm:h-9 lg:h-10'
            }`}
          />
        </Link>

        {/* Zone 2: Floating Pill Desktop Navigation with Shared-Layout Active Indicator */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-1 rounded-full border border-[#E5E5E5] bg-white/95 px-2 py-1.5 shadow-[0_2px_12px_rgba(16,16,16,0.04)]"
        >
          {NAV_LINKS.map((item) => {
            const active = isActive(item.path);

            if ('hasDropdown' in item && item.hasDropdown) {
              return (
                <div
                  key={item.path}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => setServicesOpen((prev) => !prev)}
                    className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                      active ? 'text-[#101010] font-semibold' : 'text-[#626262] hover:text-[#101010]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ duration: DURATION.standard, ease: EASE_PREMIUM }}
                        className="absolute inset-0 rounded-full bg-[#F4F4F5] -z-10"
                      />
                    )}
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-[#ED1C24]" aria-hidden="true" />}
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        role="menu"
                        aria-label="Services Menu"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: DURATION.fast, ease: EASE_PREMIUM }}
                        className="absolute left-0 top-full pt-2 w-72 z-50"
                      >
                        <div className="rounded-2xl border border-[#E5E5E5] bg-white p-2 shadow-xl">
                          {SERVICES_DROPDOWN_ITEMS.map((sub) => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              role="menuitem"
                              onClick={() => setServicesOpen(false)}
                              className={`block rounded-xl px-3.5 py-2.5 transition-colors ${
                                pathname === sub.path ? 'bg-[#FFF1F1]' : 'hover:bg-[#F7F7F7]'
                              }`}
                            >
                              <div className="text-sm font-semibold text-[#101010]">{sub.title}</div>
                              <div className="text-xs text-[#626262] mt-0.5 leading-snug">{sub.description}</div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={active ? 'page' : undefined}
                className={`relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                  active ? 'text-[#101010] font-semibold' : 'text-[#626262] hover:text-[#101010]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ duration: DURATION.standard, ease: EASE_PREMIUM }}
                    className="absolute inset-0 rounded-full bg-[#F4F4F5] -z-10"
                  />
                )}
                {active && <span className="h-1.5 w-1.5 rounded-full bg-[#ED1C24]" aria-hidden="true" />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Consultation CTA & Animated Hamburger Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={getSocial('linktree').url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View all official ASV social media links"
            title="Follow ASV"
            className="btn-press hidden xl:inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#626262] hover:border-[#ED1C24] hover:text-[#ED1C24]"
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={onConsultClick}
            className="btn-press hidden xl:inline-flex items-center gap-2 rounded-full bg-[#101010] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#ED1C24] hover:shadow-md whitespace-nowrap shrink-0 group"
          >
            <span>Get a Consultation</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="btn-press inline-flex xl:hidden h-11 w-11 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#101010] hover:bg-[#F7F7F7]"
          >
            <span className="relative h-4 w-5 flex flex-col justify-between" aria-hidden="true">
              <span
                className={`block h-[1.75px] w-full bg-current rounded-full transition-transform duration-200 origin-center ${
                  mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-[1.75px] w-full bg-current rounded-full transition-opacity duration-150 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block h-[1.75px] w-full bg-current rounded-full transition-transform duration-200 origin-center ${
                  mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
