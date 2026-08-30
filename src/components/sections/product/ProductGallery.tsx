'use client';

import { useEffect, useState } from 'react';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

const GALLERY_SELECTOR = "[data-fancybox='gallery']";

interface ProductGalleryProps {
  readonly name: string;
  readonly mainImage: string;
  readonly gallery: readonly string[];
}

/**
 * Product image gallery — port of the thumbnail switcher in main.js plus the
 * Fancybox binding that used to come from a CDN script.
 *
 * Hovering or clicking a thumbnail promotes it to the main image; clicking also
 * opens the lightbox, exactly as before.
 *
 * Note on options: the CDN URL the PHP page used was unpinned and already served
 * Fancybox v6, where `animated`, `wheel: "zoom"` and the top-level `Toolbar` /
 * `Thumbs` keys no longer exist — they were silently ignored. Only `dragToClose`
 * ever took effect, so that is all this passes.
 */
export default function ProductGallery({ name, mainImage, gallery }: ProductGalleryProps) {
  // The page keys this component on the product id, so a new product remounts it
  // with the right main image rather than syncing prop -> state in an effect.
  const [active, setActive] = useState(mainImage);

  useEffect(() => {
    Fancybox.bind(GALLERY_SELECTOR, { dragToClose: false });
    return () => Fancybox.unbind(GALLERY_SELECTOR);
  }, []);

  return (
    <div className="product-details-image">
      <a href={active} data-fancybox="gallery" id="mainImageLink">
        <img src={active} alt={name} className="main-product-img" />
      </a>

      {gallery.length > 0 ? (
        <div className="product-gallery">
          {gallery.map((thumb) => (
            <a href={thumb} data-fancybox="gallery" key={thumb}>
              <img
                src={thumb}
                alt={name}
                className="gallery-thumb"
                onMouseEnter={() => setActive(thumb)}
                onClick={() => setActive(thumb)}
              />
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
