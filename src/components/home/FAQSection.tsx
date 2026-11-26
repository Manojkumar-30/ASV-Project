import { FAQ_ITEMS } from '../../data/faqs';
import { Accordion } from '../ui/Accordion';
import { Container } from '../ui/Container';
import { EditorialReveal, MaskedLine } from '../ui/MotionPrimitives';
import { SectionLabel } from '../ui/SectionLabel';

export function FAQSection() {
  return (
    <section id="faq" className="py-14 sm:py-20 lg:py-28 bg-white border-b border-[#E5E5E5]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <SectionLabel text="Frequently Asked Questions" className="mb-4" />
            <h2 className="section-heading font-bold text-[#101010] mb-5">
              <MaskedLine>Clear answers before</MaskedLine>
              <MaskedLine delay={0.1}>you hand over your keys.</MaskedLine>
            </h2>
            <EditorialReveal delay={0.12}>
              <p className="text-[15px] leading-relaxed text-[#626262]">
                Everything you need to know about tenant screening, inspection frequency, rent coordination,
                charges, and NRI support in Bengaluru.
              </p>
            </EditorialReveal>
          </div>

          <EditorialReveal delay={0.1} distance={14} className="lg:col-span-8">
            <Accordion items={FAQ_ITEMS} />
          </EditorialReveal>
        </div>
      </Container>
    </section>
  );
}
