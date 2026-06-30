import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import { PanelIntelligence, PanelRuggedness } from '@/components/Panels';
import Products from '@/components/Products';
import Technology from '@/components/Technology';
import Industries from '@/components/Industries';
import Comparison from '@/components/Comparison';
import Company from '@/components/Company';
import Careers from '@/components/Careers';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <PanelIntelligence />
      <PanelRuggedness />

      <section id="products" style={{ background: 'var(--black)', padding: '120px 0 0' }}>
        <div className="wrap">
          <Reveal className="products-intro">
            <div>
              <div className="eyebrow light">Our Robots</div>
              <h2 className="display-xl" style={{ color: 'var(--white)' }}>
                Advanced ground systems for any mission.
              </h2>
            </div>
            <p className="body-copy light" style={{ marginBottom: 0 }}>
              ARNOBOT develops rugged, intelligent robots engineered for extreme reliability in defence, industrial
              inspection, and hazardous environments.
            </p>
          </Reveal>
        </div>
        <Products />
      </section>

      <Technology />
      <Industries />
      <Comparison />
      <Company />
      <Careers />
      <Contact />
      <Footer />
    </>
  );
}
