import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";

const AdminProgram = () => {
  const { data: programKeahlian = [], isLoading } = useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      const response = await apiClient.get('/programs');
      return response.data;
    }
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Manajemen Program</h1>
          <Button variant="gradient"><Plus className="w-4 h-4 mr-2" />Tambah Program</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programKeahlian.map((program: any) => (
            <div key={program.id} className="bg-card rounded-2xl shadow-soft overflow-hidden">
              {program.image && program.image !== "/placeholder.svg" ? (
                <img src={program.image} alt={program.name} className="h-32 w-full object-cover" />
              ) : (
                <div className="h-32 bg-gradient-primary" />
              )}
              <div className="p-6">
                <h3 className="font-semibold text-foreground mb-2">{program.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{program.short_desc}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Pencil className="w-4 h-4 mr-1" />Edit</Button>
                  <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProgram;
