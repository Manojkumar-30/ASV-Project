import { COMPANY_INFO } from '../data/company';
import { PRICING_TERMS_HIGHLIGHTS } from '../data/pricing';
import { usePageMeta } from '../hooks/usePageMeta';
import { Container } from '../components/ui/Container';
import { SectionLabel } from '../components/ui/SectionLabel';

export function TermsPage() {
  usePageMeta({
    title: 'Terms & Conditions | ASV Property Management',
    description:
      'Review ASV Property Management terms covering Basic, Premium (24-month), and Advanced plans, tenant placement scope, inspections, and exclusions.',
    canonicalPath: '/terms-and-conditions',
  });

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white">
      <Container className="max-w-3xl">
        <SectionLabel text="Legal & Service Terms" className="mb-4" />
        <h1 className="section-heading font-bold text-[#101010] mb-6">Terms &amp; Conditions</h1>
        <p className="text-sm text-[#858585] mb-10">
          ASV Property Management · {COMPANY_INFO.address.full}
        </p>

        <div className="space-y-8 text-[15px] leading-relaxed text-[#626262]">
          <div>
            <h2 className="font-display text-xl font-bold text-[#101010] mb-2">1. Scope of Engagement</h2>
            <p>
              Property management services commence only after completion of the Property Management
              Application, preparation of the property annexure, verification of ownership documents, and
              signed commercial acceptance of the chosen plan (Basic, Premium, or Advanced).
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-[#101010] mb-2">2. Service Plans &amp; Terms</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-[#101010]">Basic – Rental Service:</strong> 15 days of rent for tenant
                identification, negotiation, agreement execution, and move-in handover.
              </li>
              <li>
                <strong className="text-[#101010]">Premium – Property Management Service:</strong> 1 month of
                rent (50% upfront and 50% after 1 year) for a 24-month service term covering rental service,
                renewals, document transfer, vendor management, quarterly inspections, and tenant management.
              </li>
              <li>
                <strong className="text-[#101010]">Advanced – Management Service:</strong> 10% of monthly rent
                payable after tenant placement for an ongoing term, including dedicated manager, zero routine
                repair labor charges, 50% off complete flat painting, free 1-time deep cleaning, fire safety
                insurance, and Salesforce UI access as specified in the executed agreement.
              </li>
            </ul>
          </div>

          {PRICING_TERMS_HIGHLIGHTS.map((item, idx) => (
            <div key={item.title}>
              <h2 className="font-display text-xl font-bold text-[#101010] mb-2">
                {idx + 3}. {item.title}
              </h2>
              <p>{item.detail}</p>
            </div>
          ))}

          <div>
            <h2 className="font-display text-xl font-bold text-[#101010] mb-2">
              7. Independent Management Disclaimer
            </h2>
            <p>
              Reference to residential apartment communities (such as Godrej United, Brigade Lakefront,
              Prestige Tranquillity, Purva Palm Beach, Godrej Air, or Sobha City) denotes communities where ASV
              provides independent management services to individual property owners and does not imply
              builder partnership or ownership.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
