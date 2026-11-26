import { Link } from 'react-router-dom';
import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import { FOOTER_COMPANY_LINKS, FOOTER_SERVICE_LINKS } from '../../data/navigation';
import { FooterAccordion } from './FooterAccordion';
import { FooterSocialLinks } from './FooterSocialLinks';

export function FooterNavigation() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-10 pb-12 border-b border-[#303030]">
      {/* Column 01 — About ASV + Essential Contact Actions + Social Links */}
      <div className="lg:col-span-4 space-y-5 pb-4 md:pb-0 border-b border-[#303030]/75 md:border-b-0">
        <div>
          <h3 className="font-display text-sm font-semibold tracking-wide text-white mb-3">
            About ASV
          </h3>
          <p className="text-sm leading-relaxed text-[#BDBDBD] max-w-sm">
            End-to-end residential property management for NRIs, HNIs, investors and homeowners,
            covering tenant screening, rent coordination, inspections, maintenance and
            documentation.
          </p>
        </div>

        {/* Always-Visible Mobile Essential Contact Actions (<768px) */}
        <div className="flex flex-wrap items-center gap-2.5 md:hidden">
          <a
            href={COMPANY_INFO.phoneHref}
            className="btn-press inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#303030] bg-[#191919] px-4 py-2 text-xs font-semibold text-white hover:border-[#ED1C24]"
          >
            <Phone className="h-3.5 w-3.5 text-[#ED1C24]" aria-hidden="true" />
            <span className="font-mono-nums">{COMPANY_INFO.phoneDisplay}</span>
          </a>
          <a
            href={COMPANY_INFO.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#303030] bg-[#191919] px-4 py-2 text-xs font-semibold text-white hover:border-[#ED1C24]"
          >
            <MessageCircle className="h-3.5 w-3.5 text-[#ED1C24]" aria-hidden="true" />
            <span>WhatsApp Support</span>
          </a>
        </div>

        <FooterSocialLinks />
      </div>

      {/* Column 02 — Company */}
      <div className="lg:col-span-2">
        <FooterAccordion title="Company">
          <ul className="space-y-2.5 text-sm text-[#BDBDBD]">
            {FOOTER_COMPANY_LINKS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="link-underline hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterAccordion>
      </div>

      {/* Column 03 — Services & Plans */}
      <div className="lg:col-span-3">
        <FooterAccordion title="Services & Plans">
          <ul className="space-y-2.5 text-sm text-[#BDBDBD]">
            {FOOTER_SERVICE_LINKS.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="link-underline hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterAccordion>
      </div>

      {/* Column 04 — Office & Coverage */}
      <div className="lg:col-span-3">
        <FooterAccordion title="Office & Coverage">
          <div className="space-y-3.5 text-sm text-[#BDBDBD]">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-[#ED1C24] mt-1 shrink-0" aria-hidden="true" />
              <a
                href={COMPANY_INFO.address.mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="leading-relaxed hover:text-white transition-colors"
              >
                {COMPANY_INFO.address.full}
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-[#ED1C24] shrink-0" aria-hidden="true" />
              <a
                href={COMPANY_INFO.phoneHref}
                className="link-underline font-mono-nums text-white hover:text-[#ED1C24] transition-colors"
              >
                {COMPANY_INFO.phoneDisplay}
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <MessageCircle className="h-4 w-4 text-[#ED1C24] shrink-0" aria-hidden="true" />
              <a
                href={COMPANY_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-white transition-colors"
              >
                WhatsApp: Chat with Our Team
              </a>
            </div>

            <div className="flex items-start gap-2.5 text-xs leading-relaxed">
              <Clock className="h-4 w-4 text-[#ED1C24] mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <div>{COMPANY_INFO.hours.weekdays}</div>
                <div className="mt-0.5">{COMPANY_INFO.hours.sunday}</div>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#303030] text-xs leading-relaxed text-[#BDBDBD]">
              <span className="font-semibold text-white">
                Primary Hub: {COMPANY_INFO.coverageSummary.primaryHub}
              </span>{' '}
              · {COMPANY_INFO.coverageSummary.extendedNote}
            </div>
          </div>
        </FooterAccordion>
      </div>
    </div>
  );
}
