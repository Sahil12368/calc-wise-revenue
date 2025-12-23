import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  ctaTitle: string;
  ctaDescription: string;
}

const defaultContent: SiteContent = {
  heroTitle: 'Free Online Calculators',
  heroSubtitle: 'Quick, accurate, and easy-to-use calculators for health, finance, education, and everyday needs.',
  heroBadge: '100% Free • No Sign-up Required',
  feature1Title: 'Instant Results',
  feature1Desc: 'Get answers in milliseconds with no page reloads',
  feature2Title: 'Privacy First',
  feature2Desc: 'All calculations happen in your browser',
  feature3Title: 'Always Free',
  feature3Desc: 'No sign-up, no limits, no hidden fees',
  ctaTitle: 'Ready to Calculate?',
  ctaDescription: 'Explore our complete collection of free calculators.',
};

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('key, value');

        if (error) throw error;

        if (data && data.length > 0) {
          const contentFromDb: Partial<SiteContent> = {};
          data.forEach(item => {
            if (item.key in defaultContent) {
              contentFromDb[item.key as keyof SiteContent] = item.value || '';
            }
          });
          setContent({ ...defaultContent, ...contentFromDb });
        }
      } catch (error) {
        console.error('Error fetching site content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading };
};
