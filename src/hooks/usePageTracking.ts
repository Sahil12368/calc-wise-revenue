import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

const RATE_LIMIT_MS = 3000; // Minimum 3 seconds between tracking calls
const LAST_VISIT_KEY = 'last_visit_time';

const getVisitorId = (): string => {
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
};

const isRateLimited = (): boolean => {
  const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
  if (lastVisit && Date.now() - parseInt(lastVisit, 10) < RATE_LIMIT_MS) {
    return true;
  }
  return false;
};

const updateLastVisitTime = (): void => {
  localStorage.setItem(LAST_VISIT_KEY, Date.now().toString());
};

export const usePageTracking = () => {
  const location = useLocation();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const trackPageVisit = async () => {
      // Skip if same path (prevent duplicate tracking on re-renders)
      if (lastTrackedPath.current === location.pathname) {
        return;
      }

      // Rate limit: prevent spam tracking
      if (isRateLimited()) {
        return;
      }

      try {
        updateLastVisitTime();
        lastTrackedPath.current = location.pathname;

        await supabase.from('page_visits').insert({
          page_path: location.pathname,
          visitor_id: getVisitorId(),
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
        });
      } catch (error) {
        // Silently fail - don't break the app for tracking errors
        logger.error('Failed to track page visit:', error);
      }
    };

    trackPageVisit();
  }, [location.pathname]);
};
