import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Newspaper, Calendar, GraduationCap, Image, LogOut, Menu, User, Bell, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Newspaper, label: "Berita", href: "/admin/berita" },
  { icon: Calendar, label: "Agenda", href: "/admin/agenda" },
  { icon: GraduationCap, label: "Program", href: "/admin/program" },
  { icon: Image, label: "Galeri & Album", href: "/admin/galeri" },
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
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-slate-100 z-40 transition-all duration-300 ease-in-out shadow-[10px_0_30px_-15px_rgba(0,0,0,0.05)]",
        sidebarOpen ? "w-72" : "w-24"
      )}>
        <div className="h-20 flex items-center px-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="font-black text-slate-800 tracking-tight leading-none uppercase text-lg">Sekolah</span>
                <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">Nusantara</span>
              </div>
            )}
          </div>
        </div>

        <div className="px-5 py-6">
          <div className={cn(
            "mb-6 px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2",
            !sidebarOpen && "justify-center px-0"
          )}>
            {sidebarOpen ? (
              <>General <div className="h-px flex-1 bg-slate-100" /></>
            ) : (
              "MENU"
            )}
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden",
                    isActive
                      ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-0 w-1 h-full bg-primary"
                    />
                  )}
                  <Icon className={cn(
                    "w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                    isActive ? "text-primary-light" : "text-slate-400 group-hover:text-primary"
                  )} />
                  {sidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-6 left-5 right-5 space-y-4">
          {sidebarOpen && (
            <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-black text-slate-800">
                A
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-black text-slate-800 truncate">Administrator</span>
                <span className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-widest italic">Super Admin</span>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all w-full font-bold text-sm group",
              !sidebarOpen && "justify-center"
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 transition-all duration-300 min-h-screen",
        sidebarOpen ? "ml-72" : "ml-24"
      )}>
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-xl hover:bg-slate-50 text-slate-600 h-11 w-11 border border-slate-100 shadow-sm"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100 w-80 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-transparent border-none outline-none text-sm font-medium w-full text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="rounded-xl text-slate-600 hover:bg-slate-50 relative h-11 w-11">
                <Bell className="w-5 h-5" />
                <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-red-500 rounded-full ring-4 ring-white" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl text-slate-600 hover:bg-slate-50 h-11 w-11">
                <User className="w-5 h-5" />
              </Button>
            </div>
            <div className="h-8 w-px bg-slate-100 mx-2" />
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">Active Session</p>
              <p className="text-xs font-bold text-slate-600">SMK Nusantara Portal</p>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
