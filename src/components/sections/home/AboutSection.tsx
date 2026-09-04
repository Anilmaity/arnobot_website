import Link from 'next/link';
import RadarRings from '@/components/svg/RadarRings';

export default function AboutSection() {
  return (
    <section className="about reveal" id="about">
      <div className="about-grid">
        <div className="about-images">
          <RadarRings />
          {/* Cut-out of the team around SAIBYA — the alpha is what lets the
              radar rings read behind it, so this stays a transparent WebP. */}
          <img
            className="about-img"
            src="/assets/images/about-team.webp"
            alt="The ARNOBOT team assembling a SAIBYA unmanned ground vehicle"
          />
        </div>

        <div className="about-copy">
          <span className="eyebrow">About Company</span>
          <h2 className="section-title">Who We Are?</h2>
          {/* The copy is justified. The soft hyphens (&shy;) mark where a long word may
              break at a line end; they are invisible unless the browser actually breaks
              there. Placed by hand because automatic hyphenation depends on a language
              dictionary Chrome only downloads lazily, so it silently does nothing on a
              fresh install and the justified lines fill with gaps instead. The wording
              itself was tuned against measured line breaks at twenty viewport widths from 360 to 2560px, so
              rephrase with care: a longer or shorter word can reopen the gaps. */}
          <p>
            Arnobot Private Limited is an inno&shy;va&shy;tive robot&shy;ics and auto&shy;ma&shy;tion
            com&shy;pany dedi&shy;cated to build&shy;ing ad&shy;vanced un&shy;manned sys&shy;tems for
            de&shy;fence, in&shy;dus&shy;trial, mari&shy;time, and criti&shy;cal infra&shy;struc&shy;ture needs.
          </p>
          <p>
            Founded in 2024 and based in Ahmed&shy;abad, India, we design and manu&shy;fac&shy;ture
            intel&shy;li&shy;gent robotic solu&shy;tions, and develop custom&shy;ized tech&shy;nolo&shy;gies to
            meet cus&shy;tomer, in&shy;dus&shy;trial, and de&shy;fence needs.
          </p>
          <Link className="btn" href="/about">
            Discover More <span className="btn-arrow" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
