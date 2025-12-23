import Layout from '@/components/layout/Layout';
import SEO from '@/components/common/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { useSiteContent } from '@/hooks/useSiteContent';
import { Loader2 } from 'lucide-react';

const About = () => {
  const { content, loading } = useSiteContent();

  // Parse the offer text into a list
  const offerItems = content.aboutOfferText
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);

  if (loading) {
    return (
      <Layout>
        <SEO title="About Us" description="Learn about CalcHub - your trusted source for free online calculators." />
        <div className="content-container py-12 flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title="About Us" description="Learn about CalcHub - your trusted source for free online calculators." />
      <div className="content-container py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{content.aboutTitle}</h1>
        <Card>
          <CardContent className="p-6 prose prose-gray max-w-none">
            <p className="text-lg text-muted-foreground mb-4">{content.aboutIntro}</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">{content.aboutMissionTitle}</h2>
            <p className="text-muted-foreground">{content.aboutMissionText}</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">{content.aboutOfferTitle}</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              {offerItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">{content.aboutPromiseTitle}</h2>
            <p className="text-muted-foreground">{content.aboutPromiseText}</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default About;
