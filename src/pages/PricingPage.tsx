import { AlertCircle, ArrowUpRight, Check } from 'lucide-react';
import { PRICING_PLANS, PRICING_TERMS_HIGHLIGHTS } from '../data/pricing';
import { usePageMeta } from '../hooks/usePageMeta';
import { Container } from '../components/ui/Container';
import { SectionLabel } from '../components/ui/SectionLabel';
import { ConsultationSection } from '../components/home/ConsultationSection';

export function PricingPage() {
  usePageMeta({
    title: 'Plans, Pricing & Terms | ASV Property Management Bengaluru',
    description:
      'Compare ASV Property Management Basic (15 days rent), Premium (1 month rent, 24-month term), and Advanced (10% monthly rent) property management plans.',
    canonicalPath: '/pricing',
  });

  const scrollToConsult = () => {
    document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="pt-12 sm:pt-16 lg:pt-24 pb-14 bg-[#FAFAFA] border-b border-[#E5E5E5]">
        <Container>
          <SectionLabel text="Plans & Pricing" className="mb-4" />
          <h1 className="hero-headline font-bold text-[#101010] max-w-4xl mb-6">
            Transparent plans aligned to your <span className="text-[#ED1C24]">ownership goals.</span>
          </h1>
          <p className="text-lg text-[#626262] max-w-2xl leading-relaxed">
            Choose between single-placement rental support, a structured 24-month management engagement, or
            ongoing monthly oversight with dedicated property management.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-20 bg-white border-b border-[#E5E5E5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {PRICING_PLANS.map((plan) => (
              <article
                key={plan.id}
                className={`flex flex-col justify-between rounded-2xl border p-6 sm:p-8 ${
                  plan.featured
                    ? 'border-[#101010] bg-[#101010] text-white'
                    : 'border-[#E5E5E5] bg-white text-[#101010]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-display text-xl font-bold">{plan.name}</span>
                    <span
                      className={`text-xs font-medium ${
                        plan.featured ? 'text-[#ED1C24]' : 'text-[#626262]'
                      }`}
                    >
                      {plan.termPeriod}
                    </span>
                  </div>

                  <p className={`text-sm mb-6 ${plan.featured ? 'text-neutral-300' : 'text-[#626262]'}`}>
                    {plan.subtitle}
                  </p>

                  <div className="border-y border-current/15 py-5 mb-6">
                    <div className="font-display text-3xl font-bold font-mono-nums">{plan.charge}</div>
                    <p className={`text-xs mt-1.5 ${plan.featured ? 'text-neutral-300' : 'text-[#626262]'}`}>
                      {plan.chargeDetail}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.included.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className={`h-4 w-4 shrink-0 mt-0.5 ${
                            plan.featured ? 'text-[#ED1C24]' : 'text-[#ED1C24]'
                          }`}
                          aria-hidden="true"
                        />
                        <span className={plan.featured ? 'text-neutral-100' : 'text-[#101010]'}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <div
                    className={`rounded-xl p-4 text-xs leading-relaxed ${
                      plan.featured ? 'bg-white/5 text-neutral-300' : 'bg-[#F7F7F7] text-[#626262]'
                    }`}
                  >
                    {plan.notes.map((note) => (
                      <p key={note} className="mb-1 last:mb-0">
                        {note}
                      </p>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={scrollToConsult}
                    className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors ${
                      plan.featured
                        ? 'bg-[#ED1C24] text-white hover:bg-[#C81018]'
                        : 'bg-[#101010] text-white hover:bg-[#ED1C24]'
                    }`}
                  >
                    <span>Request {plan.name} Proposal</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Terms & Confirmation Notes */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRICING_TERMS_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#E5E5E5] bg-[#F7F7F7] p-6">
                <h2 className="font-display text-lg font-bold text-[#101010] mb-2">{item.title}</h2>
                <p className="text-sm text-[#626262] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#E5E5E5] bg-[#FFF1F1]/60 p-6 flex items-start gap-3.5">
            <AlertCircle className="h-5 w-5 text-[#ED1C24] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-[#101010] leading-relaxed">
              <span className="font-semibold">Business Confirmation Note:</span> Final commercial quotes
              depend on property configuration, location, and furnishing status. Applicable GST, exact
              cancellation terms, and insurance policy schedules are confirmed in writing within your ASV
              Property Management Agreement prior to onboarding.
            </p>
          </div>
        </Container>
      </section>

      <ConsultationSection />
    </>
  );
}
