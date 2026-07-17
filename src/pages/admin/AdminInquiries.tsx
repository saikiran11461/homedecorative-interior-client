import AdminLayout from "@/components/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const statusColors: Record<string, string> = {
  New: "bg-blue-50 text-blue-700",
  Contacted: "bg-amber-50 text-amber-700",
  "In Progress": "bg-green-50 text-green-700",
  Closed: "bg-gray-100 text-gray-500",
};

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
                {["Name", "Email", "Project Type", "Date", "Status"].map((h) => (
                  <th key={h} className="text-left font-sans text-xs text-muted-foreground font-medium py-3 px-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq: any) => (
                <tr key={inq._id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-4 font-sans text-foreground text-sm font-medium">{inq.fullName}</td>
                  <td className="py-3 px-4 font-sans text-muted-foreground text-sm">{inq.email}</td>
                  <td className="py-3 px-4 font-sans text-muted-foreground text-sm">{inq.projectType}</td>
                  <td className="py-3 px-4 font-sans text-muted-foreground text-sm">{new Date(inq.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
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
