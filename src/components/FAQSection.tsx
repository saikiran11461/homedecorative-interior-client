import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";

const faqItems = [
  {
    question: "What is the first step to start an interior design project in Hyderabad?",
    answer:
      "The first step is a free consultation where we discuss your vision, requirements, and budget. We visit your space, take measurements, and understand your lifestyle. Based on this, we provide a detailed project proposal and design concept tailored to your needs.",
  },
  {
    question: "How long does a complete home interior project take in Hyderabad?",
    answer:
      "Timelines vary based on scope. A single room typically takes 2-4 weeks. A complete apartment (2-3 BHK) takes 6-10 weeks. Villas and larger residences take 3-6 months. We provide a detailed project schedule during the proposal stage and keep you updated throughout the process.",
  },
  {
    question: "What is the cost of interior design services in Hyderabad?",
    answer:
      "Our pricing is customized to each project's scope. We offer flexible packages starting from premium consultations to full turnkey execution. Factors include space size, material selection, furniture requirements, and design complexity. Contact us for a free, no-obligation quote.",
  },
  {
    question: "Do you provide modular kitchen design in Hyderabad?",
    answer:
      "Yes, we specialize in custom modular kitchen design. We offer end-to-end solutions including layout planning, cabinet design, countertop selection, appliance integration, and hardware selection. Our kitchens combine aesthetics with ergonomic functionality.",
  },
  {
    question: "Can you work within a specific budget for interior design?",
    answer:
      "Absolutely. We believe great design is achievable at every budget level. During our consultation, we discuss your budget transparently and create a design plan that maximizes value. We have partnerships with premium suppliers to get the best pricing for materials and furnishings.",
  },
  {
    question: "Do you handle both residential and commercial interior projects?",
    answer:
      "Yes, we specialize in both residential and commercial interior design. Our residential portfolio includes apartments, villas, and independent homes. Our commercial work covers offices, restaurants, retail spaces, and hospitality venues across Hyderabad.",
  },
  {
    question: "What areas in Hyderabad do you serve?",
    answer:
      "We serve all major areas of Hyderabad including Gachibowli, Kondapur, Jubilee Hills, Banjara Hills, Madhapur, Kukatpally, Hitech City, Manikonda, Narsingi, Tellapur, Financial District, and Secunderabad. We also accept projects across Telangana.",
  },
];

const FAQSection = () => (
  <section className="py-20 md:py-28 px-6 bg-secondary">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-coral-light text-primary text-xs font-sans font-medium mb-4">
          FAQ
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">
          Frequently Asked{" "}
          <span className="text-gold italic">Questions</span>
        </h2>
        <p className="font-sans text-muted-foreground text-base mt-4 max-w-xl mx-auto">
          Everything you need to know about working with us. Can't find what you're looking for? Reach out directly.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-background rounded-xl border border-border hover:border-gold/30 transition-all duration-300 px-1"
            >
              <AccordionTrigger className="px-5 py-5 font-display text-base font-semibold text-foreground hover:text-gold transition-colors [&[data-state=open]>svg]:rotate-180">
                <span className="text-left">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5">
                <div className="flex gap-4">
                  <div className="hidden sm:block w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageCircle className="text-gold" size={18} />
                  </div>
                  <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <p className="font-sans text-muted-foreground text-sm">
          Still have questions?{" "}
          <a
            href="/contact"
            className="text-gold font-medium hover:underline transition-colors"
          >
            Contact our team
          </a>{" "}
          and we'll be happy to help.
        </p>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;
