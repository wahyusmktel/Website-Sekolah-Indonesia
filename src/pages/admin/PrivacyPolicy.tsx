import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Loader2, Save, ShieldCheck, Info, FileText,
    Rocket, Sparkles, RefreshCcw
} from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminPrivacyPolicy = () => {
    const queryClient = useQueryClient();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const { data: policy, isLoading } = useQuery({
        queryKey: ['admin-privacy-policy'],
        queryFn: () => apiClient.get('/privacy-policy').then(res => res.data)
    });

    useEffect(() => {
        if (policy) {
            setTitle(policy.title || "");
            setContent(policy.content || "");
        }
    }, [policy]);

    const mutation = useMutation({
        mutationFn: (data: any) => apiClient.put('/privacy-policy', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-privacy-policy'] });
            toast.success("Kebijakan privasi berhasil diperbarui");
        },
        onError: (error: any) => {
            toast.error("Gagal memperbarui kebijakan privasi: " + (error.response?.data?.message || error.message));
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) {
            toast.error("Judul dan konten tidak boleh kosong");
            return;
        }
        mutation.mutate({ title, content });
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'clean'],
            ['blockquote', 'code-block']
        ],
    };

    if (isLoading) {
        return (
            <AdminLayout title="Kebijakan Privasi">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Kebijakan Privasi">
            <div className="space-y-8 max-w-5xl mx-auto pb-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-glow rotate-3">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-foreground italic tracking-tight">
                                PRIVACY <span className="text-primary not-italic">POLICY</span>
                            </h1>
                            <p className="text-muted-foreground mt-1 flex items-center gap-2">
                                <RefreshCcw className="w-3 h-3 text-primary animate-spin-slow" />
                                Kelola transparansi data dan regulasi privasi sekolah.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Control Card */}
                    <Card className="border-none shadow-soft rounded-[3rem] overflow-hidden bg-white">
                        <CardContent className="p-10 space-y-8">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-2 text-muted-foreground/60">Judul Dokumen</Label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-muted-foreground/40 group-focus-within:text-primary transition-colors">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <Input
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Contoh: Kebijakan Privasi SMK Indonesia"
                                                className="h-16 pl-16 rounded-2xl bg-foreground/5 border-none px-6 font-black text-lg focus:ring-2 focus:ring-primary/20 transition-all uppercase tracking-tight"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="p-6 rounded-[2rem] bg-primary/5 border border-primary/10 flex items-center gap-4 w-full">
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-soft">
                                            <Info className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-extrabold text-sm uppercase tracking-tight italic">Legal Compliance</h4>
                                            <p className="text-[10px] text-muted-foreground font-medium max-w-[200px] leading-tight mt-0.5">
                                                Pastikan konten sesuai dengan regulasi perlindungan data pribadi yang berlaku.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Editor Section */}
                            <div className="space-y-4 pt-6">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] ml-2 text-muted-foreground/60">Konten Kebijakan (Rich Text)</Label>
                                <div className="rounded-[2rem] overflow-hidden border border-border shadow-soft bg-white group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                                    <style>{`
                                        .quill { border: none !important; }
                                        .ql-toolbar { 
                                            background: #f8fafc !important; 
                                            border: none !important; 
                                            border-bottom: 1px solid #f1f5f9 !important;
                                            padding: 1.5rem !important;
                                        }
                                        .ql-container { border: none !important; font-family: inherit !important; }
                                        .ql-editor { 
                                            min-height: 500px; 
                                            padding: 2.5rem !important;
                                            font-size: 1rem !important;
                                            line-height: 1.8 !important;
                                            color: #334155 !important;
                                        }
                                        .ql-editor h2 { 
                                            font-weight: 900 !important; 
                                            font-style: italic !important; 
                                            color: #0f172a !important;
                                            margin-top: 2rem !important;
                                            text-transform: uppercase !important;
                                            letter-spacing: -0.025em !important;
                                        }
                                    `}</style>
                                    <ReactQuill
                                        theme="snow"
                                        value={content}
                                        onChange={setContent}
                                        modules={modules}
                                        placeholder="Tuliskan kebijakan privasi secara detail di sini..."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest italic">Pembaruan Langsung Ke Website Publik</span>
                        </div>
                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className="rounded-full bg-slate-900 hover:bg-slate-800 text-white h-20 px-12 font-black uppercase tracking-[0.2em] shadow-2xl gap-4 group transition-all"
                        >
                            {mutation.isPending ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-5 h-5 group-hover:rotate-12 transition-transform text-primary" />
                                    Simpan Perubahan
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AdminPrivacyPolicy;
