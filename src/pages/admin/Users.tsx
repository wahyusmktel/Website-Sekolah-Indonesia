import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Search, Edit2, Trash2, Key, Shield, User, Loader2, Check, X, AlertCircle } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";

interface UserData {
    id: number;
    username: string;
    name: string;
    role: 'superadmin' | 'hubin' | 'kesiswaan';
    created_at: string;
}

const AdminUsers = () => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [formData, setFormData] = useState<{
        username: string;
        name: string;
        password: string;
        role: 'superadmin' | 'hubin' | 'kesiswaan';
    }>({
        username: "",
        name: "",
        password: "",
        role: "kesiswaan"
    });


    // Current Admin User
    const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

    // Fetch Users
    const { data: users = [], isLoading } = useQuery<UserData[]>({
        queryKey: ['admin-users'],
        queryFn: () => apiClient.get('/admin/users').then(res => res.data)
    });

    // Mutations
    const createMutation = useMutation({
        mutationFn: (data: typeof formData) => apiClient.post('/admin/users', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
            toast.success("User berhasil ditambahkan");
            setIsAddModalOpen(false);
            resetForm();
        },
        onError: () => toast.error("Gagal menambahkan user")
    });

    const updateMutation = useMutation({
        mutationFn: (data: { id: number } & Partial<typeof formData>) =>
            apiClient.put(`/admin/users/${data.id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
            toast.success("User berhasil diperbarui");
            setIsEditModalOpen(false);
            setSelectedUser(null);
            resetForm();
        },
        onError: () => toast.error("Gagal memperbarui user")
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => apiClient.delete(`/admin/users/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
            toast.success("User berhasil dihapus");
            setIsDeleteModalOpen(false);
            setSelectedUser(null);
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || "Gagal menghapus user";
            toast.error(message);
        }
    });

    const resetForm = () => {
        setFormData({
            username: "",
            name: "",
            password: "",
            role: "kesiswaan"
        });
    };

    const handleEditClick = (user: UserData) => {
        setSelectedUser(user);
        setFormData({
            username: user.username,
            name: user.name,
            password: "", // Don't show password
            role: user.role
        });
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (user: UserData) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'superadmin':
                return <Badge className="bg-primary/10 text-primary border-primary/20 font-black italic uppercase text-[10px]">Super Admin</Badge>;
            case 'hubin':
                return <Badge className="bg-blue-100 text-blue-600 border-blue-200 font-black italic uppercase text-[10px]">Hubin</Badge>;
            case 'kesiswaan':
                return <Badge className="bg-emerald-100 text-emerald-600 border-emerald-200 font-black italic uppercase text-[10px]">Kesiswaan</Badge>;
            default:
                return <Badge variant="secondary">{role}</Badge>;
        }
    };

    return (
        <AdminLayout title="Manajemen User & Hak Akses">
            <div className="space-y-8">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="Cari user berdasarkan nama atau username..."
                            className="pl-12 h-12 rounded-2xl bg-white border-slate-100 shadow-soft focus:ring-primary/20"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                        className="h-12 px-8 rounded-2xl bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20 gap-2 font-black uppercase tracking-widest text-xs"
                    >
                        <UserPlus className="w-4 h-4" /> Tambah User Baru
                    </Button>
                </div>

                {/* Users Card */}
                <Card className="border-none bg-white shadow-soft rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="p-8 border-b border-slate-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black italic flex items-center gap-2">
                                    <Shield className="w-6 h-6 text-primary" /> Daftar Administrator
                                </CardTitle>
                                <CardDescription>Kelola akun dan hak akses panel admin sekolah</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                        <th className="px-8 py-5">Administrator</th>
                                        <th className="px-8 py-5">Username</th>
                                        <th className="px-8 py-5">Hak Akses</th>
                                        <th className="px-8 py-5">Tanggal Dibuat</th>
                                        <th className="px-8 py-5 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center">
                                                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Memuat data user...</p>
                                            </td>
                                        </tr>
                                    ) : filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center text-slate-400 font-bold italic">
                                                Tidak ada user ditemukan
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-slate-800">{user.name}</span>
                                                            {user.id === adminUser.id && (
                                                                <span className="text-[9px] font-black text-primary uppercase italic">Anda</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                                                        @{user.username}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    {getRoleBadge(user.role)}
                                                </td>
                                                <td className="px-8 py-6 text-xs font-bold text-slate-400">
                                                    {new Date(user.created_at).toLocaleDateString('id-ID', {
                                                        year: 'numeric', month: 'long', day: 'numeric'
                                                    })}
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleEditClick(user)}
                                                            className="h-10 w-10 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDeleteClick(user)}
                                                            disabled={user.id === adminUser.id}
                                                            className="h-10 w-10 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Add/Edit Modal Content Logic Part... (Continued) */}
            {/* Logic for Modal rendering below */}

            {/* Modals */}
            <AddEditUserModal
                isOpen={isAddModalOpen || isEditModalOpen}
                onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); resetForm(); }}
                formData={formData}
                setFormData={setFormData}
                onSubmit={() => {
                    if (isEditModalOpen && selectedUser) {
                        updateMutation.mutate({ id: selectedUser.id, ...formData });
                    } else {
                        createMutation.mutate(formData);
                    }
                }}
                isEdit={isEditModalOpen}
                isLoading={createMutation.isPending || updateMutation.isPending}
            />

            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="rounded-[2rem] border-none shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black italic flex items-center gap-2 text-red-600">
                            <AlertCircle className="w-6 h-6" /> Konfirmasi Hapus
                        </DialogTitle>
                        <DialogDescription className="pt-2 text-slate-600 font-medium">
                            Apakah Anda yakin ingin menghapus user <span className="font-bold text-slate-800">@{selectedUser?.username}</span>? Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)} className="rounded-xl font-bold">Batal</Button>
                        <Button
                            variant="destructive"
                            onClick={() => selectedUser && deleteMutation.mutate(selectedUser.id)}
                            className="rounded-xl font-bold bg-red-600 hover:bg-red-700"
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ya, Hapus User"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
};

