import { useState } from "react";
import { Plus, Trash2, Loader2, Image as ImageIcon, Folders, Upload, X, MoreVertical, Edit2, ExternalLink } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DeleteConfirm } from "@/components/admin/DeleteConfirm";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const AdminGaleri = () => {
  const [activeTab, setActiveTab] = useState("photos");
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<any | null>(null);

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<{ id: number, type: 'photo' | 'album' } | null>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(false);

  const queryClient = useQueryClient();

  // Queries
  const { data: galeriList = [], isLoading: isLoadingGaleri } = useQuery({
    queryKey: ['galeri'],
    queryFn: async () => {
      const response = await apiClient.get('/galeri');
      return response.data;
    }
  });

  const { data: albumList = [], isLoading: isLoadingAlbums } = useQuery({
    queryKey: ['albums'],
    queryFn: async () => {
      const response = await apiClient.get('/albums');
      return response.data;
    }
  });

  const { data: selectedAlbum, isLoading: isLoadingAlbumDetail } = useQuery({
    queryKey: ['album', selectedAlbumId],
    queryFn: async () => {
      if (!selectedAlbumId) return null;
      const response = await apiClient.get(`/albums/${selectedAlbumId}`);
      return response.data;
    },
    enabled: !!selectedAlbumId
  });

  // Mutations
  const uploadPhotoMutation = useMutation({
    mutationFn: async (data: any) => {
      if (selectedFiles.length > 0) {
        setUploadProgress(true);
        const formData = new FormData();
        selectedFiles.forEach(file => formData.append('images', file));

        const uploadRes = await apiClient.post('/upload-multiple', formData);
        const imageUrls = uploadRes.data.urls;

        // Create multiple entries in bulk or one by one
        // For simplicity and to match current backend logic, we call post /api/galeri for each
        const promises = imageUrls.map((url: string) =>
          apiClient.post('/galeri', { ...data, image: url })
        );
        return Promise.all(promises);
      }
      return apiClient.post('/galeri', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galeri'] });
      queryClient.invalidateQueries({ queryKey: ['album', selectedAlbumId] });
      setIsPhotoModalOpen(false);
      resetPhotoForm();
      toast.success(`${selectedFiles.length > 1 ? selectedFiles.length + ' foto' : 'Foto'} berhasil ditambahkan`);
    },
    onError: () => {
      toast.error("Gagal menambahkan foto");
      setUploadProgress(false);
    }
  });

  const createAlbumMutation = useMutation({
    mutationFn: async (data: any) => {
      let imageUrl = data.cover_image;
      if (selectedFiles.length > 0) {
        setUploadProgress(true);
        const formData = new FormData();
        formData.append('image', selectedFiles[0]); // Use first selected image as cover
        const uploadRes = await apiClient.post('/upload', formData);
        imageUrl = uploadRes.data.url;
      }
      return apiClient.post('/albums', { ...data, cover_image: imageUrl });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['albums'] });
      setIsAlbumModalOpen(false);
      resetPhotoForm();
      toast.success("Album berhasil dibuat");
    },
    onError: () => {
      toast.error("Gagal membuat album");
      setUploadProgress(false);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (data: { id: number, type: 'photo' | 'album' }) =>
      apiClient.delete(`/${data.type === 'photo' ? 'galeri' : 'albums'}/${data.id}`),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.type === 'photo' ? 'galeri' : 'albums'] });
      queryClient.invalidateQueries({ queryKey: ['album', selectedAlbumId] });
      setIsDeleteOpen(false);
      setDeleteData(null);
      if (variables.type === 'album' && variables.id === selectedAlbumId) {
        setSelectedAlbumId(null);
      }
      toast.success(`${variables.type === 'photo' ? 'Foto' : 'Album'} berhasil dihapus`);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(prev => [...prev, ...files]);
      const newUrls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newUrls]);
    }
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const resetPhotoForm = () => {
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
    setUploadProgress(false);
  };

  const handlePhotoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = Object.fromEntries(formData.entries());
    if (data.album_id === "0" || !data.album_id) {
      data.album_id = null;
    } else {
      data.album_id = parseInt(data.album_id);
    }
    uploadPhotoMutation.mutate(data);
  };

  const handleAlbumSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const slug = (data.title as string).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    createAlbumMutation.mutate({ ...data, slug });
  };

  const confirmDelete = (e: React.MouseEvent, id: number, type: 'photo' | 'album') => {
    e.stopPropagation();
    setDeleteData({ id, type });
    setIsDeleteOpen(true);
  };

  const renderPhotoGrid = (photos: any[]) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <AnimatePresence>
        {photos.map((item: any) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            key={item.id}
            onClick={() => setPreviewPhoto(item)}
            className="group relative bg-white rounded-[2rem] overflow-hidden shadow-soft border border-slate-100 transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 cursor-zoom-in"
          >
            <div className="aspect-[4/5] overflow-hidden relative">
              <img
                src={item.image.startsWith('http') ? item.image : `${API_BASE_URL}${item.image}`}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-xl h-10 w-10 shadow-lg scale-75 group-hover:scale-100 transition-transform delay-75"
                    onClick={(e) => confirmDelete(e, item.id, 'photo')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-sm font-black text-slate-800 line-clamp-2 leading-tight">{item.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-bold text-[10px] uppercase tracking-wider rounded-lg px-2 py-0.5 border-none">
                  {item.category}
                </Badge>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Media & Galeri</h1>
            <p className="text-slate-500 font-medium">Kelola koleksi foto dan album sekolah Anda di sini.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-2xl border-slate-200 font-bold h-12 px-6 hover:bg-slate-50"
              onClick={() => { resetPhotoForm(); setIsAlbumModalOpen(true); }}
            >
              <Folders className="w-4 h-4 mr-2 text-primary" /> Buat Album
            </Button>
            <Button
              variant="gradient"
              className="rounded-2xl shadow-lg shadow-primary/20 font-bold h-12 px-6"
              onClick={() => { resetPhotoForm(); setIsPhotoModalOpen(true); }}
            >
              <Plus className="w-4 h-4 mr-2" /> Upload Foto
            </Button>
          </div>
        </div>

        {selectedAlbumId ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="rounded-xl font-bold text-slate-500 hover:text-primary"
                onClick={() => setSelectedAlbumId(null)}
              >
                <X className="w-4 h-4 mr-2" /> Kembali ke Album
              </Button>
              <div className="h-4 w-px bg-slate-200" />
              <Badge className="bg-primary/10 text-primary uppercase font-black text-[10px] tracking-widest px-3 py-1">
                Album Detail
              </Badge>
            </div>

            {isLoadingAlbumDetail ? (
              <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
            ) : selectedAlbum && (
              <div className="space-y-8">
                <div className="bg-white rounded-[2.5rem] p-10 shadow-soft border border-slate-100 flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-64 aspect-square rounded-[2rem] overflow-hidden shadow-lg flex-shrink-0">
                    <img
                      src={selectedAlbum.cover_image?.startsWith('http') ? selectedAlbum.cover_image : `${API_BASE_URL}${selectedAlbum.cover_image}`}
                      alt={selectedAlbum.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-2">{selectedAlbum.category}</p>
                    <h2 className="text-4xl font-black text-slate-800 leading-tight mb-4">{selectedAlbum.title}</h2>
                    <p className="text-slate-500 font-medium line-clamp-3 mb-6 max-w-2xl">{selectedAlbum.description}</p>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Release Date</span>
                        <span className="text-sm font-bold text-slate-700">{formatDate(selectedAlbum.date)}</span>
                      </div>
                      <div className="w-px h-8 bg-slate-100" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Total Media</span>
                        <span className="text-sm font-bold text-slate-700">{selectedAlbum.items?.length || 0} Photos</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3 italic">
                    <ImageIcon className="w-5 h-5 text-primary" /> Media in this album
                  </h3>
                  {selectedAlbum.items?.length === 0 ? (
                    <div className="py-20 text-center bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200">
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic">No photos added to this album yet.</p>
                    </div>
                  ) : renderPhotoGrid(selectedAlbum.items)}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Tabs defaultValue="photos" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-slate-100 p-1 rounded-2xl h-14 w-full max-w-md">
              <TabsTrigger value="photos" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm h-full flex-1">
                <ImageIcon className="w-4 h-4 mr-2" /> Semua Foto
              </TabsTrigger>
              <TabsTrigger value="albums" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm h-full flex-1">
                <Folders className="w-4 h-4 mr-2" /> Album
              </TabsTrigger>
            </TabsList>

            <TabsContent value="photos" className="mt-8">
              {isLoadingGaleri ? (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-dashed border-slate-200">
                  <Loader2 className="w-12 h-12 animate-spin text-primary/40 mb-4" />
                  <p className="text-slate-400 font-bold italic tracking-widest text-sm uppercase">Loading your memories...</p>
                </div>
              ) : galeriList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-dashed border-slate-200">
                  <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6">
                    <ImageIcon className="w-10 h-10 text-slate-200" />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">Belum ada foto</h3>
                  <p className="text-slate-400 text-sm font-medium mb-8">Mulai unggah foto kegiatan sekolah Anda sekarang.</p>
                  <Button variant="gradient" className="rounded-2xl px-8" onClick={() => { resetPhotoForm(); setIsPhotoModalOpen(true); }}>
                    Upload Foto Pertama
                  </Button>
                </div>
              ) : renderPhotoGrid(galeriList)}
            </TabsContent>

            <TabsContent value="albums" className="mt-8">
              {isLoadingAlbums ? (
                <div className="flex justify-center py-24"><Loader2 className="w-12 h-12 animate-spin text-primary" /></div>
              ) : albumList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-dashed border-slate-200">
                  <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-6">
                    <Folders className="w-10 h-10 text-slate-200" />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">Belum ada album</h3>
                  <p className="text-slate-400 text-sm font-medium mb-8">Kelompokkan foto-foto kegiatan ke dalam album yang rapi.</p>
                  <Button variant="outline" className="rounded-2xl px-8 border-slate-200 font-bold" onClick={() => { resetPhotoForm(); setIsAlbumModalOpen(true); }}>
                    Buat Album Pertama
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {albumList.map((album: any) => (
                    <Card
                      key={album.id}
                      onClick={() => setSelectedAlbumId(album.id)}
                      className="group overflow-hidden rounded-[2.5rem] border-none shadow-soft hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                    >
                      <CardContent className="p-0 relative">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={album.cover_image?.startsWith('http') ? album.cover_image : `${API_BASE_URL}${album.cover_image}`}
                            alt={album.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/10 transition-colors" />
                        </div>

                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                          <Badge className="bg-white/20 backdrop-blur-md text-white border-none font-black text-[10px] tracking-widest uppercase w-fit px-3 py-1">
                            {album.category}
                          </Badge>
                        </div>

                        <div className="absolute top-6 right-6">
                          <Button
                            variant="destructive"
                            size="icon"
                            className="rounded-2xl h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => confirmDelete(e, album.id, 'album')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent">
                          <p className="text-white/60 text-[10px] font-black tracking-[0.2em] uppercase mb-2 italic">{formatDate(album.date)}</p>
                          <h3 className="text-xl font-black text-white leading-tight mb-2 group-hover:text-primary-light transition-colors">{album.title}</h3>
                          <div className="w-0 group-hover:w-full h-0.5 bg-primary transition-all duration-500" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Photo Preview / Lightbox */}
      <Dialog open={!!previewPhoto} onOpenChange={() => setPreviewPhoto(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-[70vw] p-0 overflow-hidden border-none bg-black/95 rounded-[2rem] shadow-2xl">
          <div className="relative w-full aspect-video sm:aspect-auto flex items-center justify-center min-h-[50vh] max-h-[85vh]">
            {previewPhoto && (
              <img
                src={previewPhoto.image.startsWith('http') ? previewPhoto.image : `${API_BASE_URL}${previewPhoto.image}`}
                alt={previewPhoto.title}
                className="max-w-full max-h-full object-contain"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <Badge className="bg-primary text-white border-none mb-2 font-black text-[10px] uppercase tracking-widest">{previewPhoto?.category || "Photo"}</Badge>
                  <h2 className="text-2xl font-black text-white">{previewPhoto?.title}</h2>
                </div>
                <Button variant="outline" className="rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/20 font-bold backdrop-blur-md" onClick={() => setPreviewPhoto(null)}>
                  Tutup Preview
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo Modal */}
      <Dialog open={isPhotoModalOpen} onOpenChange={(open) => { setIsPhotoModalOpen(open); if (!open) resetPhotoForm(); }}>
        <DialogContent className="sm:max-w-[600px] rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-slate-900 p-8 text-white relative h-32 flex items-center">
            <div className="relative z-10">
              <h2 className="text-2xl font-black tracking-tight">Unggah Media</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Gallery Management</p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
          </div>

          <form onSubmit={handlePhotoSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-800 font-black text-xs uppercase tracking-widest">Judul/Label Foto</Label>
              <Input id="title" name="title" className="rounded-xl bg-slate-50 border-slate-200 h-12 focus:ring-primary/20 font-medium" placeholder="Misal: Penyerahan Piala LKS IT" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-800 font-black text-xs uppercase tracking-widest">Kategori</Label>
                <Select name="category" defaultValue="Kegiatan">
                  <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 h-12 font-medium">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                    <SelectItem value="Kegiatan">Kegiatan</SelectItem>
                    <SelectItem value="Prestasi">Prestasi</SelectItem>
                    <SelectItem value="Sarana">Sarana</SelectItem>
                    <SelectItem value="Pembelajaran">Pembelajaran</SelectItem>
                    <SelectItem value="Ekstrakurikuler">Ekstrakurikuler</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="album_id" className="text-slate-800 font-black text-xs uppercase tracking-widest">Pilih Album (Opsional)</Label>
                <Select name="album_id" defaultValue={selectedAlbumId?.toString() || "0"}>
                  <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 h-12 font-medium">
                    <SelectValue placeholder="Mandiri" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                    <SelectItem value="0">Tanpa Album</SelectItem>
                    {albumList.map((album: any) => (
                      <SelectItem key={album.id} value={album.id.toString()}>{album.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-800 font-black text-xs uppercase tracking-widest">Pilih Gambar (Bisa lebih dari satu)</Label>
              <div className="relative group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="image-upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] cursor-pointer hover:bg-slate-100/50 hover:border-primary/30 transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-slate-800 font-black text-sm">Pilih Gambar dari Komputer</p>
                  <p className="text-slate-400 text-xs font-medium">JPG, PNG atau WebP (Max. 5MB per file)</p>
                </label>
              </div>

              {previewUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-3 max-h-40 overflow-y-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square group rounded-xl overflow-hidden shadow-sm">
                      <img src={url} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <label htmlFor="image-upload" className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-white transition-colors">
                    <Plus className="w-4 h-4 text-slate-400" />
                  </label>
                </div>
              )}
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="submit"
                className="w-full rounded-2xl h-14 font-black shadow-lg shadow-primary/30 text-base"
                variant="gradient"
                disabled={uploadPhotoMutation.isPending || (selectedFiles.length === 0)}
              >
                {uploadPhotoMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Sedang Mengunggah {selectedFiles.length} Foto...
                  </>
                ) : (
                  `Unggah ${selectedFiles.length} Foto Sekarang`
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Album Modal */}
      <Dialog open={isAlbumModalOpen} onOpenChange={(open) => { setIsAlbumModalOpen(open); if (!open) resetPhotoForm(); }}>
        <DialogContent className="sm:max-w-[500px] rounded-[2rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-slate-900 p-8 text-white relative h-32 flex items-center">
            <div className="relative z-10">
              <h2 className="text-2xl font-black tracking-tight">Buat Album Baru</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Collection Management</p>
            </div>
          </div>

          <form onSubmit={handleAlbumSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-slate-800 font-black text-xs uppercase tracking-widest">Judul Album</Label>
                <Input id="title" name="title" className="rounded-xl h-12 bg-slate-50 border-slate-200 font-medium" placeholder="Misal: Wisuda Angkatan 2024" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-800 font-black text-xs uppercase tracking-widest">Kategori</Label>
                  <Select name="category" defaultValue="Kegiatan">
                    <SelectTrigger className="rounded-xl h-12 bg-slate-50 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                      <SelectItem value="Kegiatan">Kegiatan</SelectItem>
                      <SelectItem value="Prestasi">Prestasi</SelectItem>
                      <SelectItem value="Sarana">Sarana</SelectItem>
                      <SelectItem value="Pembelajaran">Pembelajaran</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-slate-800 font-black text-xs uppercase tracking-widest">Tanggal</Label>
                  <Input type="date" id="date" name="date" className="rounded-xl h-12 bg-slate-50 border-slate-200" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-800 font-black text-xs uppercase tracking-widest">Deskripsi Singkat</Label>
                <Input id="description" name="description" className="rounded-xl h-12 bg-slate-50 border-slate-200" placeholder="Keterangan mengenai album ini..." />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-800 font-black text-xs uppercase tracking-widest">Cover Image</Label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    id="album-image-upload"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="album-image-upload"
                    className="flex flex-col items-center justify-center p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100/50 transition-all"
                  >
                    {previewUrls.length > 0 ? (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                        <img src={previewUrls[0]} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Upload className="w-4 h-4 text-primary" />
                        <span className="text-slate-500 font-bold text-sm">Pilih Cover</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="submit"
                className="w-full rounded-2xl h-14 font-black text-base shadow-xl"
                variant="gradient"
                disabled={createAlbumMutation.isPending || (selectedFiles.length === 0)}
              >
                {createAlbumMutation.isPending ? "Sedang Membuat..." : "Simpan Album"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <DeleteConfirm
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={() => deleteData && deleteMutation.mutate(deleteData)}
        isPending={deleteMutation.isPending}
      />
    </AdminLayout>
  );
};

export default AdminGaleri;
