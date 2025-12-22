import { useState } from "react";
import { Loader2, Sparkles, Target, History, Plus, Trash2, Save, MoreHorizontal } from "lucide-react";
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminProfil = () => {
    const queryClient = useQueryClient();
    const [newMisiContent, setNewMisiContent] = useState("");

    const { data: profilData, isLoading } = useQuery({
        queryKey: ['profil'],
        queryFn: async () => {
            const response = await apiClient.get('/profil');
            return response.data;
        }
    });

    const updateProfilMutation = useMutation({
        mutationFn: (data: any) => apiClient.put('/profil', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profil'] });
            toast.success("Profil berhasil diperbarui");
        },
        onError: () => toast.error("Gagal memperbarui profil")
    });

    const addMisiMutation = useMutation({
        mutationFn: (content: string) => apiClient.post('/misi', { content }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profil'] });
            setNewMisiContent("");
            toast.success("Misi berhasil ditambahkan");
        }
    });

    const deleteMisiMutation = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/misi/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profil'] });
            toast.success("Misi berhasil dihapus");
        }
    });

    const addSejarahMutation = useMutation({
        mutationFn: (data: any) => apiClient.post('/sejarah', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profil'] });
            toast.success("Jejak perjalanan berhasil ditambahkan");
        }
    });

    const deleteSejarahMutation = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/sejarah/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profil'] });
            toast.success("Jejak perjalanan berhasil dihapus");
        }
    });

    const handleProfilSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        updateProfilMutation.mutate(data);
    };

    const handleAddSejarah = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        addSejarahMutation.mutate(data);
        e.currentTarget.reset();
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
                <div>
                    <h1 className="text-3xl font-black text-foreground italic">
                        Manajemen <span className="text-primary not-italic">Profil Sekolah</span>
                    </h1>
                    <p className="text-muted-foreground mt-1">Kelola Hero, Visi, Misi, and Jejak Perjalanan Sekolah.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Hero & Visi Section */}
                    <div className="space-y-8">
                        <Card className="border-none shadow-soft rounded-[2rem] bg-card">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold flex items-center gap-2 italic">
                                    <Sparkles className="w-5 h-5 text-primary" /> Hero Section
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleProfilSubmit} className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Hero Subtitle</Label>
                                        <Input name="hero_subtitle" defaultValue={profilData?.profil?.hero_subtitle} className="rounded-xl border-none bg-muted/50 font-bold" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Hero Title</Label>
                                        <Input name="hero_title" defaultValue={profilData?.profil?.hero_title} className="rounded-xl border-none bg-muted/50 font-black text-lg" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Hero Description</Label>
                                        <Textarea name="hero_description" defaultValue={profilData?.profil?.hero_description} className="rounded-xl border-none bg-muted/50 min-h-[100px]" />
                                    </div>
                                    <div className="pt-4 border-t border-border mt-6">
                                        <CardTitle className="text-lg font-bold flex items-center gap-2 italic mb-4">
                                            <Target className="w-5 h-5 text-primary" /> Visi & Misi Header
                                        </CardTitle>
                                        <div className="space-y-4">
                                            <div className="grid gap-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Visi Title</Label>
                                                <Input name="visi_title" defaultValue={profilData?.profil?.visi_title} className="rounded-xl border-none bg-muted/50 font-bold" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Visi Content</Label>
                                                <Textarea name="visi_content" defaultValue={profilData?.profil?.visi_content} className="rounded-xl border-none bg-muted/50" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Misi Title</Label>
                                                <Input name="misi_title" defaultValue={profilData?.profil?.misi_title} className="rounded-xl border-none bg-muted/50 font-bold" />
                                            </div>
                                        </div>
                                    </div>
                                    <Button type="submit" disabled={updateProfilMutation.isPending} className="w-full rounded-2xl h-12 mt-6 bg-gradient-primary shadow-glow font-bold">
                                        {updateProfilMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
                                        Simpan Perubahan
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Misi Items Section */}
                        <Card className="border-none shadow-soft rounded-[2rem] bg-card">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-bold flex items-center gap-2 italic">
                                    <Target className="w-5 h-5 text-primary" /> Poin-poin Misi
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Tambah misi baru..."
                                        value={newMisiContent}
                                        onChange={(e) => setNewMisiContent(e.target.value)}
                                        className="rounded-xl border-none bg-muted/50 font-medium"
                                    />
                                    <Button
                                        onClick={() => addMisiMutation.mutate(newMisiContent)}
                                        disabled={!newMisiContent || addMisiMutation.isPending}
                                        className="rounded-xl bg-primary hover:bg-primary-dark"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {profilData?.misi.map((item: any, index: number) => (
                                        <div key={item.id} className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border/50 group">
                                            <span className="text-xs font-black text-primary/40 w-6">0{index + 1}</span>
                                            <p className="flex-1 text-sm font-medium">{item.content}</p>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground hover:text-red-500 rounded-xl"
                                                onClick={() => deleteMisiMutation.mutate(item.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sejarah Section */}
                    <div className="space-y-8">
                        <Card className="border-none shadow-soft rounded-[2rem] bg-card h-full">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold flex items-center gap-2 italic">
                                    <History className="w-5 h-5 text-primary" /> Jejak Perjalanan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <form onSubmit={handleAddSejarah} className="p-6 rounded-[1.5rem] bg-primary/5 border border-primary/10 space-y-4">
                                    <p className="text-xs font-black uppercase tracking-widest text-primary italic">Tambah Timeline</p>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="col-span-1">
                                            <Input name="year" placeholder="Tahun" className="rounded-xl border-none bg-white font-bold" required />
                                        </div>
                                        <div className="col-span-3">
                                            <Input name="title" placeholder="Judul Peristiwa" className="rounded-xl border-none bg-white font-bold" required />
                                        </div>
                                    </div>
                                    <Textarea name="description" placeholder="Deskripsi singkat peristiwa..." className="rounded-xl border-none bg-white min-h-[80px]" required />
                                    <Button type="submit" disabled={addSejarahMutation.isPending} className="w-full rounded-xl bg-foreground text-white font-bold">
                                        Tambah Peristiwa
                                    </Button>
                                </form>

                                <div className="relative pl-8 space-y-8 mt-4">
                                    <div className="absolute left-[15px] top-0 bottom-0 w-px bg-primary/20" />
                                    {profilData?.sejarah.map((item: any) => (
                                        <div key={item.id} className="relative group">
                                            <div className="absolute -left-[23px] top-1 w-4 h-4 rounded-full bg-white border-2 border-primary z-10 shadow-glow" />
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="text-primary font-black text-lg">{item.year}</span>
                                                    <h4 className="font-bold text-lg leading-tight mt-1">{item.title}</h4>
                                                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{item.description}</p>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="rounded-xl">
                                                        <DropdownMenuItem
                                                            className="text-red-500 font-bold focus:text-red-500"
                                                            onClick={() => deleteSejarahMutation.mutate(item.id)}
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" /> Hapus
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminProfil;
