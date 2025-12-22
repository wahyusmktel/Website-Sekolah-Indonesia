import { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, GraduationCap, Users, Building, Briefcase, Award, Heart, HelpCircle } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const iconMap: { [key: string]: React.ElementType } = {
    GraduationCap,
    Users,
    Building,
    Briefcase,
    Award,
    Heart,
};

const AdminKeunggulan = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const queryClient = useQueryClient();

    const { data: keunggulanList = [], isLoading } = useQuery({
        queryKey: ['keunggulan'],
        queryFn: async () => {
            const response = await apiClient.get('/keunggulan');
            return response.data;
        }
    });

    const createMutation = useMutation({
        mutationFn: (newItem: any) => apiClient.post('/keunggulan', newItem),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['keunggulan'] });
            setIsOpen(false);
            toast.success("Keunggulan berhasil ditambahkan");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => apiClient.put(`/keunggulan/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['keunggulan'] });
            setIsOpen(false);
            toast.success("Keunggulan berhasil diperbarui");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/keunggulan/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['keunggulan'] });
            setIsDeleteOpen(false);
            setItemToDelete(null);
            toast.success("Keunggulan berhasil dihapus");
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        if (selectedItem) {
            updateMutation.mutate({ id: selectedItem.id, data });
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
                            Keunggulan <span className="text-primary not-italic">Sekolah</span>
                        </h1>
                        <p className="text-muted-foreground mt-1">Kelola poin-poin keunggulan yang ditampilkan di halaman depan.</p>
                    </div>
                    <Button className="rounded-2xl h-12 px-6 bg-gradient-primary shadow-glow font-bold gap-2" onClick={() => { setSelectedItem(null); setIsOpen(true); }}>
                        <Plus className="w-4 h-4" />Tambah Keunggulan
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {keunggulanList.map((item: any) => {
                            const Icon = iconMap[item.icon] || HelpCircle;
                            return (
                                <div key={item.id} className="group bg-white rounded-[2rem] p-8 shadow-soft border border-border transition-all hover:shadow-elevated hover:-translate-y-1">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                            <Icon className="w-7 h-7" />
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="outline" size="icon" className="rounded-xl h-9 w-9 border-none bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors" onClick={() => {
                                                setSelectedItem(item);
                                                setIsOpen(true);
                                            }}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" className="rounded-xl h-9 w-9 border-none bg-muted/50 hover:text-destructive transition-colors" onClick={() => {
                                                setItemToDelete(item.id);
                                                setIsDeleteOpen(true);
                                            }}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}

                        {keunggulanList.length === 0 && (
                            <div className="col-span-full py-20 bg-muted/30 rounded-[3rem] border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground">
                                <HelpCircle className="w-12 h-12 mb-4 opacity-20" />
                                <p className="font-bold italic">Belum ada data keunggulan</p>
                                <p className="text-sm">Klik tombol "Tambah Keunggulan" untuk memulai</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px] rounded-[2rem] border-none shadow-elevated">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black italic">
                            {selectedItem ? 'Edit' : 'Tambah'} <span className="text-primary not-italic">Keunggulan</span>
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="icon" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Pilih Icon</Label>
                            <Select name="icon" defaultValue={selectedItem?.icon || "GraduationCap"}>
                                <SelectTrigger className="rounded-xl">
                                    <SelectValue placeholder="Pilih Icon" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {Object.keys(iconMap).map((key) => (
                                        <SelectItem key={key} value={key} className="rounded-lg">
                                            <div className="flex items-center gap-3">
                                                {(() => {
                                                    const IconComp = iconMap[key];
                                                    return <IconComp className="w-4 h-4" />;
                                                })()}
                                                <span>{key}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Judul Keunggulan</Label>
                            <Input id="title" name="title" defaultValue={selectedItem?.title} placeholder="Contoh: Kurikulum Industri" className="rounded-xl" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Deskripsi</Label>
                            <Textarea id="description" name="description" defaultValue={selectedItem?.description} placeholder="Masukkan deskripsi keunggulan..." className="min-h-[120px] rounded-xl" required />
                        </div>

                        <DialogFooter className="gap-2">
                            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="rounded-xl font-bold">Batal</Button>
                            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="rounded-xl bg-gradient-primary shadow-glow font-bold px-8">
                                {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {selectedItem ? 'Simpan Perubahan' : 'Tambah Keunggulan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <DeleteConfirm
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={() => itemToDelete && deleteMutation.mutate(itemToDelete)}
                isPending={deleteMutation.isPending}
            />
        </AdminLayout>
    );
};

export default AdminKeunggulan;
