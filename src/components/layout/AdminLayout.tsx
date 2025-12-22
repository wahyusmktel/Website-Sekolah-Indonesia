import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Newspaper, Calendar, GraduationCap, Image, LogOut, Menu, User, Bell, Search, Sparkles, MessageSquareQuote, Award, Quote, Trophy, Users, Handshake, Monitor, Mail, Info, FileText, Settings, Check, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Newspaper, label: "Berita", href: "/admin/berita" },
  { icon: User, label: "Profil Sekolah", href: "/admin/profil" },
  { icon: Users, label: "Struktur Organisasi", href: "/admin/struktur" },
  { icon: GraduationCap, label: "Manajemen Guru", href: "/admin/guru" },
  { icon: Sparkles, label: "Hero Slider", href: "/admin/hero" },
  { icon: Award, label: "Keunggulan", href: "/admin/keunggulan" },
  { icon: Quote, label: "Sambutan", href: "/admin/sambutan" },
  { icon: Trophy, label: "Statistik", href: "/admin/statistik" },
  { icon: Calendar, label: "Agenda", href: "/admin/agenda" },
  { icon: GraduationCap, label: "Program", href: "/admin/program" },
  { icon: Monitor, label: "Fasilitas Sekolah", href: "/admin/fasilitas" },
  { icon: Handshake, label: "Hubungan Industri", href: "/admin/hubungan-industri" },
  { icon: Trophy, label: "Prestasi Siswa", href: "/admin/prestasi" },
  { icon: Mail, label: "Pesan Masuk", href: "/admin/messages" },
  { icon: FileText, label: "Manajemen PPDB", href: "/admin/ppdb" },
  { icon: Info, label: "Info Kontak", href: "/admin/contact-info" },
  { icon: Settings, label: "Pengaturan Web", href: "/admin/settings" },
  { icon: Image, label: "Galeri & Album", href: "/admin/galeri" },
  { icon: MessageSquareQuote, label: "Testimoni", href: "/admin/testimoni" },
  { icon: ShieldCheck, label: "Kebijakan Privasi", href: "/admin/privacy-policy" },
  { icon: Users, label: "Manajemen User", href: "/admin/users", roles: ["superadmin"] },
];

