import type { HelmetProps } from "react-helmet-async";

// ─── Company Info ─────────────────────────────────────────
export const SITE = {
  name: "Home Decorative Interior",
  shortName: "HD Interior",
  tagline: "Designing Spaces That Inspire Living",
  description:
    "Home Decorative Interior is a premier interior design studio in Hyderabad offering luxury residential and commercial interior design services including modular kitchens, bedroom interiors, living room design, wardrobe design, false ceiling, and home renovation.",
  url: "https://www.homedecorativeinterior.com",
  logo: "https://res.cloudinary.com/dwdcs6tzo/image/upload/v1784202166/home-decorative-interior/eqo3st2g54kbi6euzsgr.png",
  logoPng: "/home-decorative-logo.png",
  favicon: "/favicon.ico.png",
  themeColor: "#1c1c1c",
  backgroundColor: "#ffffff",
  phone: "+91 8309324365",
  email: "homedecorativeinterior@gmail.com",
  address: {
    street: "Gajularamaram Balaji layout road number 5 svsk elite",
    city: "Hyderabad",
    state: "Telangana",
    zip: "500055",
    country: "IN",
  },
  coordinates: {
    latitude: "17.4500",
    longitude: "78.3800",
  },
  openingHours: "Mo-Fr 09:00-18:00",
  social: {
    facebook: "https://www.facebook.com/home.decorative.interior",
    instagram: "https://www.instagram.com/home.decorative.interior",
    pinterest: "https://www.pinterest.com/home.decorative.interior",
    linkedin: "https://www.linkedin.com/company/home-decorative-interior",
    youtube: "https://www.youtube.com/@homedecorativeinterior",
  },
  googleVerification: "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
  bingVerification: "YOUR_BING_VERIFICATION_CODE",
} as const;

export const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dwdcs6tzo/image/upload/v1784202166/home-decorative-interior/eqo3st2g54kbi6euzsgr.png";

// ─── Page SEO Definitions ─────────────────────────────────
export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

export const pages: Record<string, PageSEO> = {
  home: {
    title: "Home Decorative Interior | Best Interior Designers in Hyderabad",
    description:
      "Home Decorative Interior is Hyderabad's premier interior design studio. We specialize in luxury residential & commercial interiors, modular kitchens, bedroom design, and home renovation. Transform your space today.",
    keywords:
      "interior designers Hyderabad, home interiors Hyderabad, luxury interior designers, residential interior designers, commercial interior designers, modular kitchen Hyderabad, wardrobe design, living room interior, bedroom interior, false ceiling, home renovation, best interior designers in Hyderabad, interior design company Hyderabad",
    canonical: `${SITE.url}/`,
    ogTitle: "Home Decorative Interior | Best Interior Designers in Hyderabad",
    ogDescription:
      "Premier interior design studio in Hyderabad crafting elegant, functional living spaces for homes & commercial projects. Award-winning residential and commercial interiors.",
  },
  about: {
    title: "About Home Decorative Interior | Interior Design Company Hyderabad",
    description:
      "Learn about Home Decorative Interior — Hyderabad's trusted interior design company. With 15+ years of experience, 500+ projects, and a passion for creating beautiful spaces, we bring your vision to life.",
    keywords:
      "about home decorative interior, interior design company Hyderabad, interior designers Hyderabad history, best interior design studio Hyderabad, residential interior designers Telangana",
    canonical: `${SITE.url}/about`,
    ogTitle: "About Home Decorative Interior | Interior Design Company Hyderabad",
    ogDescription:
      "Meet Home Decorative Interior — an award-winning interior design studio in Hyderabad crafting elegant, functional living spaces for homes and commercial projects.",
  },
  services: {
    title: "Interior Design Services in Hyderabad | Modular Kitchen | Bedroom | Living Room",
    description:
      "Explore our comprehensive interior design services in Hyderabad: modular kitchen design, bedroom interiors, living room design, wardrobe design, false ceiling, TV units, office interiors, villa interiors, and commercial spaces. Get a free consultation today.",
    keywords:
      "interior design services Hyderabad, modular kitchen Hyderabad, bedroom interior design, living room interior design, wardrobe design Hyderabad, false ceiling design, TV unit design, dining room interior, office interior Hyderabad, villa interior design, apartment interior design, commercial interior design Hyderabad, home renovation Hyderabad",
    canonical: `${SITE.url}/services`,
    ogTitle: "Interior Design Services in Hyderabad | Modular Kitchen | Bedroom | Living Room",
    ogDescription:
      "End-to-end interior design and execution for residences, hospitality, and commercial spaces in Hyderabad. Modular kitchens, bedrooms, living rooms, and more.",
  },
  projects: {
    title: "Interior Design Projects | Modern Home Interiors Hyderabad",
    description:
      "Browse our portfolio of interior design projects in Hyderabad and beyond — living rooms, bedrooms, modular kitchens, bathrooms, commercial spaces, and outdoor designs by Home Decorative Interior.",
    keywords:
      "interior design projects Hyderabad, home interiors portfolio, modular kitchen projects, bedroom interior projects, living room design portfolio, commercial interior projects, villa interiors Hyderabad, apartment interiors Hyderabad",
    canonical: `${SITE.url}/projects`,
    ogTitle: "Interior Design Projects | Modern Home Interiors Hyderabad",
    ogDescription:
      "Browse our interior design portfolio — living rooms, bedrooms, kitchens, bathrooms, commercial and outdoor spaces designed by Home Decorative Interior.",
  },
  contact: {
    title: "Contact Home Decorative Interior | Interior Designers Hyderabad",
    description:
      "Get in touch with Home Decorative Interior, the best interior designers in Hyderabad. Book a free consultation for residential and commercial interior design projects. Call +91 8309324365.",
    keywords:
      "contact interior designers Hyderabad, book interior design consultation, interior design inquiry, home interiors Hyderabad contact, interior designers near me Hyderabad, free consultation interior design",
    canonical: `${SITE.url}/contact`,
    ogTitle: "Contact Home Decorative Interior | Interior Designers Hyderabad",
    ogDescription:
      "Get in touch with Home Decorative Interior for interior design consultations in Hyderabad. Call +91 8309324365 for a free consultation.",
  },
  login: {
    title: "Login | Home Decorative Interior Admin",
    description: "Admin login for Home Decorative Interior management system.",
    keywords: "",
    canonical: `${SITE.url}/login`,
    noindex: true,
  },
  register: {
    title: "Register | Home Decorative Interior",
    description: "Create an account with Home Decorative Interior.",
    keywords: "",
    canonical: `${SITE.url}/register`,
    noindex: true,
  },
};

