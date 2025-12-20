import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { agendaList } from "@/lib/dummy-data";

const AdminAgenda = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Manajemen Agenda</h1>
          <Button variant="gradient"><Plus className="w-4 h-4 mr-2" />Tambah Agenda</Button>
        </div>

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
              {agendaList.map((agenda) => (
                <tr key={agenda.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{agenda.title}</td>
                  <td className="px-6 py-4 text-muted-foreground">{agenda.date}</td>
                  <td className="px-6 py-4"><Badge variant="secondary">{agenda.location}</Badge></td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="ghost" size="icon"><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAgenda;
