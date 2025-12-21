import { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Image as ImageIcon, Upload, GraduationCap, ArrowRight, CheckCircle2, Globe, Briefcase } from "lucide-react";
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
import { getImageUrl } from "@/lib/image-utils";
import { Badge } from "@/components/ui/badge";

const iconOptions = ["Network", "Code", "Palette", "Calculator", "TrendingUp", "FileText"];

const AdminProgram = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [programToDelete, setProgramToDelete] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const [uploadProgress, setUploadProgress] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prospects, setProspects] = useState<string[]>([]);
  const [newProspect, setNewProspect] = useState("");
  const [keyTechs, setKeyTechs] = useState<string[]>([]);
  const [newKeyTech, setNewKeyTech] = useState("");

  const { data: programs = [], isLoading } = useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      const response = await apiClient.get('/programs');
      return response.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: (newProgram: any) => apiClient.post('/programs', newProgram),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      setIsOpen(false);
      resetForm();
      toast.success("Program berhasil ditambahkan");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => apiClient.put(`/programs/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      setIsOpen(false);
      resetForm();
      toast.success("Program berhasil diperbarui");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiClient.delete(`/programs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      setIsDeleteOpen(false);
      setProgramToDelete(null);
      toast.success("Program berhasil dihapus");
    },
  });

  const resetForm = () => {
    setSelectedProgram(null);
    setPreviewUrl(null);
    setProspects([]);
    setNewProspect("");
    setKeyTechs([]);
    setNewKeyTech("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await apiClient.post('/upload', formData);
      setPreviewUrl(data.url);
      toast.success("Gambar berhasil diunggah");
    } catch (error) {
      toast.error("Gagal mengunggah gambar");
    } finally {
      setUploadProgress(false);
    }
  };

  const addProspect = () => {
    if (newProspect.trim()) {
      setProspects([...prospects, newProspect.trim()]);
      setNewProspect("");
    }
  };

  const removeProspect = (index: number) => {
    setProspects(prospects.filter((_, i) => i !== index));
  };

  const addKeyTech = () => {
    if (newKeyTech.trim()) {
      setKeyTechs([...keyTechs, newKeyTech.trim()]);
      setNewKeyTech("");
    }
  };

  const removeKeyTech = (index: number) => {
    setKeyTechs(keyTechs.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as any;

    data.prospects = prospects;
    data.key_techs = keyTechs;
    if (previewUrl) {
      data.image = previewUrl;
    } else if (selectedProgram?.image) {
      data.image = selectedProgram.image;
    } else {
      data.image = "/placeholder.svg";
    }

    if (selectedProgram) {
      updateMutation.mutate({ id: selectedProgram.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (program: any) => {
    setSelectedProgram(program);
    setPreviewUrl(program.image);
    setProspects(Array.isArray(program.prospects) ? program.prospects : (typeof program.prospects === 'string' ? JSON.parse(program.prospects || '[]') : []));
    setKeyTechs(Array.isArray(program.key_techs) ? program.key_techs : (typeof program.key_techs === 'string' ? JSON.parse(program.key_techs || '[]') : []));
    setIsOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-foreground italic">
              Manajemen <span className="text-primary not-italic">Program Keahlian</span>
            </h1>
            <p className="text-muted-foreground mt-1">Kelola data program keahlian / jurusan sekolah.</p>
          </div>
          <Button
            className="rounded-2xl h-12 px-6 bg-gradient-primary shadow-glow font-bold gap-2"
            onClick={() => { resetForm(); setIsOpen(true); }}
          >
            <Plus className="w-4 h-4" />Tambah Program
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program: any) => (
              <div key={program.id} className="group bg-card rounded-[2.5rem] shadow-soft border border-border overflow-hidden transition-all hover:shadow-elevated flex flex-col">
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={getImageUrl(program.image)}
                    alt={program.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-light text-[10px] font-black uppercase tracking-widest px-3 py-1">
                      {program.icon}
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-black text-white italic line-clamp-1">{program.name}</h3>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{program.slug}</p>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-6 font-light">{program.short_desc}</p>

                  <div className="flex flex-wrap gap-2 mb-4 flex-1 items-start">
                    {(Array.isArray(program.prospects) ? program.prospects : (typeof program.prospects === 'string' ? JSON.parse(program.prospects || '[]') : [])).slice(0, 2).map((job: string, i: number) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider">
                        {job}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8 items-start">
                    {(Array.isArray(program.key_techs) ? program.key_techs : (typeof program.key_techs === 'string' ? JSON.parse(program.key_techs || '[]') : [])).slice(0, 3).map((tech: string, i: number) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-emerald-500/5 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl h-11 font-bold gap-2 text-xs border-none bg-muted/30 hover:bg-primary/10 hover:text-primary transition-colors"
                      onClick={() => handleEdit(program)}
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit Program
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl h-11 w-11 border-none bg-muted/30 hover:text-destructive transition-colors"
                      onClick={() => {
                        setProgramToDelete(program.id);
                        setIsDeleteOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {programs.length === 0 && (
              <div className="lg:col-span-2 py-20 bg-muted/30 rounded-[3rem] border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground italic font-medium">
                <GraduationCap className="w-12 h-12 mb-4 opacity-20" />
                <p>Belum ada program keahlian</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-none shadow-elevated">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black italic">
              {selectedProgram ? 'Edit' : 'Tambah'} <span className="text-primary not-italic">Program Keahlian</span>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-8 py-4 px-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Nama Program</Label>
                  <Input id="name" name="name" defaultValue={selectedProgram?.name} placeholder="Contoh: Rekayasa Perangkat Lunak" className="rounded-xl h-11" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="slug" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Slug (URL)</Label>
                  <Input id="slug" name="slug" defaultValue={selectedProgram?.slug} placeholder="Contoh: rpl" className="rounded-xl h-11" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="icon" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Icon</Label>
                  <select
                    id="icon"
                    name="icon"
                    defaultValue={selectedProgram?.icon || "Code"}
                    className="h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                  >
                    {iconOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                    Prospek Karir
                    <span className="text-[9px] lowercase font-normal italic">Enter untuk menambah</span>
                  </Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newProspect}
                      onChange={(e) => setNewProspect(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addProspect())}
                      placeholder="Tambah prospek..."
                      className="rounded-xl h-11"
                    />
                    <Button type="button" variant="outline" className="h-11 px-4 rounded-xl border-dashed" onClick={addProspect}><Plus className="w-4 h-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {prospects.map((p, i) => (
                      <Badge key={i} variant="secondary" className="pl-3 pr-1 py-1 rounded-lg group text-xs font-bold gap-1 bg-muted/50 border-none">
                        {p}
                        <button type="button" onClick={() => removeProspect(i)} className="p-1 hover:text-destructive group-hover:bg-muted rounded-md transition-colors">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                    Key Technologies
                    <span className="text-[9px] lowercase font-normal italic">Enter untuk menambah</span>
                  </Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newKeyTech}
                      onChange={(e) => setNewKeyTech(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyTech())}
                      placeholder="Tambah teknologi..."
                      className="rounded-xl h-11"
                    />
                    <Button type="button" variant="outline" className="h-11 px-4 rounded-xl border-dashed" onClick={addKeyTech}><Plus className="w-4 h-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {keyTechs.map((t, i) => (
                      <Badge key={i} variant="secondary" className="pl-3 pr-1 py-1 rounded-lg group text-xs font-bold gap-1 bg-muted/50 border-none">
                        {t}
                        <button type="button" onClick={() => removeKeyTech(i)} className="p-1 hover:text-destructive group-hover:bg-muted rounded-md transition-colors">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid gap-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground text-center">Gambar Visual</Label>
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-muted border-2 border-dashed border-border flex items-center justify-center group cursor-pointer">
                    {previewUrl ? (
                      <>
                        <img src={getImageUrl(previewUrl)} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Upload className="text-white w-8 h-8" />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <ImageIcon className="w-10 h-10 opacity-20" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Klik untuk Unggah</span>
                      </div>
                    )}
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFileUpload} />
                    {uploadProgress && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                        <Loader2 className="w-8 h-8 animate-spin text-white" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="short_desc" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Deskripsi Singkat (Max 2 baris)</Label>
                  <Textarea id="short_desc" name="short_desc" defaultValue={selectedProgram?.short_desc} placeholder="Membangun konektivitas masa depan..." className="min-h-[80px] rounded-xl text-sm" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description" className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Deskripsi Detail</Label>
                  <Textarea id="description" name="description" defaultValue={selectedProgram?.description} placeholder="Masukkan rincian lebih lanjut tentang program keahlian ini..." className="min-h-[120px] rounded-xl text-sm" required />
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 pt-6">
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="rounded-xl font-bold">Batal</Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending || uploadProgress} className="rounded-xl h-12 bg-gradient-primary shadow-glow font-bold px-10">
                {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {selectedProgram ? 'Simpan Perubahan' : 'Tambah Program'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <DeleteConfirm
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={() => programToDelete && deleteMutation.mutate(programToDelete)}
        isPending={deleteMutation.isPending}
      />
    </AdminLayout>
  );
};

export default AdminProgram;
