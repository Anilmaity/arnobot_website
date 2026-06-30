import { JOBS } from '@/lib/data';
import Reveal from './Reveal';
import { ArrowRight } from './icons';

// Internal route to the hiring assistant (lives in the same Next.js app).
const APPLY_URL = '/apply';

export default function Careers() {
  return (
    <section id="careers" className="section-dark" style={{ paddingTop: 0 }}>
      <div className="wrap" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 80 }}>
        <div className="careers-intro">
          <Reveal>
            <div className="eyebrow light">Join the Team</div>
            <h2 className="display-xl" style={{ color: 'var(--white)' }}>
              Build robots that matter.
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="body-copy light">
              We&apos;re looking for engineers, designers, and builders who want to work on machines that operate where
              humans can&apos;t.
            </p>
            <a
              href={APPLY_URL}
              className="btn-hero-primary"
              style={{ marginTop: 28 }}
            >
              Apply Now
            </a>
          </Reveal>
        </div>
        <Reveal className="jobs-list">
          {JOBS.map((j) => (
            <a key={j.title} href={APPLY_URL} className="job-row" style={{ textDecoration: 'none' }}>
              <div>
                <div className="job-title">{j.title}</div>
                <div className="job-meta">
                  <span className="job-chip">{j.dept}</span>
                  <span className="job-chip">{j.type}</span>
                  <span className="job-chip">{j.loc}</span>
                </div>
              </div>
              <span className="job-arrow">
                <ArrowRight size={18} />
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
