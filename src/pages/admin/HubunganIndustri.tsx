import { useState } from "react";
import {
    Loader2, Building2, Plus, Trash2, Save, Camera,
    Award, Briefcase, Target, Handshake, Globe2,
    Pencil, PlusCircle, X, ShieldCheck
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeleteConfirm } from "@/components/admin/DeleteConfirm";

const iconMap: Record<string, any> = {
    Building2, Award, Briefcase, Target, Handshake, Globe2
};

const AdminHubunganIndustri = () => {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState("partners");

    // Dialog states
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [uploadProgress, setUploadProgress] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Fetching data
    const partnersQuery = useQuery({
        queryKey: ['industry-partners'],
        queryFn: () => apiClient.get('/industry-partners').then(res => res.data)
    });

    const programsQuery = useQuery({
        queryKey: ['industry-programs'],
        queryFn: () => apiClient.get('/industry-programs').then(res => res.data)
    });

    const statsQuery = useQuery({
        queryKey: ['industry-stats'],
        queryFn: () => apiClient.get('/industry-stats').then(res => res.data)
    });

    // Mutations for Partners
    const partnerMutation = useMutation({
        mutationFn: (data: any) => data.id ? apiClient.put(`/industry-partners/${data.id}`, data) : apiClient.post('/industry-partners', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['industry-partners'] });
            setIsDialogOpen(false);
            toast.success("Partner berhasil disimpan");
        }
    });

    const partnerDelete = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/industry-partners/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['industry-partners'] });
            setIsDeleteOpen(false);
            toast.success("Partner berhasil dihapus");
        }
    });

    // Mutations for Programs
    const programMutation = useMutation({
        mutationFn: (data: any) => data.id ? apiClient.put(`/industry-programs/${data.id}`, data) : apiClient.post('/industry-programs', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['industry-programs'] });
            setIsDialogOpen(false);
            toast.success("Program berhasil disimpan");
        }
    });

    const programDelete = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/industry-programs/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['industry-programs'] });
            setIsDeleteOpen(false);
            toast.success("Program berhasil dihapus");
        }
    });

    // Mutations for Stats
    const statMutation = useMutation({
        mutationFn: (data: any) => data.id ? apiClient.put(`/industry-stats/${data.id}`, data) : apiClient.post('/industry-stats', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['industry-stats'] });
            setIsDialogOpen(false);
            toast.success("Statistik berhasil disimpan");
        }
    });

    const statDelete = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/industry-stats/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['industry-stats'] });
            setIsDeleteOpen(false);
            toast.success("Statistik berhasil dihapus");
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
            toast.success("Logo berhasil diunggah");
        } catch (error) {
            toast.error("Gagal mengunggah logo");
        } finally {
            setUploadProgress(false);
        }
    };

    const handleOpenAdd = () => {
        setEditingItem(null);
        setPreviewUrl(null);
        setIsDialogOpen(true);
    };

    const handleOpenEdit = (item: any) => {
        setEditingItem(item);
        if (activeTab === "partners") setPreviewUrl(item.logo);
        setIsDialogOpen(true);
    };

    const handleOpenDelete = (item: any) => {
        setItemToDelete(item);
        setIsDeleteOpen(true);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const payload = Object.fromEntries(formData.entries()) as any;

        if (activeTab === "partners") {
            partnerMutation.mutate({ ...payload, id: editingItem?.id, logo: previewUrl || editingItem?.logo });
        } else if (activeTab === "programs") {
            programMutation.mutate({ ...payload, id: editingItem?.id });
        } else {
            statMutation.mutate({ ...payload, id: editingItem?.id });
        }
    };

    const handleConfirmDelete = () => {
        if (!itemToDelete) return;
        if (activeTab === "partners") partnerDelete.mutate(itemToDelete.id);
        else if (activeTab === "programs") programDelete.mutate(itemToDelete.id);
        else statDelete.mutate(itemToDelete.id);
    };

    const isDataLoading = partnersQuery.isLoading || programsQuery.isLoading || statsQuery.isLoading;

    if (isDataLoading) {
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
                            Manajemen <span className="text-primary not-italic">Hubungan Industri</span>
                        </h1>
                        <p className="text-muted-foreground mt-1">Kelola kemitraan strategis, program unggulan, dan statistik industri.</p>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <div className="flex items-center justify-between bg-white p-2 rounded-[2rem] shadow-soft border border-slate-100">
                        <TabsList className="bg-transparent border-none gap-2">
                            <TabsTrigger value="partners" className="rounded-2xl px-8 data-[state=active]:bg-primary data-[state=active]:text-white font-bold h-12 transition-all">
                                Partners
                            </TabsTrigger>
                            <TabsTrigger value="programs" className="rounded-2xl px-8 data-[state=active]:bg-primary data-[state=active]:text-white font-bold h-12 transition-all">
                                Programs
                            </TabsTrigger>
                            <TabsTrigger value="stats" className="rounded-2xl px-8 data-[state=active]:bg-primary data-[state=active]:text-white font-bold h-12 transition-all">
                                Industry Stats
                            </TabsTrigger>
                        </TabsList>
                        <Button onClick={handleOpenAdd} className="rounded-2xl bg-primary hover:bg-primary-dark font-bold gap-2">
                            <Plus className="w-5 h-5" />
                            Tambah {activeTab === "partners" ? "Partner" : activeTab === "programs" ? "Program" : "Stat"}
                        </Button>
                    </div>

                    <TabsContent value="partners" className="mt-0">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {partnersQuery.data?.map((partner: any) => (
                                <Card key={partner.id} className="border-none shadow-soft rounded-[2.5rem] overflow-hidden group bg-white">
                                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                                        <div className="relative w-full aspect-square flex items-center justify-center p-4 bg-slate-50 rounded-3xl group-hover:bg-primary/5 transition-colors">
                                            <img src={getImageUrl(partner.logo)} alt={partner.name} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button size="icon" variant="secondary" className="rounded-full w-8 h-8 shadow-sm" onClick={() => handleOpenEdit(partner)}>
                                                    <Pencil className="w-3 h-3" />
                                                </Button>
                                                <Button size="icon" variant="destructive" className="rounded-full w-8 h-8 shadow-sm" onClick={() => handleOpenDelete(partner)}>
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-sm tracking-tight">{partner.name}</h3>
                                            <Badge variant="outline" className="text-[8px] uppercase tracking-widest border-primary/20 text-primary">
                                                {partner.category}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="programs" className="mt-0 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {programsQuery.data?.map((program: any) => {
                                const Icon = iconMap[program.icon] || Briefcase;
                                return (
                                    <Card key={program.id} className="border-none shadow-soft rounded-[2.5rem] overflow-hidden group bg-white hover:border-primary/20 border-2 border-transparent transition-all">
                                        <CardContent className="p-8 flex gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-xl font-black italic">{program.title}</h3>
                                                    <div className="flex gap-2">
                                                        <Button size="icon" variant="ghost" className="rounded-full w-8 h-8 text-slate-400 hover:text-primary" onClick={() => handleOpenEdit(program)}>
                                                            <Pencil className="w-4 h-4" />
                                                        </Button>
                                                        <Button size="icon" variant="ghost" className="rounded-full w-8 h-8 text-slate-400 hover:text-destructive" onClick={() => handleOpenDelete(program)}>
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed italic">"{program.description}"</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </TabsContent>

                    <TabsContent value="stats" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {statsQuery.data?.map((stat: any) => (
                                <Card key={stat.id} className="border-none shadow-soft rounded-[2.5rem] bg-white group border-2 border-transparent hover:border-primary/20 transition-all">
                                    <CardContent className="p-8 text-center space-y-2 relative">
                                        <h3 className="text-4xl font-black text-primary italic tracking-tight">{stat.value}</h3>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
                                        <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleOpenEdit(stat)}>
                                                <Pencil className="w-3 h-3 text-slate-400" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => handleOpenDelete(stat)}>
                                                <Trash2 className="w-3 h-3 text-destructive" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Main Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-2xl rounded-[2.5rem] border-none shadow-2xl overflow-y-auto max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black italic">
                                {editingItem ? 'Edit' : 'Tambah'} <span className="text-primary not-italic">
                                    {activeTab === "partners" ? "Partner" : activeTab === "programs" ? "Program" : "Statistik"}
                                </span>
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                            {activeTab === "partners" && (
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Logo Perusahaan</Label>
                                        <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-muted group cursor-pointer border-2 border-dashed border-border flex items-center justify-center p-8">
                                            {previewUrl ? (
                                                <img src={getImageUrl(previewUrl)} className="max-w-full max-h-full object-contain" />
                                            ) : (
                                                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                                    <Camera className="w-12 h-12 opacity-10" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Unggah Logo</span>
                                                </div>
                                            )}
                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                                            {uploadProgress && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-white" /></div>}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Nama Perusahaan</Label>
                                            <Input name="name" defaultValue={editingItem?.name} required className="rounded-xl border-none bg-muted/50 font-bold" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Kategori</Label>
                                            <Input name="category" defaultValue={editingItem?.category} placeholder="Contoh: Telecommunication" className="rounded-xl border-none bg-muted/50 font-bold" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Urutan</Label>
                                            <Input name="order_priority" type="number" defaultValue={editingItem?.order_priority || 0} className="rounded-xl border-none bg-muted/50 font-bold" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "programs" && (
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Judul Program</Label>
                                        <Input name="title" defaultValue={editingItem?.title} required className="rounded-xl border-none bg-muted/50 font-bold" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Icon Visual</Label>
                                        <Select name="icon" defaultValue={editingItem?.icon || "Briefcase"}>
                                            <SelectTrigger className="rounded-xl border-none bg-muted/50 font-bold">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                {Object.keys(iconMap).map(key => (
                                                    <SelectItem key={key} value={key}>{key}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Deskripsi Singkat</Label>
                                        <Textarea name="description" defaultValue={editingItem?.description} required className="rounded-xl border-none bg-muted/50 min-h-[100px] font-medium" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Urutan</Label>
                                        <Input name="order_priority" type="number" defaultValue={editingItem?.order_priority || 0} className="rounded-xl border-none bg-muted/50 font-bold" />
                                    </div>
                                </div>
                            )}

                            {activeTab === "stats" && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Label Statistik</Label>
                                        <Input name="label" defaultValue={editingItem?.label} required placeholder="Contoh: Partner Aktif" className="rounded-xl border-none bg-muted/50 font-bold" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Nilai / Value</Label>
                                        <Input name="value" defaultValue={editingItem?.value} required placeholder="Contoh: 120+" className="rounded-xl border-none bg-muted/50 font-bold" />
                                    </div>
                                    <div className="grid gap-2 col-span-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Urutan</Label>
                                        <Input name="order_priority" type="number" defaultValue={editingItem?.order_priority || 0} className="rounded-xl border-none bg-muted/50 font-bold" />
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 justify-end pt-4">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold">Batal</Button>
                                <Button type="submit" disabled={uploadProgress} className="rounded-xl bg-primary hover:bg-primary-dark font-bold px-8">
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                <DeleteConfirm
                    open={isDeleteOpen}
                    onOpenChange={setIsDeleteOpen}
                    onConfirm={handleConfirmDelete}
                    title="Hapus Data Hubungan Industri?"
                    description="Tindakan ini akan menghapus data terpilih secara permanen."
                />
            </div>
        </AdminLayout>
    );
};

export default AdminHubunganIndustri;
