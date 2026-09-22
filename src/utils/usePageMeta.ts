import { useEffect } from "react";

const SITE_URL = "https://rachid-bourjila-portfolio.vercel.app";

interface PageMetaOptions {
  title?: string;
  path?: string;
  noindex?: boolean;
}

/** Keeps document title, canonical link and robots meta in sync on route change. */
export function usePageMeta({ title, path, noindex }: PageMetaOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) document.title = title;

    const canonical = document.getElementById("canonical-link") as HTMLLinkElement | null;
    const previousHref = canonical?.href;
    if (canonical && path !== undefined) {
      canonical.href = `${SITE_URL}${path}`;
    }

    let robots: HTMLMetaElement | null = null;
    if (noindex) {
      robots = document.createElement("meta");
      robots.name = "robots";
      robots.content = "noindex, follow";
      document.head.appendChild(robots);
    }

    return () => {
      document.title = previousTitle;
      if (canonical && previousHref) canonical.href = previousHref;
      if (robots) document.head.removeChild(robots);
    };
  }, [title, path, noindex]);
}
