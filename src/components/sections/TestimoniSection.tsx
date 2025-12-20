import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import { testimoniList } from "@/lib/dummy-data";

export function TestimoniSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Testimoni
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Apa Kata <span className="text-gradient">Alumni?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dengarkan pengalaman mereka yang telah sukses setelah lulus dari SMK Nusantara
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimoniList.map((testimoni, index) => (
            <motion.div
              key={testimoni.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Quote className="w-5 h-5 text-primary-foreground" />
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6 pt-4">
                "{testimoni.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">
                    {testimoni.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimoni.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimoni.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
