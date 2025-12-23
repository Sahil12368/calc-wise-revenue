import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/common/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Message Sent!', description: 'We will get back to you soon.' });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <Layout>
      <SEO title="Contact Us" description="Get in touch with CalcHub. We'd love to hear from you!" />
      <div className="content-container py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Card><CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Label htmlFor="name">Name</Label><Input id="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="mt-1" /></div>
              <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required className="mt-1" /></div>
              <div><Label htmlFor="message">Message</Label><Textarea id="message" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} required className="mt-1 min-h-[120px]" /></div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent></Card>
          <div className="space-y-6">
            <Card><CardContent className="p-6 flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <div><h3 className="font-semibold">Email</h3><p className="text-muted-foreground">contact@calchub.com</p></div>
            </CardContent></Card>
            <Card><CardContent className="p-6 flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary" />
              <div><h3 className="font-semibold">Location</h3><p className="text-muted-foreground">Available worldwide, online 24/7</p></div>
            </CardContent></Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