// ─── JSON-LD Schemas ──────────────────────────────────────
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: SITE.logo,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.coordinates.latitude,
      longitude: SITE.coordinates.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: Object.values(SITE.social).filter(Boolean),
    foundingDate: "2010",
    numberOfEmployees: { "@type": "QuantitativeValue", value: "15" },
    areaServed: [
      { "@type": "City", name: "Hyderabad" },
      { "@type": "City", name: "Secunderabad" },
      { "@type": "City", name: "Gachibowli" },
      { "@type": "City", name: "Kondapur" },
      { "@type": "City", name: "Jubilee Hills" },
      { "@type": "City", name: "Banjara Hills" },
      { "@type": "City", name: "Madhapur" },
      { "@type": "City", name: "Kukatpally" },
      { "@type": "City", name: "Hitech City" },
      { "@type": "City", name: "Manikonda" },
    ],
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: SITE.name,
    image: SITE.logo,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.coordinates.latitude,
      longitude: SITE.coordinates.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: Object.values(SITE.social).filter(Boolean),
    areaServed: [
      "Hyderabad",
      "Secunderabad",
      "Gachibowli",
      "Kondapur",
      "Jubilee Hills",
      "Banjara Hills",
      "Madhapur",
      "Kukatpally",
      "Hitech City",
      "Manikonda",
      "Narsingi",
      "Tellapur",
      "Financial District",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Interior Design Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Modular Kitchen Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bedroom Interior Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Living Room Interior Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wardrobe Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "False Ceiling Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "TV Unit Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dining Room Interior" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Office Interior Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Villa Interior Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Apartment Interior Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Interior Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Renovation" } },
      ],
    },
  };
}

export function getInteriorDesignerSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "InteriorDesign",
    name: SITE.name,
    image: SITE.logo,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.coordinates.latitude,
      longitude: SITE.coordinates.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: [
      { "@type": "City", name: "Hyderabad" },
      { "@type": "City", name: "Secunderabad" },
      { "@type": "City", name: "Gachibowli" },
      { "@type": "City", name: "Kondapur" },
      { "@type": "City", name: "Jubilee Hills" },
      { "@type": "City", name: "Banjara Hills" },
      { "@type": "City", name: "Madhapur" },
    ],
    sameAs: Object.values(SITE.social).filter(Boolean),
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFAQSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

