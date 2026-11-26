import { COMPANY_INFO } from '../data/company';
import { usePageMeta } from '../hooks/usePageMeta';
import { Container } from '../components/ui/Container';
import { SectionLabel } from '../components/ui/SectionLabel';

export function PrivacyPolicyPage() {
  usePageMeta({
    title: 'Privacy Policy | ASV Property Management',
    description:
      'Privacy Policy governing consultation enquiries, property onboarding information, and data handling at ASV Property Management.',
    canonicalPath: '/privacy-policy',
  });

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white">
      <Container className="max-w-3xl">
        <SectionLabel text="Legal" className="mb-4" />
        <h1 className="section-heading font-bold text-[#101010] mb-6">Privacy Policy</h1>
        <p className="text-sm text-[#858585] mb-10">
          ASV Property Management · {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state}
        </p>

        <div className="space-y-8 text-[15px] leading-relaxed text-[#626262]">
          <div>
            <h2 className="font-display text-xl font-bold text-[#101010] mb-2">1. Information We Collect</h2>
            <p>
              When you submit a consultation enquiry through this website, we collect the contact and property
              details you voluntarily provide: your full name, email address, international phone or WhatsApp
              number, country of residence, property location, property type, required service, preferred
              contact method, and any optional message.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-[#101010] mb-2">2. How We Use Your Information</h2>
            <p>
              Submitted information is used solely to evaluate your property management requirements, prepare
              service proposals, schedule preliminary inspections, and communicate with you via your preferred
              channel. We do not sell, rent, or trade homeowner contact information to unrelated third-party
              marketers.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-[#101010] mb-2">3. Third-Party Embeds &amp; Links</h2>
            <p>
              Embedded videos use privacy-enhanced YouTube modes (`youtube-nocookie.com`) and load only when
              you actively choose to play a video. External links to WhatsApp or YouTube are subject to those
              platforms’ respective privacy policies.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-[#101010] mb-2">4. Retention &amp; Contact</h2>
            <p>
              To request correction or deletion of enquiry details submitted through this site, please call{' '}
              <a href={COMPANY_INFO.phoneHref} className="text-[#101010] font-semibold underline">
                {COMPANY_INFO.phoneDisplay}
              </a>{' '}
              or write to our Kasturi Nagar, Bengaluru office.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
