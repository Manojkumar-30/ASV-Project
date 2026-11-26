import {
  Clock,
  Headphones,
  House,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import type { WhyChooseBenefitIcon } from '../../types';

const ICON_MAP: Record<WhyChooseBenefitIcon, LucideIcon> = {
  house: House,
  'shield-check': ShieldCheck,
  headphones: Headphones,
  workflow: Workflow,
  'map-pin': MapPin,
  'sliders-horizontal': SlidersHorizontal,
  target: Target,
  clock: Clock,
};

interface WhyChooseIconProps {
  icon: WhyChooseBenefitIcon;
  className?: string;
  strokeWidth?: number;
}

export function WhyChooseIcon({
  icon,
  className = 'h-5 w-5',
  strokeWidth = 1.75,
}: WhyChooseIconProps) {
  const IconComponent = ICON_MAP[icon];
  return <IconComponent className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
