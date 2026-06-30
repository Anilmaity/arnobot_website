'use client';

import { useEffect, useState } from 'react';
import { PRODUCTS, type Product } from '@/lib/data';
import { ArrowRight } from './icons';

function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className={`modal-bg${product ? ' open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-card">
        {product && (
          <>
            <div className="modal-head">
              <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                ✕
              </button>
              <div className="modal-eyebrow">{product.type}</div>
              <div className="modal-name">{product.type}</div>
              <div className="modal-desc">{product.desc}</div>
            </div>
            <div className="modal-body">
              <div className="modal-section-label">Key Features</div>
              <div className="modal-features-grid">
                {product.features.map((f) => (
                  <div className="mf-item" key={f}>
                    {f}
                  </div>
                ))}
              </div>
              <div className="modal-section-label" style={{ margin: '24px 0 14px' }}>
                Applications
              </div>
              <div className="app-chips">
                {product.apps.map((a) => (
                  <div className="app-chip" key={a}>
                    {a}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <a href="#contact" className="btn-hero-primary" style={{ fontSize: 11 }} onClick={onClose}>
                  Request a Demo →
                </a>
                {product.brochure && (
                  <a className="modal-brochure" href={product.brochure} download target="_blank" rel="noreferrer">
                    ↓ Download Brochure
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Products() {
  const [modal, setModal] = useState<Product | null>(null);

  return (
    <>
      <div className="products-scroll">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="product-row" onClick={() => setModal(p)}>
            <div className="product-visual">
              {p.img ? (
                <>
                  <div style={{ position: 'absolute', inset: 0, background: '#0d0d0d', zIndex: 0 }} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      width: p.id === 'atm' ? '100%' : '80%',
                      height: p.id === 'atm' ? '100%' : '80%',
                      objectFit: p.id === 'atm' ? 'cover' : 'contain',
                      objectPosition: 'center',
                      opacity: 0.92,
                      transition: 'opacity 0.4s, transform 0.4s',
                      filter: p.id === 'atm' ? 'brightness(0.85) saturate(0.9)' : 'none',
                    }}
                  />
                </>
              ) : (
                <div className="product-visual-inner">
                  <div className="product-ph-icon">🦾</div>
                  <div className="product-ph-label">{p.name} robot render</div>
                </div>
              )}
            </div>
            <div className="product-info">
              <div className="product-num">{p.num}</div>
              <div className="product-type">{p.type}</div>
              <div className="product-desc">{p.desc}</div>
              <button className="product-cta">
                Learn More
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <ProductModal product={modal} onClose={() => setModal(null)} />
    </>
  );
}
