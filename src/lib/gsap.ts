import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Single place where GSAP is configured.
 *
 * The PHP site pulled gsap 3.12.2 and ScrollTrigger from a CDN as globals; the
 * same version is now a real dependency, which gives us types, a pinned version
 * and no render-blocking third-party request.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
