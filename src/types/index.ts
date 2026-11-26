export type TenantServiceIcon =
  | 'house-plus'
  | 'clipboard-check'
  | 'file-pen-line'
  | 'key-round'
  | 'megaphone'
  | 'users-round'
  | 'shield-check'
  | 'wrench'
  | 'handshake'
  | 'building-2'
  | 'calendar-check'
  | 'refresh-cw';

export interface TenantServiceItem {
  id: string;
  order: number;
  stepNumber: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: TenantServiceIcon;
  activities: string[];
  contractualNote?: string;
}

export interface ServiceCategory {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  originalServices: string[];
  deliverables: string[];
  featured?: boolean;
  image?: string;
}

export type ValueAddedBentoIcon = 'layout-dashboard' | 'ticket-check' | 'file-check';

export interface ValueAddedBentoItem {
  id: 'salesforce-crm' | 'ticket-management' | 'document-transfer';
  label: string;
  title: string;
  description: string;
  benefits: string[];
  icon: ValueAddedBentoIcon;
  variant: 'featured-dark' | 'light-photo';
  image?: string;
  imageAlt?: string;
  disclaimerNote?: string;
  actionLabel: string;
  actionHref: string;
}

export interface ValueAddedService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  verificationNote?: string;
}

export type ProcessPhaseId = 'phase-01' | 'phase-02' | 'phase-03' | 'phase-04';

export type ProcessOrbitPosition =
  | 'top'
  | 'upper-right'
  | 'lower-right'
  | 'bottom'
  | 'lower-left'
  | 'upper-left';

export type ProcessPlacement = 'orbit' | 'left-column' | 'right-column';

export type ProcessStepIcon =
  | 'file-signature'
  | 'key-round'
  | 'megaphone'
  | 'user-check'
  | 'handshake'
  | 'home'
  | 'clipboard-check'
  | 'wrench'
  | 'search-check'
  | 'bar-chart'
  | 'refresh-cw'
  | 'shield-check'
  | 'calendar-check'
  | 'chart-combined'
  | 'file-check';

export interface ProcessService {
  id: string;
  stepNumber: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  activities: string[];
  icon: ProcessStepIcon;
  phaseId: ProcessPhaseId;
  placement: ProcessPlacement;
  orbitPosition?: ProcessOrbitPosition;
  columnOrder?: number;
}

export interface ProcessPhase {
  id: ProcessPhaseId;
  phaseNumber: string;
  title: string;
  summary: string;
  serviceIds: string[];
}

export interface ProjectCommunity {
  id: string;
  name: string;
  location: string;
  corridor: string;
  image: string;
  note: string;
}

export interface CustomerTestimonial {
  id: string;
  name: string;
  residence: string;
  community: string;
  quote: string;
}

export type CustomerProfileBenefitIcon =
  | 'globe'
  | 'shield-check'
  | 'camera'
  | 'wallet'
  | 'building-2'
  | 'users'
  | 'wrench'
  | 'chart-combined'
  | 'headphones';

export interface CustomerProfileBenefit {
  id: string;
  label: string;
  icon: CustomerProfileBenefitIcon;
}

export interface CustomerProfileItem {
  id: 'nri' | 'hni';
  category: string;
  fullCategoryName: string;
  eyebrowLabel: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  floatingBadge: string;
  benefits: CustomerProfileBenefit[];
  ctaLabel: string;
  ctaHref: string;
  theme: 'light' | 'dark';
}

export interface CustomerTrustItem {
  id: string;
  title: string;
  description: string;
  icon: CustomerProfileBenefitIcon;
}

export type WhyChooseBenefitIcon =
  | 'house'
  | 'shield-check'
  | 'headphones'
  | 'workflow'
  | 'map-pin'
  | 'sliders-horizontal'
  | 'target'
  | 'clock';

export interface WhyChooseBenefitItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: WhyChooseBenefitIcon;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  charge: string;
  chargeDetail: string;
  termPeriod: string;
  featured?: boolean;
  included: string[];
  notes: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  watchUrl: string;
  duration?: string;
  embeddable: boolean;
}
