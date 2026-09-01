import { access } from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import Link from 'next/link';
import Cta from '@/components/sections/Cta';
import ProductGallery from '@/components/sections/product/ProductGallery';
import ProductSpinViewer from '@/components/sections/product/ProductSpinViewer';
import ProductStill from '@/components/sections/product/ProductStill';
import { ProductIcon } from '@/components/ui/ProductIcons';
import { resolveProduct } from '@/data/products';
import type { ProductIconItem } from '@/types';

interface PageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const product = resolveProduct((await searchParams).id);
  return {
    title: `${product.name} ${product.subtitle}`,
    description: product.overview,
  };
}

/** Mirrors the file_exists() guard around the brochure link in product.php. */
async function brochureExists(brochure: string): Promise<boolean> {
  try {
    await access(path.join(process.cwd(), 'public', brochure));
    return true;
  } catch {
    return false;
  }
}

/**
 * One titled column of icon-marked rows. Two of these sit side by side, so the
 * features and the applications are read together on one screen rather than a
 * band apiece.
 *
 * The caption says what the column is for, which is the difference between a
 * reader knowing at a glance what they are looking at and having to infer it
 * from the six rows underneath.
 */
function IconColumn({
  title,
  caption,
  items,
}: {
  readonly title: string;
  readonly caption: string;
  readonly items: readonly ProductIconItem[];
}) {
  return (
    <div className="icon-band-column">
      <h2 className="icon-band-title russo">{title}</h2>
      <p className="icon-band-caption">{caption}</p>
      <ul className="icon-band-rows">
        {items.map((item) => (
          <li className="icon-band-row" key={item.label}>
            <span className="icon-band-badge">
              <ProductIcon name={item.icon} />
            </span>
            <span className="icon-band-label">
              {item.lead ? <strong className="icon-band-lead">{item.lead}</strong> : null}
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Port of product.php */
export default async function ProductPage({ searchParams }: PageProps) {
  const product = resolveProduct((await searchParams).id);
  const hasBrochure = await brochureExists(product.brochure);

  return (
    <main>
      <section
        className={`hero product-hero${product.heroImage ? ' product-hero-still' : ''}`}
        id="product-hero"
        data-cinematic-hero
      >
        {/* A product with a hero render shows it instead of playing anything. */}
        {product.heroImage ? null : (
          <video className="hero-video" autoPlay muted loop playsInline key={product.heroVideo}>
            <source src={product.heroVideo} type="video/mp4" />
          </video>
        )}
        <img
          className="hero-bg"
          src={product.heroImage ?? product.heroBg}
          alt={`${product.name} hero`}
        />

        <div className="hero-content">
          <h1 className="russo">
            {product.heroTitleLines[0]}
            <br />
            {product.heroTitleLines[1]}
          </h1>
        </div>

        {product.heroImage ? null : (
          <img
            className="hero-play play-trigger"
            src="/assets/icons/play.png"
            alt={`Play ${product.name} video`}
            data-video={product.heroVideo}
            role="button"
            tabIndex={0}
          />
        )}
      </section>

      <section className="product-details reveal">
        <div className="container product-details-grid">
          {/* A turntable where one has been rendered, a single render on the same
              stage where there is one but no frame set, the photo gallery otherwise. */}
          {product.spin ? (
            <ProductSpinViewer key={product.id} name={product.name} spin={product.spin} />
          ) : product.stillRender ? (
            <ProductStill key={product.id} name={product.name} src={product.stillRender} />
          ) : (
            <ProductGallery
              key={product.id}
              name={product.name}
              mainImage={product.mainImage}
              gallery={product.gallery}
            />
          )}

          <div className="product-details-copy">
            <h2 className="product-name russo">{product.name}</h2>
            <span className="product-subtitle">{product.subtitle}</span>
            <p className="product-desc">{product.overview}</p>

            <div className="product-specs">
              <ul className="specs-simple-list">
                {product.specs.map(([label, value]) => (
                  <li key={label}>
                    <strong>{label}:</strong> <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-actions">
              {hasBrochure ? (
                <a href={product.brochure} download className="prod-btn btn-black">
                  Download Brochure (PDF)
                </a>
              ) : (
                <Link href="/contact" className="prod-btn btn-black">
                  Request Brochure
                </Link>
              )}
              <Link href="/contact" className="prod-btn btn-blue">
                Schedule Field Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {product.featureItems && product.applicationItems ? (
        /* Both lists on one screen, each row marked with an icon that depicts
           the thing it names — so the set can be scanned rather than read. */
        <section className="product-specs-section product-icon-band reveal">
          <div className="container icon-band-columns">
            <IconColumn title="Features" caption="What the machine does" items={product.featureItems} />
            <IconColumn
              title="Applications"
              caption="Where it is put to work"
              items={product.applicationItems}
            />
          </div>
        </section>
      ) : (
        <section className="product-specs-section reveal" style={{ backgroundImage: "url('/assets/images/why-chs.png')" }}>
          <div className="container specs-cards-grid">
            <div className="specs-card">
              <h3 className="card-title russo">Key Features</h3>
              <ul className="specs-bullet-list">
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="specs-card">
              <h3 className="card-title russo">Applications</h3>
              <ul className="specs-bullet-list">
                {product.applications.map((application) => (
                  <li key={application}>{application}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {product.showcase && product.showcase.length > 0 ? (
        <section className="product-showcase-section reveal">
          <div className="container">
            <div className="showcase-header">
              <h2 className="showcase-title russo">Product Showcase &amp; Operations</h2>
            </div>
            <div className="showcase-grid">
              {product.showcase.map((item) => (
                <div className="showcase-item" key={item.title}>
                  <div
                    className="showcase-card play-trigger"
                    data-video={item.video}
                    role="button"
                    tabIndex={0}
                    aria-label={`Play video: ${item.title}`}
                  >
                    <img className="showcase-img" src={item.img} alt={item.title} />
                    <div className="showcase-overlay" />
                    <img className="showcase-play-icon" src="/assets/icons/play.png" alt="" />
                  </div>
                  <h4 className="showcase-name">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Cta
        heading={
          <>
            Ready to deploy
            <br />
            <span className="highlight">{product.name} in your field?</span>
          </>
        }
        sub="Consult with ARNOBOT systems engineers to schedule tactical field trials or custom payloads."
      />
    </main>
  );
}
