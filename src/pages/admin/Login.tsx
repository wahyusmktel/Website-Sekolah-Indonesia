import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface LoginForm {
  email: string;
  password: string;
}

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    if (data.email === "admin@smknusantara.sch.id" && data.password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      toast({ title: "Login Berhasil", description: "Selamat datang, Admin!" });
      navigate("/admin/dashboard");
    } else {
      toast({ title: "Login Gagal", description: "Email atau password salah", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl shadow-elevated p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">N</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-muted-foreground text-sm mt-2">SMK Nusantara</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  {...register("email", { required: "Email wajib diisi" })}
                  type="email"
                  placeholder="admin@smknusantara.sch.id"
                  className="h-12 pl-12 rounded-xl"
                />
              </div>
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  {...register("password", { required: "Password wajib diisi" })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 pl-12 pr-12 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-sm mt-1">{errors.password.message}</p>}
            </div>

            <Button type="submit" variant="gradient" size="lg" className="w-full">
              Masuk
            </Button>
          </form>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Demo: admin@smknusantara.sch.id / admin123
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
