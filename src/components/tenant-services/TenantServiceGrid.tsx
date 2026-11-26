import type { TenantServiceItem } from '../../types';
import { TenantServiceCard } from './TenantServiceCard';

interface TenantServiceGridProps {
  services: TenantServiceItem[];
  selectedDesktopId: string | null;
  expandedMobileId: string | null;
  onCardClick: (service: TenantServiceItem) => void;
  onConsultClick: () => void;
}

export function TenantServiceGrid({
  services,
  selectedDesktopId,
  expandedMobileId,
  onCardClick,
  onConsultClick,
}: TenantServiceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6 items-stretch">
      {services.map((service, index) => (
        <TenantServiceCard
          key={service.id}
          service={service}
          index={index}
          isSelectedDesktop={selectedDesktopId === service.id}
          isExpandedMobile={expandedMobileId === service.id}
          onCardClick={onCardClick}
          onConsultClick={onConsultClick}
        />
      ))}
    </div>
  );
}
