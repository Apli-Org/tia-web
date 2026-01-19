"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  speed: 200,
  trickleSpeed: 100,
});

export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the first render (initial page load)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Navigation completed - stop progress bar
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    // Intercept all link clicks to start progress immediately
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip external links, hash links, and same-page links
      if (
        href.startsWith("http") ||
        href.startsWith("#") ||
        href === pathname ||
        anchor.target === "_blank"
      ) {
        return;
      }

      // Start progress immediately on internal navigation
      NProgress.start();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
