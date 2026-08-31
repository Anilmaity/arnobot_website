'use client';

import Script from 'next/script';
import { useEffect, useRef, useState, type FormEvent } from 'react';

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
 * Contact form — port of the form in contact.php plus its inline reCAPTCHA guard.
 *
 * It still performs a real POST (now to /api/contact) which redirects back to
 * /contact?success=1 or ?error=…, so it keeps working without JavaScript.
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
      <form className="contact-form" id="contact-form" action="/api/contact" method="POST" onSubmit={onSubmit}>
        <div className="contact-form-row">
          <div className="contact-field">
            <label htmlFor="cf-fname">
              First Name <span className="required">*</span>
            </label>
            <input type="text" id="cf-fname" name="fname" autoComplete="given-name" required />
          </div>
          <div className="contact-field">
            <label htmlFor="cf-lname">
              Last Name <span className="required">*</span>
            </label>
            <input type="text" id="cf-lname" name="lname" autoComplete="family-name" required />
          </div>
        </div>

        <div className="contact-form-row">
          <div className="contact-field">
            <label htmlFor="cf-email">
              Email Address <span className="required">*</span>
            </label>
            <input type="email" id="cf-email" name="email" autoComplete="email" required />
          </div>
          <div className="contact-field">
            <label htmlFor="cf-phone">Phone Number</label>
            <input type="tel" id="cf-phone" name="phone" autoComplete="tel" />
          </div>
        </div>

        <div className="contact-form-row">
          <div className="contact-field">
            <label htmlFor="cf-job">
              Designation <span className="required">*</span>
            </label>
            <input type="text" id="cf-job" name="job" autoComplete="organization-title" required />
          </div>
          <div className="contact-field">
            <label htmlFor="cf-country">Country</label>
            <input type="text" id="cf-country" name="country" autoComplete="country-name" />
          </div>
        </div>

        <div className="contact-field">
          <label htmlFor="cf-purpose">Inquiry</label>
          <select id="cf-purpose" name="purpose" required defaultValue={INQUIRY_OPTIONS[0]}>
            {INQUIRY_OPTIONS.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="contact-field">
          <label htmlFor="cf-message">
            Message <span className="required">*</span>
          </label>
          <textarea id="cf-message" name="message" rows={5} required />
        </div>

        <div className="contact-field">
          <div className="g-recaptcha" data-sitekey={RECAPTCHA_SITE_KEY} ref={captchaRef} suppressHydrationWarning />
        </div>

        <div id="captcha-error" className="captcha-error" style={{ color: 'red' }} role="alert" aria-live="assertive">
          {captchaError}
        </div>

        <button
          type="submit"
          className="btn contact-submit-btn"
          id="contact-submit-btn"
          disabled={submitting}
          aria-busy={submitting}
          style={submitting ? { opacity: 0.65, cursor: 'progress' } : undefined}
        >
          {submitting ? (
            'Sending…'
          ) : (
            <>
              Send Message <span className="btn-arrow">→</span>
            </>
          )}
        </button>

        <p className="contact-form-note">We respect your privacy. Your information is never shared.</p>
      </form>

      <Script src="https://www.google.com/recaptcha/api.js" strategy="afterInteractive" />
    </>
  );
}
