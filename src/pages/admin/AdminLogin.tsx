import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "@/components/Logo";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { api, setAuthToken } from "@/lib/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await api.post<{ token: string }>("/api/auth/login", {
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || ""),
      });

      if (response.token) {
        setAuthToken(response.token);
      }

      navigate("/admin");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to sign in");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 relative bg-charcoal">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/80 z-10" />
        <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-40" alt="" />
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-12">
          <Logo size="lg" />
          <div className="max-w-md">
            <h2 className="font-display text-4xl font-bold text-cream leading-tight mb-4">
              Welcome to your <span className="text-gold italic">Studio Panel</span>
            </h2>
            <p className="font-sans text-cream/60 text-sm leading-relaxed">
              Manage projects, media, reviews, and client inquiries — all from one elegant dashboard.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-8"><Logo size="lg" /></div>
          <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-sans font-semibold uppercase tracking-widest mb-4">Admin Portal</span>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Sign In</h1>
          <p className="font-sans text-muted-foreground text-sm mb-8">Access your admin dashboard</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input name="email" type="email" placeholder="Email address" className="w-full pl-11 pr-4 py-3.5 bg-secondary border border-border rounded-xl font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none" />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input name="password" type="password" placeholder="Password" className="w-full pl-11 pr-4 py-3.5 bg-secondary border border-border rounded-xl font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none" />
            </div>
            {error && <p className="font-sans text-sm text-red-600">{error}</p>}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 font-sans text-sm text-muted-foreground">
                <input type="checkbox" className="w-4 h-4 accent-gold rounded" /> Remember me
              </label>
              <Link to="/admin/forgot-password" className="font-sans text-sm text-gold hover:underline font-medium">Forgot password?</Link>
            </div>
            <button type="submit" className="w-full py-3.5 bg-gold text-charcoal font-sans text-sm font-semibold rounded-xl hover:bg-gold-dark hover:text-cream transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-gold/20">
              Sign In <ArrowRight size={16} />
            </button>
            <p className="font-sans text-sm text-muted-foreground text-center pt-2">
              New admin? <Link to="/admin/register" className="text-gold hover:underline font-semibold">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
