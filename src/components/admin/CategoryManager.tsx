import { useState } from "react";
import { Plus, Trash2, Loader2, Tag } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface CategoryManagerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CategoryManager({ open, onOpenChange }: CategoryManagerProps) {
    const [newName, setNewName] = useState("");
    const queryClient = useQueryClient();

    const { data: categories = [], isLoading } = useQuery({
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
            setNewName("");
            toast.success("Kategori berhasil ditambahkan");
        },
        onError: () => toast.error("Gagal menambahkan kategori"),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/kategori-berita/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kategori-berita'] });
            toast.success("Kategori berhasil dihapus");
        },
        onError: () => toast.error("Gagal menghapus kategori"),
    });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName.trim()) return;
        createMutation.mutate(newName);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Tag className="w-5 h-5 text-primary" />
                        Kelola Kategori Berita
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleAdd} className="flex gap-2 mt-4">
                    <Input
                        placeholder="Nama kategori baru..."
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="rounded-xl h-11"
                    />
                    <Button type="submit" disabled={createMutation.isPending} variant="gradient" size="icon" className="shrink-0 h-11 w-11 rounded-xl">
                        {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    </Button>
                </form>

                <div className="mt-6 space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {isLoading ? (
                        <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
                    ) : categories.length === 0 ? (
                        <p className="text-center text-sm text-muted-foreground py-4">Belum ada kategori.</p>
                    ) : (
                        categories.map((c: any) => (
                            <div key={c.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl group hover:bg-muted transition-colors">
                                <span className="font-medium text-sm">{c.name}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => deleteMutation.mutate(c.id)}
                                    disabled={deleteMutation.isPending}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
