import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Width breakpoints for responsive images */
const RESPONSIVE_WIDTHS = [400, 800, 1200, 2000];

/** Default sizes attribute for responsive images */
const DEFAULT_SIZES = "(max-width: 640px) 400px, (max-width: 1024px) 800px, (max-width: 1536px) 1200px, 2000px";

/**
 * Add WebP format to an image URL if the CDN supports it.
 * Falls back to the original URL if format is not supported.
 */
export function getWebPUrl(src: string | undefined): string | undefined {
  if (!src) return undefined;

  // Unsplash: use fm=webp
  if (src.includes("images.unsplash.com")) {
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}fm=webp`;
  }

  // Cloudinary: use f_webp in transformation
  if (src.includes("res.cloudinary.com")) {
    if (src.includes("f_webp")) return src;
    // Remove any existing image version prefix, add f_webp before it
    return src.replace("/image/upload/", "/image/upload/f_webp/");
  }

  // For other CDNs, return original (browser will handle format)
  return src;
}

/**
 * Generate responsive image srcSet and sizes attributes for optimized loading.
 * Supports Unsplash and Cloudinary image CDNs with WebP format.
 */
export function getResponsiveImageProps(src: string | undefined) {
  if (!src) return { srcSet: undefined, sizes: undefined };

  // Unsplash images: modify the w query parameter + add WebP format
  if (src.includes("images.unsplash.com")) {
    const baseUrl = src.replace(/w=\d+/, "w={width}");
    if (baseUrl === src) {
      // No w param yet, add it with webp format
      const separator = src.includes("?") ? "&" : "?";
      const srcSet = RESPONSIVE_WIDTHS
        .map((w) => `${src}${separator}w=${w}&fm=webp ${w}w`)
        .join(", ");
      return { srcSet, sizes: DEFAULT_SIZES };
    }
    const srcSet = RESPONSIVE_WIDTHS
      .map((w) => {
        const url = baseUrl.replace("{width}", String(w));
        // Ensure webp format is included
        const webpUrl = url.includes("fm=") ? url : `${url}&fm=webp`;
        return `${webpUrl} ${w}w`;
      })
      .join(", ");
    return { srcSet, sizes: DEFAULT_SIZES };
  }

  // Cloudinary images: add transformation params + WebP
  if (src.includes("res.cloudinary.com")) {
    const srcSet = RESPONSIVE_WIDTHS
      .map((w) => {
        const updated = src.replace(
          "/image/upload/",
          `/image/upload/w_${w},q_auto,f_webp/`
        );
        return `${updated} ${w}w`;
      })
      .join(", ");
    return { srcSet, sizes: DEFAULT_SIZES };
  }

  return { srcSet: undefined, sizes: undefined };
}

