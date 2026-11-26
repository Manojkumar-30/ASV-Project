import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface FooterAccordionProps {
  title: string;
  children: ReactNode;
}

export function FooterAccordion({ title, children }: FooterAccordionProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-[#303030]/75 md:border-b-0 pb-3 md:pb-0">
      {/* Mobile Accordion Trigger (<768px) */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex min-h-[44px] w-full items-center justify-between py-2 text-left md:hidden"
      >
        <span className="font-display text-sm font-semibold tracking-wide text-white">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-[#BDBDBD] transition-transform duration-200 ${
            open ? 'rotate-180 text-[#ED1C24]' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Tablet & Desktop Static Heading (>=768px) */}
      <h3 className="hidden md:block font-display text-sm font-semibold tracking-wide text-white mb-4">
        {title}
      </h3>

      <div id={panelId} className={`${open ? 'block pt-2 pb-2' : 'hidden'} md:block md:pt-0 md:pb-0`}>
        {children}
      </div>
    </div>
  );
}
