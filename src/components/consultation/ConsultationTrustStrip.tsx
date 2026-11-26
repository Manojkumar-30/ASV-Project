import { Globe, MessagesSquare, ShieldCheck } from 'lucide-react';

const TRUST_BENEFITS = [
  {
    id: 'nri-friendly',
    title: 'NRI-Friendly Support',
    icon: Globe,
  },
  {
    id: 'property-care',
    title: 'Professional Property Care',
    icon: ShieldCheck,
  },
  {
    id: 'personal-assistance',
    title: 'Personal Assistance',
    icon: MessagesSquare,
  },
] as const;

export function ConsultationTrustStrip() {
  return (
    <div className="mt-12 lg:mt-16 border-t border-[#303030] pt-7">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:divide-x sm:divide-[#303030]">
        {TRUST_BENEFITS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-center justify-start sm:justify-center gap-3 sm:px-6 py-1.5"
            >
              <Icon className="h-5 w-5 text-[#ED1C24] shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span className="font-display text-sm sm:text-[15px] font-semibold text-white">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
