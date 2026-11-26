import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CORE_SERVICES, ORIGINAL_TWELVE_SERVICES } from '../data/services';
import { usePageMeta } from '../hooks/usePageMeta';
import { Container } from '../components/ui/Container';
import { SectionLabel } from '../components/ui/SectionLabel';
import { ValueAddedServices } from '../components/home/ValueAddedServices';
import { ConsultationSection } from '../components/home/ConsultationSection';

export function ServicesPage() {
  usePageMeta({
    title: 'Property Management Services in Bengaluru | ASV Property Management',
    description:
      'Explore ASV Property Management’s 6 core service categories covering all 12 property management workflows—from preliminary inspection and tenant screening to maintenance and exit settlement.',
    canonicalPath: '/services',
  });

  return (
    <>
      <section className="pt-12 sm:pt-16 lg:pt-24 pb-14 sm:pb-20 bg-[#FAFAFA] border-b border-[#E5E5E5]">
        <Container>
          <SectionLabel text="Services" className="mb-4" />
          <h1 className="hero-headline font-bold text-[#101010] max-w-4xl mb-6">
            Complete residential management, <span className="text-[#ED1C24]">structured end-to-end.</span>
          </h1>
          <p className="text-lg text-[#626262] max-w-2xl leading-relaxed mb-8">
            All twelve foundational ASV services—organized into six clear operational phases for homeowners,
            investors, and NRIs.
          </p>
          <div className="flex flex-wrap gap-2.5 text-xs text-[#626262]">
            {ORIGINAL_TWELVE_SERVICES.map((item, idx) => (
              <span key={item} className="inline-flex items-center gap-1.5 pr-3">
                <span className="font-mono-nums text-[#ED1C24]">{String(idx + 1).padStart(2, '0')}</span>
                <span className="text-[#101010] font-medium">{item}</span>
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20 bg-white border-b border-[#E5E5E5]">
        <Container>
          <div className="space-y-8">
            {CORE_SERVICES.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className="scroll-mt-24 rounded-2xl border border-[#E5E5E5] bg-white p-6 sm:p-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5">
                    <span className="font-mono-nums text-sm font-semibold text-[#ED1C24]">
                      Service {service.number}
                    </span>
                    <h2 className="sub-heading font-bold text-[#101010] mt-2 mb-3">{service.title}</h2>
                    <p className="text-base text-[#626262] leading-relaxed mb-4">{service.summary}</p>
                    <div className="text-xs text-[#858585]">
                      <span className="font-semibold text-[#101010]">Original ASV Scope: </span>
                      {service.originalServices.join(' · ')}
                    </div>
                  </div>

                  <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-[#E5E5E5] pt-6 lg:pt-0 lg:pl-10">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#626262] mb-4">
                      Key Deliverables
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[#101010]">
                          <CheckCircle2 className="h-4 w-4 text-[#ED1C24] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#101010] p-6 sm:p-8 text-white">
            <div>
              <h3 className="font-display text-xl font-bold">Compare Basic, Premium &amp; Advanced Plans</h3>
              <p className="text-sm text-neutral-300 mt-1">
                Review service durations, fee structures, and included benefits across all three tiers.
              </p>
            </div>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-full bg-[#ED1C24] px-6 py-3 text-sm font-semibold text-white hover:bg-[#C81018] transition-colors"
            >
              <span>View Plans &amp; Pricing</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <ValueAddedServices />
      <ConsultationSection />
    </>
  );
}
