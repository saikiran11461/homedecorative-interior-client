import AdminLayout from "@/components/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, FolderOpen, Users, Star, MessageSquare, ArrowUpRight, ArrowDownRight } from "lucide-react";

const kpis = [
  { label: "Total Projects", value: "500", change: "+12%", trend: "up", icon: FolderOpen, tone: "bg-gold/15 text-gold" },
  { label: "Active Projects", value: "23", change: "+3", trend: "up", icon: TrendingUp, tone: "bg-olive/15 text-olive" },
  { label: "Total Clients", value: "340", change: "+8%", trend: "up", icon: Users, tone: "bg-blue-50 text-blue-600" },
  { label: "Pending Reviews", value: "7", change: "-2", trend: "down", icon: Star, tone: "bg-amber-50 text-amber-600" },
  { label: "New Inquiries", value: "15", change: "+5", trend: "up", icon: MessageSquare, tone: "bg-rose-50 text-rose-600" },
];

const chartData = [
  { month: "Jan", projects: 12, revenue: 45 }, { month: "Feb", projects: 15, revenue: 52 },
  { month: "Mar", projects: 10, revenue: 48 }, { month: "Apr", projects: 18, revenue: 61 },
  { month: "May", projects: 22, revenue: 72 }, { month: "Jun", projects: 14, revenue: 55 },
  { month: "Jul", projects: 19, revenue: 68 }, { month: "Aug", projects: 25, revenue: 82 },
  { month: "Sep", projects: 20, revenue: 74 }, { month: "Oct", projects: 17, revenue: 63 },
  { month: "Nov", projects: 28, revenue: 91 }, { month: "Dec", projects: 24, revenue: 85 },
];

const categoryData = [
  { name: "Living Room", value: 34, color: "hsl(42 45% 52%)" },
  { name: "Bedroom", value: 24, color: "hsl(72 32% 42%)" },
  { name: "Kitchen", value: 18, color: "hsl(38 45% 38%)" },
  { name: "Commercial", value: 14, color: "hsl(0 0% 25%)" },
  { name: "Outdoor", value: 10, color: "hsl(42 30% 70%)" },
];

const activities = [
  { text: "New inquiry from Sofia Chen", time: "2 hours ago", type: "inquiry" },
  { text: "Project 'Azure Coast Villa' marked complete", time: "5 hours ago", type: "project" },
  { text: "New review submitted by Marcus Laurent", time: "1 day ago", type: "review" },
  { text: "Client meeting scheduled with The Rosetti Family", time: "2 days ago", type: "meeting" },
];

const deadlines = [
  { project: "Bronze Executive Suite", date: "Mar 20, 2026", status: "On Track", progress: 78 },
  { project: "Nordic Haven Kitchen", date: "Apr 5, 2026", status: "At Risk", progress: 42 },
  { project: "Marble & Mist Bathroom", date: "Apr 15, 2026", status: "On Track", progress: 55 },
];

const AdminDashboard = () => {
  const { data: summary } = useQuery({
    queryKey: ["admin-summary"],
    queryFn: () => api.get("/api/admin/summary", { auth: true }),
    initialData: { projects: 0, activeProjects: 0, clients: 0, pendingReviews: 0, newInquiries: 0 },
  });

  const kpiCards = [
    { label: "Total Projects", value: String(summary.projects ?? 0), change: "+12%", trend: "up", icon: FolderOpen, tone: "bg-gold/15 text-gold" },
    { label: "Active Projects", value: String(summary.activeProjects ?? 0), change: "+3", trend: "up", icon: TrendingUp, tone: "bg-olive/15 text-olive" },
    { label: "Total Clients", value: String(summary.clients ?? 0), change: "+8%", trend: "up", icon: Users, tone: "bg-blue-50 text-blue-600" },
    { label: "Pending Reviews", value: String(summary.pendingReviews ?? 0), change: "0", trend: "down", icon: Star, tone: "bg-amber-50 text-amber-600" },
    { label: "New Inquiries", value: String(summary.newInquiries ?? 0), change: "+5", trend: "up", icon: MessageSquare, tone: "bg-rose-50 text-rose-600" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Welcome back, Admin</h1>
        <p className="font-sans text-sm text-muted-foreground mt-1">Here's what's happening in your studio today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {kpiCards.map((k) => (
          <div key={k.label} className="bg-background rounded-2xl border border-border p-5 hover:shadow-md hover:border-gold/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${k.tone}`}>
                <k.icon size={18} />
              </div>
              <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${k.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                {k.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {k.change}
              </span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">{k.value}</p>
            <p className="font-sans text-xs text-muted-foreground mt-1">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="lg:col-span-2 bg-background rounded-2xl border border-border p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Projects Overview</h2>
              <p className="font-sans text-xs text-muted-foreground mt-0.5">Monthly project completion trend</p>
            </div>
            <div className="flex gap-1.5">
              <span className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground"><span className="w-2 h-2 rounded-full bg-gold" />Projects</span>
              <span className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground ml-3"><span className="w-2 h-2 rounded-full bg-olive" />Revenue (k)</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 20% 88%)" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(0 0% 60%)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(0 0% 60%)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(40 20% 88%)", borderRadius: "10px", fontFamily: "Poppins", fontSize: 12 }} />
                <Bar dataKey="projects" fill="hsl(42 45% 52%)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="revenue" fill="hsl(72 32% 42%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-background rounded-2xl border border-border p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-1">By Category</h2>
          <p className="font-sans text-xs text-muted-foreground mb-4">Project distribution</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(40 20% 88%)", borderRadius: "10px", fontFamily: "Poppins", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-4">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center justify-between font-sans text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                  <span className="text-foreground">{c.name}</span>
                </div>
                <span className="text-muted-foreground font-medium">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-background rounded-2xl border border-border p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-5">Recent Activity</h2>
          <div className="space-y-4">
            {activities.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-sans text-foreground text-sm">{a.text}</p>
                  <span className="font-sans text-xs text-muted-foreground">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background rounded-2xl border border-border p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-5">Upcoming Deadlines</h2>
          <div className="space-y-5">
            {deadlines.map((d, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-sans text-foreground text-sm font-medium">{d.project}</p>
                    <p className="font-sans text-xs text-muted-foreground">{d.date}</p>
                  </div>
                  <span className={`font-sans text-xs px-2.5 py-1 rounded-full font-semibold ${d.status === "On Track" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {d.status}
                  </span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${d.status === "On Track" ? "bg-gold" : "bg-amber-500"}`} style={{ width: `${d.progress}%` }} />
                </div>
                <span className="font-sans text-xs text-muted-foreground mt-1 block">{d.progress}% complete</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
