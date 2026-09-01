'use client';

import Script from 'next/script';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import styles from './ContactForm.module.css';

/**
 * The production key is registered against arnobot.in only, so on localhost the
 * widget refuses to render with "Localhost is not in the list of supported
 * domains for this site key". Google publishes a test pair that is accepted on
 * every domain and always passes verification, which is what development gets.
 *
 * https://developers.google.com/recaptcha/docs/faq#localhost
 *
 * Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY to override either default. To exercise
 * the real key locally instead, add `localhost` to the key's domain list in the
 * reCAPTCHA admin console — the test key is only a development convenience, and
 * a form guarded by it is NOT actually protected.
 */
const GOOGLE_TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
const ARNOBOT_SITE_KEY = '6LeOIUEtAAAAAI7RDLFBKe0dMjemzaf1rbovBZ9Q';

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ??
  (process.env.NODE_ENV === 'development' ? GOOGLE_TEST_SITE_KEY : ARNOBOT_SITE_KEY);

const INQUIRY_OPTIONS = [
  'Schedule a Consultation',
  'Request a Demo',
  'Book Site Assessment',
  'Partnership / Distribution',
  'Defence Procurement',
  'General Inquiry',
] as const;

interface ReCaptcha {
  render: (container: HTMLElement, options: { sitekey: string }) => number;
  getResponse: (widgetId?: number) => string;
  /** Present once the API has finished loading; runs the callback when ready. */
  ready?: (callback: () => void) => void;
}

declare global {
  interface Window {
    grecaptcha?: ReCaptcha;
  }
}

/**
 * Contact form — the fields of the form in contact.php plus its inline
 * reCAPTCHA guard, restyled with the contact page's design language.
 *
 * It still performs a real POST (now to /api/contact) which redirects back to
 * /contact?success=1 or ?error=…, so it keeps working without JavaScript. The
 * inquiry router is a radio group rather than a <select> for the same reason:
 * every route is visible, and `:checked` needs no script.
 */
export default function ContactForm() {
  const captchaRef = useRef<HTMLDivElement>(null);
  const [captchaError, setCaptchaError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  /**
   * Arriving via a client-side navigation means the reCAPTCHA script has already
   * run and will not auto-render again, so render the widget explicitly.
   */
  useEffect(() => {
    let cancelled = false;

    const render = () => {
      if (cancelled) return;
      const container = captchaRef.current;
      // The API auto-renders `.g-recaptcha` on first load; only step in if it did not.
      if (!container || container.childElementCount > 0) return;
      if (typeof window.grecaptcha?.render !== 'function') return;
      try {
        window.grecaptcha.render(container, { sitekey: RECAPTCHA_SITE_KEY });
      } catch {
        // Already rendered by the auto-loader.
      }
    };

    // `grecaptcha.ready` is the documented "API is usable now" hook; the interval
    // is the fallback for the window before the script has defined it at all.
    const whenReady = () => window.grecaptcha?.ready?.(render) ?? render();
    whenReady();

    const timer = window.setInterval(whenReady, 250);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const token = window.grecaptcha?.getResponse?.() ?? '';

    if (!token) {
      event.preventDefault();
      setCaptchaError('Please verify that you are not a robot.');
      return;
    }

    setCaptchaError('');
    setSubmitting(true);
  };

  return (
    <>
      <form className={styles.form} id="contact-form" action="/api/contact" method="POST" onSubmit={onSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="cf-fname">
              First Name <span className={styles.required}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              id="cf-fname"
              name="fname"
              autoComplete="given-name"
              placeholder="Ananya"
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="cf-lname">
              Last Name <span className={styles.required}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              id="cf-lname"
              name="lname"
              autoComplete="family-name"
              placeholder="Sharma"
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="cf-email">
              Email Address <span className={styles.required}>*</span>
            </label>
            <input
              className={styles.input}
              type="email"
              id="cf-email"
              name="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="cf-phone">
              Phone Number <span className={styles.optional}>(optional)</span>
            </label>
            <input
              className={styles.input}
              type="tel"
              id="cf-phone"
              name="phone"
              autoComplete="tel"
              placeholder="+91 00000 00000"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="cf-job">
              Designation <span className={styles.required}>*</span>
            </label>
            <input
              className={styles.input}
              type="text"
              id="cf-job"
              name="job"
              autoComplete="organization-title"
              placeholder="Head of Operations, Acme Energy"
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="cf-country">
              Country <span className={styles.optional}>(optional)</span>
            </label>
            <input
              className={styles.input}
              type="text"
              id="cf-country"
              name="country"
              autoComplete="country-name"
              placeholder="India"
            />
          </div>
        </div>

        <fieldset className={styles.purpose}>
          <legend className={styles.legend}>What is this about?</legend>
          <div className={styles.chips}>
            {INQUIRY_OPTIONS.map((option, index) => (
              <span className={styles.chip} key={option}>
                <input
                  type="radio"
                  id={`cf-purpose-${index}`}
                  name="purpose"
                  value={option}
                  defaultChecked={index === 0}
                  required
                />
                <label className={styles.chipLabel} htmlFor={`cf-purpose-${index}`}>
                  {option}
                </label>
              </span>
            ))}
          </div>
        </fieldset>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="cf-message">
            Message <span className={styles.required}>*</span>
          </label>
          <textarea
            className={styles.textarea}
            id="cf-message"
            name="message"
            rows={4}
            placeholder="Where the robot would work, what it would do, and the timeline you have in mind."
            required
          />
        </div>

        <div className={styles.captcha}>
          <div className="g-recaptcha" data-sitekey={RECAPTCHA_SITE_KEY} ref={captchaRef} suppressHydrationWarning />
        </div>

        <p id="captcha-error" className={styles.captchaError} role="alert" aria-live="assertive">
          {captchaError}
        </p>

        <div className={styles.actions}>
          <button type="submit" className={styles.submit} id="contact-submit-btn" disabled={submitting} aria-busy={submitting}>
            {submitting ? (
              'Sending…'
            ) : (
              <>
                Send Message <span className={styles.arrow}>&rarr;</span>
              </>
            )}
          </button>

          <p className={styles.note}>We respect your privacy. Your information is never shared.</p>
        </div>
      </form>

      <Script src="https://www.google.com/recaptcha/api.js" strategy="afterInteractive" />
    </>
  );
}
