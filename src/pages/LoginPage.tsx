import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { pages } from "@/lib/seo-config";
import { api, setAuthToken } from "@/lib/api";

const LoginPage = () => {
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
    <>
      <SEO page={pages.login} />
      <div className="min-h-screen flex">
        <div className="hidden md:flex w-1/2 relative">
          <div className="absolute inset-0 bg-foreground/30 z-10" />
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="" loading="lazy" />
          <div className="absolute bottom-16 left-16 z-20 max-w-md">
            <p className="font-display text-2xl text-white italic leading-relaxed">"Design is not just what it looks like — design is how it works."</p>
            <p className="font-sans text-white/50 text-sm mt-4">— Steve Jobs</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-background flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-coral-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">H</span>
              </div>
              <span className="font-display text-lg font-semibold">Home <span className="text-primary">Interiors</span></span>
            </div>
            <h1 className="font-display text-3xl font-semibold text-foreground mb-8">Welcome Back</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input name="email" placeholder="Email" type="email" className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" />
              <input name="password" placeholder="Password" type="password" className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" />
              <div className="flex justify-end">
                <Link to="/forgot-password" className="font-sans text-xs text-primary hover:underline">Forgot Password?</Link>
              </div>
              {error && <p className="font-sans text-sm text-red-600">{error}</p>}
              <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-lg hover:bg-coral-dark transition-colors">Login</button>
              <button type="button" className="w-full py-3 border border-border font-sans text-sm text-foreground flex items-center justify-center gap-2 rounded-lg hover:bg-secondary transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Sign in with Google
              </button>
              <p className="font-sans text-sm text-muted-foreground text-center">Don't have an account? <Link to="/register" className="text-primary hover:underline font-medium">Register</Link></p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
