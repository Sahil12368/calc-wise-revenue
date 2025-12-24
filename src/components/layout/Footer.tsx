import { Link } from 'react-router-dom';
import { Calculator, Mail, Heart } from 'lucide-react';
import { categoryInfo } from '@/lib/calculators';
import { useSiteContent } from '@/hooks/useSiteContent';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { content } = useSiteContent();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Calculators', path: '/calculators' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Disclaimer', path: '/disclaimer' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto pb-20 md:pb-0">
      <div className="content-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground pointer-events-none">
                <Calculator className="h-5 w-5 pointer-events-none" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Calc<span className="text-primary">Hub</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {content.footerDescription}
            </p>
            <a
              href={`mailto:${content.footerEmail}`}
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Mail className="h-4 w-4 pointer-events-none" />
              {content.footerEmail}
            </a>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <ul className="space-y-2">
              {Object.entries(categoryInfo).map(([key, info]) => (
                <li key={key}>
                  <Link
                    to={`/calculators?category=${key}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {info.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} {content.footerCopyright}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {content.footerTagline.includes('love') ? (
              <>
                {content.footerTagline.split('love')[0]}
                <Heart className="h-4 w-4 text-destructive fill-destructive pointer-events-none" />
                {content.footerTagline.split('love')[1]}
              </>
            ) : (
              content.footerTagline
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