export function AdminLayout({ children, title }: { children: ReactNode, title?: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: settings } = useSiteSettings();

  // Get current user role
  const userStr = localStorage.getItem("adminUser");
  const adminUser = userStr ? JSON.parse(userStr) : null;
  const userRole = adminUser?.role || "kesiswaan"; // Fallback to lowest
  const userName = adminUser?.name || "Administrator";

  // Filter menu items based on role
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.roles) {
      // General rules
      if (userRole === 'superadmin') return true;
      if (userRole === 'hubin') {
        return ['Dashboard', 'Hubungan Industri', 'Testimoni'].includes(item.label);
      }
      if (userRole === 'kesiswaan') {
        return ['Dashboard', 'Prestasi Siswa'].includes(item.label);
      }
      return false;
    }
    return item.roles.includes(userRole);
  });

  // Fetch messages for notifications
  const { data: messages } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: () => apiClient.get('/messages').then(res => res.data),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const unreadMessages = messages?.filter((m: any) => m.is_read === 0) || [];

  const markAsReadMutation = useMutation({
    mutationFn: (id: number) => apiClient.patch(`/messages/${id}/read`, { is_read: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
    }
  });

  const markAllAsRead = async () => {
    try {
      await Promise.all(unreadMessages.map((m: any) => markAsReadMutation.mutateAsync(m.id)));
      toast.success("Semua pesan ditandai telah dibaca");
    } catch (error) {
      toast.error("Gagal memperbarui status pesan");
    }
  };

  const schoolName = settings?.school_name || "SMK Nusantara";

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
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
                <span className="font-black text-slate-800 tracking-tight leading-none uppercase text-lg truncate max-w-[150px]">
                  {schoolName.split(' ')[0]}
                </span>
                <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase truncate max-w-[150px]">
                  {schoolName.split(' ').slice(1).join(' ')}
                </span>
              </div>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1 h-[calc(100vh-200px)] px-5">
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
          <TooltipProvider delayDuration={0}>
            <nav className="space-y-1.5 pb-20">
              {filteredMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          "group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden",
                          isActive
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "text-slate-500 hover:bg-primary/5 hover:text-primary"
                        )}
                      >
                        <Icon className={cn(
                          "w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                          isActive ? "text-white" : "text-slate-400 group-hover:text-primary"
                        )} />
                        {sidebarOpen && <span className="font-bold text-sm tracking-tight">{item.label}</span>}
                      </Link>
                    </TooltipTrigger>
                    {!sidebarOpen && (
                      <TooltipContent side="right" className="bg-primary text-white border-none rounded-xl font-bold shadow-xl">
                        {item.label}
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </nav>
          </TooltipProvider>
        </ScrollArea>

        <div className="absolute bottom-6 left-5 right-5 space-y-4">
          {sidebarOpen && (
            <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-black text-slate-800">
                {userName.charAt(0)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-black text-slate-800 truncate">{userName}</span>
                <span className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-widest italic">{userRole.replace(/([A-Z])/g, ' $1').trim()}</span>
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

            {title && (
              <div className="hidden lg:flex flex-col">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 italic">{title}</h2>
                <div className="h-1 w-8 bg-primary rounded-full mt-0.5" />
              </div>
            )}
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl text-slate-600 hover:bg-slate-50 relative h-11 w-11 shadow-sm border border-slate-100">
                    <Bell className="w-5 h-5" />
                    {unreadMessages.length > 0 && (
                      <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-red-500 text-[10px] font-black text-white flex items-center justify-center rounded-full ring-2 ring-white">
                        {unreadMessages.length > 9 ? '9+' : unreadMessages.length}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-0 border-none shadow-2xl rounded-[2rem] overflow-hidden" align="end" sideOffset={15}>
                  <div className="bg-slate-900 p-6 text-white">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-black italic uppercase tracking-widest text-sm">Notifications</h3>
                      <span className="text-[10px] font-black px-2 py-0.5 bg-primary rounded-full uppercase tracking-tighter italic">Live</span>
                    </div>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                      {unreadMessages.length} Pesan Baru Belum Dibaca
                    </p>
                  </div>

                  <ScrollArea className="max-h-[400px]">
                    <div className="p-2 space-y-1">
                      {unreadMessages.length === 0 ? (
                        <div className="py-12 flex flex-col items-center justify-center text-center px-6">
                          <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-4">
                            <Check className="w-8 h-8 text-slate-300" />
                          </div>
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Tidak ada pesan baru</p>
                        </div>
                      ) : (
                        unreadMessages.map((msg: any) => (
                          <div key={msg.id} className="group p-4 rounded-2xl hover:bg-slate-50 transition-all flex gap-4 border border-transparent hover:border-slate-100 relative">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 font-black text-xs">
                              {msg.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-black text-slate-800 truncate uppercase tracking-tight">{msg.name}</p>
                                <span className="text-[9px] font-bold text-slate-400">{format(new Date(msg.created_at), 'HH:mm')}</span>
                              </div>
                              <p className="text-[11px] font-bold text-slate-600 line-clamp-1 italic">"{msg.subject}"</p>
                              <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{msg.message}</p>
                            </div>
                            <button
                              onClick={() => markAsReadMutation.mutate(msg.id)}
                              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-emerald-500/20"
                              title="Tandai dibaca"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>

                  {unreadMessages.length > 0 && (
                    <div className="p-4 border-t border-slate-50 bg-slate-50/50">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="w-full rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 gap-2"
                      >
                        Tandai Semua Telah Dibaca
                        <Check className="w-3 h-3" />
                      </Button>
                    </div>
                  )}

                  <div className="p-4 bg-slate-50/30">
                    <Button variant="link" className="w-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors" asChild>
                      <Link to="/admin/messages">Lihat Semua Pesan</Link>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl text-slate-600 hover:bg-slate-50 h-11 w-11" asChild>
                    <Link to="/admin/profile">
                      <User className="w-5 h-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Profil Admin</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="h-8 w-px bg-slate-100 mx-2" />
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">Active Session</p>
              <p className="text-xs font-bold text-slate-600">{schoolName} Portal</p>
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
