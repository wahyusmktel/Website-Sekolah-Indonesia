import { useState, useEffect } from "react";
import { Loader2, User, Camera, Type, MessageSquare, Quote as QuoteIcon, Save } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getImageUrl } from "@/lib/image-utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AdminSambutan = () => {
    const queryClient = useQueryClient();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(false);

    const { data: sambutan, isLoading } = useQuery({
        queryKey: ['sambutan'],
        queryFn: async () => {
            const response = await apiClient.get('/sambutan');
            return response.data;
        }
    });

    useEffect(() => {
        if (sambutan?.principal_image) {
            setPreviewUrl(sambutan.principal_image);
        }
    }, [sambutan]);

    const saveMutation = useMutation({
        mutationFn: (data: any) => {
            if (sambutan?.id) {
                return apiClient.put(`/sambutan/${sambutan.id}`, data);
            } else {
                return apiClient.post('/sambutan', data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sambutan'] });
            toast.success("Sambutan berhasil disimpan");
        },
        onError: () => {
            toast.error("Gagal menyimpan sambutan");
        }
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadProgress(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const { data } = await apiClient.post('/upload', formData);
            setPreviewUrl(data.url);
            toast.success("Foto berhasil diunggah");
        } catch (error) {
            toast.error("Gagal mengunggah foto");
        } finally {
            setUploadProgress(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        if (previewUrl) {
            data.principal_image = previewUrl;
        }

        saveMutation.mutate(data);
    };

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-8 max-w-5xl mx-auto">
                <div>
                    <h1 className="text-3xl font-black text-foreground italic">
                        Sambutan <span className="text-primary not-italic">Kepala Sekolah</span>
                    </h1>
                    <p className="text-muted-foreground mt-1">Kelola konten sambutan yang ditampilkan di halaman beranda.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Image and Basic Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-none shadow-soft rounded-[2rem] overflow-hidden bg-card">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold flex items-center gap-2 italic">
                                    <Camera className="w-5 h-5 text-primary" /> Foto Profil
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-muted group cursor-pointer border-2 border-dashed border-border shadow-soft flex items-center justify-center">
                                    {previewUrl ? (
                                        <>
                                            <img src={getImageUrl(previewUrl)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Camera className="text-white w-10 h-10" />
                                            </div>
                                        </ >
                                    ) : (
                                        <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                            <User className="w-16 h-16 opacity-10" />
                                            <span className="text-xs font-black uppercase tracking-widest">Unggah Foto</span>
                                        </div>
                                    )}
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileUpload} />
                                    {uploadProgress && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                                            <Loader2 className="w-10 h-10 animate-spin text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4 pt-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="principal_name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nama Lengkap</Label>
                                        <Input id="principal_name" name="principal_name" defaultValue={sambutan?.principal_name} placeholder="Contoh: Drs. H. Mulyadi, M.Pd." className="rounded-xl border-none bg-muted/50 font-bold" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="principal_role" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Jabatan</Label>
                                        <Input id="principal_role" name="principal_role" defaultValue={sambutan?.principal_role} placeholder="Contoh: Kepala Sekolah SMK Nusantara" className="rounded-xl border-none bg-muted/50 font-bold text-primary" required />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Message Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-none shadow-soft rounded-[2rem] bg-card">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold flex items-center gap-2 italic">
                                    <MessageSquare className="w-5 h-5 text-primary" /> Pesan Sambutan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Judul Sambutan</Label>
                                    <Input id="title" name="title" defaultValue={sambutan?.title} placeholder="Contoh: Membangun Generasi Siap Kerja" className="rounded-xl border-none bg-muted/50 font-black text-xl italic h-14 px-6" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="greeting" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Salam Pembuka</Label>
                                    <Input id="greeting" name="greeting" defaultValue={sambutan?.greeting} placeholder="Contoh: Assalamu'alaikum Warahmatullahi Wabarakatuh," className="rounded-xl border-none bg-muted/50 font-bold" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="content" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Isi Sambutan</Label>
                                    <Textarea id="content" name="content" defaultValue={sambutan?.content} placeholder="Tuliskan isi sambutan di sini..." className="min-h-[300px] rounded-2xl border-none bg-muted/50 leading-relaxed font-medium" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="quote_footer" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Penutup (Quote)</Label>
                                    <div className="relative">
                                        <QuoteIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-40" />
                                        <Input id="quote_footer" name="quote_footer" defaultValue={sambutan?.quote_footer} placeholder="Contoh: - Maju Bersama, Hebat Semua!" className="rounded-xl border-none bg-muted/50 font-bold italic pl-12" />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <Button type="submit" disabled={saveMutation.isPending || uploadProgress} className="w-full rounded-2xl h-14 bg-gradient-primary shadow-glow font-bold text-lg gap-3">
                                        {saveMutation.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                                        Simpan Perubahan
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AdminSambutan;
