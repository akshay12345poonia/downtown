import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Users, AlertTriangle, CheckCircle2, X, Search, Mail, Phone, ExternalLink } from 'lucide-react';
import { getAgents, createAgent, updateAgent, deleteAgent } from '../../Services/api';

const EMPTY = { name: '', title: '', email: '', phone: '', bio: '', photo: '', languages: [], specialties: [], isActive: true, socials: { website: '', linkedin: '', instagram: '', twitter: '' } };

const Modal = ({ open, title, onClose, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-text/80 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
            <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-fadeUp">
                <div className="px-10 py-8 border-b border-border/40 flex items-center justify-between bg-surface-muted">
                    <h2 className="text-2xl font-black text-text tracking-tight">{title}</h2>
                    <button onClick={onClose} className="w-10 h-10 rounded-xl hover:bg-white flex items-center justify-center text-text-muted hover:text-red-500 transition-all">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-10 max-h-[75vh] overflow-y-auto custom-scrollbar">{children}</div>
            </div>
        </div>
    );
};

const AgentForm = ({ data, onChange, onSubmit, loading, btnLabel }) => (
    <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
                <label className="form-label">Consultant Name *</label>
                <div className="input-group">
                    <input className="form-input" required value={data.name} onChange={e => onChange('name', e.target.value)} placeholder="Full Name" />
                </div>
            </div>

            <div>
                <label className="form-label">Professional Title</label>
                <div className="input-group">
                    <input className="form-input" value={data.title} onChange={e => onChange('title', e.target.value)} placeholder="e.g. Senior Property Advisor" />
                </div>
            </div>

            <div>
                <label className="form-label">Photo Identity URL</label>
                <div className="input-group">
                    <input className="form-input" value={data.photo} onChange={e => onChange('photo', e.target.value)} placeholder="https://..." />
                </div>
            </div>

            <div>
                <label className="form-label">Direct Email</label>
                <div className="input-group">
                    <input className="form-input" type="email" value={data.email} onChange={e => onChange('email', e.target.value)} placeholder="name@downtown.realty" />
                </div>
            </div>

            <div>
                <label className="form-label">Contact Number</label>
                <div className="input-group">
                    <input className="form-input" value={data.phone} onChange={e => onChange('phone', e.target.value)} placeholder="+91 000 000 0000" />
                </div>
            </div>

            <div className="md:col-span-2">
                <label className="form-label">Expert Biography</label>
                <textarea
                    className="form-input min-h-[120px] py-4"
                    value={data.bio}
                    onChange={e => onChange('bio', e.target.value)}
                    placeholder="A brief description of professional background..."
                />
            </div>

            <div>
                <label className="form-label">Languages Spoken</label>
                <div className="input-group">
                    <input className="form-input" value={data.languages?.join(', ') || ''} onChange={e => onChange('languages', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="English, Hindi" />
                </div>
            </div>

            <div>
                <label className="form-label">Core Specialties</label>
                <div className="input-group">
                    <input className="form-input" value={data.specialties?.join(', ') || ''} onChange={e => onChange('specialties', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="Luxury, Commercial" />
                </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <div>
                    <label className="form-label text-xs uppercase tracking-widest text-text-muted">LinkedIn Profile</label>
                    <input className="form-input" value={data.socials?.linkedin || ''} onChange={e => onChange('socials', { ...data.socials, linkedin: e.target.value })} placeholder="URL" />
                </div>
                <div>
                    <label className="form-label text-xs uppercase tracking-widest text-text-muted">Twitter Handle</label>
                    <input className="form-input" value={data.socials?.twitter || ''} onChange={e => onChange('socials', { ...data.socials, twitter: e.target.value })} placeholder="URL" />
                </div>
            </div>

            <div className="md:col-span-2 flex items-center justify-between p-5 bg-surface-muted rounded-2xl border border-border/40">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => onChange('isActive', !data.isActive)}>
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${data.isActive ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-border bg-white'}`}>
                        {data.isActive && <CheckCircle2 size={16} />}
                    </div>
                    <span className="font-bold text-sm text-text">Agent Profile is Publicly Visible</span>
                </div>
            </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
            <button type="submit" className="btn btn-primary btn-lg px-12 shadow-xl shadow-brand/20" disabled={loading}>
                {loading ? 'Processing...' : btnLabel}
            </button>
        </div>
    </form>
);

const AdminAgents = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [editAgent, setEditAgent] = useState(null);
    const [deleteAg, setDeleteAg] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [submitting, setSubmitting] = useState(false);
    const [search, setSearch] = useState('');

    const load = useCallback(async () => {
        setLoading(true);
        try { const res = await getAgents(); setAgents(res.data.data.agents); }
        catch { } finally { setLoading(false); }
    }, []);

    useEffect(() => { load(); }, [load]);

    const onChange = (key, val) => setForm(p => ({ ...p, [key]: val }));

    const handleAdd = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createAgent(form);
            setAddOpen(false);
            setForm(EMPTY);
            await load();
        } catch (err) { } finally { setSubmitting(false); }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await updateAgent(editAgent._id, form);
            setEditAgent(null);
            await load();
        } catch (err) { } finally { setSubmitting(false); }
    };

    const handleDelete = async () => {
        setSubmitting(true);
        try {
            await deleteAgent(deleteAg._id);
            setDeleteAg(null);
            await load();
        } catch { } finally { setSubmitting(false); }
    };

    const openEdit = (agent) => {
        setForm({ ...EMPTY, ...agent, socials: agent.socials || { website: '', linkedin: '', instagram: '', twitter: '' } });
        setEditAgent(agent);
    };

    const PLACEHOLDER = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80';

    return (
        <div className="animate-fadeUp">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand mb-2 block">Team Management</span>
                    <h1 className="text-4xl font-black text-text tracking-tight">Active Consultants</h1>
                </div>
                <button className="btn btn-primary btn-lg shadow-xl shadow-brand/20" onClick={() => { setForm(EMPTY); setAddOpen(true); }}>
                    <Plus size={20} /> Onboard New Agent
                </button>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map(ag => (
                    <div key={ag._id} className="bg-white rounded-[2.5rem] p-8 border border-border/40 shadow-sm hover:shadow-2xl hover:shadow-brand/5 transition-all duration-500 group relative">
                        {/* Status Pin */}
                        <div className={`absolute top-6 right-6 w-3 h-3 rounded-full ${ag.isActive ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-red-500 shadow-lg shadow-red-500/20'}`} />

                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-3xl overflow-hidden mb-6 border-4 border-surface-muted shadow-xl transition-transform duration-500 group-hover:scale-110">
                                <img src={ag.photo || PLACEHOLDER} className="w-full h-full object-cover" alt="" />
                            </div>
                            <h3 className="text-xl font-black text-text mb-1">{ag.name}</h3>
                            <p className="text-brand font-black text-[10px] uppercase tracking-widest bg-brand-light px-3 py-1 rounded-full">{ag.title || 'Property Advisor'}</p>

                            <div className="w-full h-px bg-border/60 my-6" />

                            <div className="space-y-4 w-full mb-8">
                                <div className="flex items-center gap-3 text-sm text-text-muted justify-center">
                                    <Mail size={14} className="text-brand" /> <span className="truncate">{ag.email || 'No email set'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-text-muted justify-center">
                                    <Phone size={14} className="text-brand" /> <span>{ag.phone || 'No phone set'}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center mb-8 h-14 overflow-hidden">
                                {ag.specialties?.slice(0, 3).map((s, i) => (
                                    <span key={i} className="text-[10px] font-black uppercase tracking-widest bg-surface-muted text-text-muted px-2.5 py-1.5 rounded-lg border border-border/40">{s}</span>
                                ))}
                                {(!ag.specialties || ag.specialties.length === 0) && <span className="text-[10px] font-black uppercase tracking-widest text-text-muted/30 italic">No specialties set</span>}
                            </div>

                            <div className="grid grid-cols-2 gap-3 w-full">
                                <button className="btn btn-outline btn-sm flex-1" onClick={() => openEdit(ag)}><Pencil size={14} /> Edit Profile</button>
                                <button className="btn btn-danger btn-sm flex-1" onClick={() => setDeleteAg(ag)}><Trash2 size={14} /> Terminate</button>
                            </div>
                        </div>
                    </div>
                ))}

                {agents.length === 0 && !loading && (
                    <div className="col-span-full bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-border/60">
                        <Users size={64} className="text-slate-200 mx-auto mb-8" />
                        <h3 className="text-2xl font-black text-text mb-4">No Consultants Onboarded</h3>
                        <button className="btn btn-primary" onClick={() => setAddOpen(true)}>Start Hiring Experts</button>
                    </div>
                )}
            </div>

            <Modal open={addOpen} title="New Recruitment" onClose={() => setAddOpen(false)}>
                <AgentForm data={form} onChange={onChange} onSubmit={handleAdd} loading={submitting} btnLabel="Complete Onboarding" />
            </Modal>

            <Modal open={!!editAgent} title="Professional Profile Sync" onClose={() => setEditAgent(null)}>
                <AgentForm data={form} onChange={onChange} onSubmit={handleEdit} loading={submitting} btnLabel="Update Database" />
            </Modal>

            <Modal open={!!deleteAg} title="Account Termination" onClose={() => setDeleteAg(null)}>
                <div className="text-center">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-100 shadow-lg shadow-red-500/5">
                        <Trash2 size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-text mb-4">Are you certain?</h3>
                    <p className="text-text-muted mb-10 leading-relaxed font-medium">
                        You are about to remove <strong>{deleteAg?.name}</strong> from the systems. This will revoke all access and hide their public profile immediately.
                    </p>
                    <div className="flex gap-4">
                        <button className="btn btn-outline flex-1 py-4" onClick={() => setDeleteAg(null)}>Cancel</button>
                        <button className="btn btn-danger flex-1 py-4" onClick={handleDelete} disabled={submitting}>
                            {submitting ? 'Removing...' : 'Confirm Termination'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminAgents;
