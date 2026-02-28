import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, Building2, AlertTriangle, CheckCircle2, Star, MapPin, Search, Filter } from 'lucide-react';
import { getProperties, createProperty, updateProperty, deleteProperty } from '../../Services/Api';

const EMPTY = { title: '', description: '', price: '', location: '', bedrooms: 0, bathrooms: 0, area: 0, type: 'for-sale', propertyType: 'house', status: 'available', featured: false, images: [] };

const Modal = ({ open, title, onClose, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-text/80 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
            <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-fadeUp">
                <div className="px-10 py-8 border-b border-border/40 flex items-center justify-between bg-surface-muted">
                    <h3 className="text-2xl font-black text-text tracking-tight">{title}</h3>
                    <button onClick={onClose} className="w-10 h-10 rounded-xl hover:bg-white flex items-center justify-center text-text-muted hover:text-red-500 transition-all">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-10 max-h-[75vh] overflow-y-auto custom-scrollbar">{children}</div>
            </div>
        </div>
    );
};

const PropertyForm = ({ data, onChange, onSubmit, loading, btnLabel }) => (
    <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
                <label className="form-label">Property Title</label>
                <div className="input-group">
                    <input className="form-input" required value={data.title} onChange={e => onChange('title', e.target.value)} placeholder="e.g. Modern Minimalist Villa" />
                </div>
            </div>

            <div>
                <label className="form-label">Listing Price (₹)</label>
                <div className="input-group">
                    <input className="form-input" type="number" required value={data.price} onChange={e => onChange('price', e.target.value)} placeholder="0" />
                </div>
            </div>

            <div>
                <label className="form-label">Exact Location</label>
                <div className="input-group">
                    <input className="form-input" required value={data.location} onChange={e => onChange('location', e.target.value)} placeholder="City, Area" />
                </div>
            </div>

            <div>
                <label className="form-label">Ownership Type</label>
                <select className="form-input" value={data.type} onChange={e => onChange('type', e.target.value)}>
                    <option value="for-sale">For Sale</option>
                    <option value="for-rent">For Rent</option>
                </select>
            </div>

            <div>
                <label className="form-label">Architecture Style</label>
                <select className="form-input" value={data.propertyType} onChange={e => onChange('propertyType', e.target.value)}>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="land">Commercial Land</option>
                    <option value="commercial">Retail Space</option>
                </select>
            </div>

            <div className="grid grid-cols-3 gap-4 md:col-span-2">
                <div>
                    <label className="form-label !mb-2">Beds</label>
                    <input className="form-input" type="number" min={0} value={data.bedrooms} onChange={e => onChange('bedrooms', +e.target.value)} />
                </div>
                <div>
                    <label className="form-label !mb-2">Baths</label>
                    <input className="form-input" type="number" min={0} value={data.bathrooms} onChange={e => onChange('bathrooms', +e.target.value)} />
                </div>
                <div>
                    <label className="form-label !mb-2">Area (Sqft)</label>
                    <input className="form-input" type="number" min={0} value={data.area} onChange={e => onChange('area', +e.target.value)} />
                </div>
            </div>

            <div className="md:col-span-2">
                <label className="form-label">Gallery URLs (One per line)</label>
                <textarea
                    className="form-input min-h-[100px] py-4"
                    value={data.images?.join('\n') || ''}
                    onChange={e => onChange('images', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
                    placeholder="https://..."
                />
            </div>

            <div className="md:col-span-2">
                <label className="form-label">Description</label>
                <textarea
                    className="form-input min-h-[120px] py-4"
                    value={data.description}
                    onChange={e => onChange('description', e.target.value)}
                    placeholder="Detailed property explanation..."
                />
            </div>

            <div className="md:col-span-2 flex items-center gap-4 p-5 bg-surface-muted rounded-2xl border border-border/40">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => onChange('featured', !data.featured)}>
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${data.featured ? 'bg-brand border-brand text-white' : 'border-border bg-white'}`}>
                        {data.featured && <CheckCircle2 size={16} />}
                    </div>
                    <span className="font-bold text-sm text-text">Mark as Featured Property</span>
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

const AdminProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [editProp, setEditProp] = useState(null);
    const [deleteProp, setDeleteProp] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [submitting, setSubmitting] = useState(false);
    const [search, setSearch] = useState('');

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getProperties();
            setProperties(res.data.data.properties);
        } catch { }
        finally { setLoading(false); }
    }, []);

    useEffect(() => { load(); }, [load]);

    const onChange = (key, val) => setForm(p => ({ ...p, [key]: val }));

    const handleAdd = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createProperty(form);
            setAddOpen(false);
            setForm(EMPTY);
            await load();
        } catch (err) { } finally { setSubmitting(false); }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await updateProperty(editProp._id, form);
            setEditProp(null);
            await load();
        } catch (err) { } finally { setSubmitting(false); }
    };

    const handleDelete = async () => {
        setSubmitting(true);
        try {
            await deleteProperty(deleteProp._id);
            setDeleteProp(null);
            await load();
        } catch { } finally { setSubmitting(false); }
    };

    const openEdit = (prop) => {
        setForm({ ...prop, images: prop.images || [] });
        setEditProp(prop);
    };

    return (
        <div className="animate-fadeUp">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand mb-2 block">Inventory Control</span>
                    <h1 className="text-4xl font-black text-text tracking-tight">Property Listings</h1>
                </div>
                <button className="btn btn-primary btn-lg shadow-xl shadow-brand/20" onClick={() => { setForm(EMPTY); setAddOpen(true); }}>
                    <Plus size={20} /> Add New Listing
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-3xl border border-border/40 shadow-sm">
                <div className="flex-1 max-w-md relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search by title, location..."
                        className="w-full pl-12 pr-4 py-3 bg-surface-muted rounded-2xl border-none focus:ring-2 ring-brand text-sm font-medium transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-text-muted uppercase tracking-widest">{properties.length} Listings Total</span>
                    <div className="h-6 w-px bg-border/60" />
                    <button className="p-3 bg-surface-muted text-text-muted rounded-xl hover:text-brand transition-colors"><Filter size={18} /></button>
                </div>
            </div>

            {/* Properties Grid / Table Replacement */}
            {loading ? (
                <div className="flex justify-center py-24"><div className="spinner" /></div>
            ) : (
                <div className="space-y-4">
                    {properties.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())).map(prop => (
                        <div key={prop._id} className="bg-white rounded-3xl p-4 border border-border/40 shadow-sm hover:shadow-xl hover:shadow-brand/5 transition-all duration-300 flex flex-col md:flex-row items-center gap-8">
                            <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0 relative">
                                <img src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400'} className="w-full h-full object-cover" alt="" />
                                <div className="absolute top-2 left-2">
                                    <span className={`badge text-[10px] ${prop.type === 'for-sale' ? 'badge-blue' : 'badge-gold'}`}>{prop.type === 'for-sale' ? 'Sale' : 'Rent'}</span>
                                </div>
                            </div>
                            <div className="flex-1 w-full min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="text-lg font-black text-text truncate">{prop.title}</h3>
                                        <p className="flex items-center gap-1.5 text-xs font-bold text-text-muted mt-1"><MapPin size={12} className="text-brand" /> {prop.location}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-black text-brand">₹{(prop.price / 100000).toFixed(1)}L</div>
                                        <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${prop.status === 'sold' ? 'text-red-500' : 'text-emerald-500'}`}>{prop.status}</div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-4">
                                    <span className="px-3 py-1 bg-surface-muted rounded-full text-[10px] font-black text-text-muted border border-border/40 uppercase tracking-widest">{prop.propertyType}</span>
                                    <span className="text-[10px] font-black text-text-muted flex items-center gap-1.5 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full"><Building2 size={12} /> {prop.area} Sqft</span>
                                    {prop.featured && <span className="text-[10px] font-black text-amber-500 flex items-center gap-1.5 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-100"><Star size={12} fill="currentColor" /> Featured</span>}
                                </div>
                            </div>
                            <div className="flex md:flex-col gap-3 shrink-0 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-border/40 md:pl-8">
                                <button className="btn btn-outline btn-sm flex-1 md:w-32 justify-center" onClick={() => openEdit(prop)}><Pencil size={14} /> Edit</button>
                                <button className="btn btn-danger btn-sm flex-1 md:w-32 justify-center" onClick={() => setDeleteProp(prop)}><Trash2 size={14} /> Delete</button>
                            </div>
                        </div>
                    ))}
                    {properties.length === 0 && (
                        <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-border/60">
                            <Building2 size={64} className="text-slate-200 mx-auto mb-8" />
                            <h3 className="text-2xl font-black text-text mb-4">Inventory is Empty</h3>
                            <button className="btn btn-primary" onClick={() => setAddOpen(true)}>Create Your First Listing</button>
                        </div>
                    )}
                </div>
            )}

            <Modal open={addOpen} title="New Market Entry" onClose={() => setAddOpen(false)}>
                <PropertyForm data={form} onChange={onChange} onSubmit={handleAdd} loading={submitting} btnLabel="Publish Listing" />
            </Modal>

            <Modal open={!!editProp} title="Update Listing" onClose={() => setEditProp(null)}>
                <PropertyForm data={form} onChange={onChange} onSubmit={handleEdit} loading={submitting} btnLabel="Sync Changes" />
            </Modal>

            <Modal open={!!deleteProp} title="Archival Warning" onClose={() => setDeleteProp(null)}>
                <div className="text-center">
                    <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-amber-100 shadow-lg shadow-amber-500/5">
                        <AlertTriangle size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-text mb-4">Permanent Removal?</h3>
                    <p className="text-text-muted mb-10 leading-relaxed font-medium">
                        Are you certain you want to delete <strong>"{deleteProp?.title}"</strong>? This action will permanently remove the record from all public and private databases.
                    </p>
                    <div className="flex gap-4">
                        <button className="btn btn-outline flex-1 py-4" onClick={() => setDeleteProp(null)}>Cancel</button>
                        <button className="btn btn-danger flex-1 py-4" onClick={handleDelete} disabled={submitting}>
                            {submitting ? 'Removing...' : 'Confirm Deletion'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminProperties;
