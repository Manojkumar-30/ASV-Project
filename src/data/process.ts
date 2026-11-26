import type { ProcessPhase, ProcessPhaseId, ProcessService } from '../types';

export const PROCESS_PHASES: ProcessPhase[] = [
  {
    id: 'phase-01',
    phaseNumber: '01',
    title: 'Property Onboarding',
    summary: 'Formalize engagement, document inventory, and establish secure key custody.',
    serviceIds: ['application-signing', 'annexure-key-takeover'],
  },
  {
    id: 'phase-02',
    phaseNumber: '02',
    title: 'Finding the Right Tenant',
    summary: 'Market your property, verify prospective tenants, and execute move-in agreements.',
    serviceIds: ['property-marketing', 'tenant-screening', 'agreement-process', 'property-handover'],
  },
  {
    id: 'phase-03',
    phaseNumber: '03',
    title: 'Ongoing Property Management',
    summary: 'Handle tenancy coordination, vendor upkeep, quarterly checks, and monthly reporting.',
    serviceIds: [
      'tenancy-management',
      'vendor-management',
      'quarterly-inspection',
      'monthly-report-system',
    ],
  },
  {
    id: 'phase-04',
    phaseNumber: '04',
    title: 'Renewal & Long-Term Care',
    summary: 'Protect asset value across lease transitions with fair exits, renewals, and lasting care.',
    serviceIds: ['exit-renewal', 'long-term-service'],
  },
];

