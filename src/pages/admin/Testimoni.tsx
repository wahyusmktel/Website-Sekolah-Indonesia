import { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Quote, User, Upload } from "lucide-react";
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const AdminTestimoni = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedTestimoni, setSelectedTestimoni] = useState<any>(null);
    const [testimoniToDelete, setTestimoniToDelete] = useState<number | null>(null);
    const queryClient = useQueryClient();

    const [uploadProgress, setUploadProgress] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { data: testimoniList = [], isLoading } = useQuery({
        queryKey: ['testimoni'],
        queryFn: async () => {
            const response = await apiClient.get('/testimoni');
            return response.data;
        }
    });

    const createMutation = useMutation({
        mutationFn: (newTestimoni: any) => apiClient.post('/testimoni', newTestimoni),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testimoni'] });
            setIsOpen(false);
            setPreviewUrl(null);
            toast.success("Testimoni berhasil ditambahkan");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => apiClient.put(`/testimoni/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testimoni'] });
            setIsOpen(false);
            setPreviewUrl(null);
            toast.success("Testimoni berhasil diperbarui");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/testimoni/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testimoni'] });
            setIsDeleteOpen(false);
            setTestimoniToDelete(null);
            toast.success("Testimoni berhasil dihapus");
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

        // Add image if uploaded
        if (previewUrl) {
            data.image = previewUrl;
        } else if (selectedTestimoni?.image) {
            data.image = selectedTestimoni.image;
        } else {
            data.image = "/placeholder.svg";
        }

        if (selectedTestimoni) {
            updateMutation.mutate({ id: selectedTestimoni.id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    const getFullImageUrl = (path: string) => {
        if (!path) return "/placeholder.svg";
        if (path.startsWith('http')) return path;
        return `${API_BASE_URL}${path}`;
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">Manajemen Testimoni</h1>
                    <Button variant="gradient" onClick={() => { setSelectedTestimoni(null); setPreviewUrl(null); setIsOpen(true); }}>
                        <Plus className="w-4 h-4 mr-2" />Tambah Testimoni
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimoniList.map((item: any) => (
                            <div key={item.id} className="bg-card rounded-2xl shadow-soft border border-border p-6 relative group transition-all hover:shadow-glow hover:border-primary/20">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-muted border border-border">
                                        <img src={getFullImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground line-clamp-1">{item.name}</h3>
                                        <p className="text-xs text-muted-foreground line-clamp-1">{item.role}</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <Quote className="w-10 h-10 text-primary/10 absolute -top-2 -left-2 rotate-180" />
                                    <p className="text-sm text-muted-foreground italic relative z-10 line-clamp-4">
                                        "{item.content}"
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-border flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" onClick={() => {
                                        setSelectedTestimoni(item);
                                        setPreviewUrl(item.image);
                                        setIsOpen(true);
                                    }}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => {
                                        setTestimoniToDelete(item.id);
                                        setIsDeleteOpen(true);
                                    }}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{selectedTestimoni ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="flex flex-col items-center gap-4 mb-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-dashed border-border flex items-center justify-center relative group">
                                {previewUrl ? (
                                    <img src={getFullImageUrl(previewUrl)} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-10 h-10 text-muted-foreground" />
                                )}
                                {uploadProgress && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <Loader2 className="w-6 h-6 animate-spin text-white" />
                                    </div>
                                )}
                            </div>
                            <Label htmlFor="image-upload" className="cursor-pointer">
                                <div className="flex items-center gap-2 text-primary hover:underline text-sm font-medium">
                                    <Upload size={14} /> {previewUrl ? 'Ganti Foto' : 'Unggah Foto'}
                                </div>
                                <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                            </Label>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input id="name" name="name" defaultValue={selectedTestimoni?.name} placeholder="Contoh: Budi Santoso" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="role">Jabatan / Status Alumni</Label>
                            <Input id="role" name="role" defaultValue={selectedTestimoni?.role} placeholder="Contoh: Alumni 2022 - Software Developer" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="content">Isi Testimoni</Label>
                            <Textarea id="content" name="content" defaultValue={selectedTestimoni?.content} placeholder="Masukkan testimoni..." className="min-h-[120px]" required />
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending || uploadProgress}>
                                {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {selectedTestimoni ? 'Simpan Perubahan' : 'Tambah Testimoni'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <DeleteConfirm
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={() => testimoniToDelete && deleteMutation.mutate(testimoniToDelete)}
                isPending={deleteMutation.isPending}
            />
        </AdminLayout>
    );
};

export default AdminTestimoni;
