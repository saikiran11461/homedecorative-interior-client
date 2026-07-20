import { useRef, useState, useEffect, type ImgHTMLAttributes } from "react";
import { getResponsiveImageProps } from "@/lib/utils";

interface ProgressiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Low-res or blurred version to show while loading */
  placeholder?: string;
  /** Whether to show a skeleton loader instead of placeholder image */
  showSkeleton?: boolean;
}

const ProgressiveImage = ({
  src,
  placeholder,
  showSkeleton = false,
  alt = "",
  className = "",
  style,
  loading: _loading,
  decoding: _decoding,
  ...imgProps
}: ProgressiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to track when image enters viewport
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading 200px before it enters viewport
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const responsiveProps = src ? getResponsiveImageProps(src) : {};

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight: "100px", ...style }}
    >
      {/* Placeholder/skeleton shown while image is not loaded */}
      {!isLoaded && (
        <div className="absolute inset-0">
          {showSkeleton ? (
            <div className="w-full h-full bg-secondary animate-pulse" />
          ) : placeholder ? (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover blur-xl scale-110 opacity-60"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary/80 to-secondary animate-pulse" />
          )}
        </div>
      )}

      {/* Actual image - only loads when in view */}
      {isInView && (
        <img
          src={src}
          {...responsiveProps}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          loading="lazy"
          decoding="async"
          {...imgProps}
        />
      )}

      {/* Fade-in overlay for smooth transition */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default ProgressiveImage;
