import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/common/SEO';
import CalculatorCard from '@/components/calculator/CalculatorCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { calculators, categoryInfo, getFeaturedCalculators, getCalculatorsByCategory } from '@/lib/calculators';
import { Calculator, ArrowRight, Zap, Shield, Clock } from 'lucide-react';

const Index = () => {
  const featured = getFeaturedCalculators();

  return (
    <Layout>
      <SEO title="Free Online Calculators" description="Free online calculators for health, finance, education, and daily needs. BMI, EMI, percentage, age calculator and more." />
      
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="content-container text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-4 w-4" /> 100% Free • No Sign-up Required
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Free Online <span className="text-primary">Calculators</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Quick, accurate, and easy-to-use calculators for health, finance, education, and everyday needs.
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
            {[
              { icon: Zap, title: 'Instant Results', desc: 'Get answers in milliseconds with no page reloads' },
              { icon: Shield, title: 'Privacy First', desc: 'All calculations happen in your browser' },
              { icon: Clock, title: 'Always Free', desc: 'No sign-up, no limits, no hidden fees' },
            ].map((f, i) => (
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
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Calculate?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Explore our complete collection of {calculators.length}+ free calculators.
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
