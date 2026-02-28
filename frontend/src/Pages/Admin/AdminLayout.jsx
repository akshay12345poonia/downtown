import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Building2, Users, LogOut, Home, Menu, X, ChevronRight, Globe, Settings } from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard', end: true },
        { to: '/admin/properties', icon: <Building2 size={20} />, label: 'Properties' },
        { to: '/admin/agents', icon: <Users size={20} />, label: 'Agents' },
    ];

    const sidebarClass = `fixed top-0 left-0 h-full bg-text text-white/60 transition-all duration-300 z-50 flex flex-col ${collapsed ? 'w-20' : 'w-72'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`;

    return (
        <div className="min-h-screen bg-surface-muted flex">
            {/* Overlay for mobile */}
            {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

            {/* Sidebar */}
            <aside className={sidebarClass}>
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-white/5 whitespace-nowrap overflow-hidden">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-brand/20">
                            <Home size={20} className="text-white" />
                        </div>
                        {!collapsed && (
                            <div>
                                <h1 className="text-white font-black text-lg leading-tight uppercase tracking-tighter">SilverBrick</h1>
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand">Management</p>
                            </div>
                        )}
                    </div>
                    {!collapsed && (
                        <button onClick={() => setCollapsed(true)} className="hidden lg:block text-white/20 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    )}
                </div>

                {collapsed && (
                    <button onClick={() => setCollapsed(false)} className="hidden lg:flex h-16 items-center justify-center text-white/20 hover:text-white transition-colors">
                        <Menu size={20} />
                    </button>
                )}

                {/* Navigation */}
                <nav className="flex-1 py-10 px-4 space-y-2 overflow-y-auto overflow-x-hidden">
                    {navItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) => `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'hover:bg-white/5 hover:text-white'}`}
                        >
                            <span className={`transition-transform duration-300 ${collapsed ? 'mx-auto' : ''} group-hover:scale-110`}>{item.icon}</span>
                            {!collapsed && (
                                <span className="font-bold text-sm tracking-wide truncate flex-1">{item.label}</span>
                            )}
                            {!collapsed && <ChevronRight size={14} className="opacity-20 group-hover:opacity-100 transition-opacity" />}
                        </NavLink>
                    ))}
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-white/5 bg-black/20">
                    {!collapsed && (
                        <div className="flex items-center gap-4 px-4 py-4 mb-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="w-10 h-10 rounded-xl bg-brand font-black text-white flex items-center justify-center shadow-lg shadow-brand/20">
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-black text-white truncate leading-tight">{user?.name}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand">Super Admin</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 group ${collapsed ? 'justify-center' : 'w-full'}`}
                    >
                        <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                        {!collapsed && <span className="font-bold text-sm">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Container */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
                {/* Header */}
                <header className="h-20 bg-white border-b border-border/60 sticky top-0 z-40 flex items-center justify-between px-8 shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-text-muted">
                            <Menu size={24} />
                        </button>
                        <div className="hidden sm:flex items-center gap-2 text-sm">
                            <Link to="/" className="text-brand font-black uppercase tracking-widest flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
                                <Globe size={16} /> View Production Site
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="p-2 text-text-muted hover:text-brand transition-colors relative">
                            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                            <LayoutDashboard size={20} />
                        </button>
                        <div className="h-8 w-px bg-border/60" />
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-black text-text leading-tight">{user?.name}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Master Administrator</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-surface-muted border-2 border-brand/10 flex items-center justify-center font-black text-brand text-sm shadow-sm group cursor-pointer hover:border-brand transition-colors">
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                    <Outlet />
                </main>

                <footer className="py-6 px-12 border-t border-border/40 text-center text-[10px] font-black uppercase tracking-widest text-text-muted">
                    SilverBrick Control Center &copy; {new Date().getFullYear()} &bull; Professional Edition v2.4
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;
