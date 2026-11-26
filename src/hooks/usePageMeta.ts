import { useEffect } from 'react';

interface PageMetaOptions {
  title: string;
  description: string;
  canonicalPath?: string;
}

export function usePageMeta({ title, description, canonicalPath }: PageMetaOptions) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, content: string, attr = 'content') => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attr, content);
      }
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);

    if (canonicalPath && typeof window !== 'undefined') {
      const canonicalUrl = `${window.location.origin}${canonicalPath}`;
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }
  }, [title, description, canonicalPath]);
}
