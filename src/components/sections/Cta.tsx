import Link from 'next/link';
import type { ReactNode } from 'react';

interface CtaProps {
  /** Defaults to the "Ready to automate hazardous operations?" heading. */
  readonly heading?: ReactNode;
  readonly sub?: string;
}

/**
 * The closing CTA band every page repeated verbatim, with props for the two
 * pages that varied the copy or the inline font size.
 */
export default function Cta({ heading, sub }: CtaProps) {
  return (
    <section className="cta reveal" id="cta">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="russo">
            {heading ?? (
              <>
                Ready to automate
                <br />
                <span className="highlight">hazardous operations?</span>
              </>
            )}
          </h2>
          <p className="cta-sub">
            {sub ?? "Let's build the future of safe and intelligent operations together."}
          </p>
        </div>
        <div className="cta-actions">
          <Link href="/contact" className="btn btn-accent">
            Schedule a Demo <span className="btn-arrow" aria-hidden="true">&rarr;</span>
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
