import { Globe, Headphones, Layers, ShieldCheck } from 'lucide-react';
import { Container } from '../ui/Container';
import { EditorialReveal } from '../ui/MotionPrimitives';

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: 'Verified Tenant Screening',
    description: 'Background & document checks',
  },
  {
    icon: Globe,
    title: 'NRI Property Support',
    description: 'Complete remote management',
  },
  {
    icon: Layers,
    title: 'End-to-End Service',
    description: 'From tenant search to renewals',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Structured owner assistance',
  },
];

export function TrustHighlights() {
  return (
    <section aria-label="Core service highlights" className="bg-white border-b border-[#E5E5E5]">
      <Container>
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 divide-y min-[360px]:divide-x lg:divide-y-0 divide-[#E5E5E5]">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <EditorialReveal
                key={item.title}
                delay={idx * 0.05}
                distance={10}
                className="flex flex-col justify-between gap-2.5 py-5 sm:py-6 px-3.5 sm:px-6 lg:px-8 lg:first:pl-0 lg:last:pr-0 min-w-0"
              >
                <Icon className="h-5 w-5 text-[#ED1C24]" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h2 className="font-display text-sm sm:text-[15px] font-semibold text-[#101010] leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#626262] mt-1 leading-snug">{item.description}</p>
                </div>
              </EditorialReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
