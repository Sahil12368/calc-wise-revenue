import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/common/SEO';
import CalculatorCard from '@/components/calculator/CalculatorCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { calculators, categoryInfo, getCalculatorById, getCalculatorsByCategory } from '@/lib/calculators';
import { Calculator, ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import { useSiteContent, useFeaturedCalculators } from '@/hooks/useSiteContent';

const Index = () => {
  const { content } = useSiteContent();
  const { featuredIds } = useFeaturedCalculators();
  
  // Get featured calculators from database order
  const featured = featuredIds
    .map(id => getCalculatorById(id))
    .filter(Boolean) as typeof calculators;

  const features = [
    { icon: Zap, title: content.feature1Title, desc: content.feature1Desc },
    { icon: Shield, title: content.feature2Title, desc: content.feature2Desc },
    { icon: Clock, title: content.feature3Title, desc: content.feature3Desc },
  ];

  return (
    <Layout>
      <SEO title="Free Online Calculators" description="Free online calculators for health, finance, education, and daily needs. BMI, EMI, percentage, age calculator and more." />
      
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="content-container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-4 w-4" /> {content.heroBadge}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {content.heroTitle.includes('Calculators') ? (
              <>
                {content.heroTitle.replace('Calculators', '')}
                <span className="text-primary">Calculators</span>
              </>
            ) : (
              content.heroTitle
            )}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {content.heroSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/calculators">
              <Button size="lg" className="calc-btn">
                Browse All Calculators <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b border-border">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-4 p-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section-spacing">
        <div className="content-container">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Popular Calculators</h2>
          <p className="text-muted-foreground mb-8">Most used calculators by our visitors</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((calc) => (
              <CalculatorCard key={calc.id} calculator={calc} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-spacing bg-secondary/30">
        <div className="content-container">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Browse by Category</h2>
          <p className="text-muted-foreground mb-8">Find the right calculator for your needs</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(categoryInfo).map(([key, info]) => (
              <Link key={key} to={`/calculators?category=${key}`}>
                <Card className="h-full card-interactive">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Calculator className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{info.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{info.description}</p>
                    <span className="text-sm text-primary font-medium">
                      {getCalculatorsByCategory(key as any).length} calculators →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="content-container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{content.ctaTitle}</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {content.ctaDescription.includes('{count}') 
              ? content.ctaDescription.replace('{count}', String(calculators.length))
              : content.ctaDescription}
          </p>
          <Link to="/calculators">
            <Button size="lg" className="calc-btn">View All Calculators</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
