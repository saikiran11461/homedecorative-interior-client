import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

// Lazy-loaded routes for better initial bundle size
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const ServicesPage = lazy(() => import("./pages/ServicesPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage.tsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.tsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.tsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.tsx"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage.tsx"));
const ReviewSubmit = lazy(() => import("./pages/ReviewSubmit.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.tsx"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects.tsx"));
const AdminMedia = lazy(() => import("./pages/admin/AdminMedia.tsx"));
const AdminHeroImages = lazy(() => import("./pages/admin/AdminHeroImages.tsx"));
const AdminReviews = lazy(() => import("./pages/admin/AdminReviews.tsx"));
const AdminInquiries = lazy(() => import("./pages/admin/AdminInquiries.tsx"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings.tsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.tsx"));
const AdminRegister = lazy(() => import("./pages/admin/AdminRegister.tsx"));

const queryClient = new QueryClient();

const RouteLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      <span className="font-sans text-sm text-muted-foreground">Loading...</span>
    </div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<RouteLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/santhosh/interior/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/review/:token" element={<ReviewSubmit />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/santhosh/interior/register" element={<AdminRegister />} />  
              
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/hero-images" element={<AdminHeroImages />} />
              <Route path="/admin/media" element={<AdminMedia />} />
              <Route path="/admin/reviews" element={<AdminReviews />} />
              <Route path="/admin/inquiries" element={<AdminInquiries />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
