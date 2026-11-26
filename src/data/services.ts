import type {
  ServiceCategory,
  TenantServiceItem,
  ValueAddedBentoItem,
  ValueAddedService,
} from '../types';

export const ORIGINAL_TWELVE_SERVICES = [
  'List Your Property',
  'Preliminary Inspection',
  'Property Management Application',
  'Annexure & Key Takeover',
  'Property Marketing',
  'Assured Tenant Placement',
  'Tenant Due Diligence',
  'Vendor Management',
  'Agreement Signing',
  'Tenant Management',
  'Quarterly Inspection',
  'Tenant Exit / Renewal',
] as const;

export const TENANT_MANAGEMENT_SERVICES: TenantServiceItem[] = [
  {
    id: 'list-your-property',
    order: 1,
    stepNumber: '01',
    title: 'List Your Property',
    shortDescription:
      'Tell us about your property and management requirements. We assess your needs and prepare a tailored property management proposal.',
    fullDescription:
      'Listing your residential asset starts with understanding your property configuration, current condition, rental expectations, and residency plans. Our team prepares a structured service proposal aligned to your preferred ASV management plan.',
    icon: 'house-plus',
    activities: [
      'Property registration',
      'Owner requirements',
      'Property assessment',
      'Management service proposal',
      'Applicable 24-month service plan',
    ],
    contractualNote:
      'Our standard comprehensive management service operates on a 24-month term; flexible Basic placement and Advanced monthly plans are also available.',
  },
  {
    id: 'preliminary-inspection',
    order: 2,
    stepNumber: '02',
    title: 'Preliminary Inspection',
    shortDescription:
      'Our team inspects your property, documents its condition and identifies necessary repairs before tenant placement.',
    fullDescription:
      'Before onboarding or marketing begins, our Bengaluru ground team conducts a thorough room-by-room walkthrough to document baseline property condition, check electrical and plumbing readiness, and flag preventive repairs early.',
    icon: 'clipboard-check',
    activities: [
      'Property condition assessment',
      'Room-by-room inspection',
      'Repair checklist',
      'Maintenance recommendations',
      'Photographic documentation',
    ],
  },
  {
    id: 'property-management-application',
    order: 3,
    stepNumber: '03',
    title: 'Property Management Application',
    shortDescription:
      'Complete the property management application and formalize the service arrangement between ASV and the property owner.',
    fullDescription:
      'To kick off active stewardship cleanly, we complete the Property Management Application detailing included deliverables, fee terms, communication protocols, and owner authorizations—signed transparently by both parties.',
    icon: 'file-pen-line',
    activities: [
      'Property management application',
      'Service inclusions',
      'Owner authorization',
      'Agreement documentation',
      'Signatures from both parties',
    ],
  },
  {
    id: 'annexure-key-takeover',
    order: 4,
    stepNumber: '04',
    title: 'Annexure & Key Takeover',
    shortDescription:
      'We document the property inventory and arrange secure key custody for professional property management.',
    fullDescription:
      'Every fixture, appliance, and fitting is catalogued into a formal property annexure while spare keys, access cards, and parking fobs are logged and held under accountable ASV custody for accompanied viewings and maintenance access.',
    icon: 'key-round',
    activities: [
      'Property inventory',
      'Annexure preparation',
      'Key handover',
      'Property access coordination',
      'Condition documentation',
    ],
  },
  {
    id: 'property-marketing',
    order: 5,
    stepNumber: '05',
    title: 'Property Marketing',
    shortDescription:
      'We promote your property through online and offline marketing channels to reach suitable prospective tenants.',
    fullDescription:
      'Our leasing team combines digital visibility—search, social channels, and major residential portals—with active local real estate networks in Bengaluru to generate qualified enquiries and manage accompanied property viewings.',
    icon: 'megaphone',
    activities: [
      'Online property promotion',
      'Search engine marketing',
      'Social media marketing',
      'Real estate networks',
      'Property enquiries and viewings',
    ],
  },
  {
    id: 'assured-tenant-placement',
    order: 6,
    stepNumber: '06',
    title: 'Assured Tenant Placement',
    shortDescription:
      'Our structured tenant placement process helps you find suitable tenants within the applicable contractual service period.',
    fullDescription:
      'We actively source prospects, manage incoming enquiries, host accompanied visits, and support fair rental negotiations so qualified tenants move in smoothly within the agreed contractual placement window.',
    icon: 'users-round',
    activities: [
      'Tenant sourcing',
      'Enquiry management',
      'Property viewings',
      'Rental negotiations',
      'Tenant placement coordination',
    ],
    contractualNote:
      'Any three-month assured tenant placement commitment applies strictly in accordance with the signed Property Management Agreement, market rent alignment, and move-in property readiness.',
  },
  {
    id: 'tenant-due-diligence',
    order: 7,
    stepNumber: '07',
    title: 'Tenant Due Diligence',
    shortDescription:
      'We conduct tenant screening, employment checks and supporting document verification to help owners make informed decisions.',
    fullDescription:
      'Protecting your home starts with careful vetting. Before recommending an applicant, ASV collects and verifies government identity proofs, employment credentials, and background documentation for clear owner approval.',
    icon: 'shield-check',
    activities: [
      'Identity verification',
      'Employment verification',
      'Supporting document checks',
      'Tenant screening',
      'Verification summary',
    ],
  },
  {
    id: 'vendor-management',
    order: 8,
    stepNumber: '08',
    title: 'Vendor Management',
    shortDescription:
      'We coordinate property maintenance, repairs and service providers, helping owners stay informed about work and related expenses.',
    fullDescription:
      'From plumbing leaks and electrical faults to carpentry and painting, we source local technicians, share repair estimates for owner review where applicable, supervise completion on site, and document every bill clearly.',
    icon: 'wrench',
    activities: [
      'Vendor coordination',
      'Maintenance requests',
      'Repair estimates',
      'Work completion tracking',
      'Expense documentation',
    ],
    contractualNote:
      'Material/spare-part costs and major third-party works are billed transparently upon owner approval per selected plan terms.',
  },
  {
    id: 'agreement-signing',
    order: 9,
    stepNumber: '09',
    title: 'Agreement Signing',
    shortDescription:
      'We coordinate the necessary agreements and owner authorizations for rental management, rent collection and deposit handling.',
    fullDescription:
      'ASV coordinates clear rental documentation between owner and tenant—covering tenure, escalation, lock-in, notice terms, security deposit settlement, and authorized rent collection procedures.',
    icon: 'handshake',
    activities: [
      'Agreement preparation',
      'Owner authorization',
      'Rental documentation',
      'Deposit coordination',
      'Rent collection arrangements',
    ],
  },
  {
    id: 'tenant-management',
    order: 10,
    stepNumber: '10',
    title: 'Tenant Management',
    shortDescription:
      'We manage ongoing tenancy requirements, including rent collection, utility payments, applicable taxes and outstanding dues.',
    fullDescription:
      'Across every month of occupancy, our team acts as your local single point of contact—tracking rent schedules, supporting utility and property tax coordination, and following up promptly on any outstanding dues.',
    icon: 'building-2',
    activities: [
      'Rent collection coordination',
      'Tenant communication',
      'Utility bill coordination',
      'Property tax assistance',
      'Outstanding payment follow-ups',
    ],
  },
  {
    id: 'quarterly-inspection',
    order: 11,
    stepNumber: '11',
    title: 'Quarterly Inspection',
    shortDescription:
      'We inspect your property quarterly and provide photographic reports to help you stay informed about its condition.',
    fullDescription:
      'Every quarter, an ASV representative visits your property with prior tenant notice to inspect physical upkeep, seepage, plumbing, and cleanliness—sharing photographic condition updates directly with you.',
    icon: 'calendar-check',
    activities: [
      'Scheduled property inspections',
      'Room condition assessment',
      'Photographic reports',
      'Maintenance observations',
      'Owner updates',
    ],
  },
  {
    id: 'tenant-exit-renewal',
    order: 12,
    stepNumber: '12',
    title: 'Tenant Exit / Renewal',
    shortDescription:
      'We coordinate tenant exits or renewals, check damages and outstanding bills, and assist with settlements and tenant replacement.',
    fullDescription:
      'At lease maturity, we coordinate timely renewals or run a disciplined exit checklist—auditing property condition against the move-in annexure, verifying utility and society dues, assisting with final deposit settlement, and initiating remarketing immediately.',
    icon: 'refresh-cw',
    activities: [
      'Lease renewal coordination',
      'Tenant exit inspection',
      'Damage assessment',
      'Outstanding bill verification',
      'Final settlement',
      'Property remarketing',
    ],
  },
];

