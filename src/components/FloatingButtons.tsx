import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.14-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977.906 2.72 1.098 1.892 2.53 3.593 4.394 4.75.746.472 3.24 1.964 4.062 1.964.216 0 .404-.014.575-.028.947-.145 2.222-.856 2.435-1.85.157-.756-.115-1.404-1.375-1.634-.5-.075-1.185-.316-1.717-.316M16 24.375h-.003a7.803 7.803 0 0 1-3.98-1.09l-2.851.748.762-2.786a7.831 7.831 0 0 1-1.196-4.164A7.85 7.85 0 0 1 16.478 9.24a7.83 7.83 0 0 1 5.57 2.31 7.837 7.837 0 0 1 2.303 5.577A7.845 7.845 0 0 1 16 24.376M16 4C9.375 4 4 9.375 4 16c0 2.111.55 4.176 1.598 6l-1.6 5.822 5.947-1.563A11.938 11.938 0 0 0 16 28.001c6.625 0 12-5.375 12-12S22.625 4 16 4"/>
  </svg>
);

const FloatingButtons = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handle = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 bg-charcoal text-gold rounded-full flex items-center justify-center shadow-lg hover:bg-gold hover:text-charcoal transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
      <motion.a
        href="https://wa.me/442079460123"
        target="_blank"
        rel="noopener noreferrer"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:bg-[#1ebe57] transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon size={28} />
      </motion.a>
    </div>
  );
};

export default FloatingButtons;
