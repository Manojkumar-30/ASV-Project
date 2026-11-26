import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TENANT_MANAGEMENT_SERVICES } from '../../data/services';
import type { TenantServiceItem } from '../../types';
import { ServiceConsultationCTA } from './ServiceConsultationCTA';
import { ServiceSectionHeading } from './ServiceSectionHeading';
import { TenantServiceDetails } from './TenantServiceDetails';
import { TenantServiceGrid } from './TenantServiceGrid';

export function TenantManagementSection() {
  const navigate = useNavigate();
  const [selectedDesktopId, setSelectedDesktopId] = useState<string | null>(null);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);

  const selectedDesktopService = useMemo(
    () => TENANT_MANAGEMENT_SERVICES.find((s) => s.id === selectedDesktopId) ?? null,
    [selectedDesktopId],
  );

  const handleCardClick = useCallback((service: TenantServiceItem) => {
    const isMobile =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(max-width: 767px)').matches;

    if (isMobile) {
      setExpandedMobileId((prev) => (prev === service.id ? null : service.id));
      return;
    }

    setSelectedDesktopId(service.id);
  }, []);

  const handlePrevService = useCallback(() => {
    if (!selectedDesktopId) return;
    const currentIndex = TENANT_MANAGEMENT_SERVICES.findIndex((s) => s.id === selectedDesktopId);
    const prevIndex =
      (currentIndex - 1 + TENANT_MANAGEMENT_SERVICES.length) % TENANT_MANAGEMENT_SERVICES.length;
    setSelectedDesktopId(TENANT_MANAGEMENT_SERVICES[prevIndex].id);
  }, [selectedDesktopId]);

  const handleNextService = useCallback(() => {
    if (!selectedDesktopId) return;
    const currentIndex = TENANT_MANAGEMENT_SERVICES.findIndex((s) => s.id === selectedDesktopId);
    const nextIndex = (currentIndex + 1) % TENANT_MANAGEMENT_SERVICES.length;
    setSelectedDesktopId(TENANT_MANAGEMENT_SERVICES[nextIndex].id);
  }, [selectedDesktopId]);

  const navigateToConsultation = useCallback(() => {
    setSelectedDesktopId(null);
    window.setTimeout(() => {
      const consultationSection = document.getElementById('consultation');
      if (consultationSection) {
        consultationSection.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      navigate('/contact');
    }, 80);
  }, [navigate]);

  return (
    <section
      id="services"
      className="scroll-mt-20 relative py-16 sm:py-24 lg:py-28 xl:py-[112px] bg-gradient-to-b from-white via-[#F8F8F8] to-[#F4F4F5] border-y border-[#E8E8E8] overflow-x-clip"
    >
      {/* Subtle architectural building outlines in upper corners */}
      <svg
        viewBox="0 0 260 220"
        className="pointer-events-none hidden md:block absolute left-0 top-6 w-[180px] lg:w-[240px] text-[#101010] opacity-[0.04]"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="20" y="75" width="42" height="135" />
          <rect x="72" y="34" width="56" height="176" />
          <rect x="138" y="96" width="46" height="114" />
          <line x1="86" y1="58" x2="114" y2="58" />
          <line x1="86" y1="78" x2="114" y2="78" />
          <line x1="86" y1="98" x2="114" y2="98" />
          <line x1="30" y1="96" x2="52" y2="96" />
          <line x1="150" y1="118" x2="172" y2="118" />
        </g>
      </svg>

      <svg
        viewBox="0 0 260 220"
        className="pointer-events-none hidden md:block absolute right-0 top-6 w-[180px] lg:w-[240px] text-[#101010] opacity-[0.04]"
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="198" y="64" width="42" height="146" />
          <rect x="132" y="28" width="56" height="182" />
          <rect x="76" y="92" width="46" height="118" />
          <line x1="146" y1="52" x2="174" y2="52" />
          <line x1="146" y1="72" x2="174" y2="72" />
          <line x1="146" y1="92" x2="174" y2="92" />
          <line x1="208" y1="88" x2="230" y2="88" />
          <line x1="88" y1="114" x2="110" y2="114" />
        </g>
      </svg>

      {/* Low-opacity ambient red/charcoal architectural corner accents */}
      <div
        className="pointer-events-none hidden lg:block absolute bottom-0 left-0 h-28 w-28 opacity-[0.06]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <polygon points="0,30 90,120 0,120" fill="#101010" />
          <polygon points="0,70 50,120 0,120" fill="#ED1C24" />
        </svg>
      </div>
      <div
        className="pointer-events-none hidden lg:block absolute bottom-0 right-0 h-28 w-28 opacity-[0.06]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <polygon points="120,30 30,120 120,120" fill="#ED1C24" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <ServiceSectionHeading />

        <TenantServiceGrid
          services={TENANT_MANAGEMENT_SERVICES}
          selectedDesktopId={selectedDesktopId}
          expandedMobileId={expandedMobileId}
          onCardClick={handleCardClick}
          onConsultClick={navigateToConsultation}
        />

        <ServiceConsultationCTA onConsultClick={navigateToConsultation} />
      </div>

      <TenantServiceDetails
        service={selectedDesktopService}
        totalServices={TENANT_MANAGEMENT_SERVICES.length}
        onClose={() => setSelectedDesktopId(null)}
        onPrev={handlePrevService}
        onNext={handleNextService}
        onConsultClick={navigateToConsultation}
      />
    </section>
  );
}
