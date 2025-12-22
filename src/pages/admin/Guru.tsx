import { useState } from "react";
import { Loader2, UserPlus, Plus, Trash2, Save, Camera, User, Pencil, Star, Github, Globe, Linkedin, Instagram, Sparkles } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { getImageUrl } from "@/lib/image-utils";
import { Badge } from "@/components/ui/badge";

interface Guru {
    id?: number;
    name: string;
    subject: string;
    image: string;
    bio: string;
    education: string;
    experience: string;
    instagram_url: string;
    linkedin_url: string;
    order_priority: number;
    is_pioneer: boolean;
}

const AdminGuru = () => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingGuru, setEditingGuru] = useState<Guru | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(false);

    const { data: teachers, isLoading } = useQuery({
        queryKey: ['guru'],
        queryFn: async () => {
            const response = await apiClient.get('/guru');
            return response.data;
        }
    });

    const saveMutation = useMutation({
        mutationFn: (data: Guru) => {
            if (data.id) {
                return apiClient.put(`/guru/${data.id}`, data);
            } else {
                return apiClient.post('/guru', data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['guru'] });
            setIsDialogOpen(false);
            setEditingGuru(null);
            setPreviewUrl(null);
            toast.success("Data berhasil disimpan");
        },
        onError: () => toast.error("Gagal menyimpan data")
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/guru/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['guru'] });
            toast.success("Guru berhasil dihapus");
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
        const data = Object.fromEntries(formData.entries()) as any;

        const payload: Guru = {
            ...data,
            id: editingGuru?.id,
            image: previewUrl || editingGuru?.image || "",
            order_priority: parseInt(data.order_priority) || 0,
            is_pioneer: data.is_pioneer === 'on' || data.is_pioneer === true
        };

        if (!payload.image) {
            toast.error("Foto wajib diunggah");
            return;
        }

        saveMutation.mutate(payload);
    };

    const handleOpenEdit = (guru: Guru) => {
        setEditingGuru(guru);
        setPreviewUrl(guru.image);
        setIsDialogOpen(true);
    };

    const handleOpenAdd = () => {
        setEditingGuru(null);
        setPreviewUrl(null);
        setIsDialogOpen(true);
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
            <div className="space-y-8 max-w-6xl mx-auto pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-foreground italic uppercase">
                            Manajemen <span className="text-primary not-italic">Tenaga Pendidik</span>
                        </h1>
                        <p className="text-muted-foreground mt-1 italic font-light">Kelola jajaran guru profesional dan kompeten.</p>
                    </div>
                    <Button onClick={handleOpenAdd} className="rounded-2xl bg-primary hover:bg-primary-dark font-black tracking-widest gap-3 self-start px-8 py-6 h-auto shadow-glow">
                        <UserPlus className="w-6 h-6" />
                        TAMBAH GURU
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teachers?.map((item: Guru) => (
                        <Card key={item.id} className="border-none shadow-soft rounded-[2.5rem] overflow-hidden group bg-white dark:bg-foreground/5">
                            <CardContent className="p-0">
                                <div className="relative aspect-square">
                                    <img
                                        src={getImageUrl(item.image)}
                                        alt={item.name}
                                        className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                                        <div className="mb-1">
                                            <Badge variant="outline" className="border-primary/50 text-primary text-[8px] font-black uppercase tracking-widest mb-2 bg-black/40">
                                                {item.subject}
                                            </Badge>
                                            <h3 className="text-white font-black text-xl italic leading-tight uppercase line-clamp-1">{item.name}</h3>
                                        </div>
                                    </div>

                                    {item.is_pioneer && (
                                        <div className="absolute top-4 left-4">
                                            <div className="bg-primary p-2 rounded-xl shadow-glow">
                                                <Star className="w-4 h-4 text-white fill-current" />
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="rounded-xl w-10 h-10 shadow-lg"
                                            onClick={() => handleOpenEdit(item)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="rounded-xl w-10 h-10 shadow-lg"
                                            onClick={() => {
                                                if (confirm("Hapus guru ini?")) deleteMutation.mutate(item.id!);
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex gap-4 opacity-50">
                                        {item.instagram_url && <Instagram className="w-4 h-4" />}
                                        {item.linkedin_url && <Linkedin className="w-4 h-4" />}
                                        <div className="text-[10px] font-black uppercase tracking-widest ml-auto">Order: {item.order_priority}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-3xl rounded-[3rem] border-none shadow-2xl p-0 overflow-hidden outline-none">
                        <div className="bg-foreground p-8 text-white relative">
                            <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                                <Sparkles className="w-24 h-24 text-primary" />
                            </div>
                            <DialogHeader>
                                <DialogTitle className="text-3xl font-black italic uppercase italic">
                                    {editingGuru ? 'Edit' : 'Tambah'} <span className="text-primary not-italic">Tenaga Pendidik</span>
                                </DialogTitle>
                            </DialogHeader>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-background max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-muted group cursor-pointer border-2 border-dashed border-border shadow-soft flex items-center justify-center">
                                        {previewUrl ? (
                                            <>
                                                <img src={getImageUrl(previewUrl)} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Camera className="text-white w-12 h-12" />
                                                </div>
                                            </ >
                                        ) : (
                                            <div className="flex flex-col items-center gap-4 text-muted-foreground">
                                                <User className="w-20 h-20 opacity-10" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">Unggah Profile</span>
                                            </div>
                                        )}
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileUpload} />
                                        {uploadProgress && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                                                <Loader2 className="w-12 h-12 animate-spin text-white" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between p-6 bg-muted/30 rounded-[2rem] border border-border">
                                        <div className="space-y-1">
                                            <Label className="text-xs font-black uppercase tracking-widest italic">Pioneer Teacher</Label>
                                            <p className="text-[10px] text-muted-foreground italic">Highlight guru ini sebagai pioneer.</p>
                                        </div>
                                        <Switch
                                            name="is_pioneer"
                                            defaultChecked={editingGuru?.is_pioneer}
                                            className="data-[state=checked]:bg-primary"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid gap-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1 italic">Nama Lengkap & Gelar</Label>
                                        <Input name="name" defaultValue={editingGuru?.name} required className="rounded-2xl border-none bg-muted/50 font-bold h-12" placeholder="Contoh: Budi, S.Kom" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1 italic">Mata Pelajaran / Spesialisasi</Label>
                                        <Input name="subject" defaultValue={editingGuru?.subject} required className="rounded-2xl border-none bg-muted/50 font-bold h-12" placeholder="Contoh: Programming" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1 italic">Pendidikan Terakhir</Label>
                                        <Input name="education" defaultValue={editingGuru?.education} className="rounded-2xl border-none bg-muted/50 font-bold h-12" placeholder="Contoh: S2 Teknik Informatika" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1 italic">Pengalaman Kerja</Label>
                                        <Input name="experience" defaultValue={editingGuru?.experience} className="rounded-2xl border-none bg-muted/50 font-bold h-12" placeholder="Contoh: 10+ Tahun" />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1 italic">Urutan Tampilan</Label>
                                        <Input name="order_priority" type="number" defaultValue={editingGuru?.order_priority || 0} className="rounded-2xl border-none bg-muted/50 font-bold h-12" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-border">
                                <div className="grid gap-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1 italic flex items-center gap-2">
                                        <Instagram className="w-4 h-4 text-primary" /> INSTAGRAM URL
                                    </Label>
                                    <Input name="instagram_url" defaultValue={editingGuru?.instagram_url} className="rounded-2xl border-none bg-muted/50 font-bold h-12" placeholder="https://instagram.com/..." />
                                </div>
                                <div className="grid gap-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1 italic flex items-center gap-2">
                                        <Linkedin className="w-4 h-4 text-primary" /> LINKEDIN URL
                                    </Label>
                                    <Input name="linkedin_url" defaultValue={editingGuru?.linkedin_url} className="rounded-2xl border-none bg-muted/50 font-bold h-12" placeholder="https://linkedin.com/..." />
                                </div>
                            </div>

                            <div className="grid gap-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 italic">Bio & Visi Guru</Label>
                                <Textarea name="bio" defaultValue={editingGuru?.bio} className="rounded-[2rem] border-none bg-muted/50 min-h-[120px] p-6 font-medium italic leading-relaxed" placeholder="Tuliskan pengalaman singkat atau visi pengajaran..." />
                            </div>

                            <div className="flex gap-4 justify-end pt-8">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-2xl font-black italic tracking-widest px-8">BATAL</Button>
                                <Button type="submit" disabled={saveMutation.isPending || uploadProgress} className="rounded-2xl bg-primary hover:bg-primary-dark font-black tracking-widest px-12 py-6 h-auto shadow-glow gap-3">
                                    {saveMutation.isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                                    SIMPAN DATA
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
};

export default AdminGuru;
