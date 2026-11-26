import type { CustomerProfileBenefit } from '../../types';
import { CustomerProfileIcon } from './CustomerProfileIcon';

interface CustomerBenefitProps {
  benefit: CustomerProfileBenefit;
  theme: 'light' | 'dark';
}

export function CustomerBenefit({ benefit, theme }: CustomerBenefitProps) {
  const isDark = theme === 'dark';

  return (
    <li className="group/benefit flex items-center gap-3">
      <span
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 motion-safe:group-hover:scale-105 ${
          isDark
            ? 'border-[#2B2B2B] bg-[#1A1A1A] text-[#FF4D54] group-hover/benefit:border-[#ED1C24]/60 group-hover/benefit:bg-[#ED1C24] group-hover/benefit:text-white'
            : 'border-[#ED1C24]/15 bg-[#FFF0F0] text-[#ED1C24] group-hover/benefit:border-[#ED1C24] group-hover/benefit:bg-[#ED1C24] group-hover/benefit:text-white'
        }`}
      >
        <CustomerProfileIcon icon={benefit.icon} className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </span>
      <span
        className={`text-sm font-medium leading-snug ${
          isDark ? 'text-neutral-100' : 'text-[#101010]'
        }`}
      >
        {benefit.label}
      </span>
    </li>
  );
}
