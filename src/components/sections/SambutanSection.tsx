import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { getImageUrl } from "@/lib/image-utils";

export function SambutanSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const { data: sambutan, isLoading } = useQuery({
        queryKey: ['sambutan'],
        queryFn: async () => {
            const response = await apiClient.get('/sambutan');
            return response.data;
        }
    });

    // We keep the section and ref stable so useInView works correctly
    return (
        <section className="py-24 relative overflow-hidden min-h-[400px]" ref={ref}>
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
                <svg width="100%" height="100%">
                    <pattern id="dots-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#dots-pattern)" />
                </svg>
            </div>

            <div className="container mx-auto px-4">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    </div>
                ) : !sambutan ? (
                    null
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Principal Image with Geometric Decor */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: -0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-elevated aspect-[4/5] max-w-md mx-auto">
                                <img
                                    src={getImageUrl(sambutan.principal_image)}
                                    alt={sambutan.principal_name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                                <div className="absolute bottom-10 left-10 right-10">
                                    <p className="text-white font-black text-2xl mb-1">{sambutan.principal_name}</p>
                                    <p className="text-primary-light font-bold text-xs uppercase tracking-[0.2em]">{sambutan.principal_role}</p>
                                </div>
                            </div>

                            {/* Geometric Shapes */}
                            <div className="absolute -top-10 -left-10 w-40 h-40 border-[20px] border-primary/10 rounded-full -z-0" />
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-[3rem] rotate-12 -z-0" />
                            <div className="absolute top-1/2 -right-20 w-40 h-40 bg-foreground/5 rounded-3xl rotate-45 -z-0 animate-pulse-slow" />
                        </motion.div>

                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <Quote className="w-20 h-20 text-primary/10 absolute -top-10 -left-6" />

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-8">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                Sambutan Kepala Sekolah
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8 leading-tight">
                                {sambutan.title}
                            </h2>

                            <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
                                {sambutan.greeting && (
                                    <p>
                                        "{sambutan.greeting}"
                                    </p>
                                )}
                                <div className="whitespace-pre-line">
                                    {sambutan.content}
                                </div>
                                {sambutan.quote_footer && (
                                    <p className="font-bold text-foreground italic">
                                        {sambutan.quote_footer}
                                    </p>
                                )}
                            </div>

                            <div className="mt-12 flex items-center gap-6">
                                <div className="w-16 h-[2px] bg-primary" />
                                <div className="text-sm font-black uppercase tracking-[0.3em] text-foreground/40">Leader Excellence</div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
}
