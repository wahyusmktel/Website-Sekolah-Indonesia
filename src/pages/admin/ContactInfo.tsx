import { useState, useEffect } from "react";
import {
    Loader2, Save, MapPin, Phone, Mail,
    Globe, Facebook, Instagram, Youtube, Twitter,
    Building2, Info
} from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AdminContactInfo = () => {
    const queryClient = useQueryClient();

    const { data: contact, isLoading } = useQuery({
        queryKey: ['contact-info'],
        queryFn: () => apiClient.get('/contact-info').then(res => res.data)
    });

    const mutation = useMutation({
        mutationFn: (data: any) => apiClient.put(`/contact-info/${contact.id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contact-info'] });
            toast.success("Informasi kontak berhasil diperbarui");
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        mutation.mutate(data);
    };

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
            <div className="space-y-8 max-w-5xl mx-auto pb-20">
                <div>
                    <h1 className="text-3xl font-black text-foreground italic uppercase">
                        Contact <span className="text-primary not-italic">Settings</span>
                    </h1>
                    <p className="text-muted-foreground mt-1">Kelola informasi publik sekolah dan link media sosial.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Main Info */}
                        <div className="lg:col-span-12">
                            <Card className="border-none shadow-soft rounded-[3rem] overflow-hidden bg-white">
                                <CardContent className="p-10 space-y-8">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <Building2 className="w-4 h-4" />
                                            </div>
                                            <h3 className="font-black italic uppercase text-sm tracking-tight">Informasi Dasar</h3>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest ml-2">Nama Sekolah</Label>
                                                <Input name="school_name" defaultValue={contact?.school_name} required className="h-14 rounded-2xl bg-foreground/5 border-none px-6 font-bold" />
                                            </div>
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest ml-2">Email Resmi</Label>
                                                <Input name="email" type="email" defaultValue={contact?.email} required className="h-14 rounded-2xl bg-foreground/5 border-none px-6 font-bold" />
                                            </div>
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest ml-2">Nomor Telepon</Label>
                                                <Input name="phone" defaultValue={contact?.phone} required className="h-14 rounded-2xl bg-foreground/5 border-none px-6 font-bold" />
                                            </div>
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest ml-2">Website</Label>
                                                <Input name="website" defaultValue={contact?.website} className="h-14 rounded-2xl bg-foreground/5 border-none px-6 font-bold" />
                                            </div>
                                        </div>
                                        <div className="space-y-3 pt-4">
                                            <Label className="text-[10px] font-black uppercase tracking-widest ml-2">Alamat Lengkap</Label>
                                            <Textarea name="address" defaultValue={contact?.address} required className="rounded-2xl bg-foreground/5 border-none p-6 font-medium min-h-[100px]" />
                                        </div>
                                        <div className="space-y-3 pt-4">
                                            <Label className="text-[10px] font-black uppercase tracking-widest ml-2">Embed Google Maps URL</Label>
                                            <Textarea name="maps_url" defaultValue={contact?.maps_url} className="rounded-2xl bg-foreground/5 border-none p-6 font-medium min-h-[100px] text-xs font-mono" />
                                            <p className="text-[9px] text-muted-foreground italic ml-2">* Masukkan URL dari src attribute pada iframe Google Maps.</p>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-slate-50 space-y-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <Globe className="w-4 h-4" />
                                            </div>
                                            <h3 className="font-black italic uppercase text-sm tracking-tight">Social Media Links</h3>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 ml-2">
                                                    <Facebook className="w-3 h-3 text-[#1877F2]" />
                                                    <Label className="text-[10px] font-black uppercase tracking-widest">Facebook</Label>
                                                </div>
                                                <Input name="facebook_url" defaultValue={contact?.facebook_url} className="h-14 rounded-2xl bg-foreground/5 border-none px-6 font-bold" />
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 ml-2">
                                                    <Instagram className="w-3 h-3 text-[#E4405F]" />
                                                    <Label className="text-[10px] font-black uppercase tracking-widest">Instagram</Label>
                                                </div>
                                                <Input name="instagram_url" defaultValue={contact?.instagram_url} className="h-14 rounded-2xl bg-foreground/5 border-none px-6 font-bold" />
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 ml-2">
                                                    <Youtube className="w-3 h-3 text-[#FF0000]" />
                                                    <Label className="text-[10px] font-black uppercase tracking-widest">Youtube</Label>
                                                </div>
                                                <Input name="youtube_url" defaultValue={contact?.youtube_url} className="h-14 rounded-2xl bg-foreground/5 border-none px-6 font-bold" />
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 ml-2">
                                                    <Twitter className="w-3 h-3 text-[#1DA1F2]" />
                                                    <Label className="text-[10px] font-black uppercase tracking-widest">Twitter / X</Label>
                                                </div>
                                                <Input name="twitter_url" defaultValue={contact?.twitter_url} className="h-14 rounded-2xl bg-foreground/5 border-none px-6 font-bold" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <div className="p-10 bg-slate-50 border-t border-slate-100 flex justify-end">
                                    <Button type="submit" disabled={mutation.isPending} className="rounded-2xl bg-primary h-14 px-12 font-black uppercase tracking-widest text-xs shadow-glow gap-3">
                                        {mutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4" /> Simpan Perubahan</>}
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AdminContactInfo;
