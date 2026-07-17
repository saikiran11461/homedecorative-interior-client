import { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { api } from "@/lib/api";
import { Search, Plus, Pencil, Trash2, ImageIcon, ChevronLeft, ChevronRight, Play, X, Loader2, Link2, Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const PAGE_SIZE = 8;

const defaultForm = {
  title: "",
  category: "Living Room",
  client: "",
  location: "",
  year: "2026",
  description: "",
  status: "Planning",
  videoUrl: "",
};

const AdminProjects = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: projects = [], refetch } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: () => api.get("/api/admin/projects", { auth: true }),
  });

  const filtered = useMemo(
    () => projects.filter((project: any) => project.title.toLowerCase().includes(search.toLowerCase()) || project.client.toLowerCase().includes(search.toLowerCase())),
    [projects, search]
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openCreate = () => {
    setEditingProject(null);
    setUploadedImages([]);
    setError("");
    setShowModal(true);
  };

  const openEdit = (project: any) => {
    setEditingProject(project);
    setUploadedImages(project.galleryImages?.length ? project.galleryImages : project.coverImage ? [project.coverImage] : []);
    setError("");
    setShowModal(true);
  };

  const uploadImages = async (files: FileList | null) => {
    // Snapshot the FileList into a real array BEFORE touching the input.
    // `files` is a live reference to the input's selection, so clearing the
    // input value below would otherwise empty it and skip the upload loop.
    const filesArray = Array.from(files ?? []);
    if (!filesArray.length || isUploading) return;

    // Reset the file input so the same file can be re-selected later.
    if (fileInputRef.current) fileInputRef.current.value = "";

    setIsUploading(true);
    setError("");
    try {
      const urls: string[] = [];
      for (const file of filesArray) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("altText", file.name);
        const response = await api.post<{ media: { url: string }[] }>("/api/admin/media/upload", formData, { auth: true });
        // The backend returns `media` as an array even for a single file.
        const uploaded = Array.isArray(response.media) ? response.media : [response.media];
        const url = uploaded[0]?.url;
        if (!url) {
          throw new Error(`Failed to upload ${file.name}`);
        }
        urls.push(url);
      }

      setUploadedImages((current) => [...current, ...urls]);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages((current) => current.filter((_, imageIndex) => imageIndex !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      title: String(formData.get("title") || ""),
      category: String(formData.get("category") || "Living Room"),
      client: String(formData.get("client") || ""),
      location: String(formData.get("location") || ""),
      year: String(formData.get("year") || ""),
      description: String(formData.get("description") || ""),
      status: String(formData.get("status") || "Planning"),
      youtubeUrl: String(formData.get("videoUrl") || ""),
      coverImage: uploadedImages[0] || editingProject?.coverImage || "",
      galleryImages: uploadedImages.length ? uploadedImages : editingProject?.galleryImages || [],
    };

    if (!payload.title || !payload.client || !payload.location || !payload.year) {
      setError("Title, client, location, and year are required.");
      return;
    }

    if (!payload.coverImage) {
      setError("Upload at least one project image.");
      return;
    }

    try {
      if (editingProject) {
        await api.patch(`/api/admin/projects/${editingProject._id}`, payload, { auth: true });
      } else {
        await api.post("/api/admin/projects", payload, { auth: true });
      }

      // Close the modal and clear state. The form unmounts with the modal, so
      // there is no need to call `event.currentTarget.reset()` — and doing so
      // after the awaits above would throw, since React nullifies the event.
      setShowModal(false);
      setEditingProject(null);
      setUploadedImages([]);
      await refetch();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to save project");
    }
  };

  const handleDelete = async (project: any) => {
    await api.delete(`/api/admin/projects/${project._id}`, { auth: true });
    refetch();
  };

  const handleGenerateLink = async (project: any) => {
    try {
      const response = await api.post<{ path: string }>(`/api/admin/projects/${project._id}/review-link`, {}, { auth: true });
      const url = `${window.location.origin}${response.path}`;
      await navigator.clipboard.writeText(url);
      toast.success("Review link generated and copied to clipboard", { description: url });
      await refetch();
    } catch (linkError) {
      toast.error(linkError instanceof Error ? linkError.message : "Unable to generate link");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Projects</h1>
          <p className="font-sans text-sm text-muted-foreground mt-1">Manage your portfolio · {filtered.length} projects</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => { setSearch(event.target.value); setPage(1); }}
              placeholder="Search projects..."
              className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-lg text-foreground font-sans text-sm focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none md:w-64"
            />
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-gold text-charcoal font-sans text-sm font-semibold rounded-lg hover:bg-gold-dark hover:text-cream transition-colors whitespace-nowrap">
            <Plus size={16} /> Add Project
          </button>
        </div>
      </div>

      <div className="bg-background rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                {["", "Project", "Client", "Category", "Status", "Media", "Year", "Review", "Actions"].map((header) => (
                  <th key={header} className="text-left font-sans text-xs text-muted-foreground font-semibold uppercase tracking-wider py-3 px-4">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((project: any) => (
                <tr key={project._id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4"><img src={project.coverImage} className="w-14 h-10 object-cover rounded-md" alt="" /></td>
                  <td className="py-3 px-4 font-sans text-foreground text-sm font-medium">{project.title}</td>
                  <td className="py-3 px-4 font-sans text-muted-foreground text-sm">{project.client}</td>
                  <td className="py-3 px-4 font-sans text-muted-foreground text-sm">{project.category}</td>
                  <td className="py-3 px-4">
                    <span className={`font-sans text-xs px-2.5 py-1 rounded-full font-semibold ${project.status === "Completed" ? "bg-emerald-50 text-emerald-700" : project.status === "In Progress" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1.5 items-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gold/10 text-gold text-xs font-medium"><ImageIcon size={10} />{project.galleryImages?.length || 0}</span>
                      {project.youtubeUrl && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-olive/10 text-olive text-xs font-medium"><Play size={10} />1</span>}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-sans text-muted-foreground text-sm">{project.year}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleGenerateLink(project)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                        project.reviewTokenUsed
                          ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          : "bg-gold/10 text-gold hover:bg-gold/20"
                      }`}
                      title={project.reviewTokenUsed ? "Link used — click to regenerate" : "Generate review link"}
                    >
                      <Link2 size={12} /> {project.reviewTokenUsed ? "Re-link" : "Link"}
                    </button>
                  </td>
                  <td className="py-3 px-4 flex gap-1">
                    <button onClick={() => openEdit(project)} className="p-1.5 rounded-md text-muted-foreground hover:text-gold hover:bg-gold/10 transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(project)} className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr><td colSpan={9} className="py-12 text-center font-sans text-muted-foreground text-sm">No projects found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pageCount > 1 && (
        <div className="flex justify-between items-center mt-5">
          <span className="font-sans text-xs text-muted-foreground">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="p-2 rounded-lg border border-border text-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"><ChevronLeft size={14} /></button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
              <button key={number} onClick={() => setPage(number)} className={`min-w-[36px] h-9 rounded-lg font-sans text-sm font-semibold transition-colors ${number === page ? "bg-gold text-charcoal" : "border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
                {number}
              </button>
            ))}
            <button onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={page === pageCount} className="p-2 rounded-lg border border-border text-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"><ChevronRight size={14} /></button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-background rounded-2xl border border-border p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-foreground">{editingProject ? "Edit Project" : "Add New Project"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-secondary"><X size={16} /></button>
            </div>
            <form key={editingProject?._id || "new"} className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="title" defaultValue={editingProject?.title || defaultForm.title} placeholder="Project Title" className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none" />
                <select name="category" defaultValue={editingProject?.category || defaultForm.category} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-muted-foreground focus:border-gold focus:outline-none">
                  <option>Living Room</option><option>Bedroom</option><option>Kitchen</option><option>Commercial</option><option>Bathroom</option><option>Outdoor</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="client" defaultValue={editingProject?.client || defaultForm.client} placeholder="Client Name" className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none" />
                <input name="location" defaultValue={editingProject?.location || defaultForm.location} placeholder="Location" className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-xs text-muted-foreground mb-1 block font-medium">Year</label>
                  <input name="year" defaultValue={editingProject?.year || defaultForm.year} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-muted-foreground focus:border-gold focus:outline-none" />
                </div>
                <div>
                  <label className="font-sans text-xs text-muted-foreground mb-1 block font-medium">Status</label>
                  <select name="status" defaultValue={editingProject?.status || defaultForm.status} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-muted-foreground focus:border-gold focus:outline-none">
                    <option>Planning</option><option>In Progress</option><option>Completed</option>
                  </select>
                </div>
              </div>
              <textarea name="description" defaultValue={editingProject?.description || defaultForm.description} placeholder="Project description..." rows={3} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none resize-none" />

              <div>
                <label className="font-sans text-sm font-semibold text-foreground mb-2 block">Project Images</label>
                <label className={`flex flex-col items-center gap-2 p-6 border-2 border-dashed border-border rounded-xl transition-colors ${isUploading ? "opacity-60 cursor-wait" : "cursor-pointer hover:border-gold hover:bg-gold/5"}`}>
                  <div className="w-11 h-11 rounded-lg bg-gold/15 flex items-center justify-center">
                    {isUploading ? (
                      <Loader2 className="text-gold animate-spin" size={22} />
                    ) : (
                      <ImageIcon className="text-gold" size={22} />
                    )}
                  </div>
                  <div className="text-center">
                    <p className="font-sans text-sm text-foreground font-semibold">{isUploading ? "Uploading images..." : "Click to upload images"}</p>
                    <p className="font-sans text-xs text-muted-foreground">PNG, JPG up to 10MB each</p>
                  </div>
                  <input ref={fileInputRef} type="file" className="hidden" multiple accept="image/*" disabled={isUploading} onChange={(event) => uploadImages(event.target.files)} />
                </label>
                {uploadedImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {uploadedImages.map((imageUrl, index) => (
                      <div key={imageUrl + index} className="relative group">
                        <img src={imageUrl} alt="" className="w-16 h-16 object-cover rounded-md border border-border bg-secondary" />
                        {index === 0 && (
                          <span className="absolute top-0 left-0 px-1 py-0.5 bg-gold text-charcoal text-[10px] font-semibold rounded-br rounded-tl">Cover</span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeUploadedImage(index)}
                          className="absolute -top-2 -right-2 p-1 rounded-full bg-background border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Remove image"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="font-sans text-sm font-semibold text-foreground mb-2 block">Project Video</label>
                <input name="videoUrl" defaultValue={editingProject?.youtubeUrl || defaultForm.videoUrl} placeholder="YouTube video URL" className="w-full px-4 py-3 bg-secondary border border-border rounded-lg font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none" />
                <p className="mt-2 font-sans text-xs text-muted-foreground">Use a YouTube link for walkthrough videos.</p>
              </div>

              {error && <p className="font-sans text-sm text-red-600">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-3 bg-gold text-charcoal font-sans text-sm font-semibold rounded-lg hover:bg-gold-dark hover:text-cream transition-colors">Save Project</button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-border text-foreground font-sans text-sm font-semibold rounded-lg hover:bg-secondary transition-colors">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProjects;