import { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

const CookieConsent = forwardRef<HTMLDivElement>((_, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing to avoid layout shift
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div ref={ref} className="cookie-banner animate-slide-up">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center pointer-events-none">
          <Cookie className="h-5 w-5 text-primary pointer-events-none" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-1">Cookie Notice</h4>
          <p className="text-sm text-muted-foreground mb-3">
            We use cookies to improve your experience and show personalized ads. 
            By continuing, you agree to our{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex gap-2">
            <Button onClick={acceptCookies} size="sm">
              Accept All
            </Button>
            <Button onClick={declineCookies} variant="outline" size="sm">
              Decline
            </Button>
          </div>
        </div>
        <button
          onClick={declineCookies}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 pointer-events-none" />
        </button>
      </div>
    </div>
  );
});

CookieConsent.displayName = 'CookieConsent';

export default CookieConsent;
