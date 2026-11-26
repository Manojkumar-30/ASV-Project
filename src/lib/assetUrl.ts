/**
 * Resolves root-relative asset paths against Vite's BASE_URL so static assets
 * work both at `/` in local dev and under a subpath like `/ASV-Project/` on GitHub Pages.
 */
export function resolveAssetUrl(assetPath: string): string {
  if (!assetPath || /^(https?:)?\/\//i.test(assetPath) || assetPath.startsWith('data:')) {
    return assetPath;
  }

  const baseUrl = import.meta.env.BASE_URL || '/';
  const base = baseUrl.replace(/\/+$/, '');

  // Assets imported by Vite are already emitted with BASE_URL applied, e.g.
  // `/ASV-Project/assets/hero-abc123.webp`. Do not prefix those URLs again.
  if (assetPath === base || assetPath.startsWith(`${base}/`)) {
    return assetPath;
  }

  if (assetPath.startsWith('/')) {
    return `${base}${assetPath}`;
  }
  return `${base}/${assetPath}`;
}
