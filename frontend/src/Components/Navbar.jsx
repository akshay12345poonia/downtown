import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ChevronDown, ArrowRight, User } from "lucide-react";
import logo1 from "../assets/logo1.png"; // white logo
import logo2 from "../assets/logo2.png"; // gray/dark logo

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Check login from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Dynamic link class
  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
      isScrolled
        ? isActive
          ? "text-blue-600"
          : "text-gray-700 hover:text-blue-600"
        : isActive
        ? "text-white"
        : "text-white hover:text-gray-200"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={isScrolled ? logo2 : logo1}
            alt="logo"
            className="h-12 w-auto transition-all duration-300"
          />
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-6">
          <li>
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/properties" className={linkClass}>
              Properties
            </NavLink>
          </li>

          <li>
            <NavLink to="/booking" className={linkClass}>
              Book Online
            </NavLink>
          </li>

          {/* Company Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-sm font-medium transition ${
                isScrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-gray-200"
              }`}
            >
              Company
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  companyOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute top-10 left-0 w-44 bg-white shadow-lg rounded-md py-2 transition-all duration-300 ${
                companyOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
              }`}
            >
              <Link to="/team" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                Our Team
              </Link>
              <Link to="/agent" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                Our Agent
              </Link>
              <Link to="/career" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                Career
              </Link>
              <Link to="/investor" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                Investor
              </Link>
            </div>
          </li>

          <li>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4 relative">
          {!isLoggedIn ? (
            <>
              <Link
                to="/signin"
                className={`text-sm font-medium transition ${
                  isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="group flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 hover:bg-blue-700"
              >
                Get Started
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <User className="w-5 h-5 text-gray-700" />
              </button>

              <div
                className={`absolute right-0 top-14 w-48 bg-white shadow-lg rounded-md py-2 transition-all duration-300 ${
                  profileOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <Link to="/profile" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                  Profile
                </Link>
                <Link to="/settings" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;