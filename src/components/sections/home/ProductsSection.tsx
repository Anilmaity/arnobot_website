import Link from 'next/link';
import type { ProductId } from '@/types';

/* Each card opens its own product page at /product?id=<slug>, the same
   addresses the header and footer menus use.

   The pictures are photographs of the actual machines, cropped to roughly 2:3
   because `.product-card` is a tall portrait box (~308x486) that covers its
   image — a landscape frame would lose two thirds of the robot to the crop.
   `alt` describes what the photograph shows rather than repeating the product
   name: the SAIBYA frame is of the Saibya Max variant, which is the platform
   we have field photography of.

   ALTIUS is the exception, and it is a render rather than a photograph: there
   is no photograph of it anywhere in the vault. Its old card was a workshop
   snap — the crawler clamped to a painted indoor wall with a folding chair in
   shot — which showed the machine but not the job. This is the saved Cycles
   ocean scene re-framed to portrait, so the card says what ALTIUS is for:
   holding station on a ship's plating above the waterline. */
const CARDS: ReadonlyArray<{
  readonly id: ProductId;
  readonly name: string;
  readonly image: string;
  readonly alt: string;
}> = [
  {
    id: 'altius',
    name: 'ALTIUS',
    image: '/assets/images/card-altius-v2.webp',
    alt: 'ALTIUS magnetic crawler clamped to the plating of a ship hull above the waterline, open water below it',
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
