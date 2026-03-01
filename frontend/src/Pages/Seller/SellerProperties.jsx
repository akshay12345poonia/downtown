import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Plus, Pencil, Trash2, X, Building2, AlertTriangle, MapPin, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { getProperties, createProperty, updateProperty, deleteProperty, mediaUrl } from '../../Services/Api';

const EMPTY = {
    title: '', description: '', price: '', location: '',
    bedrooms: 0, bathrooms: 0, area: 0,
    type: 'for-sale', propertyType: 'house', status: 'available', featured: false
};

const Modal = ({ open, title, onClose, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-text/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden">
                <div className="px-10 py-8 border-b border-border/40 flex items-center justify-between bg-surface-muted">
                    <h2 className="text-2xl font-black text-text">{title}</h2>
                    <button onClick={onClose} className="w-10 h-10 rounded-xl hover:bg-white flex items-center justify-center text-text-muted hover:text-red-500 transition-all">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-10 max-h-[75vh] overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

const ImageUploader = ({ files, setFiles, existingImages }) => {
    const fileRef = useRef();
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        const urls = files.map(f => URL.createObjectURL(f));
        setPreviews(urls);
        return () => urls.forEach(u => URL.revokeObjectURL(u));
    }, [files]);

    const handleChange = (e) => {
        const selected = Array.from(e.target.files);
        setFiles(selected);
    };

    return (
        <div>
            <label className="form-label">Property Photos</label>
            <div
                onClick={() => fileRef.current.click()}
                className="border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer hover:border-brand hover:bg-brand/5 transition-all mb-4"
            >
                <Upload size={32} className="text-text-muted mx-auto mb-3" />
                <p className="font-bold text-text-muted text-sm">Click to select photos from your computer or mobile</p>
                <p className="text-xs text-text-muted/60 mt-1">JPG, PNG, WEBP up to 10MB each (max 10 files)</p>
                <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={handleChange} />
            </div>

            {/* New file previews */}
            {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-3">
                    {previews.map((src, i) => (
                        <div key={i} className="relative aspect-video rounded-2xl overflow-hidden border border-border/40">
                            <img src={src} className="w-full h-full object-cover" alt="" />
                            <button
                                type="button"
                                onClick={() => setFiles(f => f.filter((_, idx) => idx !== i))}
                                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:scale-110 transition"
                            >×</button>
                        </div>
                    ))}
                </div>
            )}

            {/* Existing images (when editing) */}
            {previews.length === 0 && existingImages?.length > 0 && (
                <div>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Current Photos</p>
                    <div className="grid grid-cols-3 gap-3">
                        {existingImages.map((src, i) => (
                            <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-border/40">
                                <img src={mediaUrl(src)} className="w-full h-full object-cover" alt="" />
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-text-muted/60 mt-2">Select new photos above to replace existing ones.</p>
                </div>
            )}
        </div>
    );
};

const PropertyForm = ({ data, onChange, onSubmit, loading, btnLabel, imageFiles, setImageFiles }) => (
    <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
                <label className="form-label">Property Title *</label>
                <input className="form-input" required value={data.title} onChange={e => onChange('title', e.target.value)} placeholder="e.g. Modern 3BHK Apartment" />
            </div>

            <div>
                <label className="form-label">Price (₹) *</label>
                <input className="form-input" type="number" required value={data.price} onChange={e => onChange('price', e.target.value)} placeholder="0" />
            </div>

            <div>
                <label className="form-label">Location *</label>
                <input className="form-input" required value={data.location} onChange={e => onChange('location', e.target.value)} placeholder="City, Area" />
            </div>

            <div>
                <label className="form-label">Listing Type</label>
                <select className="form-input" value={data.type} onChange={e => onChange('type', e.target.value)}>
                    <option value="for-sale">For Sale</option>
                    <option value="for-rent">For Rent</option>
                </select>
            </div>

            <div>
                <label className="form-label">Property Type</label>
                <select className="form-input" value={data.propertyType} onChange={e => onChange('propertyType', e.target.value)}>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="land">Land</option>
                    <option value="commercial">Commercial</option>
                </select>
            </div>

            <div>
                <label className="form-label">Status</label>
                <select className="form-input" value={data.status} onChange={e => onChange('status', e.target.value)}>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                </select>
            </div>

            <div className="grid grid-cols-3 gap-4 md:col-span-2">
                <div><label className="form-label !mb-2">Beds</label><input className="form-input" type="number" min={0} value={data.bedrooms} onChange={e => onChange('bedrooms', +e.target.value)} /></div>
                <div><label className="form-label !mb-2">Baths</label><input className="form-input" type="number" min={0} value={data.bathrooms} onChange={e => onChange('bathrooms', +e.target.value)} /></div>
                <div><label className="form-label !mb-2">Area (Sqft)</label><input className="form-input" type="number" min={0} value={data.area} onChange={e => onChange('area', +e.target.value)} /></div>
            </div>

            <div className="md:col-span-2">
                <label className="form-label">Description</label>
                <textarea className="form-input min-h-[100px] py-4" value={data.description} onChange={e => onChange('description', e.target.value)} placeholder="Describe the property..." />
            </div>

            <div className="md:col-span-2">
                <ImageUploader files={imageFiles} setFiles={setImageFiles} existingImages={data.images} />
            </div>

            <div className="md:col-span-2 flex items-center gap-3 p-4 bg-surface-muted rounded-2xl border border-border/40 cursor-pointer" onClick={() => onChange('featured', !data.featured)}>
                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${data.featured ? 'bg-brand border-brand text-white' : 'border-border bg-white'}`}>
                    {data.featured && '✓'}
                </div>
                <span className="font-bold text-sm text-text">Mark as Featured Property</span>
            </div>
        </div>

        <div className="flex justify-end pt-2">
            <button type="submit" className="btn btn-primary btn-lg px-12 shadow-xl shadow-brand/20" disabled={loading}>
                {loading ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : btnLabel}
            </button>
        </div>
    </form>
);

const SellerProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [editProp, setEditProp] = useState(null);
    const [deleteProp, setDeleteProp] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [imageFiles, setImageFiles] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getProperties({ myListings: true });
            setProperties(res.data.data.properties);
        } catch { } finally { setLoading(false); }
    }, []);

    useEffect(() => { load(); }, [load]);

    const onChange = (key, val) => setForm(p => ({ ...p, [key]: val }));

    const buildFormData = () => {
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => {
            if (k !== 'images') fd.append(k, v);
        });
        imageFiles.forEach(f => fd.append('images', f));
        return fd;
    };

    const handleAdd = async (e) => {
        e.preventDefault(); setSubmitting(true);
        try {
            await createProperty(buildFormData());
            setAddOpen(false); setForm(EMPTY); setImageFiles([]); await load();
        } catch { } finally { setSubmitting(false); }
    };

    const handleEdit = async (e) => {
        e.preventDefault(); setSubmitting(true);
        try {
            await updateProperty(editProp._id, buildFormData());
            setEditProp(null); setImageFiles([]); await load();
        } catch { } finally { setSubmitting(false); }
    };

    const handleDelete = async () => {
        setSubmitting(true);
        try {
            await deleteProperty(deleteProp._id);
            setDeleteProp(null); await load();
        } catch { } finally { setSubmitting(false); }
    };

    const openEdit = (p) => {
        setForm({ ...EMPTY, ...p });
        setImageFiles([]);
        setEditProp(p);
    };

    return (
        <div className="animate-fadeUp">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand mb-2 block">Your Inventory</span>
                    <h1 className="text-4xl font-black text-text">My Properties</h1>
                </div>
                <button className="btn btn-primary btn-lg shadow-xl shadow-brand/20" onClick={() => { setForm(EMPTY); setImageFiles([]); setAddOpen(true); }}>
                    <Plus size={20} /> Add Property
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-24"><div className="spinner" /></div>
            ) : (
                <div className="space-y-4">
                    {properties.map(p => (
                        <div key={p._id} className="bg-white rounded-3xl p-4 border border-border/40 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row items-center gap-6">
                            <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                                {p.images?.[0] ? (
                                    <img src={mediaUrl(p.images[0])} className="w-full h-full object-cover" alt="" />
                                ) : (
                                    <div className="w-full h-full bg-surface-muted flex items-center justify-center"><ImageIcon size={32} className="text-border" /></div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-black text-text">{p.title}</h3>
                                <p className="flex items-center gap-1.5 text-xs font-bold text-text-muted mt-1"><MapPin size={12} className="text-brand" />{p.location}</p>
                                <div className="flex flex-wrap gap-3 mt-3">
                                    <span className="text-xl font-black text-brand">₹{(p.price / 100000).toFixed(1)}L</span>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${p.status === 'sold' ? 'bg-red-50 text-red-500' : p.status === 'rented' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{p.status}</span>
                                    <span className="px-3 py-1 bg-surface-muted rounded-full text-[10px] font-black text-text-muted uppercase tracking-widest">{p.type}</span>
                                </div>
                            </div>
                            <div className="flex md:flex-col gap-3 shrink-0">
                                <button className="btn btn-outline btn-sm" onClick={() => openEdit(p)}><Pencil size={14} /> Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => setDeleteProp(p)}><Trash2 size={14} /> Delete</button>
                            </div>
                        </div>
                    ))}

                    {properties.length === 0 && (
                        <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-border/60">
                            <Building2 size={64} className="text-slate-200 mx-auto mb-8" />
                            <h3 className="text-2xl font-black text-text mb-4">No Properties Yet</h3>
                            <button className="btn btn-primary" onClick={() => setAddOpen(true)}><Plus size={18} /> Add Your First Property</button>
                        </div>
                    )}
                </div>
            )}

            <Modal open={addOpen} title="List New Property" onClose={() => { setAddOpen(false); setImageFiles([]); }}>
                <PropertyForm data={form} onChange={onChange} onSubmit={handleAdd} loading={submitting} btnLabel="Publish Listing" imageFiles={imageFiles} setImageFiles={setImageFiles} />
            </Modal>

            <Modal open={!!editProp} title="Update Property" onClose={() => { setEditProp(null); setImageFiles([]); }}>
                <PropertyForm data={form} onChange={onChange} onSubmit={handleEdit} loading={submitting} btnLabel="Save Changes" imageFiles={imageFiles} setImageFiles={setImageFiles} />
            </Modal>

            <Modal open={!!deleteProp} title="Delete Property" onClose={() => setDeleteProp(null)}>
                <div className="text-center">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8"><AlertTriangle size={40} /></div>
                    <h3 className="text-2xl font-black text-text mb-4">Delete this listing?</h3>
                    <p className="text-text-muted mb-10">Are you sure you want to delete <strong>"{deleteProp?.title}"</strong>? This cannot be undone.</p>
                    <div className="flex gap-4">
                        <button className="btn btn-outline flex-1 py-4" onClick={() => setDeleteProp(null)}>Cancel</button>
                        <button className="btn btn-danger flex-1 py-4" onClick={handleDelete} disabled={submitting}>
                            {submitting ? 'Deleting...' : 'Yes, Delete'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SellerProperties;