export const PROCESS_SERVICES: ProcessService[] = [
  // Phase 01 — Property Onboarding
  {
    id: 'application-signing',
    stepNumber: '01',
    name: 'Application Signing',
    shortDescription: 'Complete management onboarding and authorize ASV representation.',
    detailedDescription:
      'Every engagement starts with clear scope alignment. We walk you through our service plans, confirm your expectations for tenant profile and maintenance limits, and execute the Property Management Application with transparent terms.',
    activities: [
      'Review property details, location, and management plan suitability',
      'Align on expected rental range, deposit norms, and tenant preferences',
      'Complete and sign the Property Management Application form',
      'Assign a dedicated ASV coordinator for end-to-end onboarding',
    ],
    icon: 'file-signature',
    phaseId: 'phase-01',
    placement: 'orbit',
    orbitPosition: 'top',
  },
  {
    id: 'annexure-key-takeover',
    stepNumber: '02',
    name: 'Annexure & Key Takeover',
    shortDescription:
      'Document property inventory, complete onboarding records and securely manage property keys.',
    detailedDescription:
      'Before marketing or occupying your home, our team conducts a structured physical walkthrough to capture a room-by-room inventory annexure and baseline condition record while taking documented custody of your property keys.',
    activities: [
      'Prepare detailed room-by-room fixture, appliance, and furnishing annexure',
      'Record baseline property condition notes and photograph key areas',
      'Log spare key sets, access cards, and parking fobs in a formal receipt',
      'Identify minor pre-leasing readiness items for owner review',
    ],
    icon: 'key-round',
    phaseId: 'phase-01',
    placement: 'right-column',
    columnOrder: 0,
  },

  // Phase 02 — Finding the Right Tenant
  {
    id: 'property-marketing',
    stepNumber: '03',
    name: 'Property Marketing',
    shortDescription: 'Present your home across digital listings and verified Bengaluru networks.',
    detailedDescription:
      'We position your residential property clearly and professionally across online portals and local brokerage channels in Bengaluru, highlighting community amenities, connectivity, and home condition to attract serious prospects.',
    activities: [
      'Create clear property presentation with key specifications and locality highlights',
      'Publish listings across high-intent rental platforms and local channels',
      'Respond promptly to prospect enquiries and pre-qualify viewing requests',
      'Conduct accompanied, scheduled visits so keys never leave ASV supervision',
    ],
    icon: 'megaphone',
    phaseId: 'phase-02',
    placement: 'orbit',
    orbitPosition: 'upper-right',
  },
  {
    id: 'tenant-screening',
    stepNumber: '04',
    name: 'Tenant Screening',
    shortDescription: 'Verify prospect identity, employment credentials, and supporting records.',
    detailedDescription:
      'Selecting reliable tenants protects your home and rental continuity. We collect and verify identity, employment, and reference documentation from shortlisted applicants before presenting profiles to you for final approval.',
    activities: [
      'Collect government-issued identity and address proof from all adult occupants',
      'Verify employment credentials, employer letters, or corporate lease details',
      'Review occupant profile against apartment association and owner guidelines',
      'Share verified applicant summary for transparent owner sign-off',
    ],
    icon: 'user-check',
    phaseId: 'phase-02',
    placement: 'orbit',
    orbitPosition: 'lower-right',
  },
  {
    id: 'agreement-process',
    stepNumber: '05',
    name: 'Agreement Process',
    shortDescription:
      'Prepare, review and coordinate rental agreements and supporting documentation.',
    detailedDescription:
      'Once a tenant is approved, ASV coordinates standard rental agreement preparation, clause alignment, stamp duty paperwork, and security deposit plus initial rent settlement before keys are handed over.',
    activities: [
      'Prepare clear rental agreement clauses covering rent, notice, and upkeep',
      'Share draft documentation with owner and tenant for mutual review',
      'Coordinate e-stamping, signatures, and society move-in NOC documentation',
      'Confirm security deposit and initial rent transfer prior to move-in',
    ],
    icon: 'file-check',
    phaseId: 'phase-02',
    placement: 'right-column',
    columnOrder: 2,
  },
  {
    id: 'property-handover',
    stepNumber: '06',
    name: 'Property Handover',
    shortDescription: 'Execute documented move-in handover with meter and fixture checks.',
    detailedDescription:
      'Move-in day sets the standard for the entire tenancy. Our on-ground team accompanies the tenant during handover, logs utility meter readings, verifies the signed inventory annexure, and obtains formal acknowledgment.',
    activities: [
      'Verify condition of paint, fittings, appliances, and fixtures against baseline',
      'Record electricity, water, and gas meter readings on move-in date',
      'Obtain tenant sign-off on the inventory annexure and key issuance form',
      'Coordinate apartment association registration and access onboarding',
    ],
    icon: 'home',
    phaseId: 'phase-02',
    placement: 'orbit',
    orbitPosition: 'bottom',
  },

  // Phase 03 — Ongoing Property Management
  {
    id: 'tenancy-management',
    stepNumber: '07',
    name: 'Tenancy Management',
    shortDescription:
      'Manage rent, lease renewals, tenant communication and ongoing tenancy requirements.',
    detailedDescription:
      'Acting as your local representative in Bengaluru, ASV handles day-to-day tenant communication, monthly rent tracking, association coordination, and lease compliance so you never have to field routine calls across time zones.',
    activities: [
      'Serve as single point of contact for all tenant requests and clarifications',
      'Track timely monthly rent credits and follow up on overdue dues',
      'Coordinate with residential association / society offices for owner notices',
      'Monitor adherence to lease terms and occupancy guidelines',
    ],
    icon: 'home',
    phaseId: 'phase-03',
    placement: 'left-column',
    columnOrder: 2,
  },
  {
    id: 'vendor-management',
    stepNumber: '08',
    name: 'Vendor Management',
    shortDescription:
      'Coordinate property maintenance, repairs, service providers and vendor activities.',
    detailedDescription:
      'When plumbing, electrical, carpentry, or appliance issues arise, our local team sources verified technicians, coordinates access with the tenant, obtains quotes for owner approval, and supervises work quality through completion.',
    activities: [
      'Assess reported maintenance issues and identify scope of repair',
      'Obtain transparent vendor estimates for owner approval prior to execution',
      'Schedule and supervise plumbing, electrical, painting, or carpentry technicians',
      'Verify completed repair quality and attach vendor bills to monthly records',
    ],
    icon: 'wrench',
    phaseId: 'phase-03',
    placement: 'right-column',
    columnOrder: 1,
  },
  {
    id: 'quarterly-inspection',
    stepNumber: '09',
    name: 'Quarterly Inspection',
    shortDescription: 'Carry out scheduled on-site checks for property condition and upkeep.',
    detailedDescription:
      'Proactive physical checks prevent minor wear from turning into costly repairs. Our team schedules quarterly visits with prior tenant notice to inspect walls, plumbing lines, electrical fixtures, balconies, and general cleanliness.',
    activities: [
      'Coordinate scheduled inspection slots with tenant in advance',
      'Check for dampness, seepage, plumbing leaks, and electrical wear',
      'Evaluate overall cleanliness and compliance with property care norms',
      'Document observations with clear photos and actionable recommendations',
    ],
    icon: 'search-check',
    phaseId: 'phase-03',
    placement: 'orbit',
    orbitPosition: 'lower-left',
  },
  {
    id: 'monthly-report-system',
    stepNumber: '10',
    name: 'Monthly Report System',
    shortDescription:
      'Transparent monthly updates covering rent, maintenance, expenses and property performance.',
    detailedDescription:
      'Designed specifically for remote homeowners and NRIs, our monthly reporting consolidates rent status, society dues, approved maintenance expenses, and inspection notes into one clear statement delivered on schedule.',
    activities: [
      'Summarize monthly rent status, deposit records, and utility/society notes',
      'Itemize any owner-approved vendor repairs with supporting receipts',
      'Include visual inspection findings and upcoming lease milestones',
      'Maintain an organized archive of statements for tax and record-keeping',
    ],
    icon: 'chart-combined',
    phaseId: 'phase-03',
    placement: 'left-column',
    columnOrder: 1,
  },

  // Phase 04 — Renewal & Long-Term Care
  {
    id: 'exit-renewal',
    stepNumber: '11',
    name: 'Exit / Renewal',
    shortDescription: 'Manage lease renewals, exit inspections, and fair deposit settlements.',
    detailedDescription:
      'At the end of a lease term, we coordinate renewal terms with annual escalation or execute a thorough exit protocol—comparing condition against the baseline annexure and settling pending utility and society bills.',
    activities: [
      'Initiate renewal discussions early or manage formal move-out notice period',
      'Conduct detailed exit walkthrough against the original move-in annexure',
      'Verify pending electricity, water, gas, and society maintenance dues',
      'Prepare transparent settlement breakdown for security deposit reconciliation',
    ],
    icon: 'refresh-cw',
    phaseId: 'phase-04',
    placement: 'orbit',
    orbitPosition: 'upper-left',
  },
  {
    id: 'long-term-service',
    stepNumber: '12',
    name: 'Long-Term Service',
    shortDescription:
      'Ongoing property management, preventive maintenance and long-term property care.',
    detailedDescription:
      'Between tenancies and across multi-year ownership, ASV safeguards your property’s market appeal through turnaround painting, deep cleaning, preventive maintenance, and seamless re-leasing continuity.',
    activities: [
      'Coordinate post-exit turnaround cleaning, repainting, and minor refurbishment',
      'Protect vacant homes between tenancies with periodic airing and security checks',
      'Transition smoothly back into tenant placement with zero owner travel needed',
      'Deliver consistent stewardship designed for long-term residential ownership',
    ],
    icon: 'calendar-check',
    phaseId: 'phase-04',
    placement: 'left-column',
    columnOrder: 0,
  },
];

export const PHASE_MAP: Record<ProcessPhaseId, ProcessPhase> = PROCESS_PHASES.reduce(
  (acc, phase) => {
    acc[phase.id] = phase;
    return acc;
  },
  {} as Record<ProcessPhaseId, ProcessPhase>,
);

export const ORBIT_SERVICES: ProcessService[] = PROCESS_SERVICES.filter(
  (s) => s.placement === 'orbit',
);

export const LEFT_COLUMN_SERVICES: ProcessService[] = PROCESS_SERVICES.filter(
  (s) => s.placement === 'left-column',
).sort((a, b) => (a.columnOrder ?? 0) - (b.columnOrder ?? 0));

export const RIGHT_COLUMN_SERVICES: ProcessService[] = PROCESS_SERVICES.filter(
  (s) => s.placement === 'right-column',
).sort((a, b) => (a.columnOrder ?? 0) - (b.columnOrder ?? 0));
