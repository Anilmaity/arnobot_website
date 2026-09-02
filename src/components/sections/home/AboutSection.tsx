import Link from 'next/link';
import RadarRings from '@/components/svg/RadarRings';

export default function AboutSection() {
  return (
    <section className="about reveal" id="about">
      <div className="about-grid">
        <div className="about-images">
          <RadarRings />
          <img className="about-img" src="/assets/images/abtt.png" alt="ARNOBOT robotics team" />
        </div>

        <div className="about-copy">
          <span className="eyebrow">About Company</span>
          <h2 className="section-title">Who We Are?</h2>
          <p>
            Arnobot Private Limited is an innovative robotics and automation company dedicated to developing advanced
            unmanned systems for defence, industrial, maritime, and critical infrastructure applications.
          </p>
          <p>
            Founded in 2024 and headquartered in Ahmedabad, India, we specialize in designing and manufacturing
            intelligent robotic solutions, researching and developing customized technologies tailored to customer,
            industrial, and defence needs.
          </p>
          <Link className="btn" href="/about">
            Discover More <span className="btn-arrow" aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
