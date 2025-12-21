import { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Calendar, Eye } from "lucide-react"; // Added Calendar and Eye
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { formatDate } from "@/lib/date-utils";
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

const AdminAgenda = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedAgenda, setSelectedAgenda] = useState<any>(null);
  const [agendaToDelete, setAgendaToDelete] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: agendaList = [], isLoading } = useQuery({
    queryKey: ['agenda'],
    queryFn: async () => {
      const response = await apiClient.get('/agenda');
      return response.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: (newAgenda: any) => apiClient.post('/agenda', newAgenda),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agenda'] });
      setIsOpen(false);
      toast.success("Agenda berhasil ditambahkan");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => apiClient.put(`/agenda/${id}`, data), // Note: I need to add this route to backend
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agenda'] });
      setIsOpen(false);
      toast.success("Agenda berhasil diperbarui");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiClient.delete(`/agenda/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agenda'] });
      setIsDeleteOpen(false);
      setAgendaToDelete(null);
      toast.success("Agenda berhasil dihapus");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (selectedAgenda) {
      updateMutation.mutate({ id: selectedAgenda.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Manajemen Agenda</h1>
          <Button variant="gradient" onClick={() => { setSelectedAgenda(null); setIsOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" />Tambah Agenda
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Kegiatan</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Tanggal</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Lokasi</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {agendaList.map((agenda: any) => (
                  <tr key={agenda.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 text-foreground font-medium">
                      {agenda.title}
                      {/* Applying formatDate to agenda.date and agenda.end_date if available */}
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(agenda.date)}</span>
                        {agenda.end_date && <span className="flex items-center gap-1"> - {formatDate(agenda.end_date)}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{formatDate(agenda.date)}</td>
                    <td className="px-6 py-4"><Badge variant="outline">{agenda.location}</Badge></td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => { setSelectedAgenda(agenda); setIsOpen(true); }}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => { setAgendaToDelete(agenda.id); setIsDeleteOpen(true); }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedAgenda ? 'Edit Agenda' : 'Tambah Agenda Baru'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Nama Kegiatan</Label>
              <Input id="title" name="title" defaultValue={selectedAgenda?.title} placeholder="Nama kegiatan" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Tanggal Mulai</Label>
                <Input id="date" name="date" type="date" defaultValue={selectedAgenda ? new Date(selectedAgenda.date).toISOString().split('T')[0] : ''} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end_date">Tanggal Selesai</Label>
                <Input id="end_date" name="end_date" type="date" defaultValue={selectedAgenda?.end_date ? new Date(selectedAgenda.end_date).toISOString().split('T')[0] : ''} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Lokasi</Label>
              <Input id="location" name="location" defaultValue={selectedAgenda?.location} placeholder="Lokasi kegiatan" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" name="description" defaultValue={selectedAgenda?.description} placeholder="Deskripsi singkat kegiatan" />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {selectedAgenda ? 'Simpan Perubahan' : 'Tambah Agenda'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <DeleteConfirm
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={() => agendaToDelete && deleteMutation.mutate(agendaToDelete)}
        isPending={deleteMutation.isPending}
      />
    </AdminLayout>
  );
};

export default AdminAgenda;
