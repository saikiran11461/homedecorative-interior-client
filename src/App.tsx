import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import ReviewSubmit from "./pages/ReviewSubmit.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminProjects from "./pages/admin/AdminProjects.tsx";
import AdminMedia from "./pages/admin/AdminMedia.tsx";
import AdminHeroImages from "./pages/admin/AdminHeroImages.tsx";
import AdminReviews from "./pages/admin/AdminReviews.tsx";
import AdminInquiries from "./pages/admin/AdminInquiries.tsx";
import AdminSettings from "./pages/admin/AdminSettings.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminRegister from "./pages/admin/AdminRegister.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
