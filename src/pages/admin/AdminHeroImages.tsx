import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { api } from "@/lib/api";
import { Trash2, Upload, ImageIcon, RefreshCw } from "lucide-react";

const AdminHeroImages = () => {
  const [uploading, setUploading] = useState(false);

  const { data: heroImages = [], refetch } = useQuery({
    queryKey: ["admin-hero-images"],
    queryFn: () => api.get("/api/admin/hero-images", { auth: true }),
  });

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return;

    setUploading(true);
    try {
      const formData = new FormData();
      for (const file of Array.from(files)) {
        formData.append("heroImages", file);
      }
      // For altText, we could prompt user or use filename - but for now, send empty
      // Alternatively, we could store altText per file but for simplicity we'll handle this later
      await api.post("/api/admin/hero-images", formData, { auth: true });

      refetch();
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/api/admin/hero-images/${id}`, { auth: true });
    refetch();
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6 gap-3 flex-wrap">
        <h1 className="font-display text-2xl font-semibold text-foreground">Hero Images</h1>
        <label className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-lg hover:bg-coral-dark transition-colors cursor-pointer">
          <Upload size={16} /> {uploading ? "Uploading..." : "Upload Images"}
          <input type="file" className="hidden" multiple accept="image/*" onChange={(event) => handleUpload(event.target.files)} />
        </label>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <button onClick={() => refetch()} className="px-4 py-2 text-sm font-sans font-medium rounded-lg transition-colors bg-background border border-border text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {heroImages.map((item: any) => (
          <div key={item._id} className="relative group aspect-square overflow-hidden rounded-xl border border-border bg-background">
            <img src={item.url} className="w-full h-full object-cover" alt={item.altText || item.fileName} />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button onClick={() => handleDelete(item._id)} className="p-2 bg-background rounded-lg text-destructive hover:bg-red-50 transition-colors shadow-sm">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="px-2 py-0.5 rounded bg-background/90 backdrop-blur-sm text-[10px] font-medium text-muted-foreground uppercase">HERO</span>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminHeroImages;