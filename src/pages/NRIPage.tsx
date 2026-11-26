import { ArrowUpRight, CheckCircle2, Globe, ShieldCheck, Camera, FileText } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { Container } from '../components/ui/Container';
import { SectionLabel } from '../components/ui/SectionLabel';
import { SmartImage } from '../components/ui/SmartImage';
import { ConsultationSection } from '../components/home/ConsultationSection';

const NRI_PILLARS = [
  {
    icon: Globe,
    title: 'Remote Onboarding & Key Custody',
    description:
      'Coordinate preliminary inspection, property annexure creation, and secure key handover without flying to Bengaluru.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Tenant Placement',
    description:
      'Employment verification, identity KYC checks, and rental agreement execution conducted transparently on your behalf.',
  },
  {
    icon: Camera,
    title: 'Quarterly Inspections & Photo Updates',
    description:
      'Receive periodic condition assessments with visual documentation so you always know how your property is maintained.',
  },
  {
    icon: FileText,
    title: 'Khata, BESCOM & Tax Assistance',
    description:
      'Local administrative support for Khata name transfers, electricity account documentation, and annual property tax filings.',
  },
];

export function NRIPage() {
  usePageMeta({
    title: 'NRI Property Management in Bangalore | ASV Property Management',
    description:
      'Manage your property in Bengaluru from abroad with ASV Property Management. Remote inspections, tenant screening, maintenance coordination, and documentation support for NRIs.',
    canonicalPath: '/nri-property-management',
  });

  return (
    <>
      <section className="pt-12 sm:pt-16 lg:pt-24 pb-14 sm:pb-20 bg-[#FAFAFA] border-b border-[#E5E5E5]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <SectionLabel text="NRI Property Management" className="mb-4" />
              <h1 className="hero-headline font-bold text-[#101010] mb-6">
                Manage your Bengaluru home <span className="text-[#ED1C24]">from anywhere in the world.</span>
              </h1>
              <p className="text-lg text-[#626262] leading-relaxed max-w-2xl mb-8">
                Distance should never leave your property vulnerable to delays, unverified tenants, or neglected
                repairs. ASV acts as your accountable local team on the ground.
              </p>
              <a
                href="#consultation"
                className="inline-flex items-center gap-2 rounded-full bg-[#ED1C24] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#C81018] transition-colors"
              >
                <span>Request an International Consultation</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#E5E5E5] aspect-[4/3]">
                <SmartImage
                  src="/src/assets/images/nri_editorial_living_1795592749819.webp"
                  alt="Bengaluru residence managed for an overseas NRI owner"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20 bg-white border-b border-[#E5E5E5]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NRI_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="rounded-2xl border border-[#E5E5E5] p-6 sm:p-8 space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF1F1] text-[#ED1C24]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-[#101010]">{pillar.title}</h2>
                  <p className="text-[15px] text-[#626262] leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-[#E5E5E5] bg-[#F7F7F7] p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-[#101010] mb-4">
              How NRIs communicate with our team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-[#101010]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#ED1C24] shrink-0 mt-0.5" aria-hidden="true" />
                <span>WhatsApp and international phone updates aligned to your time zone</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#ED1C24] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Prior owner approval before any major vendor repair expense</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#ED1C24] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Clear exit inspection &amp; utility settlement before tenant deposit release</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ConsultationSection />
    </>
  );
}
