import {
  Building2,
  Camera,
  ChartNoAxesCombined,
  Globe,
  Headphones,
  ShieldCheck,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { CustomerProfileBenefitIcon } from '../../types';

const ICON_MAP: Record<CustomerProfileBenefitIcon, LucideIcon> = {
  globe: Globe,
  'shield-check': ShieldCheck,
  camera: Camera,
  wallet: Wallet,
  'building-2': Building2,
  users: Users,
  wrench: Wrench,
  'chart-combined': ChartNoAxesCombined,
  headphones: Headphones,
};

interface CustomerProfileIconProps {
  icon: CustomerProfileBenefitIcon;
  className?: string;
  strokeWidth?: number;
}

export function CustomerProfileIcon({
  icon,
  className = 'h-5 w-5',
  strokeWidth = 1.75,
}: CustomerProfileIconProps) {
  const IconComponent = ICON_MAP[icon];
  return <IconComponent className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
