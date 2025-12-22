import { useState } from "react";
import { Loader2, Users, Plus, Trash2, Save, Camera, User, Pencil } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { getImageUrl } from "@/lib/image-utils";

interface Member {
    id?: number;
    name: string;
    role: string;
    image: string;
    type: string;
    description?: string;
    order_priority: number;
    parent_id?: number | null;
    connection_type?: 'subordinate' | 'coordination';
}

const AdminStruktur = () => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<Member | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(false);

    // Form states for Select components
    const [formType, setFormType] = useState<string>("kaur");
    const [formParent, setFormParent] = useState<string>("none");
    const [formConn, setFormConn] = useState<'subordinate' | 'coordination'>("subordinate");

    const { data: members, isLoading } = useQuery({
        queryKey: ['struktur'],
        queryFn: async () => {
            const response = await apiClient.get('/struktur');
            return response.data;
        }
    });

    const saveMutation = useMutation({
        mutationFn: (data: Member) => {
            if (data.id) {
                return apiClient.put(`/struktur/${data.id}`, data);
            } else {
                return apiClient.post('/struktur', data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['struktur'] });
            setIsDialogOpen(false);
            setEditingMember(null);
            setPreviewUrl(null);
            toast.success("Data berhasil disimpan");
        },
        onError: () => toast.error("Gagal menyimpan data")
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/struktur/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['struktur'] });
            toast.success("Anggota berhasil dihapus");
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

        const payload: Member = {
            ...data,
            id: editingMember?.id,
            image: previewUrl || editingMember?.image || "",
            type: formType,
            parent_id: formParent === "none" ? null : parseInt(formParent),
            connection_type: formConn,
            order_priority: parseInt(data.order_priority) || 0
        };

        if (!payload.image) {
            toast.error("Foto wajib diunggah");
            return;
        }

        saveMutation.mutate(payload);
    };

    const handleOpenEdit = (member: Member) => {
        setEditingMember(member);
        setPreviewUrl(member.image);
        setFormType(member.type);
        setFormParent(member.parent_id?.toString() || "none");
        setFormConn(member.connection_type || "subordinate");
        setIsDialogOpen(true);
    };

    const handleOpenAdd = () => {
        setEditingMember(null);
        setPreviewUrl(null);
        setFormType("kaur");
        setFormParent("none");
        setFormConn("subordinate");
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

    const categories = [
        { label: "Kepala Sekolah", value: "kepala_sekolah" },
        { label: "Waka", value: "wakil_kepala_sekolah" },
        { label: "Komite", value: "komite_sekolah" },
        { label: "Administrasi", value: "kepala_administrasi" },
        { label: "Kaur", value: "kaur" },
        { label: "Kaprodi", value: "ketua_prodi" },
        { label: "Staf / Pelaksana", value: "staf" },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8 max-w-6xl mx-auto pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-foreground italic">
                            Manajemen <span className="text-primary not-italic">Struktur Organisasi</span>
                        </h1>
                        <p className="text-muted-foreground mt-1">Kelola jajaran kepemimpinan dan pengurus sekolah.</p>
                    </div>
                    <Button onClick={handleOpenAdd} className="rounded-2xl bg-primary hover:bg-primary-dark font-bold gap-2 self-start">
                        <Plus className="w-5 h-5" />
                        Tambah Anggota
                    </Button>
                </div>

                <div className="space-y-12">
                    {categories.map((cat) => (
                        <div key={cat.value} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-black italic uppercase tracking-wider">{cat.label}</h2>
                                <div className="h-px flex-1 bg-border" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {members?.filter((m: Member) => m.type === cat.value).map((item: Member) => (
                                    <Card key={item.id} className="border-none shadow-soft rounded-[2rem] overflow-hidden group">
                                        <CardContent className="p-0">
                                            <div className="relative aspect-square">
                                                <img
                                                    src={getImageUrl(item.image)}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{item.role}</span>
                                                    <h3 className="text-white font-bold text-lg leading-tight italic">{item.name}</h3>
                                                    {item.parent_id && (
                                                        <span className="text-[8px] text-white/50 uppercase font-bold mt-1">
                                                            Parent: {members.find((m: any) => m.id === item.parent_id)?.name || item.parent_id}
                                                        </span>
                                                    )}
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
                                                            if (confirm("Hapus anggota ini?")) {
                                                                deleteMutation.mutate(item.id!);
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-2xl rounded-[2.5rem] border-none shadow-2xl overflow-y-auto max-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black italic">
                                {editingMember ? 'Edit' : 'Tambah'} <span className="text-primary not-italic">Anggota Struktur</span>
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-muted group cursor-pointer border-2 border-dashed border-border shadow-soft flex items-center justify-center">
                                        {previewUrl ? (
                                            <>
                                                <img src={getImageUrl(previewUrl)} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Camera className="text-white w-10 h-10" />
                                                </div>
                                            </ >
                                        ) : (
                                            <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                                <User className="w-16 h-16 opacity-10" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Unggah Foto</span>
                                            </div>
                                        )}
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileUpload} />
                                        {uploadProgress && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                                                <Loader2 className="w-10 h-10 animate-spin text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Nama Lengkap</Label>
                                        <Input name="name" defaultValue={editingMember?.name} required className="rounded-xl border-none bg-muted/50 font-bold" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Jabatan / Role</Label>
                                        <Input name="role" defaultValue={editingMember?.role} required placeholder="Contoh: Waka Kurikulum" className="rounded-xl border-none bg-muted/50 font-bold" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Kategori</Label>
                                        <Select value={formType} onValueChange={setFormType}>
                                            <SelectTrigger className="rounded-xl border-none bg-muted/50 font-bold">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                {categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Urutan</Label>
                                        <Input name="order_priority" type="number" defaultValue={editingMember?.order_priority || 0} className="rounded-xl border-none bg-muted/50 font-bold" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Atasan / Parent</Label>
                                    <Select value={formParent} onValueChange={setFormParent}>
                                        <SelectTrigger className="rounded-xl border-none bg-muted/50 font-bold">
                                            <SelectValue placeholder="Pilih Atasan" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            <SelectItem value="none">Tanpa Atasan (Top Level)</SelectItem>
                                            {members?.filter((m: any) => m.id !== editingMember?.id).map((m: any) => (
                                                <SelectItem key={m.id} value={m.id.toString()}>{m.name} ({m.role})</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Tipe Hubungan</Label>
                                    <Select value={formConn} onValueChange={(v: any) => setFormConn(v)}>
                                        <SelectTrigger className="rounded-xl border-none bg-muted/50 font-bold">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            <SelectItem value="subordinate">Subordinat (Garis Bawah)</SelectItem>
                                            <SelectItem value="coordination">Koordinasi (Garis Samping)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Deskripsi / Quote (Khusus Kepsek)</Label>
                                <Textarea name="description" defaultValue={editingMember?.description} className="rounded-xl border-none bg-muted/50 min-h-[100px]" />
                            </div>

                            <div className="flex gap-3 justify-end">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold">Batal</Button>
                                <Button type="submit" disabled={saveMutation.isPending || uploadProgress} className="rounded-xl bg-primary hover:bg-primary-dark font-bold px-8">
                                    {saveMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
};

export default AdminStruktur;
