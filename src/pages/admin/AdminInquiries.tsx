import AdminLayout from "@/components/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const WHATSAPP_NUMBER = "8309324365";

const statusColors: Record<string, string> = {
  New: "bg-blue-50 text-blue-700",
  Contacted: "bg-amber-50 text-amber-700",
  "In Progress": "bg-green-50 text-green-700",
  Closed: "bg-gray-100 text-gray-500",
};

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0111.85 11.85c0 6.555-5.335 11.85-11.89 11.85a11.9 11.9 0 01-5.99-1.595L.057 24zm6.597-3.257l.345-.21a9.57 9.57 0 004.865 1.354c5.45 0 9.9-4.45 9.9-9.9 0-2.64-1.03-5.13-2.9-7a9.9 9.9 0 00-7-2.9 9.9 9.9 0 00-9.9 9.9c0 1.65.39 3.24 1.13 4.64l.21.345-1.44 5.27 5.4-1.42z" />
  </svg>
);

const AdminInquiries = () => {
  const { data: inquiries = [], refetch } = useQuery({
    queryKey: ["admin-inquiries"],
    queryFn: () => api.get("/api/admin/inquiries", { auth: true }),
  });

  const updateStatus = async (id: string, status: string) => {
    await api.patch(`/api/admin/inquiries/${id}`, { status }, { auth: true });
    refetch();
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-semibold text-foreground mb-6">Inquiries</h1>
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                {["Name", "Email", "Phone", "Project Type", "Message", "Date", "Status"].map((h) => (
                  <th key={h} className="text-left font-sans text-xs text-muted-foreground font-medium py-3 px-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq: any) => (
                <tr key={inq._id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors align-top">
                  <td className="py-3 px-4 font-sans text-foreground text-sm font-medium whitespace-nowrap">{inq.fullName}</td>
                  <td className="py-3 px-4 font-sans text-muted-foreground text-sm whitespace-nowrap">{inq.email}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span className="font-sans text-foreground text-sm">{inq.phone || "—"}</span>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 inline-flex items-center"
                        title="Chat on WhatsApp"
                        aria-label="Chat on WhatsApp"
                      >
                        <WhatsAppIcon />
                      </a>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-sans text-muted-foreground text-sm whitespace-nowrap">{inq.projectType}</td>
                  <td className="py-3 px-4 max-w-sm">
                    <p className="font-sans text-muted-foreground text-sm whitespace-pre-wrap break-words">{inq.message}</p>
                  </td>
                  <td className="py-3 px-4 font-sans text-muted-foreground text-sm whitespace-nowrap">{new Date(inq.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <select
                      value={inq.status}
                      onChange={(event) => updateStatus(inq._id, event.target.value)}
                      className={`font-sans text-xs px-2.5 py-1 rounded-full font-medium border-0 ${statusColors[inq.status]}`}
                    >
                      {["New", "Contacted", "In Progress", "Closed"].map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
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

export default AdminInquiries;
