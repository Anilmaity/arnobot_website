import type { Route } from 'next';

/** Single source of truth for contact details and navigation. */
export const SITE = {
  name: 'ARNOBOT',
  tagline: 'ROBOTICS REDEFINED',
  title: 'ARNOBOT - Building Autonomous Systems for Industry',
  description:
    'Autonomous robotic platforms for defence, industrial inspection, maritime and critical infrastructure operations.',
  phone: '+91 9925512860',
  email: 'contact@arnobot.in',
  addressLines: ['G-2, Parul Apartments,', 'Satellite Road,', 'Ahmedabad – 380015, India'],
  officeHours: 'Mon – Sat, 9 AM – 6 PM IST',
  copyright: '© 2026 ARNOBOT. ALL RIGHTS RESERVED.',
} as const;

export interface NavLink {
  readonly href: Route;
  readonly label: string;
  /** Lower-case label used by the mobile drawer. */
  readonly mobileLabel: string;
}

export const PRIMARY_NAV: readonly NavLink[] = [
  { href: '/technology', label: 'TECHNOLOGY', mobileLabel: 'Technology' },
  { href: '/about', label: 'COMPANY', mobileLabel: 'Company' },
];

export const SECONDARY_NAV: readonly NavLink[] = [
  { href: '/career', label: 'CAREERS', mobileLabel: 'Careers' },
  { href: '/contact', label: 'CONTACT US', mobileLabel: 'Contact Us' },
];

export const PRODUCT_NAV: ReadonlyArray<{ readonly href: Route; readonly label: string }> = [
  { href: '/product?id=saibya', label: 'SAIBYA – UGV' },
  { href: '/product?id=nexus', label: 'NEXUS – Tactical' },
  { href: '/product?id=altius', label: 'ALTIUS – Climbing' },
  { href: '/product?id=atm', label: 'ATM – Any Terrain Machine' },
];

export const FOOTER_LINKS: readonly NavLink[] = [
  { href: '/privacy-policy', label: 'Privacy Policy', mobileLabel: 'Privacy Policy' },
  { href: '/terms-conditions', label: 'Terms and Condition', mobileLabel: 'Terms and Condition' },
];

/** The footer's link columns, in render order. */
export const FOOTER_NAV: ReadonlyArray<{
  readonly heading: string;
  readonly links: ReadonlyArray<{ readonly href: Route; readonly label: string }>;
}> = [
  {
    heading: 'Products',
    links: [
      { href: '/product?id=saibya', label: 'SAIBYA' },
      { href: '/product?id=nexus', label: 'NEXUS' },
      { href: '/product?id=altius', label: 'ALTIUS' },
      { href: '/product?id=atm', label: 'ATM' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/technology', label: 'Technology' },
      { href: '/industries', label: 'Industries' },
      { href: '/career', label: 'Careers' },
    ],
  },
  {
    heading: 'Quick Links',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-conditions', label: 'Terms and Condition' },
    ],
  },
];

export const SOCIAL_LINKS: ReadonlyArray<{ readonly icon: string; readonly label: string }> = [
  { icon: '/assets/icons/linkedin.png', label: 'LinkedIn' },
  { icon: '/assets/icons/instam.png', label: 'Instagram' },
  { icon: '/assets/icons/youtube.png', label: 'Youtube' },
];
