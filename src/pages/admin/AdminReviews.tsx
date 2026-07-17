import AdminLayout from "@/components/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "@/components/ui/sonner";
import { Star, Check, X, Trash2 } from "lucide-react";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
};

const AdminReviews = () => {
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: () => api.get("/api/admin/reviews", { auth: true }),
  });

  const setStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/api/admin/reviews/${id}`, { status }, { auth: true });
      refetch();
      toast.success(status === "approved" ? "Review approved" : "Review rejected");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update review");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/admin/reviews/${id}`, { auth: true });
      refetch();
      toast.success("Review deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete review");
    }
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-semibold text-foreground mb-6">Reviews</h1>
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                {["Client", "Project", "Rating", "Review", "Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left font-sans text-xs text-muted-foreground font-medium py-3 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reviews.map((review: any) => (
                <tr key={review._id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-sans text-foreground text-sm font-medium">{review.clientName}</span>
                  </td>
                  <td className="py-3 px-4 font-sans text-muted-foreground text-sm">{review.projectName}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-0.5">{Array.from({ length: review.rating }).map((_, j) => <Star key={j} className="text-amber-400 fill-amber-400" size={12} />)}</div>
                  </td>
                  <td className="py-3 px-4 font-sans text-muted-foreground text-sm max-w-xs truncate">{review.text}</td>
                  <td className="py-3 px-4 font-sans text-muted-foreground text-sm">{new Date(review.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className={`font-sans text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${statusStyles[review.status] || statusStyles.pending}`}>
                      {review.status || "pending"}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-1">
                    <button
                      onClick={() => setStatus(review._id, "approved")}
                      disabled={review.status === "approved"}
                      className="p-1.5 rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Approve"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => setStatus(review._id, "rejected")}
                      disabled={review.status === "rejected"}
                      className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Reject"
                    >
                      <X size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="p-1.5 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReviews;
