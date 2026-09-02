import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import ContactForm from '@/components/forms/ContactForm';
import FormAlert from '@/components/forms/FormAlert';
import { CheckCircleIcon, MailIcon, PhoneIcon, PinIcon } from '@/components/ui/Icons';
import { HQ_ADDRESS_LINES, SITE } from '@/data/site';
import { cn } from '@/lib/dom';
import styles from './contact.module.css';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Have a project in mind? Reach out to the ARNOBOT team.',
};

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9!2d72.5307435!3d23.020647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e850d0bde37eb%3A0x3f979e2fb117d1f7!2sArnobot%20Private%20Limited!5e0!3m2!1sen!2sin!4v1756500000000!5m2!1sen!2sin';

/** Opens the office in the visitor's own maps app rather than the embed. */
const DIRECTIONS_URL =
  'https://www.google.com/maps/search/?api=1&query=Arnobot+Private+Limited%2C+Satellite+Road%2C+Ahmedabad';

/**
 * The address as this page shows it: the building on its own line, the rest of
 * the postal address on the next. Derived from SITE so it cannot drift.
 */
const ADDRESS_LINES: readonly string[] = [
  HQ_ADDRESS_LINES[0],
  HQ_ADDRESS_LINES.slice(1).join(' '),
];

/** `tel:` needs the digits only; the displayed number keeps its spacing. */
const TEL_HREF = `tel:${SITE.phone.replace(/[^+\d]/g, '')}`;

/** The three facts a visitor scans for before reading anything else. */
const HERO_META: ReadonlyArray<{ readonly label: string; readonly value: string }> = [
  { label: 'Response time', value: 'Within one business day' },
  { label: 'Office hours', value: SITE.officeHours },
  { label: 'Headquarters', value: 'Ahmedabad, India' },
];

const CHANNELS: ReadonlyArray<{
  readonly icon: ReactNode;
  readonly name: string;
  readonly value: string;
  readonly href?: string;
  readonly note: string;
}> = [
  {
    icon: <PhoneIcon size={24} />,
    name: 'Call Us',
    value: SITE.phone,
    href: TEL_HREF,
    note: SITE.officeHours,
  },
  {
    icon: <MailIcon size={24} />,
    name: 'Email Us',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    note: 'We reply within 24 hours',
  },
  {
    icon: <PinIcon size={24} />,
    name: 'Visit Us',
    // City only. The postal address sits beside the map, which is where this jumps to.
    value: 'Ahmedabad, Gujarat',
    href: '#contact-visit',
    note: 'Site visits by prior appointment',
  },
];

/** What happens to a message after it is sent — the rail beside the form. */
const NEXT_STEPS: ReadonlyArray<{ readonly name: string; readonly body: string }> = [
  {
    name: 'It reaches an engineer',
    body: 'Enquiries go to the team that owns the platform you asked about, not to a shared inbox.',
  },
  {
    name: 'We ask the few things we need',
    body: 'Terrain, payload, duty cycle and timeline are usually enough for us to say what is realistic.',
  },
  {
    name: 'You get a straight answer',
    body: 'A written reply within one business day, and a call or a demo booked from there if it helps.',
  },
];

