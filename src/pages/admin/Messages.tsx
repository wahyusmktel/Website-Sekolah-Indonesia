import { useState } from "react";
import {
    Loader2, MessageSquare, Trash2, Mail,
    Calendar, User, CheckCircle2, Circle,
    Search, Filter, ChevronRight, X
} from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirm } from "@/components/admin/DeleteConfirm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const AdminMessages = () => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);

    const { data: messages, isLoading } = useQuery({
        queryKey: ['messages'],
        queryFn: () => apiClient.get('/messages').then(res => res.data)
    });

    const readMutation = useMutation({
        mutationFn: ({ id, is_read }: { id: number, is_read: boolean }) => apiClient.patch(`/messages/${id}/read`, { is_read }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] })
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/messages/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
            setIsDeleteOpen(false);
            if (selectedMessage?.id === itemToDelete?.id) setSelectedMessage(null);
            toast.success("Pesan berhasil dihapus");
        }
    });

    const handleSelectMessage = (msg: any) => {
        setSelectedMessage(msg);
        if (!msg.is_read) {
            readMutation.mutate({ id: msg.id, is_read: true });
        }
    };

    const filteredMessages = messages?.filter((m: any) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto h-[calc(100vh-12rem)] flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-foreground italic uppercase">
                            Communication <span className="text-primary not-italic">Center</span>
                        </h1>
                        <p className="text-muted-foreground mt-1">Kelola pesan masuk dari formulir kontak publik.</p>
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Cari pesan..."
                            className="w-full h-12 rounded-2xl bg-white border border-slate-100 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-1 gap-8 min-h-0">
                    {/* Inbox List */}
                    <div className="w-full lg:w-96 flex flex-col gap-4 bg-white rounded-[2.5rem] border border-slate-100 shadow-soft overflow-hidden">
                        <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Inbox Messages</span>
                            <Badge variant="secondary" className="bg-primary text-white border-none rounded-lg h-6 px-3">
                                {messages?.filter((m: any) => !m.is_read).length} New
                            </Badge>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                            {filteredMessages?.map((msg: any) => (
                                <button
                                    key={msg.id}
                                    onClick={() => handleSelectMessage(msg)}
                                    className={cn(
                                        "w-full text-left p-6 rounded-[2rem] transition-all relative group",
                                        selectedMessage?.id === msg.id
                                            ? "bg-primary text-white shadow-glow translate-x-1"
                                            : "hover:bg-slate-50 bg-white"
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            {!msg.is_read && <div className={cn("w-2 h-2 rounded-full", selectedMessage?.id === msg.id ? "bg-white" : "bg-primary")} />}
                                            <span className={cn("text-xs font-black uppercase tracking-tight", selectedMessage?.id === msg.id ? "text-white/80" : "text-slate-400")}>
                                                {msg.name.split(' ')[0]}
                                            </span>
                                        </div>
                                        <span className={cn("text-[9px] font-bold", selectedMessage?.id === msg.id ? "text-white/60" : "text-slate-400")}>
                                            {new Date(msg.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h4 className={cn("font-bold text-sm mb-1 truncate", selectedMessage?.id === msg.id ? "text-white" : "text-slate-800")}>
                                        {msg.subject}
                                    </h4>
                                    <p className={cn("text-xs line-clamp-1 italic font-medium", selectedMessage?.id === msg.id ? "text-white/70" : "text-slate-500")}>
                                        {msg.message}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message Detailed View */}
                    <div className="hidden lg:flex flex-1 flex-col bg-white rounded-[3rem] border border-slate-100 shadow-soft overflow-hidden relative">
                        {selectedMessage ? (
                            <div className="flex flex-col h-full">
                                <header className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                                            <User className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black italic tracking-tight text-slate-800">{selectedMessage.name}</h2>
                                            <p className="text-sm font-bold text-slate-400">{selectedMessage.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="rounded-2xl w-12 h-12 border-slate-100 hover:text-destructive hover:bg-destructive/5"
                                            onClick={() => { setItemToDelete(selectedMessage); setIsDeleteOpen(true); }}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </header>
                                <div className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Badge className="bg-slate-100 text-slate-500 hover:bg-slate-200 border-none rounded-lg px-4 py-1.5 font-bold uppercase text-[10px]">
                                                {new Date(selectedMessage.created_at).toLocaleString()}
                                            </Badge>
                                        </div>
                                        <h3 className="text-3xl font-black text-slate-800 tracking-tight leading-tight italic">
                                            "{selectedMessage.subject}"
                                        </h3>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-6 top-0 w-1 h-full bg-primary/20 rounded-full" />
                                        <div className="prose prose-slate max-w-none">
                                            <p className="text-lg text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
                                                {selectedMessage.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <footer className="p-8 bg-slate-50/50 border-t border-slate-50 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        <span className="text-xs font-bold text-slate-500">Auto-logged and saved in system</span>
                                    </div>
                                    <Button className="rounded-2xl font-bold bg-slate-900 gap-2 h-12 px-8" onClick={() => window.open(`mailto:${selectedMessage.email}?subject=RE: ${selectedMessage.subject}`)}>
                                        <Mail className="w-4 h-4" />
                                        Reply via Email
                                    </Button>
                                </footer>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-20">
                                <div className="w-32 h-32 rounded-full bg-slate-50 flex items-center justify-center mb-8">
                                    <MessageSquare className="w-14 h-14 text-slate-200" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-300 italic uppercase">Pilih pesan untuk melihat detail</h3>
                                <p className="text-slate-400 mt-2 max-w-sm">Gunakan panel di sebelah kiri untuk menavigasi pesan masuk dari pengunjung website.</p>
                            </div>
                        )}
                    </div>

                    {/* Mobile Dialog for Message Detail */}
                    <Dialog open={!!selectedMessage && window.innerWidth < 1024} onOpenChange={() => setSelectedMessage(null)}>
                        <DialogContent className="max-w-xl w-[95vw] rounded-[3rem] border-none p-0">
                            {selectedMessage && (
                                <div className="flex flex-col">
                                    <header className="p-8 border-b border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h2 className="font-black italic tracking-tight text-slate-800">{selectedMessage.name}</h2>
                                                <p className="text-[10px] font-bold text-slate-400">{selectedMessage.email}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => setSelectedMessage(null)} className="rounded-full">
                                            <X className="w-5 h-5" />
                                        </Button>
                                    </header>
                                    <div className="p-8 overflow-y-auto max-h-[60vh]">
                                        <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight italic mb-6">
                                            {selectedMessage.subject}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap italic">
                                            "{selectedMessage.message}"
                                        </p>
                                    </div>
                                    <footer className="p-6 bg-slate-50/50 border-t border-slate-50 grid grid-cols-2 gap-3">
                                        <Button variant="outline" className="rounded-2xl font-bold border-slate-100 text-destructive h-12" onClick={() => { setItemToDelete(selectedMessage); setIsDeleteOpen(true); }}>
                                            Hapus Pesan
                                        </Button>
                                        <Button className="rounded-2xl font-bold bg-slate-900 h-12" onClick={() => window.open(`mailto:${selectedMessage.email}?subject=RE: ${selectedMessage.subject}`)}>
                                            Reply Email
                                        </Button>
                                    </footer>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>

                <DeleteConfirm
                    open={isDeleteOpen}
                    onOpenChange={setIsDeleteOpen}
                    onConfirm={() => deleteMutation.mutate(itemToDelete.id)}
                    title="Hapus Pesan Masuk?"
                    description="Pesan ini akan dihapus permanen. Anda tidak dapat mengembalikan pesan yang sudah terhapus."
                />
            </div>
        </AdminLayout>
    );
};

export default AdminMessages;
