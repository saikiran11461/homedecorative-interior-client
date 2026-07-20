import { useState } from "react";
import { Instagram, Linkedin, Facebook, Youtube, ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-charcoal text-cream pt-16 pb-8 px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div className="md:col-span-1">
          <div className="mb-4"><Logo size="lg" /></div>
          <p className="text-cream/60 font-sans text-sm leading-relaxed mb-5">
            Home Decorative Interior — Hyderabad's premier interior design studio crafting elegant, functional living spaces for homes and commercial projects. Specializing in modular kitchens, bedroom interiors, living room design, and complete home renovation.
          </p>
          <div className="flex gap-2">
            <a href="https://www.instagram.com/home.decorative.interior" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-cream/5 hover:bg-gold text-cream/60 hover:text-charcoal cursor-pointer transition-colors" aria-label="Follow us on Instagram">
              <Instagram size={16} />
            </a>
            <a href="https://www.linkedin.com/company/home-decorative-interior" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-cream/5 hover:bg-gold text-cream/60 hover:text-charcoal cursor-pointer transition-colors" aria-label="Follow us on LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href="https://www.facebook.com/home.decorative.interior" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-cream/5 hover:bg-gold text-cream/60 hover:text-charcoal cursor-pointer transition-colors" aria-label="Follow us on Facebook">
              <Facebook size={16} />
            </a>
            <a href="https://www.youtube.com/@homedecorativeinterior" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-cream/5 hover:bg-gold text-cream/60 hover:text-charcoal cursor-pointer transition-colors" aria-label="Subscribe on YouTube">
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-sans text-sm font-semibold text-gold mb-4 uppercase tracking-wider">Quick Links</h5>
          <nav aria-label="Footer navigation" className="flex flex-col gap-2.5">
            <Link to="/" className="font-sans text-cream/60 text-sm hover:text-gold transition-colors">Home</Link>
            <Link to="/about" className="font-sans text-cream/60 text-sm hover:text-gold transition-colors">About Us</Link>
            <Link to="/services" className="font-sans text-cream/60 text-sm hover:text-gold transition-colors">Services</Link>
            <Link to="/projects" className="font-sans text-cream/60 text-sm hover:text-gold transition-colors">Projects</Link>
            <Link to="/contact" className="font-sans text-cream/60 text-sm hover:text-gold transition-colors">Contact</Link>
          </nav>
        </div>

        {/* Services Links (Internal Linking) */}
        <div>
          <h5 className="font-sans text-sm font-semibold text-gold mb-4 uppercase tracking-wider">Our Services</h5>
          <nav aria-label="Services navigation" className="flex flex-col gap-2.5">
            <Link to="/services" className="font-sans text-cream/60 text-sm hover:text-gold transition-colors">Modular Kitchen Design</Link>
            <Link to="/services" className="font-sans text-cream/60 text-sm hover:text-gold transition-colors">Bedroom Interior</Link>
            <Link to="/services" className="font-sans text-cream/60 text-sm hover:text-gold transition-colors">Living Room Design</Link>
            <Link to="/services" className="font-sans text-cream/60 text-sm hover:text-gold transition-colors">Wardrobe Design</Link>
            <Link to="/services" className="font-sans text-cream/60 text-sm hover:text-gold transition-colors">Home Renovation</Link>
          </nav>
        </div>

        {/* Reach Us */}
        <div>
          <h5 className="font-sans text-sm font-semibold text-gold mb-4 uppercase tracking-wider">Reach Us</h5>
          <address className="flex flex-col gap-3 font-sans text-sm text-cream/60 not-italic">
            <div className="flex gap-2"><MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" /><span>Gajularamaram, Balaji Layout, Road No. 5, SVSK Elite, Hyderabad, Telangana 500055, India</span></div>
            <div className="flex gap-2"><Phone size={16} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" /><a href="tel:+918309324365" className="hover:text-gold transition-colors">+91 8309324365</a></div>
            <div className="flex gap-2"><Mail size={16} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" /><a href="mailto:homedecorativeinterior@gmail.com" className="hover:text-gold transition-colors">homedecorativeinterior@gmail.com</a></div>
          </address>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="font-sans text-cream/40 text-xs">
          © {new Date().getFullYear()} Home Decorative Interior, Hyderabad. All rights reserved.
        </p>
        <div className="flex gap-6">
          <span className="font-sans text-cream/40 text-xs cursor-pointer hover:text-gold transition-colors">Privacy Policy</span>
          <span className="font-sans text-cream/40 text-xs cursor-pointer hover:text-gold transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
