import Layout from '@/components/layout/Layout';
import SEO from '@/components/common/SEO';
import { Card, CardContent } from '@/components/ui/card';

const Privacy = () => (
  <Layout>
    <SEO title="Privacy Policy" description="CalcHub Privacy Policy - How we handle your data and privacy." />
    <div className="content-container py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Privacy Policy</h1>
      <Card><CardContent className="p-6 prose prose-gray max-w-none">
        <p className="text-muted-foreground mb-4">Last updated: December 2024</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h2>
        <p className="text-muted-foreground">We collect minimal data: anonymous usage analytics and cookies for ads. All calculator inputs are processed locally in your browser and never stored on our servers.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">Cookies & Advertising</h2>
        <p className="text-muted-foreground">We use cookies to improve user experience and display relevant ads through Google AdSense. Third-party vendors may use cookies to serve ads based on your browsing history.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">Your Rights</h2>
        <p className="text-muted-foreground">You can disable cookies in your browser settings. You may also opt out of personalized advertising through Google's Ad Settings.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">Contact</h2>
        <p className="text-muted-foreground">For privacy concerns, email us at privacy@calchub.com</p>
      </CardContent></Card>
    </div>
  </Layout>
);

export default Privacy;