interface PageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/** Port of contact.php, redesigned around the technology page's layout system. */
export default async function ContactPage({ searchParams }: PageProps) {
  const { success, error } = await searchParams;
  const sent = success !== undefined;

  return (
    <main className={styles.page}>
      {/* `data-cinematic-hero` is what Header measures to decide when to dock. */}
      <section
        className={cn('on-dark', styles.hero, 'reveal')}
        id="contact-hero"
        data-cinematic-hero
        data-header-theme="dark"
      >
        <div className={styles.heroMedia} aria-hidden="true" />
        <div className={styles.heroScrim} aria-hidden="true" />

        <div className={styles.heroInner}>
          <span className="eyebrow">Get in touch</span>
          <h1 className="hero-title">
            Let&apos;s build the future together
          </h1>
          <p className="hero-lead">
            Tell us about the environment, the task, and the risk you would rather not put a person in.
            Our engineering team will tell you plainly whether a robot belongs there — and which one.
          </p>

          <div className={styles.heroActions}>
            <a className="btn btn-accent" href="#enquiry">
              Send a message{' '}
              <span className="btn-arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
            <a className="btn btn-outline" href={TEL_HREF}>
              {SITE.phone}
            </a>
          </div>

          <div className={styles.heroMeta}>
            {HERO_META.map((item) => (
              <div key={item.label}>
                <span className={styles.metaLabel}>{item.label}</span>
                <span className={styles.metaValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={cn(styles.section, 'reveal')} id="contact-channels">
        <div className={styles.inner}>
          <div className={cn('section-head', 'is-centered', styles.sectionHead, styles.fadeUp)}>
            <span className="eyebrow">Direct lines</span>
            <h2 className={styles.sectionTitle}>Reach the right desk</h2>
            <p className={styles.sectionLead}>
              Three ways in, all of them monitored by the people who would actually work on your
              deployment. Pick whichever suits the question.
            </p>
          </div>

          <ul className={cn(styles.channels, styles.fadeUp, styles.d1)}>
            {CHANNELS.map((channel, index) => (
              <li className={styles.channel} key={channel.name}>
                <span className={styles.channelTop}>
                  <span className={styles.channelIcon}>{channel.icon}</span>
                  <span className={styles.channelIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </span>
                <div className={styles.channelBody}>
                  <h3 className={styles.channelName}>{channel.name}</h3>
                  {channel.href ? (
                    <a className={styles.channelValue} href={channel.href}>
                      {channel.value}
                    </a>
                  ) : (
                    <span className={styles.channelValue}>{channel.value}</span>
                  )}
                </div>
                <span className={styles.channelNote}>{channel.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={cn(styles.sectionTintTight, 'reveal')} id="enquiry">
        <div className={styles.inner}>
          <div className={styles.enquiryGrid}>
            <div className={styles.rail}>
              <div className={styles.fadeUp}>
                <span className="eyebrow">Send a message</span>
                <h2 className={styles.sectionTitle}>How can we help?</h2>
                <p className={styles.sectionLead}>
                  One form, whatever the enquiry — the routing happens on our side.
                </p>
              </div>

              <ol className={cn(styles.steps, styles.fadeUp, styles.d1)}>
                {NEXT_STEPS.map((step, index) => (
                  <li className={styles.step} key={step.name}>
                    <span className={styles.stepIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <span className={styles.stepName}>{step.name}</span>
                      <span className={styles.stepBody}>{step.body}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <p className={cn(styles.railNote, styles.fadeUp, styles.d2)}>
                Would rather write your own email? <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
            </div>

            {sent ? (
              <div className={cn(styles.success, styles.fadeUp, styles.d1)} aria-live="polite">
                <span className={styles.successIcon}>
                  <CheckCircleIcon size={32} />
                </span>
                <h3 className={styles.successTitle}>Message sent</h3>
                <p className={styles.successBody}>
                  Thank you for reaching out to ARNOBOT. Your enquiry is with the right team and you
                  will have a reply within one business day.
                </p>
                <Link className="btn btn-accent" href="/contact">
                  Send another message
                </Link>
              </div>
            ) : (
              <div className={cn(styles.formCard, styles.fadeUp, styles.d1)}>
                <FormAlert error={error} />
                <ContactForm />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={cn(styles.sectionTight, styles.visit, 'reveal')} id="contact-visit">
        <div className={styles.inner}>
          <div className={cn(styles.sectionHead, styles.fadeUp)}>
            <span className="eyebrow">Find us</span>
            <h2 className={styles.sectionTitle}>Visit the Ahmedabad office</h2>
            <p className={styles.sectionLead}>
              Design, electronics and prototyping share one building, so a visit means meeting the
              people who build the machine, not a sales desk.
            </p>
          </div>

          <div className={cn(styles.visitGrid, styles.fadeUp, styles.d1)}>
            <div className={styles.mapFrame}>
              <iframe
                id="contact-map-iframe"
                title="Arnobot Private Limited – Ambawadi, Ahmedabad"
                src={MAP_SRC}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className={cn('on-dark', styles.visitCard)}>
              <span className="eyebrow">Head office</span>
              <h3 className={styles.visitName}>{SITE.name} Private Limited</h3>
              <p className={styles.visitAddress}>
                {ADDRESS_LINES.map((line, index) => (
                  <span key={line}>
                    {index > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>

              <ul className={styles.visitRows}>
                <li className={styles.visitRow}>
                  <span className={styles.visitRowLabel}>Office hours</span>
                  <span className={styles.visitRowValue}>{SITE.officeHours}</span>
                </li>
                <li className={styles.visitRow}>
                  <span className={styles.visitRowLabel}>Phone</span>
                  <a className={styles.visitRowValue} href={TEL_HREF}>
                    {SITE.phone}
                  </a>
                </li>
                <li className={styles.visitRow}>
                  <span className={styles.visitRowLabel}>Email</span>
                  <a className={styles.visitRowValue} href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </li>
              </ul>

              <div className={styles.visitFoot}>
                <a className="btn btn-light" href={DIRECTIONS_URL} target="_blank" rel="noreferrer">
                  Get directions{' '}
                  <span className="btn-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
