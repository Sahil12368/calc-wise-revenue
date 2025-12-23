import Layout from '@/components/layout/Layout';
import SEO from '@/components/common/SEO';
import { Card, CardContent } from '@/components/ui/card';

const About = () => (
  <Layout>
    <SEO title="About Us" description="Learn about CalcHub - your trusted source for free online calculators." />
    <div className="content-container py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">About CalcHub</h1>
      <Card><CardContent className="p-6 prose prose-gray max-w-none">
        <p className="text-lg text-muted-foreground mb-4">CalcHub provides free, accurate, and easy-to-use online calculators for everyone.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">Our Mission</h2>
        <p className="text-muted-foreground">To make calculations simple and accessible for students, professionals, and everyday users worldwide.</p>
        <h2 className="text-xl font-semibold mt-6 mb-3">What We Offer</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>Health & Fitness calculators (BMI, BMR, Calories)</li>
          <li>Finance calculators (EMI, Interest, Savings)</li>
          <li>Education calculators (CGPA, Marks, Attendance)</li>
          <li>Daily calculators (Percentage, Age, Date)</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-3">Our Promise</h2>
        <p className="text-muted-foreground">All calculators are 100% free, require no sign-up, and respect your privacy. Calculations happen entirely in your browser.</p>
      </CardContent></Card>
    </div>
  </Layout>
);

export default About;
