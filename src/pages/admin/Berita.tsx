import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { beritaList } from "@/lib/dummy-data";

const AdminBerita = () => {
  const [search, setSearch] = useState("");
  const filtered = beritaList.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Manajemen Berita</h1>
          <Button variant="gradient"><Plus className="w-4 h-4 mr-2" />Tambah Berita</Button>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari berita..." className="pl-12 h-12 rounded-xl" />
        </div>

        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Judul</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Tanggal</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Views</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((berita) => (
                <tr key={berita.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{berita.title}</td>
                  <td className="px-6 py-4"><Badge variant="accent">{berita.category}</Badge></td>
                  <td className="px-6 py-4 text-muted-foreground">{berita.date}</td>
                  <td className="px-6 py-4 text-muted-foreground">{berita.views}</td>
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

export default AdminBerita;
