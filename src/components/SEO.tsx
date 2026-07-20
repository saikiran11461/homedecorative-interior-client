import { Helmet } from "react-helmet-async";
import { SITE, DEFAULT_OG_IMAGE, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo-config";
import type { PageSEO } from "@/lib/seo-config";

interface SEOProps extends Partial<PageSEO> {
  /** Page key from seo-config for automatic data, or custom overrides */
  page?: PageSEO;
  /** Breadcrumb items for breadcrumb schema */
  breadcrumbs?: { name: string; url: string }[];
  /** FAQ entries for FAQPage schema */
  faqs?: { question: string; answer: string }[];
  /** Additional JSON-LD schema objects */
  schemas?: Record<string, unknown>[];
  /** Custom OG image URL */
  image?: string;
  /** Page path (e.g., /services) */
  path?: string;
}

export function SEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  schema,
  schemas = [],
  page,
  breadcrumbs,
  faqs,
  image,
  path,
  noindex,
}: SEOProps) {
  // Use explicit values or fall back to page data
  const finalTitle = title || page?.title || SITE.name;
  const finalDescription = description || page?.description || SITE.description;
  const finalKeywords = keywords || page?.keywords || "";
  const finalCanonical = canonical || page?.canonical || (path ? `${SITE.url}${path}` : SITE.url);
  const finalOgTitle = ogTitle || page?.ogTitle || finalTitle;
  const finalOgDescription = ogDescription || page?.ogDescription || finalDescription;
  const finalOgImage = ogImage || page?.ogImage || image || DEFAULT_OG_IMAGE;
  const finalTwitterTitle = twitterTitle || page?.twitterTitle || finalTitle;
  const finalTwitterDescription = twitterDescription || page?.twitterDescription || finalDescription;
  const finalTwitterImage = twitterImage || page?.twitterImage || image || DEFAULT_OG_IMAGE;
  const finalNoindex = noindex || page?.noindex || false;

  // Collect all schemas
  const allSchemas: Record<string, unknown>[] = [...schemas];
  if (schema) {
    if (Array.isArray(schema)) {
      allSchemas.push(...schema);
    } else {
      allSchemas.push(schema);
    }
  }
  if (breadcrumbs && breadcrumbs.length > 0) {
    allSchemas.push(getBreadcrumbSchema(breadcrumbs));
  }
  if (faqs && faqs.length > 0) {
    allSchemas.push(getFAQSchema(faqs));
  }

  const fullTitle = `${finalTitle}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      <meta name="author" content={SITE.name} />
      <meta name="robots" content={finalNoindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="language" content="English" />
      <meta name="theme-color" content={SITE.themeColor} />
      <meta name="color-scheme" content="light dark" />

      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />

      {/* Google Site Verification */}
      <meta name="google-site-verification" content={SITE.googleVerification} />

      {/* Bing Webmaster Verification */}
      <meta name="msvalidate.01" content={SITE.bingVerification} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="800" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@HDInterior" />
      <meta name="twitter:title" content={finalTwitterTitle} />
      <meta name="twitter:description" content={finalTwitterDescription} />
      <meta name="twitter:image" content={finalTwitterImage} />

      {/* Icons */}
      <link rel="icon" type="image/png" href={SITE.favicon} />
      <link rel="apple-touch-icon" href={SITE.logoPng} />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={SITE.shortName} />

      {/* Sitemap link */}
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

      {/* JSON-LD Structured Data */}
      {allSchemas.map((schemaObj, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaObj)}
        </script>
      ))}
    </Helmet>
  );
}
