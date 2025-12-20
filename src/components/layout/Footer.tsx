import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { infoSekolah } from "@/lib/dummy-data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">N</span>
              </div>
              <span className="font-bold text-xl">{infoSekolah.nama}</span>
            </div>
            <p className="text-background/70 mb-6 text-sm leading-relaxed">
              Mencetak generasi unggul, berkarakter, dan siap kerja dengan kurikulum berbasis industri dan fasilitas modern.
            </p>
            <div className="flex gap-3">
              <a
                href={infoSekolah.sosmed.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href={infoSekolah.sosmed.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href={infoSekolah.sosmed.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Youtube size={18} />
              </a>
              <a
                href={infoSekolah.sosmed.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Navigasi</h4>
            <ul className="space-y-3">
              {[
                { name: "Beranda", href: "/" },
                { name: "Profil Sekolah", href: "/profil" },
                { name: "Program Keahlian", href: "/program" },
                { name: "Berita & Artikel", href: "/berita" },
                { name: "Galeri", href: "/galeri" },
                { name: "PPDB Online", href: "/ppdb" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Program Keahlian</h4>
            <ul className="space-y-3">
              {[
                "Rekayasa Perangkat Lunak",
                "Teknik Komputer Jaringan",
                "Multimedia",
                "Akuntansi",
                "Pemasaran",
                "Otomatisasi Perkantoran",
              ].map((program) => (
                <li key={program}>
                  <Link
                    to="/program"
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {program}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-1" />
                <span className="text-background/70 text-sm">{infoSekolah.alamat}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span className="text-background/70 text-sm">{infoSekolah.telp}</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-background/70 text-sm">{infoSekolah.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © {currentYear} {infoSekolah.nama}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-background/60">
              <Link to="/admin/login" className="hover:text-primary transition-colors">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
