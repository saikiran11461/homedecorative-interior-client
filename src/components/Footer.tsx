import { useState } from "react";
import { Instagram, Linkedin, Facebook, Youtube, ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-charcoal text-cream pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="mb-4"><Logo size="lg" /></div>
          <p className="text-cream/60 font-sans text-sm leading-relaxed mb-5">
            Designing spaces that inspire living — premium interior design for homes and commercial projects.
          </p>
          <div className="flex gap-2">
            {[Instagram, Linkedin, Facebook, Youtube].map((Icon, i) => (
              <div key={i} className="p-2 rounded-lg bg-cream/5 hover:bg-gold text-cream/60 hover:text-charcoal cursor-pointer transition-colors">
                <Icon size={16} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-sans text-sm font-semibold text-gold mb-4 uppercase tracking-wider">Quick Links</h5>
          <div className="flex flex-col gap-2.5">
            {[
              { label: "Home", to: "/" },
              { label: "About Us", to: "/about" },
              { label: "Services", to: "/services" },
              { label: "Projects", to: "/projects" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <Link key={l.label} to={l.to} className="font-sans text-cream/60 text-sm hover:text-gold transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-sans text-sm font-semibold text-gold mb-4 uppercase tracking-wider">Reach Us</h5>
          <div className="flex flex-col gap-3 font-sans text-sm text-cream/60">
            <div className="flex gap-2"><MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" /><span>42 Mayfair Lane, London W1K 3QR</span></div>
            <div className="flex gap-2"><Phone size={16} className="text-gold flex-shrink-0 mt-0.5" /><span>+44 20 7946 0123</span></div>
            <div className="flex gap-2"><Mail size={16} className="text-gold flex-shrink-0 mt-0.5" /><span>hello@homedecorative.com</span></div>
          </div>
        </div>

        <div>
          <h5 className="font-sans text-sm font-semibold text-gold mb-4 uppercase tracking-wider">Newsletter</h5>
          <p className="font-sans text-cream/60 text-sm mb-4">Get design inspiration in your inbox.</p>
          <div className="flex gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-3.5 py-2.5 bg-cream/5 border border-cream/10 rounded-lg font-sans text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none transition-colors"
            />
            <button className="px-3.5 py-2.5 bg-gold text-charcoal rounded-lg hover:bg-gold-dark transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="font-sans text-cream/40 text-xs">© 2026 Home Decorative Interior. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="font-sans text-cream/40 text-xs cursor-pointer hover:text-gold transition-colors">Privacy Policy</span>
          <span className="font-sans text-cream/40 text-xs cursor-pointer hover:text-gold transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
