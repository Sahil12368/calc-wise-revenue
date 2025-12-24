import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // ISSUE (real mobile browsers): an immediate scrollTo during navigation can be ignored,
    // especially with smooth-scroll CSS. We force "auto" and retry on the real scrolling element.
    const html = document.documentElement;
    const scrollEl = document.scrollingElement ?? html;

    const originalScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    const scrollNow = () => {
      (document.activeElement as HTMLElement | null)?.blur?.();
      scrollEl.scrollTop = 0;
      document.body.scrollTop = 0; // iOS Safari fallback
      window.scrollTo(0, 0);
    };

    scrollNow();

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      scrollNow();
      raf2 = requestAnimationFrame(scrollNow);
    });

    const t1 = window.setTimeout(scrollNow, 50);
    const t2 = window.setTimeout(scrollNow, 150);
    const restore = window.setTimeout(() => {
      html.style.scrollBehavior = originalScrollBehavior;
    }, 200);

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(restore);
      html.style.scrollBehavior = originalScrollBehavior;
    };
  }, [location.key]);

  return null;
};

export default ScrollToTop;

