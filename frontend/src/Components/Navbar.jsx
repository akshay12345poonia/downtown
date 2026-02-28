import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Settings, Home, Menu, X } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import logo from '../assets/logo1.png';
import logo1 from '../assets/logo2.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isLoggedIn, isAdmin, isAgent, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileOpen(false);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/properties', label: 'Properties' },
    { to: '/agents', label: 'Agents' },
    { to: '/contact', label: 'Contact' },
  ];

  const companyLinks = [
    { to: '/about', label: 'About Us' },
    { to: '/careers', label: 'Careers' },
    { to: '/faq', label: 'FAQ' },
  ];

  const linkClass = ({ isActive }) =>
    `px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${isScrolled
      ? isActive
        ? 'text-brand bg-brand/5'
        : 'text-text-muted hover:text-brand hover:bg-brand/5'
      : isActive
        ? 'text-white bg-white/10'
        : 'text-white/80 hover:text-white hover:bg-white/10'
    }`;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-3'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform">
            <Home size={20} className="text-white" />
          </div>
          <span
            className={`font-black text-2xl tracking-tighter transition-colors ${isScrolled ? 'text-text' : 'text-white'
              }`}
          >
            SilverBrick
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/properties" className={linkClass}>Properties</NavLink>
          <NavLink to="/agents" className={linkClass}>Agents</NavLink>

          {/* Company Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <button
              className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${isScrolled ? 'text-text-muted hover:text-brand' : 'text-white/80 hover:text-white'
                }`}
            >
              Company
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${companyOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <div
              className={`absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-border/40 py-3 transition-all duration-300 ${companyOpen
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible -translate-y-4'
                }`}
            >
              {companyLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center px-5 py-2.5 text-sm font-medium text-text-muted hover:text-brand hover:bg-brand-light transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        {/* Action Buttons / Auth */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <div className="hidden sm:flex items-center gap-4">
              <Link
                to="/signin"
                className={`text-sm font-bold transition-colors ${isScrolled ? 'text-text hover:text-brand' : 'text-white hover:text-white/80'
                  }`}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary shadow-brand/20"
              >
                Join Now
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-brand p-0.5 shadow-lg shadow-brand/20 hover:scale-105 transition-transform"
              >
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-brand font-black text-sm">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              </button>

              <div
                className={`absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl border border-border/40 py-4 transition-all duration-300 ${profileOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible -translate-y-4'
                  }`}
              >
                <div className="px-6 pb-4 border-b border-border/60">
                  <p className="font-black text-text text-base leading-tight">
                    {user?.name}
                  </p>
                  <p className="text-xs text-text-muted mt-1 truncate">
                    {user?.email}
                  </p>
                  <span className="mt-3 inline-block text-[10px] font-black uppercase tracking-widest bg-brand/10 text-brand px-2.5 py-1 rounded-full">
                    {user?.role} Account
                  </span>
                </div>

                <div className="py-2">
                  {(isAdmin || isAgent) && (
                    <Link
                      to="/admin"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-brand hover:bg-brand-light transition-colors"
                    >
                      <Settings size={16} /> {isAdmin ? 'Admin Dashboard' : 'Agent Portal'}
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-red-500 hover:bg-red-50 w-full transition-colors"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-text' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 z-[60] bg-text transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 bg-text-muted/10">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center">
                <Home size={20} className="text-white" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-white">SilverBrick</span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2">
              <X size={28} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col gap-8 text-center">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `text-4xl font-black ${isActive ? 'text-brand' : 'text-white/60'}`}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="h-px bg-white/10 my-4" />
            {companyLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold text-white/40"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="p-10 flex flex-col gap-4">
            {!isLoggedIn ? (
              <>
                <Link to="/signin" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary py-4 text-lg">Sign In</Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary py-4 text-lg">Get Started</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn bg-red-500 text-white py-4 text-lg">Sign Out</button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;