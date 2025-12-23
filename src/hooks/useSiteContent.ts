import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

export interface SiteContent {
  // Homepage
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
  // About page
  aboutTitle: string;
  aboutIntro: string;
  aboutMissionTitle: string;
  aboutMissionText: string;
  aboutOfferTitle: string;
  aboutOfferText: string;
  aboutPromiseTitle: string;
  aboutPromiseText: string;
  // Footer
  footerDescription: string;
  footerEmail: string;
  footerCopyright: string;
  footerTagline: string;
  // SEO
  seoSiteTitle: string;
  seoSiteDescription: string;
  seoKeywords: string;
  // Contact page
  contactTitle: string;
  contactFormTitle: string;
  contactEmail: string;
  contactLocation: string;
}

export const defaultContent: SiteContent = {
  // Homepage
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
  // About page
  aboutTitle: 'About CalcHub',
  aboutIntro: 'CalcHub provides free, accurate, and easy-to-use online calculators for everyone.',
  aboutMissionTitle: 'Our Mission',
  aboutMissionText: 'To make calculations simple and accessible for students, professionals, and everyday users worldwide.',
  aboutOfferTitle: 'What We Offer',
  aboutOfferText: 'Health & Fitness calculators (BMI, BMR, Calories), Finance calculators (EMI, Interest, Savings), Education calculators (CGPA, Marks, Attendance), Daily calculators (Percentage, Age, Date)',
  aboutPromiseTitle: 'Our Promise',
  aboutPromiseText: 'All calculators are 100% free, require no sign-up, and respect your privacy. Calculations happen entirely in your browser.',
  // Footer
  footerDescription: 'Free online calculators for all your daily, health, finance, and education needs. Quick, accurate, and easy to use.',
  footerEmail: 'contact@calchub.com',
  footerCopyright: 'CalcHub. All rights reserved.',
  footerTagline: 'Made with love for everyone',
  // SEO
  seoSiteTitle: 'CalcHub',
  seoSiteDescription: 'Free online calculators for health, finance, education, and everyday needs.',
  seoKeywords: 'calculator, online calculator, free calculator, BMI calculator, EMI calculator, percentage calculator',
  // Contact page
  contactTitle: 'Contact Us',
  contactFormTitle: 'Send a Message',
  contactEmail: 'contact@calchub.com',
  contactLocation: 'Available worldwide, online 24/7',
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
        logger.error('Error fetching site content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading };
};

export const useFeaturedCalculators = () => {
  const [featuredIds, setFeaturedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from('featured_calculators')
          .select('calculator_id, display_order')
          .order('display_order', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          setFeaturedIds(data.map(item => item.calculator_id));
        } else {
          setFeaturedIds(['mortgage', 'bmi', 'percentage', 'age']);
        }
      } catch (error) {
        logger.error('Error fetching featured calculators:', error);
        setFeaturedIds(['mortgage', 'bmi', 'percentage', 'age']);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { featuredIds, loading };
};
