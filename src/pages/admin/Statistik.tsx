import { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Users, GraduationCap, Building, Trophy, Briefcase, Award, HelpCircle } from "lucide-react";
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
import { toast } from "sonner";
import { DeleteConfirm } from "@/components/admin/DeleteConfirm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: { [key: string]: React.ElementType } = {
    Users,
    GraduationCap,
    Building,
    Trophy,
    Briefcase,
    Award
};

const AdminStatistik = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const queryClient = useQueryClient();

    const { data: statistikList = [], isLoading } = useQuery({
        queryKey: ['statistik'],
        queryFn: async () => {
            const response = await apiClient.get('/statistik');
            return response.data;
        }
    });

    const createMutation = useMutation({
        mutationFn: (newItem: any) => apiClient.post('/statistik', newItem),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['statistik'] });
            setIsOpen(false);
            toast.success("Statistik berhasil ditambahkan");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => apiClient.put(`/statistik/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['statistik'] });
            setIsOpen(false);
            toast.success("Statistik berhasil diperbarui");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/statistik/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['statistik'] });
            setIsDeleteOpen(false);
            setItemToDelete(null);
            toast.success("Statistik berhasil dihapus");
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: any = Object.fromEntries(formData.entries());

        // Ensure value is a number
        data.value = Number(data.value);

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
                            Statistik <span className="text-primary not-italic">Sekolah</span>
                        </h1>
                        <p className="text-muted-foreground mt-1">Kelola angka statistik capaian sekolah.</p>
                    </div>
                    <Button className="rounded-2xl h-12 px-6 bg-gradient-primary shadow-glow font-bold gap-2" onClick={() => { setSelectedItem(null); setIsOpen(true); }}>
                        <Plus className="w-4 h-4" />Tambah Statistik
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statistikList.map((item: any) => {
                            const Icon = iconMap[item.icon] || HelpCircle;
                            return (
                                <Card key={item.id} className="group border-none shadow-soft rounded-[2rem] overflow-hidden bg-white hover:shadow-elevated transition-all duration-300">
                                    <CardContent className="p-8">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary" onClick={() => {
                                                    setSelectedItem(item);
                                                    setIsOpen(true);
                                                }}>
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive" onClick={() => {
                                                    setItemToDelete(item.id);
                                                    setIsDeleteOpen(true);
                                                }}>
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-3xl font-black text-slate-800">{item.value}{item.suffix}</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}

                        {statistikList.length === 0 && (
                            <div className="col-span-full py-20 bg-muted/30 rounded-[3rem] border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground">
                                <Trophy className="w-12 h-12 mb-4 opacity-20" />
                                <p className="font-bold italic">Belum ada data statistik</p>
                                <p className="text-sm">Klik tombol "Tambah Statistik" untuk memulai</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[450px] rounded-[2rem] border-none shadow-elevated">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black italic">
                            {selectedItem ? 'Edit' : 'Tambah'} <span className="text-primary not-italic">Statistik</span>
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="icon" className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Icon</Label>
                            <Select name="icon" defaultValue={selectedItem?.icon || "Users"}>
                                <SelectTrigger className="rounded-xl border-none bg-muted/50 h-12 px-4 font-bold">
                                    <SelectValue placeholder="Pilih Icon" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {Object.keys(iconMap).map((key) => {
                                        const IconComp = iconMap[key];
                                        return (
                                            <SelectItem key={key} value={key} className="rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <IconComp className="w-4 h-4 text-primary" />
                                                    <span>{key}</span>
                                                </div>
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="label" className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Label Statistik</Label>
                            <Input id="label" name="label" defaultValue={selectedItem?.label} placeholder="Contoh: Siswa Aktif" className="rounded-xl border-none bg-muted/50 h-12 px-4 font-bold" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="value" className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Angka</Label>
                                <Input id="value" name="value" type="number" defaultValue={selectedItem?.value} placeholder="100" className="rounded-xl border-none bg-muted/50 h-12 px-4 font-bold" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="suffix" className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">Akhiran (Suffix)</Label>
                                <Input id="suffix" name="suffix" defaultValue={selectedItem?.suffix} placeholder="+" className="rounded-xl border-none bg-muted/50 h-12 px-4 font-bold" />
                            </div>
                        </div>

                        <DialogFooter className="gap-2">
                            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="rounded-xl font-bold">Batal</Button>
                            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="rounded-xl bg-gradient-primary shadow-glow font-bold px-8 h-12">
                                {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {selectedItem ? 'Simpan' : 'Tambah'}
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

export default AdminStatistik;
