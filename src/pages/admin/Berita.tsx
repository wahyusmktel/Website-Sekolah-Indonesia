import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Plus, Pencil, Trash2, Search, Loader2, Image as ImageIcon, Tag, Calendar, Eye, User, FileText, Upload, X, Sparkles } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { getImageUrl } from "@/lib/image-utils";
import { formatDate } from "@/lib/date-utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DeleteConfirm } from "@/components/admin/DeleteConfirm";
import { CategorySelect } from "@/components/admin/CategorySelect";
import { CategoryManager } from "@/components/admin/CategoryManager";

// Quill Editor imports
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminBerita = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBerita, setSelectedBerita] = useState<any>(null);
  const [beritaToDelete, setBeritaToDelete] = useState<number | null>(null);
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (selectedBerita) {
      setContent(selectedBerita.content || "");
      setCategory(selectedBerita.category || "");
      setImageUrl(selectedBerita.image || "");
      setTitleInput(selectedBerita.title || "");
    } else {
      setContent("");
      setCategory("");
      setImageUrl("");
      setTitleInput("");
    }
  }, [selectedBerita, isOpen]);

  const { data: beritaList = [], isLoading } = useQuery({
    queryKey: ['berita'],
    queryFn: async () => {
      const response = await apiClient.get('/berita');
      return response.data;
    }
  });

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setIsUploading(true);
    try {
      const response = await apiClient.post('/upload', formData);
      setImageUrl(response.data.url);
      toast.success("Gambar berhasil diunggah");
    } catch (error) {
      toast.error("Gagal mengunggah gambar");
    } finally {
      setIsUploading(false);
    }
  };

  const createMutation = useMutation({
    mutationFn: (newBerita: any) => apiClient.post('/berita', newBerita),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['berita'] });
      setIsOpen(false);
      toast.success("Berita berhasil ditambahkan");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => apiClient.put(`/berita/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['berita'] });
      setIsOpen(false);
      toast.success("Berita berhasil diperbarui");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiClient.delete(`/berita/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['berita'] });
      setIsDeleteOpen(false);
      setBeritaToDelete(null);
      toast.success("Berita berhasil dihapus");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData.entries());

    if (!category) {
      toast.error("Silakan pilih kategori!");
      return;
    }

    if (!imageUrl) {
      toast.error("Silakan unggah gambar cover!");
      return;
    }

    const slug = (formProps.title as string).toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Generate automatic excerpt
    const plainText = stripHtml(content);
    const excerpt = plainText.substring(0, 160).trim() + (plainText.length > 160 ? '...' : '');

    const payload = {
      ...formProps,
      category,
      content,
      excerpt,
      slug,
      image: imageUrl,
      author: 'Admin',
      views: selectedBerita?.views || 0
    };

    if (selectedBerita) {
      updateMutation.mutate({ id: selectedBerita.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const filtered = beritaList.filter((b: any) => b.title.toLowerCase().includes(search.toLowerCase()));

  const quillRef = useRef<ReactQuill>(null);

  // Custom image handler for Quill
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        try {
          const toastId = toast.loading("Mengunggah gambar ke konten...");
          const res = await apiClient.post('/upload', formData);
          const url = getImageUrl(res.data.url);

          const quill = quillRef.current?.getEditor();
          const range = quill?.getSelection();
          if (quill && range) {
            quill.insertEmbed(range.index, 'image', url);
            quill.setSelection(range.index + 1 as any);
          }
          toast.dismiss(toastId);
          toast.success("Gambar berhasil disisipkan");
        } catch (error) {
          toast.error("Gagal mengunggah gambar");
        }
      }
    };
  }, []);

  // Quill Modules and Formats
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'list': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    },
  }), [imageHandler]);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-foreground tracking-tight">Manajemen Berita</h1>
            <p className="text-muted-foreground mt-1">Kelola artikel, kategori, dan publikasi berita sekolah.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl h-11 border-dashed" onClick={() => setIsCategoryOpen(true)}>
              <Tag className="w-4 h-4 mr-2" />Kategori
            </Button>
            <Button variant="gradient" className="rounded-xl h-11" onClick={() => { setSelectedBerita(null); setContent(""); setCategory(""); setImageUrl(""); setIsOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />Tambah Berita
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari berita..." className="pl-12 h-12 rounded-2xl border-none bg-card shadow-soft" />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((berita: any) => (
              <Card key={berita.id} className="group overflow-hidden rounded-3xl border-none bg-card shadow-soft hover:shadow-elevated transition-all duration-300">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={getImageUrl(berita.image)}
                    alt={berita.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="glass">{berita.category}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button variant="secondary" size="icon" className="rounded-full" onClick={() => { setSelectedBerita(berita); setIsOpen(true); }}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" className="rounded-full" onClick={() => { setBeritaToDelete(berita.id); setIsDeleteOpen(true); }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(berita.date)}</span>
                    <span className="flex items-center gap-1"><Eye size={12} /> {berita.views}</span>
                  </div>
                  <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">{berita.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{berita.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto rounded-[2rem] border-none shadow-elevated p-0">
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="p-8 border-b border-border sticky top-0 bg-card z-10 font-black text-2xl flex items-center justify-between">
              <span>{selectedBerita ? 'Edit Artikel' : 'Tulis Artikel Baru'}</span>
              <Button type="button" variant="ghost" size="icon" className="rounded-full" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="p-8 space-y-8">
              {/* Header Section */}
              <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="title" className="text-base font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-primary" />Judul Berita</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={selectedBerita?.title}
                      onChange={(e) => setTitleInput(e.target.value)}
                      placeholder="Masukkan judul berita yang menarik..."
                      className="h-14 text-xl font-bold rounded-2xl bg-muted/30 border-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold px-2">
                      <span className={titleInput.length > 60 || titleInput.length < 30 ? 'text-amber-500' : 'text-emerald-500'}>
                        Panjang Judul: {titleInput.length} karakter (Optimal: 40-60)
                      </span>
                      <span className="text-muted-foreground">Slug: /{titleInput.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-base font-bold flex items-center gap-2"><Tag className="w-4 h-4 text-primary" />Kategori</Label>
                      <CategorySelect value={category} onChange={setCategory} />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="date" className="text-base font-bold flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" />Tanggal Publish</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        className="h-11 rounded-xl bg-muted/30 border-none"
                        defaultValue={selectedBerita ? new Date(selectedBerita.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-bold flex items-center gap-2"><ImageIcon className="w-4 h-4 text-primary" />Cover Gambar</Label>
                  <div
                    className="aspect-video rounded-[1.5rem] bg-muted relative overflow-hidden group cursor-pointer border-2 border-dashed border-border hover:border-primary/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {isUploading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                        <Loader2 className="w-8 h-8 animate-spin text-white" />
                      </div>
                    ) : imageUrl ? (
                      <>
                        <img src={getImageUrl(imageUrl)} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-xs font-bold uppercase tracking-widest">Ganti Gambar</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6 text-center">
                        <Upload className="w-10 h-10 mb-2 opacity-20" />
                        <p className="text-xs font-medium">Klik untuk unggah cover (PNG, JPG max 2MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
              </div>

              {/* SEO Helper Box */}
              <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row gap-6 md:items-center">
                <div className="flex-1 space-y-2">
                  <Label className="uppercase tracking-widest text-[10px] font-black text-primary flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> SEO Preview & Tips
                  </Label>
                  <p className="text-sm font-bold text-foreground truncate">
                    URL: <span className="text-primary font-normal">/berita/{selectedBerita?.slug || '...-judul-artikel-...'}</span>
                  </p>
                  <div className="flex gap-4">
                    <Badge variant="outline" className="text-[10px] bg-white">Title: optimal (50-60 chars)</Badge>
                    <Badge variant="outline" className="text-[10px] bg-white">Mobile Friendly</Badge>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground max-w-sm leading-relaxed border-l-2 border-primary/20 pl-6">
                  <strong className="text-foreground block mb-1">💡 Tips Page One:</strong>
                  Gunakan Minimal 1 heading (H2/H3) di dalam konten dan pastikan kata kunci utama muncul di paragraf pertama.
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-3">
                <Label className="text-base font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-primary" />Konten Lengkap</Label>
                <div className="rounded-[2rem] overflow-hidden border border-border bg-white text-black min-h-[400px]">
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    placeholder="Tulis isi berita yang informatif di sini..."
                    className="admin-quill"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 bg-muted/20 border-t border-border flex justify-end gap-3 sticky bottom-0 backdrop-blur-xl">
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="rounded-xl h-12 px-6">Batal</Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending || isUploading} className="rounded-xl h-12 px-8 font-black text-base bg-gradient-primary shadow-glow hover:opacity-90 transition-all active:scale-95">
                {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {selectedBerita ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <CategoryManager
        open={isCategoryOpen}
        onOpenChange={setIsCategoryOpen}
      />

      <DeleteConfirm
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={() => beritaToDelete && deleteMutation.mutate(beritaToDelete)}
        isPending={deleteMutation.isPending}
      />
    </AdminLayout>
  );
};

export default AdminBerita;
