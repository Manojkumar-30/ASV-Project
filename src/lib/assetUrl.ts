/**
 * Resolves root-relative asset paths against Vite's BASE_URL so static assets
 * work both at `/` in local dev and under a subpath like `/ASV-Project/` on GitHub Pages.
 */
export function resolveAssetUrl(assetPath: string): string {
  if (!assetPath || /^(https?:)?\/\//i.test(assetPath) || assetPath.startsWith('data:')) {
    return assetPath;
  }

  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
  if (assetPath.startsWith('/')) {
    return `${base}${assetPath}`;
  }
  return `${base}/${assetPath}`;
}
