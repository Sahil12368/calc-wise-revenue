import Layout from '@/components/layout/Layout';
import SEO from '@/components/common/SEO';
import { Card, CardContent } from '@/components/ui/card';

const Terms = () => (
  <Layout>
    <SEO title="Terms & Conditions" description="CalcHub Terms and Conditions of Use." />
    <div className="content-container py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Terms & Conditions</h1>
      <Card><CardContent className="p-6 prose prose-gray max-w-none">
        <p className="text-muted-foreground mb-4">Last updated: December 2024</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">Acceptance of Terms</h2>
        <p className="text-muted-foreground">By using CalcHub, you agree to these terms. If you disagree, please do not use our services.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">Use of Service</h2>
        <p className="text-muted-foreground">Our calculators are provided for informational purposes only. Results should be verified independently for critical decisions.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">Intellectual Property</h2>
        <p className="text-muted-foreground">All content, design, and functionality are owned by CalcHub and protected by copyright laws.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">Limitation of Liability</h2>
        <p className="text-muted-foreground">CalcHub is not liable for any damages arising from the use of our calculators. Always verify important calculations.</p>
      </CardContent></Card>
    </div>
  </Layout>
);

export default Terms;
