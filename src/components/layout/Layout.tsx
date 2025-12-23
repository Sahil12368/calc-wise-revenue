import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AdPlacement from '@/components/ads/AdPlacement';
import CookieConsent from '@/components/common/CookieConsent';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Header Ad */}
      <AdPlacement type="header" className="hidden md:block" />
      
      <main className="flex-1">{children}</main>
      
      <Footer />
      
      {/* Mobile Sticky Footer Ad */}
      <div className="mobile-sticky-ad">
        <AdPlacement type="mobile-footer" />
      </div>
      
      <CookieConsent />
    </div>
  );
};

export default Layout;
