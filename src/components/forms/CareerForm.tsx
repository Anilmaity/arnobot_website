'use client';

import { useState } from 'react';
import ResumeUpload from './ResumeUpload';

const ROLES: ReadonlyArray<{ readonly value: string; readonly label: string }> = [
  { value: 'robotics-engineer', label: 'Robotics Engineer' },
  { value: 'embedded-developer', label: 'Embedded Systems Developer' },
  { value: 'computer-vision', label: 'Computer Vision Engineer' },
  { value: 'autonomy-engineer', label: 'Autonomy Engineer' },
  { value: 'ai-intern', label: 'AI Research Intern' },
  { value: 'business-dev', label: 'Business Development Manager' },
  { value: 'open-application', label: 'Open Application (Any Role)' },
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
 */
export default function CareerForm() {
  const [submitting, setSubmitting] = useState(false);

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
          <select id="car-role" name="role" required defaultValue="">
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

      <button
        type="submit"
        className="btn career-submit-btn"
        id="career-submit-btn"
        disabled={submitting}
        aria-busy={submitting}
        style={submitting ? { opacity: 0.65, cursor: 'progress' } : undefined}
      >
        {submitting ? (
          'Submitting…'
        ) : (
          <>
            Submit Application <span className="btn-arrow">→</span>
          </>
        )}
      </button>

      <p className="career-form-note">
        We review every application personally. Expect to hear back within 5 business days.
      </p>
    </form>
  );
}
