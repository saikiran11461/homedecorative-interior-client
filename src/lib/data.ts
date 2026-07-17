export const BEZIER: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const heroImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=2000",
];

export const projectImages = [
  "https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&q=80&w=800",
];

export const categories = ["All", "Living Room", "Bedroom", "Kitchen", "Commercial", "Bathroom", "Outdoor"];

export const projects = [
  { id: 1, title: "The Milan Penthouse", category: "Living Room", location: "Milan, Italy", year: "2024", client: "The Rosetti Family", img: projectImages[0], video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 2, title: "Azure Coast Villa", category: "Bedroom", location: "Côte d'Azur, France", year: "2024", client: "Château Lumière Group", img: projectImages[1], video: "" },
  { id: 3, title: "Bronze Executive Suite", category: "Commercial", location: "London, UK", year: "2023", client: "Harrington & Associates", img: projectImages[2], video: "" },
  { id: 4, title: "The Obsidian Lounge", category: "Living Room", location: "New York, USA", year: "2023", client: "The Blackwell Estate", img: projectImages[3], video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 5, title: "Mediterranean Retreat", category: "Outdoor", location: "Santorini, Greece", year: "2023", client: "Villa Elysium LLC", img: projectImages[4], video: "" },
  { id: 6, title: "Nordic Haven Kitchen", category: "Kitchen", location: "Copenhagen, Denmark", year: "2023", client: "The Andersen Residence", img: projectImages[5], video: "" },
  { id: 7, title: "Ivory Master Suite", category: "Bedroom", location: "Dubai, UAE", year: "2022", client: "Al Habtoor Holdings", img: projectImages[6], video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 8, title: "Zen Garden Terrace", category: "Outdoor", location: "Kyoto, Japan", year: "2022", client: "Tanaka Estate", img: projectImages[7], video: "" },
  { id: 9, title: "Marble & Mist Bathroom", category: "Bathroom", location: "Paris, France", year: "2022", client: "Maison de Beaumont", img: projectImages[8], video: "" },
  { id: 10, title: "The Glass Loft", category: "Living Room", location: "Berlin, Germany", year: "2022", client: "Schneider Holdings", img: projectImages[9], video: "" },
  { id: 11, title: "Culinary Atelier", category: "Kitchen", location: "Barcelona, Spain", year: "2021", client: "Casa de Sol Group", img: projectImages[10], video: "" },
  { id: 12, title: "Onyx Spa Retreat", category: "Bathroom", location: "Bali, Indonesia", year: "2021", client: "Samsara Resorts", img: projectImages[11], video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
];

export const services = [
  { title: "Living Room Design", desc: "Creating stunning social spaces that blend comfort with contemporary elegance.", icon: "sofa" },
  { title: "Bedroom Interiors", desc: "Designing restful sanctuaries with curated materials and soothing palettes.", icon: "bed" },
  { title: "Kitchen & Dining", desc: "Functional, beautiful kitchens designed for modern living and entertaining.", icon: "chef-hat" },
  { title: "Commercial Spaces", desc: "Elevating brand identity through thoughtful spatial design and planning.", icon: "building" },
  { title: "Bathroom Renovation", desc: "Transforming bathrooms into spa-like retreats with premium finishes.", icon: "bath" },
  { title: "Outdoor & Landscape", desc: "Extending your living space with beautifully designed outdoor areas.", icon: "trees" },
];

export const testimonials = [
  { text: "They didn't just design our home — they understood our soul and translated it into every corner, every texture, every beam of light.", stars: 5, name: "Isabella Fontaine", city: "Paris, France", type: "Residential", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" },
  { text: "Working with Home Interiors was transformative. Our office now communicates the prestige our brand demands without saying a word.", stars: 5, name: "Alexander Whitmore", city: "London, UK", type: "Commercial", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" },
  { text: "The attention to detail is extraordinary. Every material was hand-selected, every proportion deliberate. This is design at its highest form.", stars: 5, name: "Sofia Chen", city: "Singapore", type: "Residential", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" },
  { text: "From concept to completion, the experience was as luxurious as the result. They managed every detail with grace and precision.", stars: 5, name: "Marcus Laurent", city: "Milan, Italy", type: "Hospitality", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
];

export const teamMembers = [
  { name: "Elena Marchetti", title: "Founder & Creative Director", bio: "With over 20 years in luxury design, Elena's vision merges Milanese elegance with contemporary innovation.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" },
  { name: "James Ashworth", title: "Lead Architect", bio: "A Royal Institute fellow, James brings structural poetry to every project with sustainable luxury.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { name: "Yuki Tanaka", title: "Senior Interior Designer", bio: "Yuki's approach blends Japanese minimalism with European grandeur, creating tranquil spaces.", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400" },
  { name: "David Okafor", title: "Materials & Procurement", bio: "David sources rare marbles, artisanal fabrics, and bespoke fixtures from master craftsmen worldwide.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" },
];

export const blogPosts = [
  { id: 1, title: "The Art of Layering Light in Modern Interiors", category: "Design Tips", excerpt: "Discover how strategic lighting layers transform ordinary rooms into atmospheric experiences.", date: "Mar 10, 2026", readTime: "6 min", author: "Elena Marchetti", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Biophilic Design: Bringing Nature Into Your Home", category: "Trends", excerpt: "Explore how organic materials and living elements elevate contemporary residential design.", date: "Feb 28, 2026", readTime: "8 min", author: "Yuki Tanaka", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Modern Art Deco: A Contemporary Interpretation", category: "Inspiration", excerpt: "How today's designers are reimagining geometric glamour for modern spaces.", date: "Feb 15, 2026", readTime: "5 min", author: "James Ashworth", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800" },
];

export const awards = [
  "AD100 — 2024",
  "Elle Decor A-List",
  "Maison & Objet Gold",
  "Interior Design Hall of Fame",
  "RIBA Gold Medal Nominee",
  "Wallpaper* Design Award",
  "EDIDA Best Interior",
  "Dezeen Awards Finalist",
];

export const processSteps = [
  { num: "01", title: "Consultation", desc: "We listen to understand your vision, lifestyle, and goals for the space." },
  { num: "02", title: "Concept Design", desc: "Our team creates a bespoke design narrative with curated palettes and concepts." },
  { num: "03", title: "Material Selection", desc: "Hand-selected materials sourced from premium suppliers worldwide." },
  { num: "04", title: "Build & Execute", desc: "Meticulous project management ensuring every detail is realized perfectly." },
  { num: "05", title: "Final Reveal", desc: "The moment your vision comes to life — a space that exceeds expectations." },
];
