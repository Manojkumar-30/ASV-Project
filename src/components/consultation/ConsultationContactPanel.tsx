import { motion, useReducedMotion } from 'motion/react';
import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import { DURATION, EASE_PREMIUM, VIEWPORT_ONCE } from '../../lib/motion';
import { ContactAction } from './ContactAction';
import { SocialLinks } from '../social/SocialLinks';
import { getSocial } from '../../data/socials';

export function ConsultationContactPanel() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DURATION.slow, delay: 0.14, ease: EASE_PREMIUM }}
      className="rounded-[22px] sm:rounded-[24px] border border-[#303030] bg-[#191919] divide-y divide-[#303030] overflow-hidden"
    >
      {/* Hidden on <lg where quick Call & WhatsApp buttons are already displayed below the heading */}
      <ContactAction
        icon={<Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />}
        label="Phone & International Desk"
        value={COMPANY_INFO.phoneDisplay}
        href={COMPANY_INFO.phoneHref}
        valueClassName="font-mono-nums"
        containerClassName="hidden lg:flex"
      />

      <ContactAction
        icon={<MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />}
        label="WhatsApp Support"
        value="Chat with Our Team"
        href={COMPANY_INFO.whatsappHref}
        external
        containerClassName="hidden lg:flex"
      />

      <ContactAction
        icon={<MapPin className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />}
        label="Bengaluru Office"
        value={`${COMPANY_INFO.address.full}.`}
        href={COMPANY_INFO.address.mapHref}
        external
        valueClassName="font-normal text-neutral-100 leading-relaxed"
      />

      <ContactAction
        icon={<Clock className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />}
        label="Office Hours"
        value={`${COMPANY_INFO.hours.weekdays}.`}
        secondaryValue={`${COMPANY_INFO.hours.sunday}.`}
        valueClassName="font-normal text-sm"
      />

      <div className="px-5 py-5 sm:px-6">
        <div className="mb-3 text-xs font-medium text-[#BDBDBD]">Connect with ASV</div>
        <SocialLinks
          platforms={['instagram', 'facebook', 'youtube', 'x', 'whatsapp', 'linkedin']}
          theme="dark"
        />
        <a
          href={getSocial('linktree').url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-white hover:text-[#ED1C24]"
        >
          View All Social Links
        </a>
      </div>
    </motion.div>
  );
}
