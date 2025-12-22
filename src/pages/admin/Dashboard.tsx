import { motion } from "framer-motion";
import { Users, Newspaper, Trophy, MessageSquare, Calendar, TrendingUp, Eye, ArrowUpRight, ArrowDownRight, Clock, Plus, Zap, LayoutDashboard, Bell, Image } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { getImageUrl } from "@/lib/image-utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSiteSettings } from "@/hooks/use-site-settings";

const AdminDashboard = () => {
  const { data: analyticsData, isLoading: analyticsLoading } = useQuery({
    queryKey: ['visitor-stats'],
    queryFn: async () => {
      const response = await apiClient.get('/admin/visitor-stats');
      return response.data;
    }
  });

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await apiClient.get('/stats');
      return response.data;
    }
  });

  const { data: settings } = useSiteSettings();
  const schoolName = settings?.school_name || "SMK Nusantara";

  const { data: popularBerita = [] } = useQuery({
    queryKey: ['popular-berita'],
    queryFn: async () => {
      const response = await apiClient.get('/berita');
      return response.data.sort((a: any, b: any) => b.views - a.views).slice(0, 4);
    }
  });

  // Process chart data from analytics
  const chartData = analyticsData?.dailyTimeline?.map((item: any) => ({
    name: new Date(item.date).toLocaleDateString('id-ID', { weekday: 'short' }),
    views: item.count
  })) || [];

  const stats = [
    {
      icon: Eye,
      label: "Visitors Today",
      value: analyticsData?.summary?.today || 0,
      trend: "Realtime",
      isUp: true,
      gradient: "from-blue-500/20 to-blue-600/5",
      iconColor: "text-blue-500"
    },
    {
      icon: Users,
      label: "Total Visitors",
      value: analyticsData?.summary?.total || 0,
      trend: "All Time",
      isUp: true,
      gradient: "from-emerald-500/20 to-emerald-600/5",
      iconColor: "text-emerald-500"
    },
    {
      icon: TrendingUp,
      label: "Page Views",
      value: analyticsData?.summary?.totalViews || 0,
      trend: "Total Interactions",
      isUp: true,
      gradient: "from-amber-500/20 to-amber-600/5",
      iconColor: "text-amber-500"
    },
    {
      icon: MessageSquare,
      label: "Pesan Baru",
      value: statsData?.messages || 0,
      trend: "Perlu Cek",
      isUp: (statsData?.messages || 0) > 0,
      gradient: "from-rose-500/20 to-rose-600/5",
      iconColor: "text-rose-500"
    },
    {
      icon: Newspaper,
      label: "Artikel Berita",
      value: statsData?.berita || 0,
      trend: "Publikasi",
      isUp: true,
      gradient: "from-primary/20 to-primary/5",
      iconColor: "text-primary"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <AdminLayout>
      <motion.div
        className="space-y-8 pb-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-2">
              <LayoutDashboard className="w-3 h-3" /> System Overview
            </div>
            <h1 className="text-4xl font-black text-foreground tracking-tight italic">
              Welcome back, <span className="text-primary not-italic">Admin!</span>
            </h1>
            <p className="text-muted-foreground mt-1">Laporan analitik dan ringkasan aktivitas sekolah hari ini.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-2xl h-12 w-12 border-none bg-card shadow-soft relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full ring-4 ring-background" />
            </Button>
            <Button className="rounded-2xl h-12 px-6 bg-gradient-primary shadow-glow font-bold gap-2">
              <Plus className="w-4 h-4" /> Quick Action
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} variants={itemVariants}>
                <Card className="border-none bg-card shadow-soft overflow-hidden group hover:shadow-elevated transition-all duration-500 rounded-[2rem]">
                  <CardContent className="p-0">
                    <div className={`h-2 w-full bg-gradient-to-r ${stat.gradient.replace('/20', '').replace('/5', '')}`} />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} ${stat.iconColor}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.isUp ? 'text-emerald-500' : 'text-primary'}`}>
                          {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {stat.trend}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                        <h3 className="text-3xl font-black text-foreground">
                          {(analyticsLoading || statsLoading) ? "..." : stat.value.toLocaleString()}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Traffic Chart */}
        <motion.div variants={itemVariants}>
          <Card className="border-none bg-card shadow-soft rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-black italic flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" /> Traffic Analysis
                  </CardTitle>
                  <CardDescription>Statistik interaksi situs dalam 14 hari terakhir</CardDescription>
                </div>
                <Badge variant="secondary" className="rounded-xl px-4 py-2 font-bold bg-muted/50 border-none">
                  Realtime Stats
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 700 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 700 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        borderRadius: '20px',
                        border: 'none',
                        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                        fontWeight: 800
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="hsl(var(--primary))"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorViews)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Visitor Activity & Popular Pages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Latest Visitors */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Card className="border-none bg-card shadow-soft rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-black italic flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" /> Latest Activity
                    </CardTitle>
                    <CardDescription>Log pengunjung terbaru secara realtime</CardDescription>
                  </div>
                  <Badge variant="outline" className="rounded-xl border-primary/20 text-primary font-bold">
                    IP TRACKING ACTIVE
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8 pt-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border/50">
                        <th className="pb-4 pt-2">IP Address</th>
                        <th className="pb-4 pt-2">Target Path</th>
                        <th className="pb-4 pt-2">Time</th>
                        <th className="pb-4 pt-2">Device</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData?.latestVisits?.length > 0 ? analyticsData.latestVisits.map((visit: any) => (
                        <tr key={visit.id} className="border-b border-border/30 last:border-0 group hover:bg-muted/30 transition-colors">
                          <td className="py-4">
                            <span className="font-mono text-xs font-bold bg-muted px-2 py-1 rounded-md text-slate-600">
                              {visit.ip_address.replace('::ffff:', '')}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className="text-xs font-medium text-slate-800 italic underline decoration-primary/20">{visit.path}</span>
                          </td>
                          <td className="py-4 text-xs text-muted-foreground">
                            {new Date(visit.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-1.5 overflow-hidden max-w-[150px]">
                              <span className="text-[9px] font-medium text-muted-foreground truncate" title={visit.user_agent}>
                                {visit.user_agent || 'Unknown Device'}
                              </span>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} className="py-10 text-center text-muted-foreground italic">Fetching data...</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Popular Pages */}
          <motion.div variants={itemVariants}>
            <Card className="border-none bg-card shadow-soft rounded-[2.5rem] overflow-hidden h-full">
              <CardHeader className="p-8">
                <CardTitle className="text-xl font-black italic flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" /> Popular Pages
                </CardTitle>
                <CardDescription>Halaman yang paling sering dikunjungi</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 pt-0">
                <div className="space-y-4">
                  {analyticsData?.topPages?.map((page: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 hover:bg-primary/5 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center font-black text-xs text-primary shadow-soft">
                          {idx + 1}
                        </div>
                        <span className="text-xs font-bold text-slate-800 line-clamp-1">{page.path}</span>
                      </div>
                      <Badge variant="secondary" className="bg-white/80 font-black text-[10px] text-primary">
                        {page.count} <Eye className="w-2.5 h-2.5 ml-1" />
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* System Status / Quick Links */}
        <motion.div variants={itemVariants} className="bg-foreground text-white rounded-[3rem] p-12 relative overflow-hidden shadow-elevated">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-primary/20 text-primary-light border-none px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-glow">
                Database Synced
              </Badge>
              <h2 className="text-4xl font-black mb-4 leading-tight italic">Eksplorasi <span className="text-primary not-italic">Potensi Sekolah</span> Lebih Jauh.</h2>
              <p className="text-white/40 text-lg font-light leading-relaxed">Kelola seluruh aspek digital {schoolName} dari satu tempat yang terintegrasi dan aman.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Create Post', icon: Plus },
                { label: 'Media Library', icon: Image },
                { label: 'Event Planner', icon: Calendar },
                { label: 'User Analytics', icon: Users }
              ].map((link) => (
                <button key={link.label} className="p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-primary hover:border-primary transition-all text-left flex flex-col gap-4 group shadow-soft">
                  <link.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  <span className="font-bold uppercase tracking-widest text-[10px] text-white/60 group-hover:text-white">{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AdminLayout >
  );
};

export default AdminDashboard;
