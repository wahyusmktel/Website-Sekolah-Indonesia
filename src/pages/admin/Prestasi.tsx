import { useState } from "react";
import {
    Loader2, Trophy, Plus, Trash2, Pencil,
    Calendar, User, Award, MapPin, ExternalLink,
    Camera, Save, X
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { getImageUrl } from "@/lib/image-utils";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirm } from "@/components/admin/DeleteConfirm";

const AdminPrestasi = () => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const { data: prestasi, isLoading } = useQuery({
        queryKey: ['prestasi'],
        queryFn: () => apiClient.get('/prestasi').then(res => res.data)
    });

    const mutation = useMutation({
        mutationFn: (data: any) => data.id ? apiClient.put(`/prestasi/${data.id}`, data) : apiClient.post('/prestasi', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['prestasi'] });
            setIsDialogOpen(false);
            toast.success("Prestasi berhasil disimpan");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/prestasi/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['prestasi'] });
            setIsDeleteOpen(false);
            toast.success("Prestasi berhasil dihapus");
        }
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        try {
            const { data } = await apiClient.post('/upload', formData);
            setPreviewUrl(data.url);
            toast.success("Gambar berhasil diunggah");
        } catch (error) {
            toast.error("Gagal mengunggah gambar");
        } finally {
            setUploading(false);
        }
    };

    const handleOpenAdd = () => {
        setEditingItem(null);
        setPreviewUrl(null);
        setIsDialogOpen(true);
    };

    const handleOpenEdit = (item: any) => {
        setEditingItem(item);
        setPreviewUrl(item.image);
        setIsDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        mutation.mutate({
            ...data,
            id: editingItem?.id,
            image: previewUrl || editingItem?.image,
            slug: (data.slug as string) || (data.title as string).toLowerCase().replace(/ /g, '-')
        });
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
                            Wall of <span className="text-primary not-italic">Excellence</span>
                        </h1>
                        <p className="text-muted-foreground mt-1">Kelola daftar prestasi dan penghargaan siswa.</p>
                    </div>
                    <Button onClick={handleOpenAdd} className="rounded-2xl bg-primary hover:bg-primary-dark font-bold gap-2 h-12 px-8 shadow-glow">
                        <Plus className="w-5 h-5" />
                        Tambah Prestasi
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {prestasi?.map((item: any) => (
                        <Card key={item.id} className="border-none shadow-soft rounded-[2.5rem] overflow-hidden group bg-white hover:shadow-card transition-all duration-500">
                            <div className="aspect-video relative overflow-hidden">
                                <img src={getImageUrl(item.image)} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="secondary" className="rounded-full w-9 h-9" onClick={() => handleOpenEdit(item)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" variant="destructive" className="rounded-full w-9 h-9" onClick={() => { setItemToDelete(item); setIsDeleteOpen(true); }}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <Badge className="absolute bottom-4 left-4 bg-primary/90 border-none font-black text-[9px] uppercase tracking-widest">
                                    {item.level}
                                </Badge>
                            </div>
                            <CardContent className="p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-primary/20 text-primary">
                                        {item.category}
                                    </Badge>
                                    <span className="text-[10px] text-muted-foreground font-bold ml-auto tabular-nums">{item.date}</span>
                                </div>
                                <h3 className="text-xl font-black italic tracking-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-foreground/70 font-bold mb-6">
                                    <User className="w-4 h-4 text-primary" />
                                    <span className="truncate">{item.winner}</span>
                                </div>
                                <p className="text-xs text-muted-foreground italic leading-relaxed line-clamp-2">"{item.description}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Achievement Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-4xl rounded-[3rem] border-none shadow-2xl overflow-y-auto max-h-[90vh] p-0">
                        <div className="bg-primary h-2 w-full" />
                        <div className="p-10">
                            <DialogHeader className="mb-8">
                                <DialogTitle className="text-3xl font-black italic uppercase">
                                    {editingItem ? 'Edit' : 'Tambah'} <span className="text-primary not-italic">Prestasi</span>
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-muted group cursor-pointer border-2 border-dashed border-border" onClick={() => document.getElementById('image-upload')?.click()}>
                                            {previewUrl ? (
                                                <img src={getImageUrl(previewUrl)} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
                                                    <Camera className="w-12 h-12 opacity-10" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest animate-pulse">Unggah Foto Dokumentasi</span>
                                                </div>
                                            )}
                                            <input id="image-upload" type="file" className="hidden" onChange={handleFileUpload} />
                                            {uploading && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-white" /></div>}
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest ml-2">Judul Prestasi</Label>
                                                <Input name="title" defaultValue={editingItem?.title} required className="h-14 rounded-2xl bg-foreground/5 border-none px-6 font-bold" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest ml-2">Slug (URL)</Label>
                                                <Input name="slug" defaultValue={editingItem?.slug} placeholder="Otomatis dari judul jika kosong" className="h-14 rounded-2xl bg-foreground/5 border-none px-6 font-bold" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest ml-2">Pemenang</Label>
                                                <Input name="winner" defaultValue={editingItem?.winner} required className="h-14 rounded-2xl bg-foreground/5 border-none px-6 font-bold" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest ml-2">Tahun / Tanggal</Label>
                                                <Input name="date" defaultValue={editingItem?.date} required className="h-14 rounded-2xl bg-foreground/5 border-none px-6 font-bold" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest ml-2">Kategori</Label>
                                                <Input name="category" defaultValue={editingItem?.category} required placeholder="Akademik, Olahraga, dsb" className="h-14 rounded-2xl bg-foreground/5 border-none px-6 font-bold" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest ml-2">Tingkat</Label>
                                                <Input name="level" defaultValue={editingItem?.level} required placeholder="Nasional, Provinsi, dsb" className="h-14 rounded-2xl bg-foreground/5 border-none px-6 font-bold" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest ml-2">Deskripsi Singkat</Label>
                                            <Textarea name="description" defaultValue={editingItem?.description} required className="rounded-2xl bg-foreground/5 border-none p-6 font-medium italic min-h-[100px]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-2">Narasi Lengkap / Detail Cerita</Label>
                                    <Textarea name="long_description" defaultValue={editingItem?.long_description} required className="rounded-2xl bg-foreground/5 border-none p-6 font-medium min-h-[200px]" />
                                </div>

                                <div className="flex gap-4 justify-end pt-6 border-t border-border">
                                    <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-2xl h-14 px-8 font-bold">Batal</Button>
                                    <Button type="submit" disabled={uploading || mutation.isPending} className="rounded-2xl bg-primary h-14 px-12 font-black uppercase tracking-widest text-xs shadow-glow">
                                        {mutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Perubahan"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog>

                <DeleteConfirm
                    open={isDeleteOpen}
                    onOpenChange={setIsDeleteOpen}
                    onConfirm={() => deleteMutation.mutate(itemToDelete.id)}
                    title="Hapus Data Prestasi?"
                    description="Tindakan ini akan menghapus data prestasi terpilih secara permanen dari sistem."
                />
            </div>
        </AdminLayout>
    );
};

export default AdminPrestasi;
