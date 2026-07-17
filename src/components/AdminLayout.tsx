import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FolderOpen, Image, Star, MessageSquare, Settings, Menu, X, LogOut, Bell, Search, Layers, ExternalLink } from "lucide-react";
import Logo from "./Logo";
import { clearAuthToken, getAuthToken } from "@/lib/api";

const sidebarLinks = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { label: "Projects", icon: FolderOpen, to: "/admin/projects" },
  { label: "Hero Images", icon: Layers, to: "/admin/hero-images" },
  { label: "Media", icon: Image, to: "/admin/media" },
  { label: "Reviews", icon: Star, to: "/admin/reviews" },
  { label: "Inquiries", icon: MessageSquare, to: "/admin/inquiries" },
  { label: "Settings", icon: Settings, to: "/admin/settings" },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!getAuthToken()) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-sidebar-border">
        <Logo size="md" />
        <p className="font-sans text-[10px] text-sidebar-foreground/40 uppercase tracking-widest mt-2">Admin Panel</p>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-sans text-sm transition-all ${
                active
                  ? "bg-gold text-charcoal font-semibold shadow-md shadow-gold/20"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border space-y-0.5">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-sans text-sm text-sidebar-foreground/50 hover:text-gold hover:bg-sidebar-accent transition-colors"
        >
          <ExternalLink size={18} />
          View Website
        </a>
        <Link
          to="/admin/login"
          onClick={() => clearAuthToken()}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-sans text-sm text-sidebar-foreground/50 hover:text-gold hover:bg-sidebar-accent transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-secondary">
      <aside className="hidden md:flex w-64 flex-col bg-sidebar fixed h-full border-r border-sidebar-border">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full bg-sidebar flex flex-col">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-sidebar-foreground"><X size={18} /></button>
            <SidebarContent />
          </aside>
        </div>
      )}

      <main className="flex-1 md:ml-64 min-h-screen">
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="md:hidden text-foreground"><Menu size={20} /></button>
            <div className="relative hidden sm:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Search..." className="pl-9 pr-4 py-2 bg-secondary border border-border rounded-lg text-foreground font-sans text-sm focus:border-gold focus:outline-none w-64" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell size={18} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="w-9 h-9 rounded-full bg-gold text-charcoal flex items-center justify-center font-semibold text-sm">A</div>
              <div className="hidden sm:block">
                <p className="font-sans text-sm font-semibold text-foreground leading-tight">Admin</p>
                <p className="font-sans text-xs text-muted-foreground leading-tight">Studio Owner</p>
              </div>
            </div>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
