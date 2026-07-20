import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Star, CheckCircle2, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";
import { api } from "@/lib/api";

const ReviewSubmit = () => {
  const { token } = useParams<{ token: string }>();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [clientName, setClientName] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("Residential");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { data, isLoading, isError, error: linkError } = useQuery<{
    projectName: string;
    clientName: string;
    location: string;
  }>({
    queryKey: ["review-link", token],
    queryFn: () => api.get(`/api/reviews/link/${token}`),
    retry: false,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!rating) {
      setError("Please select a star rating.");
      return;
    }
    if (!clientName.trim() || !text.trim()) {
      setError("Please enter your name and review.");
      return;
    }

    setSubmitting(true);
    try {
      await api.post(`/api/reviews/link/${token}`, {
        clientName: clientName.trim(),
        rating,
        text: text.trim(),
        city: city.trim(),
        type,
      });
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-6">
        <SEO title="Loading Review | Home Decorative Interior" description="Loading review submission form..." noindex />
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-6">
        <SEO title="Link Unavailable | Home Decorative Interior" description="This review link is invalid or expired." noindex />
        <div className="bg-background rounded-2xl border border-border p-8 max-w-md w-full text-center shadow-lg">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="text-red-500" size={28} />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Link Unavailable</h1>
          <p className="font-sans text-sm text-muted-foreground">
            {linkError instanceof Error ? linkError.message : "This review link is invalid or has already been used."}
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-6">
        <SEO title="Review Submitted | Home Decorative Interior" description="Thank you for your review submission." noindex />
        <div className="bg-background rounded-2xl border border-border p-8 max-w-md w-full text-center shadow-lg">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="text-green-500" size={28} />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Thank You!</h1>
          <p className="font-sans text-sm text-muted-foreground">
            Your review has been submitted and is now awaiting approval. We appreciate your feedback.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={data ? `Review ${data.projectName} | Home Decorative Interior` : "Submit Review | Home Decorative Interior"}
        description={data ? `Share your experience with ${data.projectName} by Home Decorative Interior.` : "Submit your review for Home Decorative Interior."}
        noindex
      />
      <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-6">
        <Link
          to="/"
          className="flex items-center gap-2 mb-4 font-sans text-sm text-muted-foreground hover:text-gold transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="bg-background rounded-2xl border border-border p-8 max-w-lg w-full shadow-lg">
          <div className="mb-6">
            <p className="font-sans text-xs text-gold uppercase tracking-widest font-medium mb-1">Share Your Experience</p>
            <h1 className="font-display text-2xl font-bold text-foreground">Review "{data?.projectName}"</h1>
            <p className="font-sans text-sm text-muted-foreground mt-1">
              We'd love to hear about your experience working with us.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="font-sans text-sm font-medium text-foreground mb-2 block">Your Rating</label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => {
                  const value = index + 1;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      onMouseEnter={() => setHover(value)}
                      onMouseLeave={() => setHover(0)}
                      className="p-1 transition-transform hover:scale-110"
                      aria-label={`${value} star${value > 1 ? "s" : ""}`}
                    >
                      <Star
                        size={28}
                        className={
                          value <= (hover || rating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-muted-foreground/40"
                        }
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="font-sans text-sm font-medium text-foreground mb-1 block">Your Name</label>
              <input
                value={clientName}
                onChange={(event) => setClientName(event.target.value)}
                placeholder="Full name"
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-sans text-sm font-medium text-foreground mb-1 block">City <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder={data?.location || "City"}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="font-sans text-sm font-medium text-foreground mb-1 block">Project Type</label>
                <select
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-muted-foreground focus:border-gold focus:outline-none"
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Hospitality</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-sans text-sm font-medium text-foreground mb-1 block">Your Review</label>
              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Tell us about your experience..."
                rows={4}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none resize-none"
              />
            </div>

            {error && <p className="font-sans text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-gold text-charcoal font-sans text-sm font-semibold rounded-lg hover:bg-gold-dark hover:text-cream transition-colors disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="animate-spin" size={16} />}
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewSubmit;
