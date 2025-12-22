import { useState } from "react";
import {
    Loader2, Building2, Plus, Trash2, Save, Camera,
    Monitor, Cpu, Layers, BookOpen, Activity, Coffee,
    Pencil, PlusCircle, X
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { getImageUrl } from "@/lib/image-utils";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirm } from "@/components/admin/DeleteConfirm";

interface Facility {
    id?: number;
    title: string;
    description: string;
    features: string[];
    image: string;
    icon: string;
}

const iconMap: Record<string, any> = {
    Monitor, Cpu, Layers, BookOpen, Activity, Coffee
};

const AdminFasilitas = () => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(false);
    const [features, setFeatures] = useState<string[]>([]);
    const [formIcon, setFormIcon] = useState<string>("Monitor");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [facilityToDelete, setFacilityToDelete] = useState<number | null>(null);

    const { data: facilities, isLoading } = useQuery({
        queryKey: ['fasilitas'],
        queryFn: async () => {
            const response = await apiClient.get('/fasilitas');
            return response.data;
        }
    });

    const saveMutation = useMutation({
        mutationFn: (data: Facility) => {
            if (data.id) {
                return apiClient.put(`/fasilitas/${data.id}`, data);
            } else {
                return apiClient.post('/fasilitas', data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fasilitas'] });
            setIsDialogOpen(false);
            setEditingFacility(null);
            setPreviewUrl(null);
            setFeatures([]);
            toast.success("Data fasilitas berhasil disimpan");
        },
        onError: () => toast.error("Gagal menyimpan data fasilitas")
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/fasilitas/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fasilitas'] });
            setIsDeleteOpen(false);
            setFacilityToDelete(null);
            toast.success("Fasilitas berhasil dihapus");
        },
        onError: () => toast.error("Gagal menghapus fasilitas")
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

    const handleAddFeature = () => {
        setFeatures([...features, ""]);
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    const handleRemoveFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as any;

        const filteredFeatures = features.filter(f => f.trim() !== "");

        const payload: Facility = {
            ...data,
            id: editingFacility?.id,
            image: previewUrl || editingFacility?.image || "",
            icon: formIcon,
            features: filteredFeatures
        };

        if (!payload.image) {
            toast.error("Gambar fasilitas wajib diunggah");
            return;
        }

        saveMutation.mutate(payload);
    };

    const handleOpenEdit = (facility: Facility) => {
        setEditingFacility(facility);
        setPreviewUrl(facility.image);
        setFormIcon(facility.icon);
        setFeatures(Array.isArray(facility.features) ? facility.features : []);
        setIsDialogOpen(true);
    };

    const handleOpenAdd = () => {
        setEditingFacility(null);
        setPreviewUrl(null);
        setFormIcon("Monitor");
        setFeatures(["", ""]);
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
                        <h1 className="text-3xl font-black text-foreground italic">
                            Manajemen <span className="text-primary not-italic">Fasilitas Sekolah</span>
                        </h1>
                        <p className="text-muted-foreground mt-1">Kelola infrastruktur dan sarana prasarana sekolah.</p>
                    </div>
                    <Button onClick={handleOpenAdd} className="rounded-2xl bg-primary hover:bg-primary-dark font-bold gap-2 self-start">
                        <Plus className="w-5 h-5" />
                        Tambah Fasilitas
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {facilities?.map((item: Facility) => {
                        const Icon = iconMap[item.icon] || Monitor;
                        return (
                            <Card key={item.id} className="border-none shadow-soft rounded-[2.5rem] overflow-hidden group bg-white">
                                <CardContent className="p-0">
                                    <div className="relative aspect-[4/3]">
                                        <img
                                            src={getImageUrl(item.image)}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="p-2 rounded-lg bg-primary/20 backdrop-blur-md border border-white/10 text-primary">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-widest">
                                                    Facility
                                                </Badge>
                                            </div>
                                            <h3 className="text-white font-bold text-xl leading-tight italic">{item.title}</h3>
                                        </div>
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="rounded-full w-10 h-10 shadow-lg"
                                                onClick={() => handleOpenEdit(item)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="destructive"
                                                className="rounded-full w-10 h-10 shadow-lg"
                                                onClick={() => {
                                                    setFacilityToDelete(item.id!);
                                                    setIsDeleteOpen(true);
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <p className="text-muted-foreground text-sm line-clamp-2 italic font-light">"{item.description}"</p>
                                        <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-tighter">
                                            {Array.isArray(item.features) && item.features.slice(0, 3).map((f, i) => (
                                                <span key={i} className="px-2 py-1 rounded-md bg-muted text-muted-foreground">
                                                    {f}
                                                </span>
                                            ))}
                                            {Array.isArray(item.features) && item.features.length > 3 && (
                                                <span className="px-2 py-1 rounded-md bg-primary/5 text-primary">
                                                    +{item.features.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-3xl rounded-[2.5rem] border-none shadow-2xl overflow-y-auto max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black italic">
                                {editingFacility ? 'Edit' : 'Tambah'} <span className="text-primary not-italic">Fasilitas</span>
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Gambar Fasilitas</Label>
                                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-muted group cursor-pointer border-2 border-dashed border-border shadow-soft flex items-center justify-center">
                                        {previewUrl ? (
                                            <>
                                                <img src={getImageUrl(previewUrl)} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Camera className="text-white w-10 h-10" />
                                                </div>
                                            </ >
                                        ) : (
                                            <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                                <Building2 className="w-16 h-16 opacity-10" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Unggah Gambar</span>
                                            </div>
                                        )}
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileUpload} />
                                        {uploadProgress && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                                                <Loader2 className="w-10 h-10 animate-spin text-white" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Icon Visual</Label>
                                        <Select value={formIcon} onValueChange={setFormIcon}>
                                            <SelectTrigger className="rounded-xl border-none bg-muted/50 font-bold h-12">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                {Object.keys(iconMap).map(iconName => (
                                                    <SelectItem key={iconName} value={iconName}>
                                                        <div className="flex items-center gap-3">
                                                            {(() => {
                                                                const IconComp = iconMap[iconName];
                                                                return <IconComp className="w-4 h-4" />;
                                                            })()}
                                                            <span>{iconName}</span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Nama Fasilitas</Label>
                                        <Input name="title" defaultValue={editingFacility?.title} required className="rounded-xl border-none bg-muted/50 font-bold h-12" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Deskripsi Fasilitas</Label>
                                        <Textarea name="description" defaultValue={editingFacility?.description} required className="rounded-xl border-none bg-muted/50 min-h-[120px] font-medium italic" />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Fitur & Spesifikasi</Label>
                                            <Button type="button" onClick={handleAddFeature} variant="ghost" size="sm" className="h-6 text-[8px] font-black uppercase tracking-widest gap-1 hover:text-primary">
                                                <PlusCircle className="w-3 h-3" /> Tambah Fitur
                                            </Button>
                                        </div>
                                        <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                                            {features.map((feature, idx) => (
                                                <div key={idx} className="flex gap-2">
                                                    <Input
                                                        value={feature}
                                                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                                                        placeholder="Contoh: AC & Air Purifier"
                                                        className="rounded-lg border-none bg-muted/30 text-xs h-9"
                                                    />
                                                    <Button
                                                        type="button"
                                                        onClick={() => handleRemoveFeature(idx)}
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-9 w-9 text-muted-foreground hover:text-destructive"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                            {features.length === 0 && (
                                                <p className="text-[10px] text-muted-foreground italic text-center py-4 bg-muted/20 rounded-xl border border-dashed">Belum ada fitur ditambahkan.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end pt-4">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold">Batal</Button>
                                <Button type="submit" disabled={saveMutation.isPending || uploadProgress} className="rounded-xl bg-primary hover:bg-primary-dark font-bold px-8 h-12">
                                    {saveMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                <DeleteConfirm
                    open={isDeleteOpen}
                    onOpenChange={setIsDeleteOpen}
                    onConfirm={() => facilityToDelete && deleteMutation.mutate(facilityToDelete)}
                    isPending={deleteMutation.isPending}
                    title="Hapus Fasilitas?"
                    description="Apakah Anda yakin ingin menghapus fasilitas ini? Data yang dihapus tidak dapat dikembalikan."
                />
            </div>
        </AdminLayout>
    );
};

export default AdminFasilitas;
