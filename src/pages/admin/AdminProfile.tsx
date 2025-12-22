import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Lock, Save, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import apiClient from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";

const AdminProfile = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

    // Form states
    const [profileForm, setProfileForm] = useState({
        name: currentUser.name || "",
        username: currentUser.username || "",
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await apiClient.put(`/admin/profile/${currentUser.id}`, {
                name: profileForm.name,
                username: profileForm.username,
            });

            // Update localStorage
            const updatedUser = { ...currentUser, name: profileForm.name, username: profileForm.username };
            localStorage.setItem("adminUser", JSON.stringify(updatedUser));

            toast({
                title: "Profil berhasil diperbarui",
                description: "Data profil Anda telah diperbarui.",
            });
        } catch (error: any) {
            toast({
                title: "Gagal memperbarui profil",
                description: error.response?.data?.message || "Terjadi kesalahan",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast({
                title: "Password tidak cocok",
                description: "Password baru dan konfirmasi password harus sama.",
                variant: "destructive",
            });
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            toast({
                title: "Password terlalu pendek",
                description: "Password minimal 6 karakter.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            await apiClient.put(`/admin/password/${currentUser.id}`, {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
            });

            toast({
                title: "Password berhasil diubah",
                description: "Password Anda telah diperbarui.",
            });

            // Reset form
            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error: any) {
            toast({
                title: "Gagal mengubah password",
                description: error.response?.data?.message || "Password lama tidak sesuai",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
                        Profil Admin
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Kelola informasi akun dan keamanan Anda
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Profile Information Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Card className="border-slate-200 shadow-lg">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <User className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-black">Informasi Profil</CardTitle>
                                        <CardDescription>Perbarui nama dan username Anda</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleProfileUpdate} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-bold text-slate-700">
                                            Nama Lengkap
                                        </Label>
                                        <Input
                                            id="name"
                                            value={profileForm.name}
                                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                            placeholder="Masukkan nama lengkap"
                                            className="h-12 rounded-xl border-slate-200 focus:border-primary"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="username" className="text-sm font-bold text-slate-700">
                                            Username
                                        </Label>
                                        <Input
                                            id="username"
                                            value={profileForm.username}
                                            onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                                            placeholder="Masukkan username"
                                            className="h-12 rounded-xl border-slate-200 focus:border-primary"
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-12 rounded-xl bg-primary hover:bg-primary-dark font-bold text-sm"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        {loading ? "Menyimpan..." : "Simpan Perubahan"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Password Change Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="border-slate-200 shadow-lg">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                                        <Lock className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-black">Ubah Password</CardTitle>
                                        <CardDescription>Perbarui password untuk keamanan akun</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword" className="text-sm font-bold text-slate-700">
                                            Password Lama
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="currentPassword"
                                                type={showCurrentPassword ? "text" : "password"}
                                                value={passwordForm.currentPassword}
                                                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                                placeholder="Masukkan password lama"
                                                className="h-12 rounded-xl border-slate-200 focus:border-primary pr-12"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                            >
                                                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword" className="text-sm font-bold text-slate-700">
                                            Password Baru
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="newPassword"
                                                type={showNewPassword ? "text" : "password"}
                                                value={passwordForm.newPassword}
                                                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                                placeholder="Masukkan password baru"
                                                className="h-12 rounded-xl border-slate-200 focus:border-primary pr-12"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                            >
                                                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword" className="text-sm font-bold text-slate-700">
                                            Konfirmasi Password Baru
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={passwordForm.confirmPassword}
                                                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                                placeholder="Konfirmasi password baru"
                                                className="h-12 rounded-xl border-slate-200 focus:border-primary pr-12"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700 font-bold text-sm"
                                    >
                                        <Lock className="w-4 h-4 mr-2" />
                                        {loading ? "Mengubah..." : "Ubah Password"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card className="border-blue-200 bg-blue-50/50">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-blue-900">Tips Keamanan</h3>
                                    <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                                        <li>Gunakan password yang kuat dengan kombinasi huruf, angka, dan simbol</li>
                                        <li>Jangan gunakan password yang sama dengan akun lain</li>
                                        <li>Ubah password secara berkala untuk keamanan maksimal</li>
                                        <li>Jangan bagikan informasi login Anda kepada siapapun</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </AdminLayout>
    );
};

export default AdminProfile;
