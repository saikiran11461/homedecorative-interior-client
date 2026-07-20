import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Generate sourcemaps only for production debugging
    sourcemap: mode !== "production",
    // Minification options
    minify: "esbuild",
    // Configure target browsers
    target: "es2020",
    // Rollup options for code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // React core libraries
          vendor: [
            "react",
            "react-dom",
            "react-router-dom",
          ],
          // UI and animation libraries
          ui: [
            "framer-motion",
            "lucide-react",
          ],
          // Helmet for SEO
          seo: [
            "react-helmet-async",
          ],
          // Data fetching
          query: [
            "@tanstack/react-query",
          ],
        },
      },
    },
    // Chunk size warning threshold
    chunkSizeWarningLimit: 500,
    // Clear the output directory before building
    emptyOutDir: true,
    // Assets inline limit
    assetsInlineLimit: 4096,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "lucide-react",
      "react-helmet-async",
      "@tanstack/react-query",
    ],
  },
}));
