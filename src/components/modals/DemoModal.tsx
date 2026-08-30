'use client';

import { useCallback, useRef, useState, type FormEvent } from 'react';
import { cn } from '@/lib/dom';
import { PRODUCT_NAV } from '@/data/site';
import { useDelegatedClick } from '@/hooks/useDelegatedClick';
import { useModalDismiss } from '@/hooks/useModalDismiss';
import { CheckCircleIcon } from '@/components/ui/Icons';
import type { DemoResponse } from '@/app/api/schedule-demo/route';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const DEMO_PRODUCTS = PRODUCT_NAV.map((item) => item.label.replace('–', '-'));

/** A link opens the scheduler instead of navigating when it offers a demo. */
function isDemoTrigger(element: HTMLElement): boolean {
  const text = element.textContent?.toLowerCase() ?? '';
  return text.includes('demo') || text.includes('schedule');
}

/**
 * "Schedule a Live Demo" modal — port of `#demo-modal` and the inline submit
 * script at the end of includes/footer.php.
 *
 * The PHP page ran two competing submit handlers (one simulated success on a
 * timer, one posted for real). Only the real submission remains, and failures
 * now surface in an inline live region rather than a blocking `alert()`.
 */
export default function DemoModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useDelegatedClick('a[href*="/contact"]', (element, event) => {
    if (!isDemoTrigger(element)) return;
    event.preventDefault();
    formRef.current?.reset();
    setStatus('idle');
    setErrorMessage('');
    setOpen(true);
  });

  useModalDismiss(open, close, containerRef);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/schedule-demo', { method: 'POST', body: new FormData(form) });
      const result = (await response.json()) as DemoResponse;

      if (result.status) {
        form.reset();
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Unable to submit your request. Please try again.');
    }
  };

  const submitting = status === 'submitting';
  const succeeded = status === 'success';

  return (
    <div
      id="demo-modal"
      className={cn('industry-modal', open && 'active')}
      aria-hidden={!open}
      role="dialog"
      aria-modal={open}
      aria-labelledby="demo-modal-title"
    >
      <div className="industry-modal-overlay" onClick={close} />
      <div className="industry-modal-container" style={{ maxWidth: '650px' }} ref={containerRef}>
        <button
          type="button"
          className="industry-modal-close"
          id="demo-modal-close"
          aria-label="Close demo scheduler"
          onClick={close}
        >
          &times;
        </button>

        <div className="industry-modal-content">
          <h3
            className="russo modal-ind-title"
            id="demo-modal-title"
            style={{ textAlign: 'center', marginBottom: '58px' }}
          >
            Schedule a Live Demo
          </h3>

          <form
            id="demo-schedule-form"
            className="demo-form"
            action="/api/schedule-demo"
            method="POST"
            noValidate
            ref={formRef}
            onSubmit={onSubmit}
            style={succeeded ? { display: 'none' } : undefined}
          >
            <div className="demo-form-row">
              <div className="demo-field">
                <label htmlFor="demo-fname">
                  First Name <span className="required">*</span>
                </label>
                <input type="text" id="demo-fname" name="fname" autoComplete="given-name" required />
              </div>
              <div className="demo-field">
                <label htmlFor="demo-lname">
                  Last Name <span className="required">*</span>
                </label>
                <input type="text" id="demo-lname" name="lname" autoComplete="family-name" required />
              </div>
            </div>

            <div className="demo-form-row">
              <div className="demo-field">
                <label htmlFor="demo-email">
                  Business Email <span className="required">*</span>
                </label>
                <input type="email" id="demo-email" name="email" autoComplete="email" required />
              </div>
              <div className="demo-field">
                <label htmlFor="demo-phone">
                  Phone Number <span className="required">*</span>
                </label>
                <input type="tel" id="demo-phone" name="phone" autoComplete="tel" required />
              </div>
            </div>

            <div className="demo-form-row">
              <div className="demo-field">
                <label htmlFor="demo-company">
                  Company / Organisation <span className="required">*</span>
                </label>
                <input type="text" id="demo-company" name="company" autoComplete="organization" required />
              </div>
              <div className="demo-field">
                <label htmlFor="demo-job">
                  Job Title <span className="required">*</span>
                </label>
                <input type="text" id="demo-job" name="job" autoComplete="organization-title" required />
              </div>
            </div>

            <div className="demo-form-row">
              <div className="demo-field">
                <label htmlFor="demo-product">
                  Product of Interest <span className="required">*</span>
                </label>
                <select id="demo-product" name="product" required defaultValue="">
                  <option value="" disabled>
                    Select a robot platform...
                  </option>
                  {DEMO_PRODUCTS.map((product) => (
                    <option value={product} key={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>
              <div className="demo-field">
                <label htmlFor="demo-datetime">
                  Preferred Date &amp; Time <span className="required">*</span>
                </label>
                <input type="datetime-local" id="demo-datetime" name="datetime" required />
              </div>
            </div>

            <div className="demo-field">
              <label htmlFor="demo-message">Specific Requirements / Scope of Interest</label>
              <textarea id="demo-message" name="message" rows={4} />
            </div>

            <p role="alert" aria-live="polite" style={{ color: '#e53e3e', minHeight: '1em', textAlign: 'center' }}>
              {status === 'error' ? errorMessage : ''}
            </p>

            <div className="demo-submit-wrap" style={{ textAlign: 'center', marginTop: '24px' }}>
              <button
                type="submit"
                className="btn btn-cta-primary"
                id="demo-submit-btn"
                disabled={submitting}
                aria-busy={submitting}
                style={{
                  padding: '14px 44px',
                  fontSize: '16px',
                  ...(submitting ? { opacity: 0.65, cursor: 'progress' } : null),
                }}
              >
                {submitting ? (
                  'Sending...'
                ) : (
                  <>
                    Schedule Demo <span className="btn-arrow">&rarr;</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div
            id="demo-success"
            style={{
              display: succeeded ? 'flex' : 'none',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '20px',
              padding: '40px 20px',
            }}
          >
            <div
              className="contact-success-icon"
              style={{
                background: 'rgba(55, 94, 157, 0.15)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
              }}
            >
              <CheckCircleIcon size={40} />
            </div>
            <h3 className="russo" style={{ color: '#fff', fontSize: '24px' }}>
              Demo Scheduled!
            </h3>
            <p style={{ color: '#b0b4be', maxWidth: '450px', lineHeight: 1.6 }}>
              Thank you for your interest in ARNOBOT. A technical representative will reach out to you within 24 hours
              to confirm the scheduling details for your demo.
            </p>
            <button
              type="button"
              className="btn btn-blue"
              id="demo-success-close"
              onClick={close}
              style={{ marginTop: '10px', padding: '10px 24px', fontSize: '14px', borderRadius: '8px' }}
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
