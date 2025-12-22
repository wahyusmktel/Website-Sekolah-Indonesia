import { useState, useEffect } from "react";
import {
    Loader2, Save, Image as ImageIcon, Search,
    Type, Globe, Trash2, Rocket, Share2
} from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminSettings = () => {
    const queryClient = useQueryClient();
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const { data: settings, isLoading } = useQuery({
        queryKey: ['site-settings'],
        queryFn: () => apiClient.get('/settings').then(res => res.data)
    });

    const getFullImageUrl = (path: string) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        const baseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL.replace('/api', '');
        return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
    };

    useEffect(() => {
        if (settings?.school_logo) {
            setLogoPreview(getFullImageUrl(settings.school_logo));
        }
    }, [settings]);

    const mutation = useMutation({
        mutationFn: (data: any) => apiClient.put('/settings', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['site-settings'] });
            toast.success("Pengaturan website berhasil diperbarui");
        },
        onError: (error: any) => {
            toast.error("Gagal memperbarui pengaturan: " + (error.response?.data?.message || error.message));
        }
    });

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Ukuran file terlalu besar (maksimal 2MB)");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        setIsUploading(true);
        try {
            const response = await apiClient.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setLogoPreview(getFullImageUrl(response.data.url));
            toast.success("Logo berhasil diupload");
        } catch (error) {
            toast.error("Gagal mengupload logo");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            school_name: formData.get('school_name'),
            school_logo: logoPreview
                ? logoPreview.replace(import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL.replace('/api', ''), '')
                : null,
            seo_keywords: formData.get('seo_keywords'),
            seo_description: formData.get('seo_description'),
        };
        mutation.mutate(data);
    };

    if (isLoading) {
        return (
            <AdminLayout title="General Settings">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="General Settings">
            <div className="space-y-8 max-w-5xl mx-auto pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-foreground italic uppercase">
                            General <span className="text-primary not-italic">Settings</span>
                        </h1>
                        <p className="text-muted-foreground mt-1">Konfigurasi branding sekolah dan optimasi SEO website.</p>
                    </div>
                    <Badge variant="outline" className="w-fit py-1.5 px-4 rounded-full bg-primary/5 text-primary border-primary/20 font-black italic uppercase tracking-tighter">
                        v1.0.4 - Production Ready
                    </Badge>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Branding Section */}
                    <Card className="border-none shadow-soft rounded-[3rem] overflow-hidden bg-white">
                        <CardContent className="p-10 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Type className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-black italic uppercase text-lg tracking-tight">Identity & Branding</h3>
                                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Identitas dasar sekolah anda</p>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-10">
                                {/* School Name */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-2 text-muted-foreground/60">Nama Sekolah</Label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none group-focus-within:text-primary transition-colors text-muted-foreground/40 z-10">
                                                <Rocket className="w-5 h-5" />
                                            </div>
                                            <Input
                                                name="school_name"
                                                defaultValue={settings?.school_name}
                                                required
                                                placeholder="Contoh: SMK Telkom Lampung"
                                                className="h-16 pl-16 rounded-2xl bg-foreground/5 border-none px-6 font-black text-lg focus:ring-2 focus:ring-primary/20 transition-all uppercase tracking-tight w-full relative z-0"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground italic px-2">
                                        * Nama ini akan muncul di Judul Tab Browser, Header, dan Footer website.
                                    </p>
                                </div>

                                {/* School Logo */}
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-2 text-muted-foreground/60">Logo Sekolah</Label>
                                    <div className="flex items-start gap-6">
                                        <div className="relative w-32 h-32 rounded-[2rem] bg-foreground/5 border-2 border-dashed border-foreground/10 flex items-center justify-center overflow-hidden transition-all hover:border-primary/50 group">
                                            {logoPreview ? (
                                                <>
                                                    <img src={logoPreview} alt="Preview Logo" className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setLogoPreview(null)}
                                                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                                                    >
                                                        <Trash2 className="w-6 h-6" />
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="text-muted-foreground/40 flex flex-col items-center gap-2">
                                                    <ImageIcon className="w-8 h-8" />
                                                    <span className="text-[8px] font-black uppercase tracking-widest">No Logo</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    id="logo-upload"
                                                    onChange={handleLogoUpload}
                                                    accept="image/*"
                                                    className="hidden"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    disabled={isUploading}
                                                    onClick={() => document.getElementById('logo-upload')?.click()}
                                                    className="w-full h-12 rounded-xl border-2 border-primary/20 hover:bg-primary/5 hover:border-primary text-primary font-bold transition-all gap-2"
                                                >
                                                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                                                    {logoPreview ? 'Ganti Logo' : 'Upload Logo'}
                                                </Button>
                                            </div>
                                            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100 space-y-1">
                                                <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-1">
                                                    <Share2 className="w-2 h-2" /> Tips Branding
                                                </p>
                                                <p className="text-[10px] text-orange-800 leading-relaxed font-medium">
                                                    Gunakan file PNG transparan untuk hasil terbaik di Header yang berwarna-warni.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* SEO Section */}
                    <Card className="border-none shadow-soft rounded-[3rem] overflow-hidden bg-slate-900 text-white">
                        <CardContent className="p-10 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-glow">
                                    <Search className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-black italic uppercase text-lg tracking-tight">Search Engine Optimization</h3>
                                    <p className="text-xs text-primary/70 uppercase font-bold tracking-widest">Tingkatkan visibilitas di Google Search</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Keywords */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-2 text-white/40">SEO Keywords</Label>
                                        <Badge variant="outline" className="text-[8px] border-white/20 text-white/60 font-black">REKOMENDASI: 10-15 KATA</Badge>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute top-8 left-6 text-primary group-focus-within:text-primary transition-colors z-10 pointer-events-none">
                                            <Globe className="w-5 h-5" />
                                        </div>
                                        <Textarea
                                            name="seo_keywords"
                                            defaultValue={settings?.seo_keywords}
                                            placeholder="sekolah, smk, pendaftaran 2025, kejuruan, teknik, ..."
                                            className="min-h-[120px] pl-16 pr-8 py-8 rounded-[2rem] bg-white/5 border-none font-bold text-white placeholder:text-white/20 focus:ring-2 focus:ring-primary/50 transition-all resize-none shadow-inner relative z-0"
                                        />
                                    </div>
                                    <p className="text-[10px] text-white/40 italic px-2">
                                        * Gunakan tanda koma (,) untuk memisahkan antar kata kunci.
                                    </p>
                                </div>

                                {/* Meta Description */}
                                <div className="space-y-3 pt-4 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-2 text-white/40">Meta Description</Label>
                                        <Badge variant="outline" className="text-[8px] border-white/20 text-white/60 font-black tracking-widest">GOogle snippet preview</Badge>
                                    </div>
                                    <div className="rounded-[2.5rem] bg-white p-6 space-y-4 shadow-2xl">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                                                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                                                </div>
                                                <span className="text-xs font-bold text-slate-400">google.com/search?q={settings?.school_name?.toLowerCase().replace(/\s+/g, '-')}</span>
                                            </div>
                                            <h4 className="text-xl font-bold text-blue-600 hover:underline cursor-pointer">{settings?.school_name} | Website Resmi</h4>
                                        </div>
                                        <Textarea
                                            name="seo_description"
                                            defaultValue={settings?.seo_description}
                                            placeholder="Deskripsikan sekolah anda secara singkat namun menarik untuk muncul di hasil pencarian Google..."
                                            className="min-h-[120px] rounded-2xl bg-slate-50 border-none px-6 py-4 font-medium text-slate-800 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                        />
                                        <div className="flex justify-between items-center px-2">
                                            <p className="text-[10px] text-slate-400 italic">
                                                * Pastikan mengandung kata kunci utama sekolah anda.
                                            </p>
                                            <span className="text-[9px] font-black text-slate-300 uppercase">Maks 160 Karakter disarankan</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="pt-8 flex justify-end">
                        <Button type="submit" disabled={mutation.isPending} className="rounded-[2rem] bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all h-20 px-16 font-black uppercase tracking-[0.2em] text-sm shadow-glow gap-4 group">
                            {mutation.isPending ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    Simpan Pengaturan
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AdminSettings;
