import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Newspaper, Calendar, GraduationCap, Image, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Newspaper, label: "Berita", href: "/admin/berita" },
  { icon: Calendar, label: "Agenda", href: "/admin/agenda" },
  { icon: GraduationCap, label: "Program", href: "/admin/program" },
  { icon: Image, label: "Galeri", href: "/admin/galeri" },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-card shadow-soft z-40 transition-all duration-300",
        sidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold">N</span>
            </div>
            {sidebarOpen && <span className="font-bold text-foreground">Admin Panel</span>}
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                  isActive
                    ? "bg-gradient-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-all w-full"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={cn("flex-1 transition-all duration-300", sidebarOpen ? "ml-64" : "ml-20")}>
        <header className="h-16 bg-card shadow-soft flex items-center justify-between px-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-muted">
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-muted-foreground text-sm">Admin SMK Nusantara</span>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
