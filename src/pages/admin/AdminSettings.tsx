import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const AdminSettings = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { data: settings, refetch } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: () => api.get("/api/admin/settings", { auth: true }),
    initialData: {
      siteTitle: "Home Interiors Decorators",
      contactEmail: "hello@homeinteriors.com",
      phone: "+44 20 7946 0123",
      studioAddress: "42 Mayfair Lane, London W1K 3QR, UK",
      socialLinks: { instagram: "", linkedin: "", facebook: "" },
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      await api.put("/api/admin/settings", {
        siteTitle: String(formData.get("siteTitle") || ""),
        contactEmail: String(formData.get("contactEmail") || ""),
        phone: String(formData.get("phone") || ""),
        studioAddress: String(formData.get("studioAddress") || ""),
        socialLinks: {
          instagram: String(formData.get("instagram") || ""),
          linkedin: String(formData.get("linkedin") || ""),
          facebook: String(formData.get("facebook") || ""),
        },
      }, { auth: true });

      setMessage("Settings saved successfully.");
      refetch();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to save settings");
    }
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-semibold text-foreground mb-6">Settings</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
        <div className="bg-background rounded-xl border border-border p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">General</h2>
          <div className="space-y-3">
            <div>
              <label className="font-sans text-xs text-muted-foreground mb-1 block font-medium">Site Title</label>
              <input name="siteTitle" defaultValue={settings.siteTitle} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" />
            </div>
            <div>
              <label className="font-sans text-xs text-muted-foreground mb-1 block font-medium">Contact Email</label>
              <input name="contactEmail" defaultValue={settings.contactEmail} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" />
            </div>
            <div>
              <label className="font-sans text-xs text-muted-foreground mb-1 block font-medium">Phone</label>
              <input name="phone" defaultValue={settings.phone} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" />
            </div>
            <div>
              <label className="font-sans text-xs text-muted-foreground mb-1 block font-medium">Studio Address</label>
              <input name="studioAddress" defaultValue={settings.studioAddress} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="bg-background rounded-xl border border-border p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Social Media</h2>
          <div className="space-y-3">
            {[
              ["instagram", "Instagram URL"],
              ["linkedin", "LinkedIn URL"],
              ["facebook", "Facebook URL"],
            ].map(([key, label]) => (
              <div key={key}>
                <label className="font-sans text-xs text-muted-foreground mb-1 block font-medium">{label}</label>
                <input name={key} defaultValue={settings.socialLinks?.[key as "instagram" | "linkedin" | "facebook"] || ""} placeholder={`Enter ${label.toLowerCase()}`} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" />
              </div>
            ))}
          </div>
        </div>
        {message && <p className="font-sans text-sm text-emerald-600">{message}</p>}
        {error && <p className="font-sans text-sm text-red-600">{error}</p>}
        <button className="px-6 py-3 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-lg hover:bg-coral-dark transition-colors">Save Settings</button>
      </form>
    </AdminLayout>
  );
};

export default AdminSettings;
