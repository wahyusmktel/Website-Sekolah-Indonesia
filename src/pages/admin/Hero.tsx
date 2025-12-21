import { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Image as ImageIcon, Upload, Link as LinkIcon, ExternalLink } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { DeleteConfirm } from "@/components/admin/DeleteConfirm";
import { getImageUrl } from "@/lib/image-utils";

const AdminHero = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedSlide, setSelectedSlide] = useState<any>(null);
    const [slideToDelete, setSlideToDelete] = useState<number | null>(null);
    const queryClient = useQueryClient();

    const [uploadProgress, setUploadProgress] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { data: slides = [], isLoading } = useQuery({
        queryKey: ['hero-slides'],
        queryFn: async () => {
            const response = await apiClient.get('/hero-slides');
            return response.data;
        }
    });

    const createMutation = useMutation({
        mutationFn: (newSlide: any) => apiClient.post('/hero-slides', newSlide),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['hero-slides'] });
            setIsOpen(false);
            setPreviewUrl(null);
            toast.success("Hero slide berhasil ditambahkan");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => apiClient.put(`/hero-slides/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['hero-slides'] });
            setIsOpen(false);
            setPreviewUrl(null);
            toast.success("Hero slide berhasil diperbarui");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/hero-slides/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['hero-slides'] });
            setIsDeleteOpen(false);
            setSlideToDelete(null);
            toast.success("Hero slide berhasil dihapus");
        },
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
            toast.success("Gambar berhasil diunggah");
        } catch (error) {
            toast.error("Gagal mengunggah gambar");
        } finally {
            setUploadProgress(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Add image if uploaded
        if (previewUrl) {
            data.image = previewUrl;
        } else if (selectedSlide?.image) {
            data.image = selectedSlide.image;
        }

        if (selectedSlide) {
            updateMutation.mutate({ id: selectedSlide.id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-foreground italic">
                            Hero <span className="text-primary not-italic">Slider</span>
                        </h1>
                        <p className="text-muted-foreground mt-1">Kelola slide banner utama pada halaman beranda.</p>
                    </div>
                    <Button className="rounded-2xl h-12 px-6 bg-gradient-primary shadow-glow font-bold gap-2" onClick={() => { setSelectedSlide(null); setPreviewUrl(null); setIsOpen(true); }}>
                        <Plus className="w-4 h-4" />Tambah Slide
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {slides.map((item: any) => (
                            <div key={item.id} className="group bg-card rounded-[2.5rem] shadow-soft border border-border overflow-hidden transition-all hover:shadow-elevated">
                                <div className="relative aspect-[21/9] overflow-hidden">
                                    <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-light text-[10px] font-black uppercase tracking-widest">
                                            {item.tag}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-xl font-black text-white italic line-clamp-1 mb-1">{item.title}</h3>
                                        <p className="text-white/70 text-sm line-clamp-2 font-light">{item.subtitle}</p>
                                    </div>
                                </div>

                                <div className="p-6 flex items-center justify-between bg-card">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">CTA Button</span>
                                            <span className="text-xs font-bold text-foreground flex items-center gap-1">
                                                {item.cta} <ExternalLink className="w-3 h-3 text-primary" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" className="rounded-xl h-10 w-10 border-none bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors" onClick={() => {
                                            setSelectedSlide(item);
                                            setPreviewUrl(item.image);
                                            setIsOpen(true);
                                        }}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-xl h-10 w-10 border-none bg-muted/50 hover:text-destructive transition-colors" onClick={() => {
                                            setSlideToDelete(item.id);
                                            setIsDeleteOpen(true);
                                        }}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {slides.length === 0 && (
                            <div className="lg:col-span-2 py-20 bg-muted/30 rounded-[3rem] border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground">
                                <ImageIcon className="w-12 h-12 mb-4 opacity-20" />
                                <p className="font-bold italic">Belum ada slide hero</p>
                                <p className="text-sm">Klik tombol "Tambah Slide" untuk memulai</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[600px] rounded-[2rem] border-none shadow-elevated">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black italic">
                            {selectedSlide ? 'Edit' : 'Tambah'} <span className="text-primary not-italic">Hero Slide</span>
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Judul Slide</Label>
                                    <Input id="title" name="title" defaultValue={selectedSlide?.title} placeholder="Contoh: Masa Depan Digital" className="rounded-xl" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="tag" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Tag / Label</Label>
                                    <Input id="tag" name="tag" defaultValue={selectedSlide?.tag} placeholder="Contoh: Inovasi Pendidikan" className="rounded-xl" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="cta" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Teks Tombol (CTA)</Label>
                                    <Input id="cta" name="cta" defaultValue={selectedSlide?.cta} placeholder="Contoh: Mulai Jelajahi" className="rounded-xl" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="cta_link" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Link Tombol</Label>
                                    <Input id="cta_link" name="cta_link" defaultValue={selectedSlide?.cta_link} placeholder="Contoh: /program" className="rounded-xl" required />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground text-center">Gambar Background</Label>
                                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted border-2 border-dashed border-border flex items-center justify-center group cursor-pointer">
                                        {previewUrl ? (
                                            <>
                                                <img src={getImageUrl(previewUrl)} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Upload className="text-white w-8 h-8" />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <ImageIcon className="w-10 h-10 opacity-20" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Klik untuk Unggah</span>
                                            </div>
                                        )}
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileUpload} />
                                        {uploadProgress && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                                                <Loader2 className="w-8 h-8 animate-spin text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="subtitle" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Sub-judul / Deskripsi</Label>
                                    <Textarea id="subtitle" name="subtitle" defaultValue={selectedSlide?.subtitle} placeholder="Masukkan deskripsi singkat..." className="min-h-[100px] rounded-xl" required />
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="gap-2">
                            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="rounded-xl font-bold">Batal</Button>
                            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending || uploadProgress} className="rounded-xl bg-gradient-primary shadow-glow font-bold px-8">
                                {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {selectedSlide ? 'Simpan Perubahan' : 'Tambah Slide'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <DeleteConfirm
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={() => slideToDelete && deleteMutation.mutate(slideToDelete)}
                isPending={deleteMutation.isPending}
            />
        </AdminLayout>
    );
};

export default AdminHero;