export const CORE_SERVICES: ServiceCategory[] = [
  {
    id: 'property-onboarding',
    number: '01',
    title: 'Property Onboarding',
    shortTitle: 'Onboarding',
    summary:
      'Start your property management journey with a structured assessment, documentation and handover process.',
    originalServices: [
      'List Your Property',
      'Preliminary Inspection',
      'Property Management Application',
      'Annexure & Key Takeover',
    ],
    deliverables: [
      'Property registration & initial consultation',
      'Preliminary on-site property inspection',
      'Property management application filing',
      'Detailed property annexure & fixture inventory',
      'Secure key takeover and custody log',
    ],
    featured: true,
    image: '/src/assets/images/about_bengaluru_residences_1795592749762.webp',
  },
  {
    id: 'tenant-placement',
    number: '02',
    title: 'Tenant Placement',
    shortTitle: 'Tenant Placement',
    summary:
      'Find suitable tenants through structured property marketing and verification.',
    originalServices: [
      'Property Marketing',
      'Assured Tenant Placement',
      'Tenant Due Diligence',
    ],
    deliverables: [
      'Online & offline property marketing',
      'Qualified tenant search and accompanied viewings',
      'Employment and background verification',
      'Identity and KYC document verification',
      'Tenant placement commitments subject to existing plan terms',
    ],
  },
  {
    id: 'rental-tenant-management',
    number: '03',
    title: 'Rental & Tenant Management',
    shortTitle: 'Rental & Tenants',
    summary:
      'Simplify everyday rental responsibilities through organized tenant and payment management.',
    originalServices: ['Tenant Management'],
    deliverables: [
      'Monthly rent collection coordination',
      'Security deposit collection coordination',
      'Structured tenant communication & query handling',
      'Utility payment assistance & bill tracking',
      'Payment follow-ups and tracking of outstanding dues',
    ],
  },
  {
    id: 'maintenance-vendor-management',
    number: '04',
    title: 'Maintenance & Vendor Management',
    shortTitle: 'Maintenance',
    summary:
      'Keep your property well maintained through professional service coordination.',
    originalServices: ['Vendor Management'],
    deliverables: [
      'Vetted local vendor coordination',
      'Plumbing, electrical, and carpentry work',
      'Repair request triage and owner approval workflow',
      'Scheduled preventive maintenance tracking',
    ],
  },
  {
    id: 'inspection-reporting',
    number: '05',
    title: 'Inspection & Reporting',
    shortTitle: 'Inspections',
    summary:
      'Stay informed about your property’s condition, even when you are living overseas.',
    originalServices: ['Quarterly Inspection'],
    deliverables: [
      'Quarterly on-site property inspections',
      'Monthly reporting where applicable under plan terms',
      'Structured property condition assessments',
      'Photographic condition updates for remote owners',
      'Actionable maintenance recommendations',
    ],
    featured: true,
    image: '/src/assets/images/nri_editorial_living_1795592749819.webp',
  },
  {
    id: 'agreements-exit-renewal',
    number: '06',
    title: 'Agreements, Exit & Renewal',
    shortTitle: 'Exit & Renewal',
    summary:
      'Manage important rental transitions through a structured process.',
    originalServices: ['Agreement Signing', 'Tenant Exit / Renewal'],
    deliverables: [
      'Rental agreement drafting & signing coordination',
      'Structured tenant move-in handover',
      'Lease renewal negotiation & documentation',
      'Tenant exit inspection and damage assessment',
      'Outstanding utility/society bill verification & final settlement',
      'Seamless tenant replacement coordination',
    ],
  },
];

