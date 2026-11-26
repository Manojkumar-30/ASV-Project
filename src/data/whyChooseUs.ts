import type { WhyChooseBenefitItem } from '../types';

export const WHY_CHOOSE_HERO_IMAGE = {
  src: '/src/assets/images/why_choose_residence_1795603600316.webp',
  alt: 'Contemporary landscaped residential apartment complex in Bengaluru bathed in warm morning sunlight',
  width: 960,
  height: 1280,
};

export const WHY_CHOOSE_VIDEO_PREVIEW = {
  thumbnailSrc: '/src/assets/images/hero_architecture_villa_1795592748862.webp',
  thumbnailAlt: 'ASV Property Management architectural residential showcase preview',
  title: 'Watch How We Work',
  subtitle: 'See how ASV supports Bengaluru homeowners & NRIs end-to-end.',
};

export const WHY_CHOOSE_BENEFITS: WhyChooseBenefitItem[] = [
  {
    id: 'hassle-free-service',
    number: '01',
    title: 'Hassle-Free Service',
    description:
      'We handle everyday property responsibilities so you can focus on your priorities without unnecessary stress.',
    icon: 'house',
  },
  {
    id: 'assured-tenant-placement',
    number: '02',
    title: 'Assured Tenant Placement',
    description:
      'Our structured property marketing and tenant placement process helps identify suitable tenants under the agreed service terms.',
    icon: 'shield-check',
  },
  {
    id: 'customer-support',
    number: '03',
    title: 'Customer Support',
    description:
      'Receive dedicated assistance, clear communication and updates throughout your property management journey.',
    icon: 'headphones',
  },
  {
    id: 'process-oriented-system',
    number: '04',
    title: 'Process-Oriented System',
    description:
      'Structured workflows help ensure organized service delivery, proper documentation and transparent property management.',
    icon: 'workflow',
  },
  {
    id: 'on-site-support',
    number: '05',
    title: 'On-Site Support',
    description:
      'Our local team coordinates property inspections, maintenance and on-site requirements when needed.',
    icon: 'map-pin',
  },
  {
    id: 'flexible-management-service',
    number: '06',
    title: 'Flexible Management Service',
    description:
      'Property management services aligned with your requirements, property type and agreed management plan.',
    icon: 'sliders-horizontal',
  },
];