export function getServiceSchema() {
  const services = [
    {
      name: "Modular Kitchen Design Hyderabad",
      description:
        "Custom modular kitchen design in Hyderabad with modern layouts, premium finishes, and smart storage solutions tailored to your home.",
    },
    {
      name: "Bedroom Interior Design Hyderabad",
      description:
        "Luxury bedroom interior design in Hyderabad creating restful sanctuaries with curated materials, soothing palettes, and custom wardrobes.",
    },
    {
      name: "Living Room Interior Design Hyderabad",
      description:
        "Elegant living room interior design in Hyderabad blending comfort with contemporary style, featuring custom sofas, TV units, and lighting.",
    },
    {
      name: "Wardrobe Design Hyderabad",
      description:
        "Custom wardrobe and closet design in Hyderabad with premium materials, smart organization systems, and space-optimized solutions.",
    },
    {
      name: "False Ceiling Design Hyderabad",
      description:
        "Modern false ceiling design in Hyderabad with creative lighting integration, multi-level patterns, and premium materials.",
    },
    {
      name: "Home Renovation Hyderabad",
      description:
        "Complete home renovation services in Hyderabad including structural changes, interior redesign, and turnkey project execution.",
    },
    {
      name: "Commercial Interior Design Hyderabad",
      description:
        "Professional commercial interior design in Hyderabad for offices, restaurants, retail spaces, and hospitality venues.",
    },
    {
      name: "Villa Interior Design Hyderabad",
      description:
        "Premium villa interior design in Hyderabad with bespoke furniture, luxury finishes, and comprehensive space planning.",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        provider: { "@type": "Organization", name: SITE.name },
        areaServed: { "@type": "City", name: "Hyderabad" },
      },
    })),
  };
}

export function getImageObjectSchema(imageUrl: string, caption: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    url: imageUrl,
    caption: caption,
    contentLocation: "Hyderabad, Telangana, India",
    author: { "@type": "Organization", name: SITE.name },
  };
}

// ─── FAQ Data ─────────────────────────────────────────────
export const faqData = [
  {
    question: "What interior design services do you offer in Hyderabad?",
    answer:
      "We offer comprehensive interior design services in Hyderabad including modular kitchen design, bedroom interiors, living room design, wardrobe design, false ceiling, TV unit design, dining room interiors, office interiors, villa interiors, apartment interiors, commercial interiors, and complete home renovation.",
  },
  {
    question: "How much does interior design cost in Hyderabad?",
    answer:
      "Our interior design costs vary based on project scope, size, and material selection. We offer customized packages for different budgets. Contact us for a free consultation and detailed quote tailored to your specific requirements.",
  },
  {
    question: "What areas do you serve in Hyderabad?",
    answer:
      "We serve all major areas of Hyderabad including Gachibowli, Kondapur, Jubilee Hills, Banjara Hills, Madhapur, Kukatpally, Hitech City, Manikonda, Narsingi, Tellapur, Financial District, and Secunderabad.",
  },
  {
    question: "How long does an interior design project take?",
    answer:
      "Project timelines vary depending on scope and complexity. A single room typically takes 2-4 weeks, while a complete home interior can take 2-4 months. We provide a detailed timeline during the consultation phase.",
  },
  {
    question: "Do you provide free consultation for interior design?",
    answer:
      "Yes, we offer a free initial consultation to understand your requirements, discuss design ideas, and provide a project estimate. Schedule your free consultation by calling +91 8309324365 or filling our contact form.",
  },
  {
    question: "What makes Home Decorative Interior different from other interior designers in Hyderabad?",
    answer:
      "With 15+ years of experience and 500+ completed projects, we combine architectural precision with artisanal craftsmanship. Our personalized approach, premium material selection, and turnkey project management ensure a stress-free experience and exceptional results.",
  },
];

// ─── Contact Page Schema ──────────────────────────────────
export function getContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Home Decorative Interior",
    description: "Contact page for Home Decorative Interior — Hyderabad's premier interior design studio.",
    url: `${SITE.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.state,
        addressCountry: SITE.address.country,
      },
    },
  };
}

export function getAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Home Decorative Interior",
    description: "About Hyderabad's premier interior design studio — Home Decorative Interior.",
    url: `${SITE.url}/about`,
    mainEntity: getOrganizationSchema(),
  };
}
