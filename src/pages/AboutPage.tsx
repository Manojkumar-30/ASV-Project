import { Link } from 'react-router-dom';
import { ArrowUpRight, Building2, CheckCircle2, MapPin, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { usePageMeta } from '../hooks/usePageMeta';
import { Container } from '../components/ui/Container';
import { SectionLabel } from '../components/ui/SectionLabel';
import { SmartImage } from '../components/ui/SmartImage';
import { ConsultationSection } from '../components/home/ConsultationSection';

export function AboutPage() {
  usePageMeta({
    title: 'About ASV Property Management | Bengaluru Residential Asset Care',
    description:
      'Learn about ASV Property Management in Kasturi Nagar, Bengaluru—our structured approach to tenant screening, maintenance, inspections, and NRI homeowner support.',
    canonicalPath: '/about',
  });

  return (
    <>
      <section className="pt-12 sm:pt-16 lg:pt-24 pb-14 sm:pb-20 bg-[#FAFAFA] border-b border-[#E5E5E5]">
        <Container>
          <SectionLabel text="About ASV" className="mb-4" />
          <h1 className="hero-headline font-bold text-[#101010] max-w-4xl mb-6">
            Accountable local property care in <span className="text-[#ED1C24]">Bengaluru.</span>
          </h1>
          <p className="text-lg text-[#626262] max-w-2xl leading-relaxed">
            ASV Property Management takes complete responsibility for coordinating residential properties—helping
            NRIs, HNIs, investors, and busy homeowners maintain occupancy, condition, and clear records without
            day-to-day stress.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-20 bg-white border-b border-[#E5E5E5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#E5E5E5] min-h-[320px]">
              <SmartImage
                src="/src/assets/images/about_bengaluru_residences_1795592749762.webp"
                alt="Bengaluru residential community managed with ASV Property Management"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <h2 className="sub-heading font-bold text-[#101010]">
                Built around structured processes and on-ground presence.
              </h2>
              <p className="text-base leading-relaxed text-[#626262]">
                Operating from our Kasturi Nagar office in Bengaluru, ASV works directly with property owners
                who live abroad or prefer not to manage tenant viewings, paperwork, and repairs themselves.
              </p>
              <p className="text-base leading-relaxed text-[#626262]">
                Rather than acting as an unverified listing marketplace, we represent the property owner across
                the full tenancy lifecycle—from preliminary inspection and key custody to tenant due diligence,
                quarterly inspections, and final exit settlement.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-xl border border-[#E5E5E5] p-5">
                  <ShieldCheck className="h-5 w-5 text-[#ED1C24] mb-2.5" aria-hidden="true" />
                  <h3 className="font-display text-base font-semibold text-[#101010]">Process-Led</h3>
                  <p className="text-sm text-[#626262] mt-1">
                    Written annexures, employment verification, and documented handovers at every transition.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E5E5E5] p-5">
                  <Building2 className="h-5 w-5 text-[#ED1C24] mb-2.5" aria-hidden="true" />
                  <h3 className="font-display text-base font-semibold text-[#101010]">Local Ground Team</h3>
                  <p className="text-sm text-[#626262] mt-1">
                    Kasturi Nagar office coordinating inspections and vetted repair vendors on site.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20 bg-[#F7F7F7] border-b border-[#E5E5E5]">
        <Container>
          <SectionLabel text="Service Coverage" className="mb-4" />
          <h2 className="sub-heading font-bold text-[#101010] mb-8">Where ASV operates</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPANY_INFO.locations.map((loc) => (
              <div key={loc.city} className="rounded-2xl border border-[#E5E5E5] bg-white p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold text-[#101010]">{loc.city}</h3>
                  <MapPin className="h-5 w-5 text-[#ED1C24]" aria-hidden="true" />
                </div>
                <div className="text-xs font-semibold text-[#ED1C24]">{loc.status}</div>
                <p className="text-sm text-[#626262] leading-relaxed">{loc.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#E5E5E5] bg-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#ED1C24] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-sm text-[#626262]">
                <span className="font-semibold text-[#101010]">Primary Office:</span> {COMPANY_INFO.address.full}
              </div>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-[#101010] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#ED1C24] transition-colors shrink-0"
            >
              <span>Explore Services</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <ConsultationSection />
    </>
  );
}
