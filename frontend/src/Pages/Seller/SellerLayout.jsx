import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Building2, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const SellerLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { to: '/seller', label: 'Dashboard', icon: LayoutDashboard, end: true },
        { to: '/seller/properties', label: 'My Properties', icon: Building2 }
    ];

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${isActive
            ? 'bg-brand text-white shadow-lg shadow-brand/20'
            : 'text-text-muted hover:text-text hover:bg-surface-muted'
        }`;

    return (
        <div className="min-h-screen bg-surface flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-border/40 flex flex-col fixed h-full z-40 shadow-xl">
                {/* Logo */}
                <div className="px-8 py-6 border-b border-border/40">
                    <img src={logo} alt="Logo" className="h-10" />
                    <div className="mt-4">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-brand mb-1">Seller Portal</p>
                        <p className="font-black text-text text-lg truncate">{user?.name}</p>
                        <p className="text-xs text-text-muted truncate">{user?.email}</p>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navItems.map(({ to, label, icon: Icon, end }) => (
                        <NavLink key={to} to={to} end={end} className={linkClass}>
                            <Icon size={18} />
                            <span>{label}</span>
                            <ChevronRight size={14} className="ml-auto opacity-40" />
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div className="px-4 pb-6">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-5 py-3.5 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all"
                    >
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-10 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default SellerLayout;
