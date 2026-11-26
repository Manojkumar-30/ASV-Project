import { COMPANY_INFO } from '../data/company';
import { usePageMeta } from '../hooks/usePageMeta';
import { Container } from '../components/ui/Container';
import { SectionLabel } from '../components/ui/SectionLabel';
import { ConsultationSection } from '../components/home/ConsultationSection';

export function ContactPage() {
  usePageMeta({
    title: 'Contact ASV Property Management | Bengaluru Office & NRI Desk',
    description:
      'Contact ASV Property Management in Kasturi Nagar, Bengaluru at +91 74110 01523 or submit a property management consultation request online.',
    canonicalPath: '/contact',
  });

  return (
    <>
      <section className="pt-12 sm:pt-16 lg:pt-24 pb-10 bg-[#FAFAFA] border-b border-[#E5E5E5]">
        <Container>
          <SectionLabel text="Contact" className="mb-4" />
          <h1 className="hero-headline font-bold text-[#101010] max-w-4xl mb-6">
            Speak with our <span className="text-[#ED1C24]">Bengaluru team.</span>
          </h1>
          <p className="text-lg text-[#626262] max-w-2xl leading-relaxed">
            Whether you live overseas or in India, reach out by phone, WhatsApp, or the consultation form
            below to discuss your residential property.
          </p>

          <div className="mt-8 rounded-2xl border border-[#E5E5E5] bg-white p-5 text-xs text-[#626262]">
            <span className="font-semibold text-[#101010]">Information Transparency:</span>{' '}
            {COMPANY_INFO.unverifiedItemsNotice.join(' ')}
          </div>
        </Container>
      </section>

      <ConsultationSection />
    </>
  );
}