// Component for Add/Edit Modal to keep it cleaner
const AddEditUserModal = ({ isOpen, onClose, formData, setFormData, onSubmit, isEdit, isLoading }: any) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="rounded-[2.5rem] border-none shadow-2xl max-w-md p-0 overflow-hidden">
                <div className="bg-slate-900 p-8 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black italic flex items-center gap-3">
                            {isEdit ? <Edit2 className="w-6 h-6 text-primary" /> : <UserPlus className="w-6 h-6 text-primary" />}
                            {isEdit ? "Perbarui User" : "Tambah User Baru"}
                        </DialogTitle>
                        <DialogDescription className="text-white/40 font-bold uppercase tracking-widest text-[10px] pt-1">
                            {isEdit ? "Sesuaikan informasi akun dan hak akses" : "Daftarkan administrator baru untuk panel kontrol"}
                        </DialogDescription>
                    </DialogHeader>
                </div>
                <div className="p-8 space-y-6 bg-white">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Nama Lengkap</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    className="pl-12 h-12 rounded-2xl bg-slate-50 border-none shadow-inner"
                                    placeholder="Contoh: Budi Santoso"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Username</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</span>
                                <Input
                                    className="pl-10 h-12 rounded-2xl bg-slate-50 border-none shadow-inner"
                                    placeholder="username_tanpa_spasi"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
                                {isEdit ? "Kata Sandi (Kosongkan jika tidak diubah)" : "Kata Sandi"}
                            </label>
                            <div className="relative">
                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    type="password"
                                    className="pl-12 h-12 rounded-2xl bg-slate-50 border-none shadow-inner"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Hak Akses (Role)</label>
                            <div className="relative">
                                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
                                <Select
                                    value={formData.role}
                                    onValueChange={(val: any) => setFormData({ ...formData, role: val })}
                                >
                                    <SelectTrigger className="pl-12 h-12 rounded-2xl bg-slate-50 border-none shadow-inner w-full">
                                        <SelectValue placeholder="Pilih Role" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-none shadow-2xl">
                                        <SelectItem value="superadmin" className="rounded-xl font-bold py-3">Super Admin (Full Akses)</SelectItem>
                                        <SelectItem value="hubin" className="rounded-xl font-bold py-3">Hubin (Testimoni & Industri)</SelectItem>
                                        <SelectItem value="kesiswaan" className="rounded-xl font-bold py-3">Kesiswaan (Prestasi Siswa)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button variant="ghost" onClick={onClose} className="flex-1 h-12 rounded-2xl font-bold text-slate-400 hover:text-slate-600">Batal</Button>
                        <Button
                            onClick={onSubmit}
                            className="flex-1 h-12 rounded-2xl bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20 font-black uppercase tracking-widest text-xs"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEdit ? "Simpan Perubahan" : "Daftarkan User")}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AdminUsers;
