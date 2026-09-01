import type { NextConfig } from 'next';

/**
 * Every page of the original PHP site was a flat `*.php` file at the web root.
 * Those URLs keep working so existing links and search results do not break.
 *
 * Pages the rebuild dropped — the splash, the blog, press releases, the media
 * kit and the standalone industries page — send the reader to the nearest
 * surviving page rather than a 404.
 */
const LEGACY_ROUTES: ReadonlyArray<readonly [php: string, destination: string]> = [
  ['/index.php', '/'],
  ['/home.php', '/'],
  ['/about.php', '/about'],
  ['/technology.php', '/technology'],
  ['/product.php', '/product'],
  ['/industries.php', '/#market'],
  ['/career.php', '/career'],
  ['/contact.php', '/contact'],
  ['/blog.php', '/insights'],
  ['/blog-details.php', '/insights'],
  ['/press-release.php', '/insights'],
  ['/media-kit.php', '/about'],
  ['/privacy-policy.php', '/privacy-policy'],
  ['/terms-conditions.php', '/terms-conditions'],
  ['/terms.php', '/terms-conditions'],
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Several lockfiles exist above this folder; pin tracing to the project root.
  outputFileTracingRoot: import.meta.dirname,

  typedRoutes: true,

  async redirects() {
    return LEGACY_ROUTES.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
