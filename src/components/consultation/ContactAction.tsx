import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ContactActionProps {
  icon: ReactNode;
  label: string;
  value: string;
  secondaryValue?: string;
  href?: string;
  external?: boolean;
  valueClassName?: string;
  containerClassName?: string;
}

export function ContactAction({
  icon,
  label,
  value,
  secondaryValue,
  href,
  external = false,
  valueClassName = '',
  containerClassName = '',
}: ContactActionProps) {
  return (
    <div className={`flex items-start gap-3.5 px-5 py-4 sm:px-6 ${containerClassName}`}>
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#ED1C24]/30 bg-[#ED1C24]/10 text-[#ED1C24]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-xs font-medium text-[#BDBDBD]">{label}</div>
        {href ? (
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`group mt-0.5 inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-white transition-colors hover:text-[#ED1C24] ${valueClassName}`}
          >
            <span className="break-words">{value}</span>
            {external && (
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-[#BDBDBD] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ED1C24]"
                aria-hidden="true"
              />
            )}
          </a>
        ) : (
          <div className={`mt-0.5 text-sm leading-relaxed text-white ${valueClassName}`}>
            <div>{value}</div>
            {secondaryValue && <div className="text-[#BDBDBD] mt-0.5">{secondaryValue}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
