import React, { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { Menu, X, LogIn, UserPlus, Settings, LogOut, Heart, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { mediaUrl } from '../Services/Api';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isLoggedIn, isAdmin, isAgent, isSeller, user, logout } = useAuth();
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
          ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3'
          : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center transition">
          <img
            src={logo}
            alt="SilverBrick Logo"
            className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'}`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/properties" className={linkClass}>Properties</NavLink>
          <NavLink to="/agents" className={linkClass}>Agents</NavLink>

          <div
            className="relative"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <button
              className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg transition ${isScrolled ? 'text-text-muted hover:text-brand' : 'text-white/80 hover:text-white'
                }`}
            >
              Company
              <ChevronDown size={14} className={`transition-transform duration-300 ${companyOpen ? 'rotate-180' : ''}`} />
            </button>

            {companyOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border py-3 animate-fadeUp">
                {companyLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block px-5 py-2.5 text-sm font-medium text-text-muted hover:text-brand hover:bg-brand-light transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        {/* Auth / Profile */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <div className="hidden sm:flex items-center gap-4">
              <Link
                to="/signin"
                className={`text-sm font-bold transition ${isScrolled ? 'text-text hover:text-brand' : 'text-white hover:text-white/80'
                  }`}
              >
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Join Now
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-brand p-0.5 shadow-lg hover:scale-105 transition overflow-hidden"
              >
                {user?.avatar ? (
                  <img
                    src={mediaUrl(user.avatar)}
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-brand font-black text-sm">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl border py-4 animate-fadeUp">
                  <div className="px-6 pb-4 border-b">
                    <p className="font-black text-base">{user?.name}</p>
                    <p className="text-xs text-text-muted mt-1 truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-text hover:bg-surface-muted transition"
                  >
                    <Settings size={16} className="text-text-muted" />
                    My Profile
                  </Link>
                  {isSeller && (
                    <Link
                      to="/seller"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-brand hover:bg-brand-light transition"
                    >
                      <Settings size={16} />
                      Seller Dashboard
                    </Link>
                  )}
                  {(isAdmin || isAgent) && (
                    <Link
                      to="/admin"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-brand hover:bg-brand-light transition"
                    >
                      <Settings size={16} />
                      {isAdmin ? 'Admin Dashboard' : 'Agent Portal'}
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-red-500 hover:bg-red-50 w-full transition"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 ${isScrolled ? 'text-text' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-text animate-fadeIn">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6">
              <img src={logo} alt="Logo" className="h-10" />
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={28} className="text-white" />
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-8 px-6 py-12 text-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-4xl font-black transition-colors ${isActive ? 'text-brand' : 'text-white/60 hover:text-white'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="p-8 space-y-4">
              {!isLoggedIn ? (
                <>
                  <Link to="/signin" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary w-full py-4">Sign In</Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary w-full py-4">Get Started</Link>
                </>
              ) : (
                <button onClick={handleLogout} className="btn bg-red-500 text-white w-full py-4">Sign Out</button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;