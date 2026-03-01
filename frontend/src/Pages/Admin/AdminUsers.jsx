import React, { useEffect, useState, useCallback } from 'react';
import { Users, Search, Shield, Loader2, CheckCircle } from 'lucide-react';
import { getUsers, updateUserRole } from '../../Services/Api';
import { mediaUrl } from '../../Services/Api';

const ROLES = ['buyer', 'seller', 'agent', 'admin'];

const ROLE_STYLE = {
    admin: 'bg-red-100 text-red-600',
    seller: 'bg-amber-100 text-amber-700',
    agent: 'bg-blue-100 text-blue-700',
    buyer: 'bg-emerald-100 text-emerald-700'
};

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [updating, setUpdating] = useState(null);
    const [flash, setFlash] = useState(null);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getUsers();
            setUsers(res.data.data.users);
        } catch { } finally { setLoading(false); }
    }, []);

    useEffect(() => { load(); }, [load]);

    const handleRoleChange = async (userId, newRole) => {
        setUpdating(userId);
        try {
            await updateUserRole(userId, newRole);
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
            setFlash('Role updated successfully');
            setTimeout(() => setFlash(null), 3000);
        } catch { } finally { setUpdating(null); }
    };

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.includes(search.toLowerCase())
    );

    return (
        <div className="animate-fadeUp">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand mb-2 block">Access Control</span>
                    <h1 className="text-4xl font-black text-text tracking-tight">User Management</h1>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-border/40 shadow-sm">
                    <Users size={18} className="text-brand" />
                    <span className="font-black text-text">{users.length}<span className="text-text-muted font-medium text-sm ml-1">users total</span></span>
                </div>
            </div>

            {/* Flash */}
            {flash && (
                <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-6 py-4 flex items-center gap-3 animate-fadeUp">
                    <CheckCircle size={18} /><span className="font-bold">{flash}</span>
                </div>
            )}

            {/* Search */}
            <div className="bg-white rounded-3xl p-4 border border-border/40 shadow-sm mb-6">
                <div className="relative max-w-md">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search by name, email or role..."
                        className="w-full pl-12 pr-4 py-3 bg-surface-muted rounded-2xl border-none focus:ring-2 ring-brand text-sm font-medium"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex justify-center py-24"><div className="spinner" /></div>
            ) : (
                <div className="bg-white rounded-[2rem] border border-border/40 shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border/40 bg-surface-muted">
                                <th className="text-left px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">User</th>
                                <th className="text-left px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted hidden md:table-cell">Email</th>
                                <th className="text-left px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Role</th>
                                <th className="text-left px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted hidden lg:table-cell">Joined</th>
                                <th className="text-left px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Change Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(u => (
                                <tr key={u._id} className="border-b border-border/20 hover:bg-surface-muted/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand font-black flex items-center justify-center shrink-0 overflow-hidden">
                                                {u.avatar
                                                    ? <img src={mediaUrl(u.avatar)} className="w-full h-full object-cover" alt="" />
                                                    : u.name?.[0]?.toUpperCase()
                                                }
                                            </div>
                                            <div>
                                                <p className="font-black text-text text-sm">{u.name}</p>
                                                <p className="text-xs text-text-muted md:hidden truncate max-w-[140px]">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 hidden md:table-cell">
                                        <p className="text-sm font-medium text-text-muted">{u.email}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${ROLE_STYLE[u.role] || 'bg-gray-100 text-gray-600'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 hidden lg:table-cell">
                                        <p className="text-sm text-text-muted font-medium">
                                            {new Date(u.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <select
                                                className="text-sm font-bold bg-surface-muted border border-border/40 rounded-xl px-3 py-2 focus:ring-2 ring-brand outline-none transition"
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                disabled={updating === u._id}
                                            >
                                                {ROLES.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
                                            </select>
                                            {updating === u._id && <Loader2 size={16} className="animate-spin text-brand" />}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <Users size={48} className="text-slate-200 mx-auto mb-4" />
                                        <p className="font-black text-text-muted">No users found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
