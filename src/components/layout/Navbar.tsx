import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Beranda", href: "/" },
  {
    name: "Tentang Kami",
    href: "#",
    submenu: [
      { name: "Profil", href: "/profil" },
      { name: "Struktur Organisasi", href: "/struktur-organisasi" },
      { name: "Fasilitas", href: "/fasilitas" },
      { name: "Hubungan Industri", href: "/hubungan-industri" },
    ]
  },
  { name: "Program", href: "/program" },
  { name: "Berita", href: "/berita" },
  { name: "Galeri", href: "/galeri" },
  { name: "Prestasi", href: "/prestasi" },
  { name: "Kontak", href: "/kontak" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleExpanded = (name: string) => {
    setExpandedMenus(prev =>
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/70 dark:bg-foreground/70 backdrop-blur-xl py-3 border-b border-white/10 shadow-soft"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-foreground flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-elevated">
                <span className="text-background font-black text-2xl">N</span>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-lg flex items-center justify-center text-[10px] text-white"
              >
                <Sparkles size={10} />
              </motion.div>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-black text-2xl tracking-tighter leading-none transition-colors",
                isScrolled ? "text-foreground" : "text-white"
              )}>
                SMK <span className="text-primary italic">N</span>
              </span>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-[0.3em] ml-1",
                isScrolled ? "text-muted-foreground" : "text-white/60"
              )}>
                Nusantara
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 px-2 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || (link.submenu?.some(sub => location.pathname === sub.href));

              if (link.submenu) {
                return (
                  <div
                    key={link.name}
                    className="relative group/dropdown"
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={cn(
                        "relative px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2",
                        isActive
                          ? "text-primary dark:text-white"
                          : isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-active"
                          className="absolute inset-0 bg-primary/10 dark:bg-white/10 rounded-full -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      {link.name}
                      <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", activeDropdown === link.name && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute top-full left-0 mt-4 min-w-[240px] p-2 bg-white dark:bg-foreground rounded-3xl shadow-elevated border border-border overflow-hidden"
                        >
                          {link.submenu.map((sub) => (
                            <Link
                              key={sub.href}
                              to={sub.href}
                              className={cn(
                                "block px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                location.pathname === sub.href
                                  ? "text-primary bg-primary/5"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                              )}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "relative px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300",
                    isActive
                      ? "text-primary dark:text-white"
                      : isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-primary/10 dark:bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA & Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Button
              variant={isScrolled ? "gradient" : "hero"}
              size="lg"
              asChild
              className="rounded-full shadow-glow font-black border-none"
            >
              <Link to="/ppdb" className="tracking-widest uppercase text-xs">Join Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden w-12 h-12 rounded-2xl flex items-center justify-center transition-colors border",
              isScrolled
                ? "bg-muted border-border text-foreground"
                : "bg-white/10 border-white/20 text-white"
            )}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full left-0 right-0 mt-4 px-4 h-screen"
            >
              <div className="bg-foreground rounded-[2rem] p-8 shadow-elevated border border-white/10 backdrop-blur-3xl overflow-y-auto max-h-[80vh]">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link, i) => {
                    const isExpanded = expandedMenus.includes(link.name);
                    const isActive = location.pathname === link.href || (link.submenu?.some(sub => location.pathname === sub.href));

                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {link.submenu ? (
                          <>
                            <button
                              onClick={() => toggleExpanded(link.name)}
                              className={cn(
                                "flex items-center justify-between w-full px-6 py-4 rounded-2xl font-black text-lg uppercase tracking-widest transition-all",
                                isActive ? "text-primary" : "text-white/60"
                              )}
                            >
                              {link.name}
                              <ChevronDown className={cn("w-5 h-5 transition-transform", isExpanded && "rotate-180")} />
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden pl-4"
                                >
                                  {link.submenu.map((sub) => (
                                    <Link
                                      key={sub.href}
                                      to={sub.href}
                                      className={cn(
                                        "block px-6 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all",
                                        location.pathname === sub.href
                                          ? "text-primary bg-primary/10"
                                          : "text-white/40 hover:text-white"
                                      )}
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            to={link.href}
                            className={cn(
                              "block px-6 py-4 rounded-2xl font-black text-lg uppercase tracking-widest transition-all",
                              location.pathname === link.href
                                ? "text-primary bg-primary/10"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                          >
                            {link.name}
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                    className="pt-8 border-t border-white/10 mt-4"
                  >
                    <Button variant="gradient" size="xl" className="w-full rounded-2xl h-16 font-black tracking-widest uppercase" asChild>
                      <Link to="/ppdb">Daftar PPDB</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
