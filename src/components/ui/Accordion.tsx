import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '../../types';

interface AccordionProps {
  items: FAQItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-[#E5E5E5] border-t border-b border-[#E5E5E5]">
      {items.map((item, idx) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <div key={item.id} className="py-1">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors min-h-[56px]"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono-nums text-xs text-[#858585] shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-base sm:text-lg font-medium text-[#101010] group-hover:text-[#ED1C24] transition-colors">
                    {item.question}
                  </span>
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#626262] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#ED1C24]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6 pl-8 pr-4 text-[15px] sm:text-base leading-relaxed text-[#626262]"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
