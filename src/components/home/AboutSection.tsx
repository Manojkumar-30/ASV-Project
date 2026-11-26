import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { ClipImageReveal, EditorialReveal, MaskedLine } from '../ui/MotionPrimitives';
import { SectionLabel } from '../ui/SectionLabel';
import { SmartImage } from '../ui/SmartImage';

const ABOUT_POINTS = [
  'Structured property management workflows',
  'Local on-ground property support in Bengaluru',
  'Transparent communication across time zones',
  'Professional tenant screening and coordination',
  'Long-term service relationships with owners',
];

export function AboutSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <ClipImageReveal className="aspect-[4/3] lg:aspect-[16/13] w-full rounded-2xl overflow-hidden bg-[#F7F7F7]">
              <SmartImage
                src="/src/assets/images/about_bengaluru_residences_1795592749762.webp"
                alt="Modern residential apartment tower in Bengaluru with landscaped perimeter"
                className="h-full w-full object-cover"
                fallbackLabel="Bengaluru Residential Architecture"
              />
            </ClipImageReveal>
          </div>

          <div className="lg:col-span-5 lg:pt-4 flex flex-col justify-between">
            <div>
              <SectionLabel text="About ASV" className="mb-5" />

              <h2 className="section-heading font-bold text-[#101010] mb-7">
                <MaskedLine>A trusted partner</MaskedLine>
                <MaskedLine delay={0.1}>
                  in <span className="text-[#ED1C24]">Bengaluru.</span>
                </MaskedLine>
              </h2>

              <EditorialReveal delay={0.12} distance={14} className="space-y-4 text-base leading-relaxed text-[#626262] mb-8">
                <p>
                  Owning a property should not mean constantly worrying about tenants, repairs, rent
                  collection, or periodic inspections.
                </p>
                <p>
                  ASV Property Management coordinates every local responsibility—from preliminary property
                  inspection and key takeover to tenant placement, maintenance, and renewals—for NRIs,
                  investors, and homeowners.
                </p>
              </EditorialReveal>

              <ul className="divide-y divide-[#E5E5E5] border-y border-[#E5E5E5] mb-9">
                {ABOUT_POINTS.map((point, idx) => (
                  <EditorialReveal
                    key={point}
                    delay={0.1 + idx * 0.04}
                    direction="left"
                    distance={12}
                  >
                    <li className="flex items-baseline gap-4 py-3 text-[15px] font-medium text-[#101010]">
                      <span className="font-mono-nums text-xs text-[#ED1C24]">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span>{point}</span>
                    </li>
                  </EditorialReveal>
                ))}
              </ul>
            </div>

            <EditorialReveal delay={0.26}>
              <Link
                to="/about"
                className="btn-press inline-flex items-center gap-2 rounded-full border border-[#101010] bg-white px-6 py-3.5 text-sm font-semibold text-[#101010] hover:bg-[#101010] hover:text-white group"
              >
                <span>Explore About ASV</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </Link>
            </EditorialReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
