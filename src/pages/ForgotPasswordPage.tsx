import { Link } from "react-router-dom";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { api } from "@/lib/api";

const ForgotPasswordPage = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await api.post<{ message: string; resetToken?: string }>("/api/auth/forgot-password", {
        email: String(formData.get("email") || ""),
      });

      setMessage(response.message || "Reset request sent");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to process request");
    }
  };

  return (
    <>
      <SEO
        title="Forgot Password | Home Decorative Interior"
        description="Reset your password for Home Decorative Interior admin panel."
        canonical="https://www.homedecorativeinterior.com/forgot-password"
        noindex
      />
      <div className="min-h-screen bg-secondary flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-background rounded-2xl p-8 shadow-lg border border-border">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <div className="w-8 h-8 rounded-lg bg-coral-gradient flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">H</span>
            </div>
            <span className="font-display text-lg font-semibold">Home <span className="text-primary">Interiors</span></span>
          </div>
          <h1 className="font-display text-2xl font-semibold text-foreground mb-2 text-center">Reset Password</h1>
          <p className="font-sans text-muted-foreground text-sm text-center mb-8">Enter your email and we'll send you a reset link.</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input name="email" placeholder="Email" type="email" className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" />
            {message && <p className="font-sans text-sm text-emerald-600">{message}</p>}
            {error && <p className="font-sans text-sm text-red-600">{error}</p>}
            <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-lg hover:bg-coral-dark transition-colors">Send Reset Link</button>
            <p className="font-sans text-sm text-muted-foreground text-center">
              <Link to="/login" className="text-primary hover:underline font-medium">Back to Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
