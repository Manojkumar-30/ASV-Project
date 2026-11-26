import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, MessageCircle, Phone, X } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import { DURATION, EASE_PREMIUM } from '../../lib/motion';
import { SocialLinks } from '../social/SocialLinks';

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
  onConsultClick: () => void;
}

const MOBILE_ROUTES = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'NRI Property Management', path: '/nri-property-management' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Projects Under Management', path: '/projects' },
  { label: 'Plans & Pricing', path: '/pricing' },
  { label: 'Videos & Insights', path: '/insights' },
  { label: 'About ASV', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
];

export function MobileNavigation({ open, onClose, onConsultClick }: MobileNavigationProps) {
  const { pathname } = useLocation();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    prevFocusRef.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 40);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      prevFocusRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav-drawer"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: '0%' }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: DURATION.standard, ease: EASE_PREMIUM }}
          className="fixed inset-0 z-50 flex flex-col bg-white xl:hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex h-16 items-center justify-between border-b border-[#E5E5E5] px-4 sm:px-6 shrink-0">
            <Link to="/" onClick={onClose} aria-label="ASV Property Management Home">
              <img src={COMPANY_INFO.logoPath} alt="ASV Property Management" className="h-8 w-auto object-contain" />
            </Link>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="btn-press inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E5E5] text-[#101010] hover:bg-[#F7F7F7]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile Menu Links" className="flex-1 px-4 sm:px-6 py-6">
            <ul className="divide-y divide-[#F0F0F0]">
              {MOBILE_ROUTES.map((item, idx) => {
                const active = pathname === item.path;
                return (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: DURATION.standard,
                      delay: 0.06 + idx * 0.035,
                      ease: EASE_PREMIUM,
                    }}
                  >
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center justify-between py-3.5 font-display text-xl font-semibold transition-colors ${
                        active ? 'text-[#ED1C24]' : 'text-[#101010] hover:text-[#ED1C24]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {active && <span className="h-2 w-2 rounded-full bg-[#ED1C24]" aria-hidden="true" />}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.standard, delay: 0.32, ease: EASE_PREMIUM }}
              className="mt-6 space-y-3"
            >
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onConsultClick();
                }}
                className="btn-press flex w-full items-center justify-center gap-2 rounded-full bg-[#ED1C24] px-6 py-3.5 text-base font-medium text-white hover:bg-[#C81018]"
              >
                <span>Get a Free Consultation</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="btn-press flex items-center justify-center gap-2 rounded-full border border-[#E5E5E5] bg-[#F7F7F7] px-4 py-3 text-sm font-medium text-[#101010]"
                >
                  <Phone className="h-4 w-4 text-[#ED1C24]" aria-hidden="true" />
                  <span>Call ASV</span>
                </a>
                <a
                  href={COMPANY_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press flex items-center justify-center gap-2 rounded-full border border-[#E5E5E5] bg-[#F7F7F7] px-4 py-3 text-sm font-medium text-[#101010]"
                >
                  <MessageCircle className="h-4 w-4 text-[#ED1C24]" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>

            <div className="mt-7 border-t border-[#E5E5E5] pt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#626262]">
                Follow ASV
              </p>
              <SocialLinks />
            </div>

            <div className="mt-8 border-t border-[#E5E5E5] pt-5 text-xs text-[#626262] space-y-1.5">
              <p className="font-medium text-[#101010]">Bengaluru Operations Office</p>
              <p>{COMPANY_INFO.address.full}</p>
              <p>{COMPANY_INFO.hours.weekdays}</p>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
