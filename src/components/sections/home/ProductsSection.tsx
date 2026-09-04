import Link from 'next/link';
import type { ProductId } from '@/types';

/* Each card opens its own product page at /product?id=<slug>, the same
   addresses the header and footer menus use.

   The pictures are photographs of the actual machines, cropped to roughly 2:3
   because `.product-card` is a tall portrait box (~308x486) that covers its
   image — a landscape frame would lose two thirds of the robot to the crop.
   `alt` describes what the photograph shows rather than repeating the product
   name: the SAIBYA frame is of the Saibya Max variant, which is the platform
   we have field photography of. */
const CARDS: ReadonlyArray<{
  readonly id: ProductId;
  readonly name: string;
  readonly image: string;
  readonly alt: string;
}> = [
  {
    id: 'altius',
    name: 'ALTIUS',
    image: '/assets/images/card-altius.webp',
    alt: 'ALTIUS magnetic crawler holding position part-way up a vertical steel plate during a climb test',
  },
  {
    id: 'saibya',
    name: 'SAIBYA',
    image: '/assets/images/card-saibya.webp',
    alt: 'Saibya Max surveillance UGV, mast and beacon raised, photographed side-on during a field trial',
  },
  {
    id: 'nexus',
    name: 'NEXUS',
    image: '/assets/images/card-nexus.webp',
    alt: 'Wheeled NEXUS UGV standing on open ground, seen head-on across its sensor pods',
  },
  {
    id: 'atm',
    name: 'ATM',
    image: '/assets/images/card-atm.webp',
    alt: 'ATM Any Terrain Machine driving through loose dirt, throwing up dust',
  },
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
              <img src={card.image} alt={card.alt} />
              <h3 className="russo">{card.name}</h3>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
