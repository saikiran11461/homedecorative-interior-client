import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { api } from "@/lib/api";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      await api.post("/api/inquiries", {
        fullName: String(formData.get("fullName") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        projectType: String(formData.get("projectType") || ""),
        budgetRange: String(formData.get("budgetRange") || ""),
        message: String(formData.get("message") || ""),
      });

      setSubmitted(true);
      e.currentTarget.reset();
      window.setTimeout(() => setSubmitted(false), 3000);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to send message");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Let's Work Together" subtitle="Contact Us" centered />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {submitted ? (
              <div className="py-20 text-center rounded-xl bg-secondary">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">✓</span>
                </div>
                <h3 className="font-display text-2xl text-foreground mb-2">Thank You!</h3>
                <p className="font-sans text-muted-foreground text-sm">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="fullName" placeholder="Full Name" className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors" />
                  <input name="email" placeholder="Email" type="email" className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="phone" placeholder="Phone" className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors" />
                  <select name="projectType" className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors">
                    <option>Project Type</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Hospitality</option>
                    <option>Outdoor</option>
                  </select>
                </div>
                <select name="budgetRange" className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors">
                  <option>Budget Range</option>
                  <option>$50,000 – $100,000</option>
                  <option>$100,000 – $250,000</option>
                  <option>$250,000 – $500,000</option>
                  <option>$500,000+</option>
                </select>
                <textarea name="message" placeholder="Tell us about your project..." rows={4} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors resize-none" />
                {error && <p className="font-sans text-sm text-red-600">{error}</p>}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-lg hover:bg-coral-dark transition-colors"
                >
                  Send Message
                </button>
              </>
            )}
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="space-y-6"
          >
            {[
              { icon: MapPin, title: "Studio Address", text: "Gajularamaram Balaji layout road number 5 svsk elite" },
              { icon: Phone, title: "Phone", text: "+91 8309324365" },
              { icon: Mail, title: "Email", text: "homedecorativeinterior@gmail.com" },
              { icon: Clock, title: "Working Hours", text: "Mon – Fri: 9AM – 6PM\nSat: By Appointment" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 p-4 rounded-xl bg-secondary">
                <div className="w-10 h-10 rounded-lg bg-coral-light flex items-center justify-center flex-shrink-0">
                  <Icon className="text-primary" size={18} />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold text-foreground mb-0.5">{title}</h4>
                  <p className="font-sans text-muted-foreground text-sm whitespace-pre-line">{text}</p>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <p className="font-sans text-xs text-muted-foreground mb-3 font-medium">Follow Us</p>
              <div className="flex gap-2">
                {[Instagram, Facebook, Youtube].map((Icon, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground text-muted-foreground cursor-pointer transition-colors">
                    <Icon size={18} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
