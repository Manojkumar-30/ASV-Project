import {
  Building2,
  CalendarCheck,
  ClipboardCheck,
  FilePenLine,
  Handshake,
  HousePlus,
  KeyRound,
  Megaphone,
  RefreshCw,
  ShieldCheck,
  UsersRound,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { TenantServiceIcon } from '../../types';

const ICON_MAP: Record<TenantServiceIcon, LucideIcon> = {
  'house-plus': HousePlus,
  'clipboard-check': ClipboardCheck,
  'file-pen-line': FilePenLine,
  'key-round': KeyRound,
  megaphone: Megaphone,
  'users-round': UsersRound,
  'shield-check': ShieldCheck,
  wrench: Wrench,
  handshake: Handshake,
  'building-2': Building2,
  'calendar-check': CalendarCheck,
  'refresh-cw': RefreshCw,
};

interface ServiceIconProps {
  icon: TenantServiceIcon;
  className?: string;
  strokeWidth?: number;
}

export function ServiceIcon({
  icon,
  className = 'h-6 w-6',
  strokeWidth = 1.75,
}: ServiceIconProps) {
  const IconComponent = ICON_MAP[icon];
  return <IconComponent className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
