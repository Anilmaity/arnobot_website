'use client';

import { useState } from 'react';
import { OPEN_APPLICATION, OPEN_ROLES } from '@/data/careers';
import ResumeUpload from './ResumeUpload';

/** The listed roles in page order, then the catch-all. The value is what /api/career emails. */
const ROLES: ReadonlyArray<{ readonly value: string; readonly label: string }> = [
  ...OPEN_ROLES.map((role) => ({ value: role.slug, label: role.title })),
  { value: OPEN_APPLICATION.slug, label: OPEN_APPLICATION.title },
];

const EXPERIENCE: ReadonlyArray<{ readonly value: string; readonly label: string }> = [
  { value: 'fresher', label: 'Fresher / Student' },
  { value: '0-1', label: '0 – 1 years' },
  { value: '1-3', label: '1 – 3 years' },
  { value: '3-5', label: '3 – 5 years' },
  { value: '5+', label: '5+ years' },
];

/**
 * Career application form — port of the form in career.php.
 *
 * Posts multipart data to /api/career, which redirects back with `?success=1`
 * or `?error=…`, so it keeps working without JavaScript.
 *
 * `defaultRole` is the slug a role's Apply link carries in `?role=`; the
 * select opens on it when it names a listed role, and on the placeholder
 * otherwise.
 */
export default function CareerForm({ defaultRole }: { readonly defaultRole?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const preset = ROLES.some((role) => role.value === defaultRole) ? (defaultRole as string) : '';

  return (
    <form
      className="career-apply-form"
      action="/api/career"
      method="POST"
      encType="multipart/form-data"
      onSubmit={() => setSubmitting(true)}
    >
      <div className="career-field-row">
        <div className="career-field">
          <label htmlFor="car-name">
            Full Name <span className="required">*</span>
          </label>
          <input type="text" id="car-name" name="name" autoComplete="name" required />
        </div>
        <div className="career-field">
          <label htmlFor="car-email">
            Email Address <span className="required">*</span>
          </label>
          <input type="email" id="car-email" name="email" autoComplete="email" required />
        </div>
      </div>

      <div className="career-field-row">
        <div className="career-field">
          <label htmlFor="car-phone">Phone Number</label>
          <input type="tel" id="car-phone" name="phone" autoComplete="tel" />
        </div>
        <div className="career-field">
          <label htmlFor="car-role">
            Role Applying For <span className="required">*</span>
          </label>
          {/* Keyed on the preset so a new `?role=` remounts the uncontrolled select. */}
          <select id="car-role" name="role" required defaultValue={preset} key={preset}>
            <option value="" disabled>
              Select a position
            </option>
            {ROLES.map((role) => (
              <option value={role.value} key={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="career-field">
        <label htmlFor="car-experience">
          Years of Experience <span className="required">*</span>
        </label>
        <select id="car-experience" name="experience" required defaultValue="">
          <option value="" disabled>
            Select experience level
          </option>
          {EXPERIENCE.map((level) => (
            <option value={level.value} key={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      <div className="career-field">
        <label htmlFor="car-portfolio">Portfolio / LinkedIn / GitHub URL</label>
        <input type="url" id="car-portfolio" name="portfolio" autoComplete="url" />
      </div>

      <ResumeUpload />

      <div className="career-field">
        <label htmlFor="car-cover">
          Why ARNOBOT? <span className="required">*</span>
        </label>
        <textarea id="car-cover" name="cover" rows={4} required />
      </div>

      <button type="submit" className="btn btn-block" id="career-submit-btn" disabled={submitting} aria-busy={submitting}>
        {submitting ? (
          'Submitting…'
        ) : (
          <>
            Submit Application <span className="btn-arrow" aria-hidden="true">&rarr;</span>
          </>
        )}
      </button>

      <p className="career-form-note">
        We review every application personally. Expect to hear back within 5 business days.
      </p>
    </form>
  );
}
