import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { api } from "@/lib/api";
import { Trash2, Upload, ImageIcon, Film, RefreshCw } from "lucide-react";

const AdminMedia = () => {
  const [filter, setFilter] = useState("All");
  const [uploading, setUploading] = useState(false);

  const { data: media = [], refetch } = useQuery({
    queryKey: ["admin-media"],
    queryFn: () => api.get("/api/admin/media", { auth: true }),
  });

  const visible = useMemo(() => {
    if (filter === "Images") return media.filter((item: any) => item.kind === "image");
    if (filter === "Videos") return media.filter((item: any) => item.kind === "video");
    return media;
  }, [media, filter]);

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("altText", file.name);
        await api.post("/api/admin/media/upload", formData, { auth: true });
      }

      refetch();
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/api/admin/media/${id}`, { auth: true });
    refetch();
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6 gap-3 flex-wrap">
        <h1 className="font-display text-2xl font-semibold text-foreground">Media Library</h1>
        <label className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-lg hover:bg-coral-dark transition-colors cursor-pointer">
          <Upload size={16} /> {uploading ? "Uploading..." : "Upload Files"}
          <input type="file" className="hidden" multiple accept="image/*,video/*" onChange={(event) => handleUpload(event.target.files)} />
        </label>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {["All", "Images", "Videos"].map((tab) => (
          <button key={tab} onClick={() => setFilter(tab)} className={`px-4 py-2 text-sm font-sans font-medium rounded-lg transition-colors ${filter === tab ? "bg-primary text-primary-foreground" : "bg-background border border-border text-muted-foreground hover:text-foreground"}`}>
            {tab}
          </button>
        ))}
        <button onClick={() => refetch()} className="px-4 py-2 text-sm font-sans font-medium rounded-lg transition-colors bg-background border border-border text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {visible.map((item: any) => (
          <div key={item._id} className="relative group aspect-square overflow-hidden rounded-xl border border-border bg-background">
            {item.kind === "video" ? (
              <video src={item.url} className="w-full h-full object-cover" />
            ) : (
              <img src={item.url} className="w-full h-full object-cover" alt={item.altText || item.fileName} />
            )}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button onClick={() => handleDelete(item._id)} className="p-2 bg-background rounded-lg text-destructive hover:bg-red-50 transition-colors shadow-sm">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="px-2 py-0.5 rounded bg-background/90 backdrop-blur-sm text-[10px] font-medium text-muted-foreground uppercase">{item.kind}</span>
            </div>
            <div className="absolute bottom-2 right-2">
              <div className="p-1 rounded bg-background/80 backdrop-blur-sm">
                {item.kind === "video" ? <Film size={12} className="text-muted-foreground" /> : <ImageIcon size={12} className="text-muted-foreground" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminMedia;