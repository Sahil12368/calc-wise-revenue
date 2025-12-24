import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  // Prevent the browser from restoring previous scroll positions (notably on iOS Safari)
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const scrollEl = document.scrollingElement ?? html;

    const originalHtmlScrollBehavior = html.style.scrollBehavior;
    const originalBodyScrollBehavior = body.style.scrollBehavior;

    html.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";

    const scrollCandidates: HTMLElement[] = [scrollEl as HTMLElement, html, body];

    // Also try common app containers if the browser is scrolling a nested element.
    const root = document.getElementById("root");
    const main = document.querySelector("main");
    if (root instanceof HTMLElement) scrollCandidates.push(root);
    if (main instanceof HTMLElement) scrollCandidates.push(main);

    const scrollNow = () => {
      (document.activeElement as HTMLElement | null)?.blur?.();
      for (const el of scrollCandidates) {
        try {
          el.scrollTop = 0;
        } catch {
          // ignore
        }
      }
      try {
        window.scrollTo(0, 0);
      } catch {
        // ignore
      }

      console.log("[ScrollToTop]", {
        path: location.pathname + location.search,
        key: location.key,
        scrollingElement: (document.scrollingElement as any)?.tagName,
        html: html.scrollTop,
        body: body.scrollTop,
        scrollEl: (scrollEl as any)?.scrollTop,
      });
    };

    // Run immediately, then retry after paint + a couple delays.
    scrollNow();

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      scrollNow();
      raf2 = requestAnimationFrame(scrollNow);
    });

    const t1 = window.setTimeout(scrollNow, 80);
    const t2 = window.setTimeout(scrollNow, 220);

    const restore = window.setTimeout(() => {
      html.style.scrollBehavior = originalHtmlScrollBehavior;
      body.style.scrollBehavior = originalBodyScrollBehavior;
    }, 260);

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(restore);
      html.style.scrollBehavior = originalHtmlScrollBehavior;
      body.style.scrollBehavior = originalBodyScrollBehavior;
    };
  }, [location.key]);

  return null;
};

export default ScrollToTop;