export const VALUE_ADDED_SERVICES: ValueAddedService[] = [
  {
    id: 'salesforce-crm',
    title: 'Salesforce CRM Workflows',
    subtitle: 'Structured Client & Property Records',
    description:
      'ASV utilizes Salesforce CRM workflows to organize owner records, service milestones, and communication history cleanly across multi-year engagements.',
    highlights: [
      'Centralized property & lease milestone records',
      'Included user interface access under the Advanced plan',
      'Consistent follow-up tracking for overseas owners',
    ],
    verificationNote: 'Direct portal availability depends on the selected management tier; confirm current Salesforce UI access during onboarding.',
  },
  {
    id: 'ticket-management',
    title: 'Ticket Management System',
    subtitle: 'Organized Maintenance Resolution',
    description:
      'Every plumbing, electrical, carpentry, or appliance repair request is logged and tracked to closure with vetted local vendors.',
    highlights: [
      'Structured issue logging for tenants and owners',
      'Plumbing, electrical, and carpentry coordination',
      'Pre-approval estimates before major repair spend',
    ],
    verificationNote: 'Active ticketing workflow availability is confirmed with your assigned property manager.',
  },
  {
    id: 'document-transfer',
    title: 'Document Transfer & Assistance',
    subtitle: 'Local Statutory & Utility Formalities',
    description:
      'Navigate Bengaluru municipal and utility paperwork without flying back in person, supported by our local team.',
    highlights: [
      'Khata name transfer assistance',
      'BESCOM electricity meter & account documentation',
      'Annual property tax payment coordination',
    ],
  },
];

