import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { infoSekolah } from "@/lib/dummy-data";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/use-site-settings";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: settings } = useSiteSettings();

  const schoolName = settings?.school_name || "SMK Nusantara";
  const baseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL?.replace('/api', '');
  const schoolLogo = settings?.school_logo ? `${baseUrl}${settings.school_logo}` : null;

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative Geometric Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/5 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]" />

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* About */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-glow overflow-hidden">
                {schoolLogo ? (
                  <img src={schoolLogo} alt={schoolName} className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="text-foreground font-black text-2xl">{schoolName.charAt(0)}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter leading-none text-white max-w-[200px] truncate">
                  {schoolName.split(' ')[0]} <span className="text-primary italic">{schoolName.split(' ')[1]?.charAt(0)}</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 truncate max-w-[150px]">
                  {schoolName.split(' ').slice(1).join(' ')}
                </span>
              </div>
            </Link>

            <p className="text-white/50 text-base font-light leading-relaxed">
              Membangun masa depan melalui inovasi pendidikan vokasi yang relevan dengan kebutuhan industri global.
            </p>

            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: infoSekolah.sosmed.facebook },
                { Icon: Instagram, href: infoSekolah.sosmed.instagram },
                { Icon: Youtube, href: infoSekolah.sosmed.youtube },
                { Icon: Twitter, href: infoSekolah.sosmed.twitter },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: "white" }}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-primary transition-all duration-300"
                >
                  <social.Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-10 pb-2 border-b-2 border-primary w-fit">Explore</h4>
            <ul className="space-y-4">
              {[
                { name: "Beranda", href: "/" },
                { name: "Profil Sekolah", href: "/profil" },
                { name: "Program Keahlian", href: "/program" },
                { name: "Berita & Artikel", href: "/berita" },
                { name: "Galeri Sekolah", href: "/galeri" },
                { name: "Portal PPDB", href: "/ppdb" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/50 hover:text-primary transition-all duration-300 text-sm font-medium flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-10 pb-2 border-b-2 border-primary w-fit">Support</h4>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <span className="text-white/50 text-sm font-light leading-relaxed">{infoSekolah.alamat}</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <span className="text-white/50 text-sm font-light">{infoSekolah.telp}</span>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <span className="text-white/50 text-sm font-light">{infoSekolah.email}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col items-center justify-center text-center">
              <Sparkles className="text-primary w-10 h-10 mb-4 animate-pulse" />
              <h5 className="text-white font-bold mb-2">Punya Pertanyaan?</h5>
              <p className="text-white/40 text-xs mb-6">Tim admin kami siap membantu proses pendaftaran Anda.</p>
              <Button variant="hero" className="w-full rounded-2xl font-black text-xs uppercase tracking-widest" asChild>
                <Link to="/kontak">Hubungi Kami</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
              © {currentYear} {schoolName}. Crafted with <span className="text-primary">♥</span> and Code.
            </p>
            <div className="flex gap-8">
              <Link to="/admin/login" className="text-white/30 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
                System Access
              </Link>
              <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
