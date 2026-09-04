import type { Metadata } from 'next';
import { Fragment } from 'react';
import Link from 'next/link';
import CareerForm from '@/components/forms/CareerForm';
import FormAlert from '@/components/forms/FormAlert';
import { CheckCircleIcon, MailIcon, PhoneIcon, PinIcon } from '@/components/ui/Icons';
import { ROLE_COUNT, ROLE_GROUPS } from '@/data/careers';
import { HQ_ADDRESS_LINES, SITE } from '@/data/site';
import { cn } from '@/lib/dom';
import RolesList from './RolesList';
import styles from './open-positions.module.css';

export const metadata: Metadata = {
  title: 'Open Positions',
  description: `${ROLE_COUNT} open roles on the ARNOBOT engineering team in Ahmedabad — hardware, autonomy, research and commercial.`,
};

interface PageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** The still behind the hero — the assembly floor, the people the reader would join. */
const HERO_IMAGE = '/assets/images/designassmbly.webp';

/**
 * /career/open-positions — the application half of the careers section.
 *
 * The culture page (/career) makes the case and walks through the four
 * hiring steps; this page lists the roles behind one discipline filter and
 * holds the form. A role's Apply link comes back to this page with
 * `?role=<slug>#apply`, which preselects it.
 */
export default async function OpenPositionsPage({ searchParams }: PageProps) {
  const { success, error, role } = await searchParams;
  const applied = success !== undefined;
  const preselected = first(role);

  return (
    <main className={styles.page}>
      {/* 1 — Hero: a full screen over a still from the assembly floor, the
          same frame every other section page opens on. `data-header-theme`
          draws the header white over it; `data-cinematic-hero` is what the
          header measures to decide when to dock. */}
      <section
        className={cn('on-dark', 'section-screen', styles.hero, 'reveal')}
        id="open-positions-hero"
        data-cinematic-hero
        data-header-theme="dark"
      >
        <div className={styles.media} aria-hidden="true">
          <img src={HERO_IMAGE} alt="" />
          <div className={styles.scrim} />
        </div>
        <div className={styles.heroInner}>
          <div className="fade-up">
            <span className="eyebrow">Open roles</span>
            <h1 className={cn('hero-title', styles.heroTitle)}>{ROLE_COUNT} positions open</h1>
            <p className={cn('hero-lead', styles.heroLead)}>
              All based at the Ahmedabad workshop, where the robots are. Pick the one that fits and the form below will
              take it from there.
            </p>
            <ul className={cn('meta-line', styles.heroMeta)}>
              <li>Ahmedabad, India</li>
              <li>Full-time and internships</li>
              <li>{ROLE_GROUPS.length} disciplines</li>
            </ul>
            <div className={styles.heroActions}>
              <a href="#roles" className="btn btn-light">
                See the roles
              </a>
              <Link href="/career" className="btn btn-outline">
                Why join {SITE.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — The roles, behind one discipline filter */}
      <section className="section-screen is-auto reveal" id="roles">
        <div className={cn(styles.roles, 'fade-up')}>
          <RolesList />

          <div className={styles.rolesFoot}>
            <p className={styles.rolesFootText}>
              <strong>Nothing here fits?</strong>
              Send an open application and tell us what you would build. We hire for the person more often than for the
              posting.
            </p>
            <a href="#apply" className="btn">
              Open application
            </a>
          </div>
        </div>
      </section>

      {/* 3 — Apply */}
      <section className="section-screen is-auto is-wash reveal" id="apply">
        <div className={styles.applyGrid}>
          <div className={cn(styles.applyAside, 'fade-up')}>
            <span className="eyebrow">Apply</span>
            <h2 className={cn('section-title is-editorial', styles.applyTitle)}>Start your application</h2>
            <p className={cn('section-lead', styles.applyBody)}>
              Pick a role from the list above, or tell us what you would build. Either way it reaches the same three
              people.
            </p>

            <div className={styles.applyInfo}>
              <div className={styles.applyInfoItem}>
                <PhoneIcon size={18} />
                <span>{SITE.phone}</span>
              </div>
              <div className={styles.applyInfoItem}>
                <MailIcon size={18} />
                <span>{SITE.email}</span>
              </div>
              <div className={styles.applyInfoItem}>
                <PinIcon size={18} />
                <span>
                  {HQ_ADDRESS_LINES.map((line, index) => (
                    <Fragment key={line}>
                      {index > 0 ? <br /> : null}
                      {line}
                    </Fragment>
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* The form is replaced by the receipt once /api/career redirects back
              with ?success=1 — the two never need to be on screen together. */}
          <div className={cn(styles.formShell, 'fade-up', 'd1')}>
            {applied ? (
              <div className={styles.successPanel} role="status" aria-live="polite">
                <div className={styles.successIcon}>
                  <CheckCircleIcon size={56} strokeWidth="1.5" />
                </div>
                <h3 className={cn('section-title is-editorial', styles.successTitle)}>Application received</h3>
                <p className={cn('section-lead', styles.successBody)}>
                  Thank you for applying to {SITE.name}. Your details and resume are with the team — we will come back
                  to you within five business days.
                </p>
                <Link href="/career" className="btn btn-accent">
                  Back to careers
                </Link>
              </div>
            ) : (
              <>
                <FormAlert error={error} />
                <CareerForm defaultRole={preselected} />
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