export const WHY_CHOOSE_ASV = [
  {
    number: '01',
    title: 'Hassle-Free Service',
    description:
      'Single-point local coordination in Bengaluru so you never have to chase brokers, plumbers, or utility offices from another time zone.',
  },
  {
    number: '02',
    title: 'Tenant Placement Support',
    description:
      'Structured marketing, accompanied viewings, and employment & document verification designed to match your home with responsible tenants.',
  },
  {
    number: '03',
    title: 'Dedicated Customer Support',
    description:
      'Responsive communication aligned around international working schedules via phone, WhatsApp, and email.',
  },
  {
    number: '04',
    title: 'Process-Oriented Management',
    description:
      'Every transition—from key takeover and annexures to quarterly inspections and move-out settlements—follows a documented checklist.',
  },
  {
    number: '05',
    title: 'On-Site Assistance',
    description:
      'An active ground team based in Kasturi Nagar, Bengaluru inspecting properties in person and supervising vendors on site.',
  },
  {
    number: '06',
    title: 'Flexible Management Services',
    description:
      'Choose between rental placement only, a 24-month comprehensive management agreement, or ongoing monthly management.',
  },
];

export const VALUE_ADDED_BENTO_SERVICES: ValueAddedBentoItem[] = [
  {
    id: 'salesforce-crm',
    label: 'TECHNOLOGY-DRIVEN MANAGEMENT',
    title: 'Salesforce CRM',
    description:
      'ASV uses structured Salesforce CRM workflows to keep owner records, lease milestones, maintenance logs, and communication history cleanly organized across multi-year engagements.',
    benefits: [
      'Centralized property, tenancy & lease milestone records',
      'Salesforce UI access included under the Advanced tier',
      'Consistent follow-up tracking across international time zones',
      'Clear audit trail of inspection reports and service requests',
    ],
    icon: 'layout-dashboard',
    variant: 'featured-dark',
    disclaimerNote:
      'Conceptual workflow visual — Salesforce UI access is included under the Advanced tier and confirmed during onboarding.',
    actionLabel: 'View Advanced Tier',
    actionHref: '/pricing',
  },
  {
    id: 'ticket-management',
    label: 'PROPERTY CARE',
    title: 'Ticket Management System',
    description:
      'Every plumbing, electrical, carpentry, or appliance repair request is logged, assigned to vetted Bengaluru vendors, and tracked through to closure.',
    benefits: [
      'Structured issue logging for tenants and owners',
      'Plumbing, electrical & carpentry vendor coordination',
      'Pre-approval repair estimates shared before major work',
      'Photographic completion updates sent to owners',
    ],
    icon: 'ticket-check',
    variant: 'light-photo',
    image: '/src/assets/images/vas_ticket_maintenance_1795603817682.webp',
    imageAlt:
      'Technician inspecting residential apartment plumbing and electrical systems during routine property maintenance',
    disclaimerNote:
      'Ticketing workflow availability and escalation paths are reviewed during your property onboarding.',
    actionLabel: 'Request Maintenance Support',
    actionHref: '#consultation',
  },
  {
    id: 'document-transfer',
    label: 'DOCUMENTATION SUPPORT',
    title: 'Document Transfer',
    description:
      'Navigate Bengaluru statutory and utility paperwork—from Khata name transfers to BESCOM updates and tax payments—with local on-ground coordination.',
    benefits: [
      'Khata name transfer application & documentation assistance',
      'BESCOM electricity meter & account transfer coordination',
      'Annual municipal property tax payment support',
      'Local follow-up in Bengaluru without flying back in person',
    ],
    icon: 'file-check',
    variant: 'light-photo',
    image: '/src/assets/images/vas_document_transfer_1795603818160.webp',
    imageAlt:
      'Organized property transfer folders and apartment keys neatly arranged on an architectural wooden surface',
    disclaimerNote:
      'ASV coordinates paperwork and local submissions; statutory timelines depend on municipal authorities.',
    actionLabel: 'Discuss Documentation Help',
    actionHref: '#consultation',
  },
];

