import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Rocket, Save, Plus, Trash2, Trophy, Zap, ShieldCheck, CheckCircle2 } from "lucide-react";
import apiClient from "@/lib/api-client";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const AdminPPDB = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState<any>({
        academic_year: "",
        registration_link: "",
        contact_person: "",
        description: "",
        admission_pathways: [],
        timeline: [],
        required_documents: [],
        fees: [],
        faq: [],
        is_active: true
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get("/ppdb-info");
                if (response.data) {
                    // Start: JSON Parse safely if strings came back (though apiClient/axios usually handles JSON response)
                    // But if backend sends text/json column as string sometimes? 
                    // Usually mysql driver parses JSON columns automatically.
                    setData(response.data);
                }
            } catch (error) {
                console.error("Error fetching PPDB info:", error);
                toast({
                    title: "Gagal Mengambil Data",
                    description: "Terjadi kesalahan saat mengambil data PPDB.",
                    variant: "destructive"
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [toast]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (checked: boolean) => {
        setData((prev: any) => ({ ...prev, is_active: checked }));
    };

    // Generic list handlers
    const handleListChange = (key: string, index: number, field: string, value: any) => {
        const newList = [...data[key]];
        newList[index] = { ...newList[index], [field]: value };
        setData({ ...data, [key]: newList });
    };

    const addItem = (key: string, initialItem: any) => {
        setData({ ...data, [key]: [...data[key], initialItem] });
    };

    const removeItem = (key: string, index: number) => {
        const newList = [...data[key]];
        newList.splice(index, 1);
        setData({ ...data, [key]: newList });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await apiClient.put("/ppdb-info", data);
            toast({
                title: "Berhasil Disimpan",
                description: "Informasi PPDB telah diperbarui.",
                className: "bg-primary text-primary-foreground"
            });
        } catch (error) {
            console.error("Error saving PPDB info:", error);
            toast({
                title: "Gagal Menyimpan",
                description: "Terjadi kesalahan saat menyimpan perubahan.",
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-screen">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-6 pb-20">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Manajemen PPDB</h1>
                        <p className="text-muted-foreground">Kelola informasi Pendaftaran Peserta Didik Baru.</p>
                    </div>
                    <Button onClick={handleSubmit} disabled={saving} className="bg-primary hover:bg-primary/90">
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Simpan Perubahan
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Informasi Umum</CardTitle>
                            <CardDescription>Detail dasar mengenai periode pendaftaran.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Tahun Ajaran</Label>
                                    <Input name="academic_year" value={data.academic_year || ''} onChange={handleChange} placeholder="Contoh: 2026/2027" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Status Pendaftaran</Label>
                                    <div className="flex items-center space-x-2 pt-2">
                                        <Switch checked={data.is_active} onCheckedChange={handleSwitchChange} />
                                        <span>{data.is_active ? "Dibuka" : "Ditutup"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Deskripsi Singkat</Label>
                                <Textarea name="description" value={data.description || ''} onChange={handleChange} rows={3} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Link WhatsApp Pendaftaran</Label>
                                    <Input name="registration_link" value={data.registration_link || ''} onChange={handleChange} placeholder="https://wa.me/..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Nomor Kontak (Display)</Label>
                                    <Input name="contact_person" value={data.contact_person || ''} onChange={handleChange} placeholder="0812..." />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline */}
                    <Card className="lg:col-span-1 row-span-2">
                        <CardHeader>
                            <CardTitle>Timeline Pendaftaran</CardTitle>
                            <CardDescription>Jadwal penting kegiatan PPDB.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {(data.timeline || []).map((item: any, index: number) => (
                                <div key={index} className="p-4 border rounded-xl space-y-3 relative group">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeItem('timeline', index)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Input
                                        placeholder="Periode (e.g. Jan - Mar 2026)"
                                        value={item.date}
                                        onChange={(e) => handleListChange('timeline', index, 'date', e.target.value)}
                                        className="font-bold border-none p-0 h-auto focus-visible:ring-0"
                                    />
                                    <Input
                                        placeholder="Judul Kegiatan"
                                        value={item.title}
                                        onChange={(e) => handleListChange('timeline', index, 'title', e.target.value)}
                                    />
                                    <Textarea
                                        placeholder="Deskripsi"
                                        value={item.description}
                                        onChange={(e) => handleListChange('timeline', index, 'description', e.target.value)}
                                        className="text-xs resize-none"
                                        rows={2}
                                    />
                                    <Input
                                        placeholder="Step (e.g. 01)"
                                        value={item.step}
                                        onChange={(e) => handleListChange('timeline', index, 'step', e.target.value)}
                                        className="w-20 text-xs"
                                    />
                                </div>
                            ))}
                            <Button variant="outline" className="w-full" onClick={() => addItem('timeline', { date: '', title: '', description: '', step: '' })}>
                                <Plus className="w-4 h-4 mr-2" /> Tambah Jadwal
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Pathways */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Jalur Pendaftaran</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {(data.admission_pathways || []).map((item: any, index: number) => (
                                <div key={index} className="flex gap-4 p-4 border rounded-xl relative group items-start">
                                    <div className={`p-3 rounded-lg bg-gray-100 flex items-center justify-center shrink-0`}>
                                        <span className="font-bold text-xs">{index + 1}</span>
                                    </div>
                                    <div className="space-y-3 flex-1">
                                        <Input
                                            placeholder="Nama Jalur"
                                            value={item.title}
                                            onChange={(e) => handleListChange('admission_pathways', index, 'title', e.target.value)}
                                            className="font-bold"
                                        />
                                        <Textarea
                                            placeholder="Deskripsi"
                                            value={item.description}
                                            onChange={(e) => handleListChange('admission_pathways', index, 'description', e.target.value)}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input
                                                placeholder="Benefit Highlight"
                                                value={item.benefit}
                                                onChange={(e) => handleListChange('admission_pathways', index, 'benefit', e.target.value)}
                                            />
                                            <Input
                                                placeholder="Icon Name (Lucide)"
                                                value={item.icon}
                                                onChange={(e) => handleListChange('admission_pathways', index, 'icon', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive"
                                        onClick={() => removeItem('admission_pathways', index)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full" onClick={() => addItem('admission_pathways', { title: '', description: '', benefit: '', icon: 'Zap' })}>
                                <Plus className="w-4 h-4 mr-2" /> Tambah Jalur
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Fees */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Rincian Biaya</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {(data.fees || []).map((item: any, index: number) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Input
                                        placeholder="Item Biaya"
                                        value={item.item}
                                        onChange={(e) => handleListChange('fees', index, 'item', e.target.value)}
                                        className="flex-1"
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Nominal"
                                        value={item.biaya}
                                        onChange={(e) => handleListChange('fees', index, 'biaya', parseInt(e.target.value))}
                                        className="w-32"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive shrink-0"
                                        onClick={() => removeItem('fees', index)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full" onClick={() => addItem('fees', { item: '', biaya: 0 })}>
                                <Plus className="w-4 h-4 mr-2" /> Tambah Item
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Docs */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Dokumen Syarat</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {(data.required_documents || []).map((item: any, index: number) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Input
                                        placeholder="Nama Dokumen"
                                        value={item.title}
                                        onChange={(e) => handleListChange('required_documents', index, 'title', e.target.value)}
                                        className="flex-1"
                                    />
                                    <Input
                                        placeholder="Status (Wajib/Opsional)"
                                        value={item.status}
                                        onChange={(e) => handleListChange('required_documents', index, 'status', e.target.value)}
                                        className="w-32"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive shrink-0"
                                        onClick={() => removeItem('required_documents', index)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full" onClick={() => addItem('required_documents', { title: '', status: 'Wajib' })}>
                                <Plus className="w-4 h-4 mr-2" /> Tambah Dokumen
                            </Button>
                        </CardContent>
                    </Card>

                    {/* FAQ */}
                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <CardTitle>FAQ</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {(data.faq || []).map((item: any, index: number) => (
                                <div key={index} className="grid gap-2 border p-4 rounded-xl relative group">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeItem('faq', index)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <Input
                                        placeholder="Pertanyaan"
                                        value={item.q}
                                        onChange={(e) => handleListChange('faq', index, 'q', e.target.value)}
                                        className="font-bold"
                                    />
                                    <Textarea
                                        placeholder="Jawaban"
                                        value={item.a}
                                        onChange={(e) => handleListChange('faq', index, 'a', e.target.value)}
                                    />
                                </div>
                            ))}
                            <Button variant="outline" className="w-full" onClick={() => addItem('faq', { q: '', a: '' })}>
                                <Plus className="w-4 h-4 mr-2" /> Tambah Pertanyaan
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminPPDB;
