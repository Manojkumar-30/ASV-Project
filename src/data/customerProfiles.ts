import type { CustomerProfileItem, CustomerTrustItem } from '../types';

export const CUSTOMER_PROFILES: CustomerProfileItem[] = [
  {
    id: 'nri',
    category: 'NRIs',
    fullCategoryName: 'Non-Resident Indians',
    eyebrowLabel: '01 / GLOBAL HOMEOWNERS',
    headline: 'Miles away. Always connected.',
    description:
      'Own a property in India while living abroad? ASV manages your tenants, rent, maintenance and property inspections while keeping you informed, wherever you are in the world.',
    image: '/src/assets/images/nri_lifestyle_apartment_1795602163311.webp',
    imageAlt:
      'Indian professional couple relaxing in a sunlit modern high-rise apartment abroad overlooking an international city skyline',
    floatingBadge: 'Managed Locally. Connected Globally.',
    benefits: [
      {
        id: 'remote-property-management',
        label: 'Remote property management',
        icon: 'globe',
      },
      {
        id: 'tenant-screening-verification',
        label: 'Tenant screening and verification',
        icon: 'shield-check',
      },
      {
        id: 'photographic-inspection-reports',
        label: 'Photographic inspection reports',
        icon: 'camera',
      },
      {
        id: 'rent-expense-updates',
        label: 'Rent and expense updates',
        icon: 'wallet',
      },
    ],
    ctaLabel: 'Explore NRI Services',
    ctaHref: '/nri-property-management',
    theme: 'light',
  },
  {
    id: 'hni',
    category: 'HNIs',
    fullCategoryName: 'High-Net-Worth Individuals',
    eyebrowLabel: '02 / PROPERTY INVESTORS',
    headline: 'Own the asset. Leave the work to us.',
    description:
      'Professional property management for investors who value their time, want to protect their assets and simplify everyday rental responsibilities.',
    image: '/src/assets/images/hni_investor_residence_1795602163399.webp',
    imageAlt:
      'Indian property investor reviewing residential floor plans inside a modern glass-walled residence overlooking greenery and city towers',
    floatingBadge: 'Professional Property Care.',
    benefits: [
      {
        id: 'multiple-property-management',
        label: 'Multiple property management',
        icon: 'building-2',
      },
      {
        id: 'professional-tenant-management',
        label: 'Professional tenant management',
        icon: 'users',
      },
      {
        id: 'maintenance-vendor-coordination',
        label: 'Maintenance and vendor coordination',
        icon: 'wrench',
      },
      {
        id: 'property-financial-reporting',
        label: 'Property financial reporting',
        icon: 'chart-combined',
      },
    ],
    ctaLabel: 'Explore Investor Services',
    ctaHref: '/services',
    theme: 'dark',
  },
];

export const CUSTOMER_TRUST_ITEMS: CustomerTrustItem[] = [
  {
    id: 'global-customers',
    title: 'Global Customers',
    description: 'Local property expertise.',
    icon: 'globe',
  },
  {
    id: 'professional-care',
    title: 'Professional Care',
    description: 'Structured property management processes.',
    icon: 'shield-check',
  },
  {
    id: 'dedicated-support',
    title: 'Dedicated Support',
    description: 'Personal assistance throughout your property journey.',
    icon: 'headphones',
  },
];
