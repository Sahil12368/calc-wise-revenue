import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '@/components/common/Breadcrumb';
import AdPlacement from '@/components/ads/AdPlacement';
import SEO from '@/components/common/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { getRelatedCalculators, categoryInfo, Calculator } from '@/lib/calculators';
import CalculatorCard from './CalculatorCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}

interface ContentSection {
  title: string;
  content: string;
}

interface CalculatorLayoutProps {
  calculator: Calculator;
  title: string;
  description: string;
  intro: string;
  children: ReactNode;
  formula?: string;
  example?: string;
  faqs: FAQ[];
  contentSections?: ContentSection[];
}

const CalculatorLayout = ({
  calculator,
  title,
  description,
  intro,
  children,
  formula,
  example,
  faqs,
  contentSections = [],
}: CalculatorLayoutProps) => {
  const relatedCalculators = getRelatedCalculators(calculator.id);
  const category = categoryInfo[calculator.category];

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={calculator.keywords.join(', ')}
        canonical={`https://calchub.com${calculator.path}`}
      />

      <div className="content-container py-6 md:py-8">
        <Breadcrumb
          items={[
            { label: 'Calculators', path: '/calculators' },
            { label: category.name, path: `/calculators?category=${calculator.category}` },
            { label: calculator.name },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Header */}
            <header className="mb-6">
              <span className="category-badge mb-3">{category.name}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground">{intro}</p>
            </header>

            {/* Calculator */}
            <Card className="mb-6 shadow-calc">
              <CardContent className="p-6 md:p-8">{children}</CardContent>
            </Card>

            {/* Below Calculator Ad */}
            <AdPlacement type="below-calculator" className="mb-6" />

            {/* Formula Section */}
            {formula && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    Formula Used
                  </h2>
                  <div className="p-4 bg-secondary rounded-lg font-mono text-sm">
                    {formula}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Example Calculation */}
            {example && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    Example Calculation
                  </h2>
                  <p className="text-muted-foreground whitespace-pre-line">{example}</p>
                </CardContent>
              </Card>
            )}

            {/* In-Content Ad */}
            <AdPlacement type="in-content" className="mb-6" />

            {/* Content Sections */}
            {contentSections.length > 0 && contentSections.map((section, index) => (
              <Card key={index} className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    {section.title}
                  </h2>
                  <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {section.content}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* FAQs */}
            {faqs.length > 0 && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Frequently Asked Questions
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left faq-question">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="faq-answer">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}

            {/* Related Calculators */}
            {relatedCalculators.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Related Calculators
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedCalculators.map((calc) => (
                    <CalculatorCard key={calc.id} calculator={calc} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <AdPlacement type="sidebar" />
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Quick Links
                  </h3>
                  <ul className="space-y-2">
                    {Object.entries(categoryInfo).map(([key, info]) => (
                      <li key={key}>
                        <Link
                          to={`/calculators?category=${key}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.name} Calculators
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default CalculatorLayout;
