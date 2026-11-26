import type { PricingPlan } from '../types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    subtitle: 'Rental Placement Service',
    charge: '15 Days of Rent',
    chargeDetail: 'One-time placement fee upon successful tenant onboarding',
    termPeriod: 'Single placement engagement',
    included: [
      'Property marketing & tenant identification',
      'Rent and commercial term negotiation',
      'Rental agreement execution coordination',
      'Documented tenant move-in handover',
    ],
    notes: [
      'Designed for owners who need verified tenant placement without ongoing management.',
      'Applicable taxes (GST) and exact agreement stamp/registration disbursements confirmed in proposal.',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'Property Management Service',
    charge: '1 Month of Rent',
    chargeDetail: 'Flexible split: 50% upfront and 50% after 1 year',
    termPeriod: '24 Months Service Term',
    featured: true,
    included: [
      'Complete rental placement & tenant due diligence',
      'Ongoing tenant management & rent coordination',
      'Lease renewal coordination & exit checks',
      'Vendor coordination for repairs & upkeep',
      'Quarterly property inspections with condition updates',
      'Document transfer assistance (Khata, BESCOM, property tax)',
    ],
    notes: [
      'Standard 24-month property management agreement term.',
      'Material costs for repairs and statutory government fees are billed separately upon owner approval.',
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    subtitle: 'Comprehensive Asset Care',
    charge: '10% Monthly Rent',
    chargeDetail: 'Payable monthly after tenant placement is completed',
    termPeriod: 'Unlimited / Ongoing Term',
    included: [
      'Dedicated property manager',
      'All Premium management & inspection services included',
      'Zero labor cost for routine repairs',
      '50% off on complete flat painting',
      'Free 1-time deep cleaning',
      'Fire safety insurance coverage (as per policy terms)',
      'Salesforce user interface access',
    ],
    notes: [
      'Built for NRIs and portfolio investors seeking continuous ongoing oversight.',
      'Confirm policy limits, painting scope, and applicable taxes in your written ASV proposal.',
    ],
  },
];

export const PRICING_TERMS_HIGHLIGHTS = [
  {
    title: 'Assured Tenant Placement',
    detail:
      'Placement timelines and commitments apply subject to market rent alignment, property readiness, and the written Property Management Agreement.',
  },
  {
    title: 'Inspection Frequency',
    detail:
      'Preliminary inspection during onboarding, quarterly on-site inspections during tenancy (with monthly reporting where applicable), and full exit inspection at move-out.',
  },
  {
    title: 'Exclusions & Direct Disbursements',
    detail:
      'Third-party repair spare parts, major civil/renovation works, society maintenance charges, utility bills, stamp duty, and government statutory fees are borne by the owner with prior approval.',
  },
  {
    title: 'Taxes, Cancellation & Renewal',
    detail:
      'Applicable GST, early cancellation clauses, and renewal terms are detailed transparently in the signed ASV Property Management Application prior to key takeover.',
  },
];
