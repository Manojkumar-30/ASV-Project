export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services', hasDropdown: true },
  { label: 'Projects', path: '/projects' },
  { label: 'Insights', path: '/insights' },
  { label: 'About', path: '/about' },
] as const;

export const SERVICES_DROPDOWN_ITEMS = [
  {
    title: 'All Management Services',
    description: '6 core service pillars preserving all 12 ASV deliverables',
    path: '/services',
  },
  {
    title: 'NRI Property Management',
    description: 'Remote oversight in Bengaluru for overseas homeowners',
    path: '/nri-property-management',
  },
  {
    title: 'Plans & Pricing',
    description: 'Compare Basic, Premium, and Advanced management plans',
    path: '/pricing',
  },
] as const;

export const FOOTER_COMPANY_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About ASV', path: '/about' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Projects', path: '/projects' },
  { label: 'Videos & Insights', path: '/insights' },
  { label: 'Contact', path: '/contact' },
] as const;

export const FOOTER_SERVICE_LINKS = [
  { label: 'Core Management Services', path: '/services' },
  { label: 'NRI Property Management', path: '/nri-property-management' },
  { label: 'Plans & Pricing', path: '/pricing' },
  { label: 'Khata, BESCOM & Tax Support', path: '/services#value-added' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms-and-conditions' },
] as const;

