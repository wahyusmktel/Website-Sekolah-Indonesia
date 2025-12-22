import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Public Pages
import Index from "./pages/Index";
import Profil from "./pages/Profil";
import Program from "./pages/Program";
import Berita from "./pages/Berita";
import BeritaDetail from "./pages/BeritaDetail";
import Galeri from "./pages/Galeri";
import AlbumDetail from "./pages/AlbumDetail";
import StrukturOrganisasi from "./pages/StrukturOrganisasi";
import Fasilitas from "./pages/Fasilitas";
import HubunganIndustri from "./pages/HubunganIndustri";
import Kontak from "./pages/Kontak";
import PPDB from "./pages/PPDB";
import Prestasi from "./pages/Prestasi";
import PrestasiDetail from "./pages/PrestasiDetail";
import Guru from "./pages/Guru";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminBerita from "./pages/admin/Berita";
import AdminAgenda from "./pages/admin/Agenda";
import AdminProgram from "./pages/admin/Program";
import AdminGaleri from "./pages/admin/Galeri";
import AdminKategori from "./pages/admin/Kategori";
import AdminTestimoni from "./pages/admin/Testimoni";
import AdminHero from "./pages/admin/Hero";
import AdminKeunggulan from "./pages/admin/Keunggulan";
import AdminSambutan from "./pages/admin/Sambutan";
import AdminStatistik from "./pages/admin/Statistik";
import AdminProfil from "./pages/admin/Profil";
import AdminStruktur from "./pages/admin/Struktur";
import AdminGuru from "./pages/admin/Guru";
import AdminFasilitas from "./pages/admin/Fasilitas";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/fasilitas" element={<Fasilitas />} />
            <Route path="/hubungan-industri" element={<HubunganIndustri />} />
            <Route path="/tentang-kami/guru" element={<Guru />} />
            <Route path="/tentang-kami/struktur-organisasi" element={<StrukturOrganisasi />} />
            <Route path="/program" element={<Program />} />
            <Route path="/berita" element={<Berita />} />
            <Route path="/berita/:slug" element={<BeritaDetail />} />
            <Route path="/galeri" element={<Galeri />} />
            <Route path="/galeri/:slug" element={<AlbumDetail />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/ppdb" element={<PPDB />} />
            <Route path="/prestasi" element={<Prestasi />} />
            <Route path="/prestasi/:slug" element={<PrestasiDetail />} />

            {/* Admin Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/admin/login" element={<AdminLogin />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/berita" element={<AdminBerita />} />
              <Route path="/admin/agenda" element={<AdminAgenda />} />
              <Route path="/admin/program" element={<AdminProgram />} />
              <Route path="/admin/galeri" element={<AdminGaleri />} />
              <Route path="/admin/kategori" element={<AdminKategori />} />
              <Route path="/admin/testimoni" element={<AdminTestimoni />} />
              <Route path="/admin/hero" element={<AdminHero />} />
              <Route path="/admin/keunggulan" element={<AdminKeunggulan />} />
              <Route path="/admin/sambutan" element={<AdminSambutan />} />
              <Route path="/admin/statistik" element={<AdminStatistik />} />
              <Route path="/admin/profil" element={<AdminProfil />} />
              <Route path="/admin/struktur" element={<AdminStruktur />} />
              <Route path="/admin/guru" element={<AdminGuru />} />
              <Route path="/admin/fasilitas" element={<AdminFasilitas />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
