import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import ContactForm from '@/components/forms/ContactForm';
import FormAlert from '@/components/forms/FormAlert';
import { CheckCircleIcon, MailIcon, PhoneIcon, PinIcon } from '@/components/ui/Icons';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Have a project in mind? Reach out to the ARNOBOT team.',
};

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9!2d72.5307435!3d23.020647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e850d0bde37eb%3A0x3f979e2fb117d1f7!2sArnobot%20Private%20Limited!5e0!3m2!1sen!2sin!4v1756500000000!5m2!1sen!2sin';

const INFO_CARDS: ReadonlyArray<{
  readonly icon: ReactNode;
  readonly title: string;
  readonly value: string;
  readonly note: string;
}> = [
  { icon: <PhoneIcon size={28} />, title: 'Call Us', value: SITE.phone, note: SITE.officeHours },
  { icon: <MailIcon size={28} />, title: 'Email Us', value: SITE.email, note: 'We reply within 24 hours' },
  {
    icon: <PinIcon size={28} />,
    title: 'Visit Us',
    value: SITE.addressLines[0] ?? '',
    // Every line after the first, so a change to addressLines cannot silently
    // drop part of the address here.
    note: SITE.addressLines.slice(1).join(' '),
  },
];

interface PageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/** Port of contact.php */
export default async function ContactPage({ searchParams }: PageProps) {
  const { success, error } = await searchParams;

  return (
    <main>
      <section className="contact-hero" id="contact-hero" data-cinematic-hero>
        <div className="contact-hero-container">
          <div className="contact-hero-content">
            <span className="eyebrow">Get In Touch</span>
            <h1 className="russo">
              Let&apos;s Build the
              <br />
              Future Together
            </h1>
          </div>
        </div>
      </section>

      <section className="contact-info reveal" id="contact-info">
        <div className="contact-info-container">
          <div className="contact-info-grid">
            {INFO_CARDS.map((card) => (
              <div className="contact-info-card" key={card.title}>
                <div className="contact-info-icon">{card.icon}</div>
                <div className="contact-info-details">
                  <h3 className="russo">{card.title}</h3>
                  <p>{card.value}</p>
                  <span className="contact-info-label">{card.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-main reveal" id="contact-main">
        <div className="contact-main-container">
          <div className="contact-form-wrap">
            <span className="eyebrow">Send a Message</span>
            <h2 className="russo contact-form-title">How Can We Help?</h2>
            <p className="contact-form-desc">
              Fill in the form and our team will get back to you within one business day.
            </p>

            <FormAlert success={success} error={error} />

            <ContactForm />

            {/* Styled by style.css; shown by the theme once a submission succeeds. */}
            <div className="contact-success" id="contact-success" aria-live="polite">
              <div className="contact-success-icon">
                <CheckCircleIcon size={48} />
              </div>
              <h3 className="russo">Message Sent!</h3>
              <p>Thank you for reaching out. Our team will respond within one business day.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-map-section reveal" id="contact-map-section">
        <div className="contact-map-full">
          <iframe
            id="contact-map-iframe"
            title="Arnobot Private Limited – Ambawadi, Ahmedabad"
            src={MAP_SRC}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
