import { Plus, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { galeriList } from "@/lib/dummy-data";

const AdminGaleri = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Manajemen Galeri</h1>
          <Button variant="gradient"><Plus className="w-4 h-4 mr-2" />Upload Foto</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galeriList.map((item) => (
            <div key={item.id} className="group relative bg-gradient-primary aspect-square rounded-2xl overflow-hidden shadow-soft">
              <div className="absolute inset-0 flex items-center justify-center text-primary-foreground/30 font-bold text-4xl">
                {item.title.charAt(0)}
              </div>
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button variant="destructive" size="icon"><Trash2 className="w-4 h-4" /></Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/80 to-transparent">
                <p className="text-background text-sm font-medium truncate">{item.title}</p>
                <Badge variant="secondary" className="mt-1">{item.category}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminGaleri;
