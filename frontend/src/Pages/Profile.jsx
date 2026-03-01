import React, { useState, useEffect, useRef } from 'react';
import { Camera, User, Mail, Phone, Shield, Pencil, Check, X, Loader2, AlertTriangle, Trash2 } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { getMe, updateMe, mediaUrl } from '../Services/Api';

const ROLE_COLORS = {
  admin: 'bg-red-100 text-red-600',
  seller: 'bg-amber-100 text-amber-700',
  agent: 'bg-blue-100 text-blue-700',
  buyer: 'bg-emerald-100 text-emerald-700'
};

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMe();
        const u = res.data.data.user;
        setProfile(u);
        setForm({ name: u.name || '', phone: u.phone || '' });
      } catch (err) {
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) return setError('File size too large (max 10MB)');
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setRemoveAvatar(false);
    setError(null);
  };

  const handleRemovePhoto = () => {
    setRemoveAvatar(true);
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('phone', form.phone);
      if (avatarFile) {
        fd.append('avatar', avatarFile);
      } else if (removeAvatar) {
        fd.append('removeAvatar', true);
      }

      const res = await updateMe(fd);
      const updated = res.data.data.user;
      setProfile(updated);
      updateUser(updated);
      setEditing(false);
      setAvatarFile(null);
      setAvatarPreview(null);
      setRemoveAvatar(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setAvatarFile(null);
    setAvatarPreview(null);
    setRemoveAvatar(false);
    if (profile) setForm({ name: profile.name || '', phone: profile.phone || '' });
    setError(null);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="spinner" />
    </div>
  );

  const avatarSrc = removeAvatar ? null : (avatarPreview || mediaUrl(profile?.avatar));

  return (
    <div className="min-h-screen bg-surface pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Banner */}
        {success && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-6 py-4 flex items-center gap-3 animate-fadeUp">
            <Check size={20} />
            <span className="font-bold">Profile updated successfully!</span>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-6 py-4 flex items-center gap-3 animate-fadeUp">
            <AlertTriangle size={20} />
            <span className="font-bold">{error}</span>
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-border/40">
          <div className="h-40 bg-gradient-to-br from-brand via-brand/80 to-brand/40 relative" />

          {/* Avatar */}
          <div className="px-10 pb-10">
            <div className="flex items-end justify-between -mt-16 mb-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-[2rem] border-4 border-white shadow-2xl overflow-hidden bg-brand/10 flex items-center justify-center relative">
                  {avatarSrc ? (
                    <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl font-black text-brand uppercase">
                      {profile?.name?.[0] || 'U'}
                    </span>
                  )}
                </div>
                {editing && (
                  <div className="absolute -bottom-2 -right-2 flex gap-2">
                    <button
                      onClick={() => fileRef.current.click()}
                      className="w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition"
                      title="Upload New Photo"
                    >
                      <Camera size={18} />
                    </button>
                    {(avatarPreview || (!removeAvatar && profile?.avatar)) && (
                      <button
                        onClick={handleRemovePhoto}
                        className="w-10 h-10 bg-red-500 text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition"
                        title="Delete Photo"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              <span className={`px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest ${ROLE_COLORS[profile?.role] || 'bg-gray-100 text-gray-600'}`}>
                {profile?.role}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                {editing ? (
                  <input
                    className="form-input text-3xl font-black"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Your Name"
                  />
                ) : (
                  <h1 className="text-3xl font-black text-text">{profile?.name}</h1>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-surface-muted rounded-2xl border border-border/40">
                  <div className="w-10 h-10 bg-brand/10 text-brand rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-text-muted uppercase tracking-widest mb-0.5">Email Address</p>
                    <p className="font-bold text-text">{profile?.email}</p>
                  </div>
                  <span className="ml-auto text-xs font-black text-text-muted/50 uppercase tracking-widest">Read Only</span>
                </div>

                <div className="flex items-center gap-4 p-4 bg-surface-muted rounded-2xl border border-border/40">
                  <div className="w-10 h-10 bg-brand/10 text-brand rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black text-text-muted uppercase tracking-widest mb-0.5">Phone Number</p>
                    {editing ? (
                      <input
                        className="form-input py-1 text-sm"
                        value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        placeholder="+91 000 000 0000"
                      />
                    ) : (
                      <p className="font-bold text-text">{profile?.phone || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-surface-muted rounded-2xl border border-border/40">
                  <div className="w-10 h-10 bg-brand/10 text-brand rounded-xl flex items-center justify-center shrink-0">
                    <Shield size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-text-muted uppercase tracking-widest mb-0.5">Account Status</p>
                    <p className="font-bold text-text capitalize">{profile?.role} Account Verified</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {editing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="btn btn-primary flex-1 py-4 shadow-xl shadow-brand/20"
                    >
                      {saving ? <Loader2 size={18} className="animate-spin mr-2" /> : <Check size={18} className="mr-2" />}
                      {saving ? 'Updating...' : 'Save Changes'}
                    </button>
                    <button onClick={handleCancel} className="btn btn-outline py-4 px-8">
                      <X size={18} className="mr-2" /> Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => setEditing(true)} className="btn btn-primary flex-1 py-4 shadow-xl shadow-brand/20">
                    <Pencil size={18} className="mr-2" /> Edit Personal Information
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;