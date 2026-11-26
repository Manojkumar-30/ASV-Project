import { useEffect, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';
import { Footer } from './Footer';
import { MobileContactBar } from './MobileContactBar';
import { FloatingWhatsAppButton } from '../social/FloatingWhatsAppButton';

interface SiteLayoutProps {
  children: ReactNode;
  modalOpen?: boolean;
}

export function SiteLayout({ children, modalOpen = false }: SiteLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileMenuOpen(false);
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  const handleConsultClick = () => {
    const onPageSection = document.getElementById('consultation');
    if (onPageSection) {
      onPageSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate('/contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#101010]">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        onConsultClick={handleConsultClick}
      />

      <MobileNavigation
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onConsultClick={handleConsultClick}
      />

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <Footer />

      <MobileContactBar
        hidden={mobileMenuOpen || modalOpen}
        onConsultClick={handleConsultClick}
      />
      <FloatingWhatsAppButton hidden={mobileMenuOpen || modalOpen} />
    </div>
  );
}
