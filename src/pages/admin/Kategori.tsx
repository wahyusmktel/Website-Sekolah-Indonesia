import { useState } from "react";
import { Plus, Trash2, Loader2, Search } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { DeleteConfirm } from "@/components/admin/DeleteConfirm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const AdminKategori = () => {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [kategoriToDelete, setKategoriToDelete] = useState<number | null>(null);
    const queryClient = useQueryClient();

    const { data: kategoriList = [], isLoading } = useQuery({
        queryKey: ['kategori-berita'],
        queryFn: async () => {
            const response = await apiClient.get('/kategori-berita');
            return response.data;
        }
    });

    const createMutation = useMutation({
        mutationFn: (name: string) => apiClient.post('/kategori-berita', { name }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kategori-berita'] });
            setIsOpen(false);
            toast.success("Kategori berhasil ditambahkan");
        },
        onError: () => {
            toast.error("Gagal menambahkan kategori. Mungkin sudah ada?");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/kategori-berita/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kategori-berita'] });
            setIsDeleteOpen(false);
            setKategoriToDelete(null);
            toast.success("Kategori berhasil dihapus");
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        if (name) createMutation.mutate(name);
    };

    const filtered = kategoriList.filter((k: any) => k.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">Master Data Kategori Berita</h1>
                    <Button variant="gradient" onClick={() => setIsOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />Tambah Kategori
                    </Button>
                </div>

                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari kategori..." className="pl-12 h-12 rounded-xl" />
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filtered.map((item: any) => (
                            <div key={item.id} className="group bg-card p-4 rounded-2xl shadow-soft border border-border flex items-center justify-between hover:border-primary/50 transition-all">
                                <span className="font-semibold text-foreground">{item.name}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => { setKategoriToDelete(item.id); setIsDeleteOpen(true); }}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[400px] rounded-3xl border-none shadow-elevated">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Tambah Kategori Baru</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Kategori</Label>
                            <Input id="name" name="name" placeholder="Misal: Info Kurikulum" className="h-11 rounded-xl" required />
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={createMutation.isPending} className="rounded-xl w-full">
                                {createMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                Simpan Kategori
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <DeleteConfirm
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                onConfirm={() => kategoriToDelete && deleteMutation.mutate(kategoriToDelete)}
                isPending={deleteMutation.isPending}
                title="Hapus Kategori?"
                description="Kategori ini akan dihapus. Pengaruh pada berita yang menggunakan kategori ini mungkin terjadi."
            />
        </AdminLayout>
    );
};

export default AdminKategori;
