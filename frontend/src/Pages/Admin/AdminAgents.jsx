import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Plus, Pencil, Trash2, Users, X, Mail, Phone, Upload, Loader2 } from 'lucide-react';
import { getAgents, createAgent, updateAgent, deleteAgent, mediaUrl } from '../../Services/Api';

const EMPTY = {
    name: '', title: '', email: '', phone: '', bio: '', isActive: true,
    languages: [], specialties: [],
    socials: { website: '', linkedin: '', instagram: '', twitter: '' }
};

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

const PhotoUploader = ({ file, setFile, existingPhoto }) => {
    const fileRef = useRef();
    const preview = file ? URL.createObjectURL(file) : mediaUrl(existingPhoto);

    return (
        <div>
            <label className="form-label">Agent Photo</label>
            <div
                onClick={() => fileRef.current.click()}
                className="border-2 border-dashed border-border rounded-2xl p-6 text-center cursor-pointer hover:border-brand hover:bg-brand/5 transition-all mb-3"
            >
                {preview ? (
                    <div className="flex items-center gap-6 justify-center">
                        <img src={preview} alt="preview" className="w-20 h-20 rounded-2xl object-cover shadow-lg" />
                        <div className="text-left">
                            <p className="font-bold text-text text-sm">{file ? file.name : 'Current photo'}</p>
                            <p className="text-xs text-brand mt-1">Click to replace</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <Upload size={32} className="text-text-muted mx-auto mb-3" />
                        <p className="font-bold text-text-muted text-sm">Click to upload photo from computer or mobile</p>
                        <p className="text-xs text-text-muted/60 mt-1">JPG, PNG, WEBP up to 10MB</p>
                    </>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => setFile(e.target.files[0] || null)} />
            </div>
        </div>
    );
};

const AgentForm = ({ data, onChange, onSubmit, loading, btnLabel, photoFile, setPhotoFile }) => (
    <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
                <PhotoUploader file={photoFile} setFile={setPhotoFile} existingPhoto={data.photo} />
            </div>

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
                <label className="form-label">Direct Email</label>
                <div className="input-group">
                    <input className="form-input" type="email" value={data.email} onChange={e => onChange('email', e.target.value)} placeholder="agent@company.com" />
                </div>
            </div>

            <div>
                <label className="form-label">Contact Number</label>
                <div className="input-group">
                    <input className="form-input" value={data.phone} onChange={e => onChange('phone', e.target.value)} placeholder="+91 000 000 0000" />
                </div>
            </div>

            <div>
                <label className="form-label">Languages Spoken</label>
                <div className="input-group">
                    <input className="form-input" value={data.languages?.join(', ') || ''} onChange={e => onChange('languages', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="English, Hindi" />
                </div>
            </div>

            <div className="md:col-span-2">
                <label className="form-label">Expert Biography</label>
                <textarea className="form-input min-h-[120px] py-4" value={data.bio} onChange={e => onChange('bio', e.target.value)} placeholder="Professional background..." />
            </div>

            <div>
                <label className="form-label">Core Specialties</label>
                <div className="input-group">
                    <input className="form-input" value={data.specialties?.join(', ') || ''} onChange={e => onChange('specialties', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="Luxury, Commercial" />
                </div>
            </div>

            <div>
                <label className="form-label">LinkedIn Profile</label>
                <input className="form-input" value={data.socials?.linkedin || ''} onChange={e => onChange('socials', { ...data.socials, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." />
            </div>

            <div className="md:col-span-2 flex items-center gap-3 p-5 bg-surface-muted rounded-2xl border border-border/40 cursor-pointer" onClick={() => onChange('isActive', !data.isActive)}>
                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${data.isActive ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-border bg-white'}`}>
                    {data.isActive && '✓'}
                </div>
                <span className="font-bold text-sm text-text">Agent Profile is Publicly Visible</span>
            </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
            <button type="submit" className="btn btn-primary btn-lg px-12 shadow-xl shadow-brand/20" disabled={loading}>
                {loading ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : btnLabel}
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
    const [photoFile, setPhotoFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        try { const res = await getAgents(); setAgents(res.data.data.agents); }
        catch { } finally { setLoading(false); }
    }, []);

    useEffect(() => { load(); }, [load]);

    const onChange = (key, val) => setForm(p => ({ ...p, [key]: val }));

    const buildFormData = () => {
        const fd = new FormData();
        fd.append('name', form.name);
        fd.append('title', form.title || '');
        fd.append('email', form.email || '');
        fd.append('phone', form.phone || '');
        fd.append('bio', form.bio || '');
        fd.append('isActive', form.isActive);
        fd.append('languages', form.languages?.join(',') || '');
        fd.append('specialties', form.specialties?.join(',') || '');
        fd.append('socials', JSON.stringify(form.socials || {}));
        if (photoFile) fd.append('photo', photoFile);
        return fd;
    };

    const handleAdd = async (e) => {
        e.preventDefault(); setSubmitting(true);
        try {
            await createAgent(buildFormData());
            setAddOpen(false); setForm(EMPTY); setPhotoFile(null); await load();
        } catch { } finally { setSubmitting(false); }
    };

    const handleEdit = async (e) => {
        e.preventDefault(); setSubmitting(true);
        try {
            await updateAgent(editAgent._id, buildFormData());
            setEditAgent(null); setPhotoFile(null); await load();
        } catch { } finally { setSubmitting(false); }
    };

    const handleDelete = async () => {
        setSubmitting(true);
        try { await deleteAgent(deleteAg._id); setDeleteAg(null); await load(); }
        catch { } finally { setSubmitting(false); }
    };

    const openEdit = (agent) => {
        setForm({ ...EMPTY, ...agent, socials: agent.socials || { website: '', linkedin: '', instagram: '', twitter: '' } });
        setPhotoFile(null);
        setEditAgent(agent);
    };

    const PLACEHOLDER = 'https://cdn.pixabay.com/photo/2024/05/26/11/33/business-8788604_1280.jpg';

    return (
        <div className="animate-fadeUp">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand mb-2 block">Team Management</span>
                    <h1 className="text-4xl font-black text-text tracking-tight">Active Consultants</h1>
                </div>
                <button className="btn btn-primary btn-lg shadow-xl shadow-brand/20" onClick={() => { setForm(EMPTY); setPhotoFile(null); setAddOpen(true); }}>
                    <Plus size={20} /> Onboard New Agent
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map(ag => (
                    <div key={ag._id} className="bg-white rounded-[2.5rem] p-8 border border-border/40 shadow-sm hover:shadow-2xl hover:shadow-brand/5 transition-all duration-500 group relative">
                        <div className={`absolute top-6 right-6 w-3 h-3 rounded-full ${ag.isActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-3xl overflow-hidden mb-6 border-4 border-surface-muted shadow-xl transition-transform duration-500 group-hover:scale-110">
                                <img src={mediaUrl(ag.photo) || PLACEHOLDER} className="w-full h-full object-cover" alt="" />
                            </div>
                            <h3 className="text-xl font-black text-text mb-1">{ag.name}</h3>
                            <p className="text-brand font-black text-[10px] uppercase tracking-widest bg-brand-light px-3 py-1 rounded-full">{ag.title || 'Property Advisor'}</p>
                            <div className="w-full h-px bg-border/60 my-6" />
                            <div className="space-y-4 w-full mb-8">
                                <div className="flex items-center gap-3 text-sm text-text-muted justify-center">
                                    <Mail size={14} className="text-brand" /><span className="truncate">{ag.email || 'No email'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-text-muted justify-center">
                                    <Phone size={14} className="text-brand" /><span>{ag.phone || 'No phone'}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 w-full">
                                <button className="btn btn-outline btn-sm flex-1" onClick={() => openEdit(ag)}><Pencil size={14} /> Edit</button>
                                <button className="btn btn-danger btn-sm flex-1" onClick={() => setDeleteAg(ag)}><Trash2 size={14} /> Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
                {agents.length === 0 && !loading && (
                    <div className="col-span-full bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-border/60">
                        <Users size={64} className="text-slate-200 mx-auto mb-8" />
                        <h3 className="text-2xl font-black text-text mb-4">No Agents Yet</h3>
                        <button className="btn btn-primary" onClick={() => setAddOpen(true)}>Add First Agent</button>
                    </div>
                )}
            </div>

            <Modal open={addOpen} title="Onboard New Agent" onClose={() => { setAddOpen(false); setPhotoFile(null); }}>
                <AgentForm data={form} onChange={onChange} onSubmit={handleAdd} loading={submitting} btnLabel="Create Agent" photoFile={photoFile} setPhotoFile={setPhotoFile} />
            </Modal>

            <Modal open={!!editAgent} title="Edit Agent Profile" onClose={() => { setEditAgent(null); setPhotoFile(null); }}>
                <AgentForm data={form} onChange={onChange} onSubmit={handleEdit} loading={submitting} btnLabel="Save Changes" photoFile={photoFile} setPhotoFile={setPhotoFile} />
            </Modal>

            <Modal open={!!deleteAg} title="Remove Agent" onClose={() => setDeleteAg(null)}>
                <div className="text-center">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-100">
                        <Trash2 size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-text mb-4">Are you certain?</h3>
                    <p className="text-text-muted mb-10">You are about to remove <strong>{deleteAg?.name}</strong>. This cannot be undone.</p>
                    <div className="flex gap-4">
                        <button className="btn btn-outline flex-1 py-4" onClick={() => setDeleteAg(null)}>Cancel</button>
                        <button className="btn btn-danger flex-1 py-4" onClick={handleDelete} disabled={submitting}>
                            {submitting ? 'Removing...' : 'Confirm Remove'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminAgents;
