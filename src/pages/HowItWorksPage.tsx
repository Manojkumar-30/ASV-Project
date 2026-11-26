import { usePageMeta } from '../hooks/usePageMeta';
import { Container } from '../components/ui/Container';
import { SectionLabel } from '../components/ui/SectionLabel';
import { ProcessTimeline } from '../components/home/ProcessTimeline';
import { ConsultationSection } from '../components/home/ConsultationSection';

export function HowItWorksPage() {
  usePageMeta({
    title: 'How Property Management Works | ASV Property Management Bengaluru',
    description:
      'Explore ASV Property Management’s 4-phase Property Management Journey: Property Onboarding, Finding the Right Tenant, Ongoing Property Management, and Renewal & Long-Term Care.',
    canonicalPath: '/how-it-works',
  });

  return (
    <>
      <section className="pt-12 sm:pt-16 lg:pt-24 pb-10 bg-[#FAFAFA] border-b border-[#E5E5E5]">
        <Container>
          <SectionLabel text="Process" className="mb-4" />
          <h1 className="hero-headline font-bold text-[#101010] max-w-4xl mb-6">
            A clear, documented workflow <span className="text-[#ED1C24]">at every stage.</span>
          </h1>
          <p className="text-lg text-[#626262] max-w-2xl leading-relaxed">
            From your initial enquiry and preliminary walkthrough to quarterly checks and tenant renewals, every
            step is structured to protect your property and keep you informed.
          </p>
        </Container>
      </section>

      <ProcessTimeline />
      <ConsultationSection />
    </>
  );
}
