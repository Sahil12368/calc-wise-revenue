import Layout from '@/components/layout/Layout';
import SEO from '@/components/common/SEO';
import { Card, CardContent } from '@/components/ui/card';

const Disclaimer = () => (
  <Layout>
    <SEO title="Disclaimer" description="CalcHub Disclaimer - Important information about our calculators." />
    <div className="content-container py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Disclaimer</h1>
      <Card><CardContent className="p-6 prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold mt-4 mb-3">General Information Only</h2>
        <p className="text-muted-foreground">All calculators on CalcHub are provided for general informational and educational purposes only. They are not intended to replace professional advice.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">No Professional Advice</h2>
        <p className="text-muted-foreground"><strong>Health calculators:</strong> Results are not medical advice. Consult a healthcare professional for health decisions.</p>
        <p className="text-muted-foreground"><strong>Finance calculators:</strong> Results are estimates only. Consult a financial advisor for investment decisions.</p>
        <p className="text-muted-foreground"><strong>Education calculators:</strong> Verify results with your institution as grading systems may vary.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">Accuracy</h2>
        <p className="text-muted-foreground">While we strive for accuracy, we cannot guarantee that all calculations are error-free. Always double-check important calculations.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">External Links</h2>
        <p className="text-muted-foreground">We are not responsible for content on external websites linked from our site.</p>
      </CardContent></Card>
    </div>
  </Layout>
);

export default Disclaimer;
