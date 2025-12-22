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

const AdminDashboard = () => {
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await apiClient.get('/stats');
      return response.data;
    }
  });

  const { data: popularBerita = [] } = useQuery({
    queryKey: ['popular-berita'],
    queryFn: async () => {
      const response = await apiClient.get('/berita');
      return response.data.sort((a: any, b: any) => b.views - a.views).slice(0, 4);
    }
  });

  // Mock data for the chart
  const chartData = [
    { name: 'Mon', views: 400 },
    { name: 'Tue', views: 700 },
    { name: 'Wed', views: 1200 },
    { name: 'Thu', views: 900 },
    { name: 'Fri', views: 1500 },
    { name: 'Sat', views: 2100 },
    { name: 'Sun', views: 1800 },
  ];

  const stats = [
    {
      icon: Users,
      label: "Total Siswa",
      value: statsData?.siswa || 0,
      trend: "Data Aktif",
      isUp: true,
      gradient: "from-blue-500/20 to-blue-600/5",
      iconColor: "text-blue-500"
    },
    {
      icon: Trophy,
      label: "Prestasi Siswa",
      value: statsData?.prestasi || 0,
      trend: "Total Record",
      isUp: true,
      gradient: "from-amber-500/20 to-amber-600/5",
      iconColor: "text-amber-500"
    },
    {
      icon: MessageSquare,
      label: "Pesan Baru",
      value: statsData?.messages || 0,
      trend: "Perlu Cek",
      isUp: statsData?.messages > 0,
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                          {statsLoading ? "..." : stat.value.toLocaleString()}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Charts & Popular Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Area */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Card className="border-none bg-card shadow-soft rounded-[2.5rem] overflow-hidden h-full">
              <CardHeader className="p-8 pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-black italic flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" /> Traffic Analysis
                    </CardTitle>
                    <CardDescription>Statistik interaksi situs dalam 7 hari terakhir</CardDescription>
                  </div>
                  <Badge variant="secondary" className="rounded-xl px-4 py-2 font-bold bg-muted/50 border-none">
                    Realtime Update
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="h-[350px] w-full">
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

          {/* Popular Berita */}
          <motion.div variants={itemVariants}>
            <Card className="border-none bg-card shadow-soft rounded-[2.5rem] overflow-hidden h-full">
              <CardHeader className="p-8">
                <CardTitle className="text-xl font-black italic flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500 fill-amber-500" /> Hot Articles
                </CardTitle>
                <CardDescription>Berita dengan interaksi tertinggi</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 pt-0">
                <div className="space-y-6">
                  {popularBerita.length > 0 ? popularBerita.map((berita: any, idx: number) => (
                    <div key={berita.id} className="group flex items-center gap-4 cursor-pointer">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-muted flex-shrink-0 shadow-soft">
                        <img
                          src={getImageUrl(berita.image)}
                          alt={berita.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-1 left-1 w-5 h-5 bg-white/90 rounded-lg flex items-center justify-center text-[10px] font-black text-primary border border-primary/20">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">{berita.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-primary" /> {berita.views}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary" /> 2h ago</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 hover:text-primary transition-colors">
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )) : (
                    <div className="text-center py-20 text-muted-foreground font-medium italic">
                      No data available
                    </div>
                  )}
                </div>

                <Button variant="outline" className="w-full mt-8 rounded-2xl h-12 border-dashed font-bold uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all">
                  View All News Reports
                </Button>
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
              <p className="text-white/40 text-lg font-light leading-relaxed">Kelola seluruh aspek digital sekolah Nusantara dari satu tempat yang terintegrasi dan aman.</p>
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
    </AdminLayout>
  );
};

export default AdminDashboard;
