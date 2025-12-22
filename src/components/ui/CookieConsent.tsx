import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Cek apakah user sudah pernah memberikan persetujuan
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Munculkan setelah delay singkat untuk efek dramatis
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = (type: "all" | "once") => {
        localStorage.setItem("cookie-consent", type);
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 right-6 z-[9999] flex justify-center pointer-events-none"
                >
                    <div className="w-full max-w-5xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] p-6 md:p-8 pointer-events-auto relative overflow-hidden group">
                        {/* Background Decorative Element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />

                        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                            {/* Icon Section */}
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary relative">
                                    <Cookie size={32} className="animate-bounce-slow" />
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center">
                                        <ShieldCheck size={10} className="text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-lg font-black italic uppercase tracking-tight text-foreground flex items-center justify-center md:justify-start gap-2">
                                    Privasi <span className="text-primary not-italic">& Cookies</span>
                                </h3>
                                <p className="text-sm text-muted-foreground font-medium mt-1 leading-relaxed max-w-2xl">
                                    Website kami menggunakan cookies untuk meningkatkan pengalaman navigasi Anda dan menganalisis trafik.
                                    Dengan melanjutkan, Anda menyetujui kebijakan penggunaan cookie kami sesuai dengan standar privasi global.
                                    Pelajari selengkapnya di <Link to="/privacy-policy" className="text-primary font-bold hover:underline">Kebijakan Privasi</Link>.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap justify-center gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => handleAccept("once")}
                                    className="rounded-2xl border-2 border-primary/20 hover:bg-primary/5 font-black uppercase tracking-widest text-[10px] px-6 h-12"
                                >
                                    Izinkan Sekali saja
                                </Button>
                                <Button
                                    onClick={() => handleAccept("all")}
                                    className="rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] px-8 h-12 shadow-glow gap-2"
                                >
                                    Izinkan Semua Cookies
                                    <ChevronRight size={14} />
                                </Button>
                            </div>

                            {/* Close Button Only */}
                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute top-0 right-0 p-2 text-muted-foreground/40 hover:text-primary transition-colors"
                                title="Tutup untuk sementara"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
