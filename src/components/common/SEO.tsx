import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  type?: 'website' | 'article';
}

const SEO = ({ title, description, canonical, keywords, type = 'website' }: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} | CalcHub`;

    // Update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords);
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', type, true);
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);

    // Update canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (link) {
        link.href = canonical;
      } else {
        link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonical;
        document.head.appendChild(link);
      }
    }
  }, [title, description, canonical, keywords, type]);

  return null;
};

export default SEO;
