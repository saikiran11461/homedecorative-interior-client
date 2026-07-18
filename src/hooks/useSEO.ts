import { useEffect } from "react";

type SeoOptions = {
  title: string;
  description: string;
  /** Overrides the canonical URL for the current route (defaults to current path). */
  path?: string;
  image?: string;
};

const SITE_NAME = "Home Decorative Interior";
const ORIGIN = typeof window !== "undefined" ? window.location.origin : "https://www.homedecorativeinterior.com";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO({ title, description, path, image }: SeoOptions) {
  useEffect(() => {
    const fullTitle = `${title} — ${SITE_NAME}`;
    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);

    const url = path ? `${ORIGIN}${path}` : window.location.href;
    upsertLink("canonical", url);
    upsertMeta("property", "og:url", url);

    if (image) {
      upsertMeta("property", "og:image", image);
      upsertMeta("name", "twitter:image", image);
    }
  }, [title, description, path, image]);
}
