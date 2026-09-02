import Link from 'next/link';
import type { ProductId } from '@/types';

/* Each card opens its own product page at /product?id=<slug>, the same
   addresses the header and footer menus use. */
const CARDS: ReadonlyArray<{ readonly id: ProductId; readonly name: string; readonly image: string }> = [
  { id: 'altius', name: 'ALTIUS', image: '/assets/images/ALTIUS.png' },
  { id: 'saibya', name: 'SAIBYA', image: '/assets/images/SAIBYA.png' },
  { id: 'nexus', name: 'NEXUS', image: '/assets/images/NEXUS.png' },
  { id: 'atm', name: 'ATM', image: '/assets/images/ATM.png' },
];

const HUD_CORNERS = ['tl', 'tr', 'bl', 'br'] as const;

export default function ProductsSection() {
  return (
    <section className="products reveal" id="product">
      <div className="product-head">
        <span className="eyebrow">What We Build</span>
        <h2 className="section-title">Our Robotics Solution</h2>
        <p className="section-lead">Advanced robotic systems for defense, industrial, and hazardous environments.</p>
      </div>

      <div className="product-grid">
        {CARDS.map((card) => (
          <Link className="product-card-link" href={`/product?id=${card.id}`} key={card.id}>
            <article className="product-card">
              {HUD_CORNERS.map((corner) => (
                <span className={`product-hud-corner ${corner}`} key={corner} />
              ))}
              <div className="product-scan-beam" />
              <img src={card.image} alt={`${card.name} robot`} />
              <h3 className="russo">{card.name}</h3>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
