import { resolveAssetUrl } from '../lib/assetUrl';
import { getSocial } from './socials';

export const COMPANY_INFO = {
  brandName: 'ASV Property Management',
  shortName: 'ASV',
  founderOrRepresentative: 'Venkatesh N.',
  website: getSocial('website').url,
  logoPath: resolveAssetUrl('/assets/aistudio/image_a97eb82e.png'),
  youtubeChannelId: 'UCAeG716AYl4M5QXXxsXWa2w',
  youtubeChannelUrl: getSocial('youtube').url,
  phoneDisplay: '+91 74110 01523',
  phoneHref: 'tel:+917411001523',
  whatsappHref: getSocial('whatsapp').url,
  address: {
    line1: '2nd Floor, Ambika Corner',
    line2: 'East of NGEF Layout, Kasturi Nagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    postalCode: '560043',
    country: 'India',
    full: '2nd Floor, Ambika Corner, East of NGEF Layout, Kasturi Nagar, Bengaluru, Karnataka 560043',
    mapHref:
      'https://www.google.com/maps/search/?api=1&query=2nd+Floor,+Ambika+Corner,+East+of+NGEF+Layout,+Kasturi+Nagar,+Bengaluru,+Karnataka+560043',
  },
  hours: {
    weekdays: 'Monday – Saturday: 8:00 AM – 8:00 PM IST',
    sunday: 'Sunday: 8:00 AM – 3:00 PM IST',
  },
  coverageSummary: {
    primaryHub: 'Bengaluru',
    extendedNote: 'Chennai and Hyderabad coverage confirmed on enquiry.',
  },
  locations: [
    {
      city: 'Bengaluru',
      status: 'Primary Operations Hub',
      note: 'Kasturi Nagar office serving East, North, Central & South Bengaluru residential corridors.',
    },
    {
      city: 'Chennai',
      status: 'Service Availability — Confirm Coverage',
      note: 'Referenced on existing ASV materials; confirm active local team availability for your micro-market during consultation.',
    },
    {
      city: 'Hyderabad',
      status: 'Service Availability — Confirm Coverage',
      note: 'Referenced on existing ASV materials; confirm active local team availability for your micro-market during consultation.',
    },
  ],
  unverifiedItemsNotice: [
    'Official corporate email address (enquiries submitted via the form are routed to our intake workflow).',
    'Branch office street addresses in Chennai and Hyderabad.',
    'Applicable GST rate and formal cancellation/exit fee schedules are confirmed in writing within each Property Management Proposal.',
  ],
} as const;

