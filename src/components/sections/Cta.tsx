import Link from 'next/link';
import type { ReactNode } from 'react';

interface CtaProps {
  /** Defaults to the "Ready to automate hazardous operations?" heading. */
  readonly heading?: ReactNode;
  readonly sub?: string;
  /** `null` drops the inline size the industries page omitted. */
  readonly primaryFontSize?: string | null;
}

/**
 * The closing CTA band every page repeated verbatim, with props for the two
 * pages that varied the copy or the inline font size.
 */
export default function Cta({ heading, sub, primaryFontSize = '12px' }: CtaProps) {
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
          <Link
            href="/contact"
            className="btn btn-cta-primary"
            style={primaryFontSize ? { fontSize: primaryFontSize } : undefined}
          >
            Schedule a Demo <span className="btn-arrow">&rarr;</span>
          </Link>
          <Link href="/contact" className="btn">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
