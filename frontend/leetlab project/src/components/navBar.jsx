import React, { useState, useEffect } from "react";
import { User, Code, LogOut, Menu, X, ChevronDown } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const NavBar = () => {
  const { authUser } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Problems", path: "/" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Contests", path: "/contests" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 backdrop-blur-xl border-border'
          : 'py-4 bg-transparent'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled 
              ? 'bg-black/60 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-3' 
              : 'bg-black/60 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4'
          }`}>
            
            {/* Logo Section */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group transition-transform duration-200 hover:scale-105"
            >
              <div className="relative">
                <img
                  src="/leetlab.svg"
                  alt="Leetlab"
                  className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-2 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hidden sm:block">
                Leetlab
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-white bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {authUser ? (
                // Authenticated User Section
                <div className="relative dropdown-container">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 group"
                  >
                    <div className="relative">
                      <img
                        src={authUser.image || "https://avatar.iran.liara.run/public/boy"}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-200"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-semibold text-white truncate max-w-24">
                        {authUser.name}
                      </p>
                      <p className="text-xs text-gray-400 capitalize">
                        {authUser.role?.toLowerCase()}
                      </p>
                    </div>
                    <ChevronDown 
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <div className={`absolute right-0 mt-2 w-56 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl transition-all duration-200 origin-top-right ${
                    isDropdownOpen 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}>
                    <div className="p-2">
                      {/* User Info */}
                      <div className="px-3 py-2 border-b border-white/10 mb-2">
                        <p className="font-semibold text-white text-sm">{authUser.name}</p>
                        <p className="text-xs text-gray-400">{authUser.email}</p>
                      </div>

                      {/* Menu Items */}
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 group"
                      >
                        <User className="w-4 h-4 group-hover:text-blue-400 transition-colors duration-200" />
                        <span className="font-medium">My Profile</span>
                      </Link>

                      {authUser.role === "ADMIN" && (
                        <Link
                          to="/add-problem"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 group"
                        >
                          <Code className="w-4 h-4 group-hover:text-green-400 transition-colors duration-200" />
                          <span className="font-medium">Add Problem</span>
                        </Link>
                      )}

                      <div className="border-t border-white/10 mt-2 pt-2">
                        <LogoutButton className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group w-full text-left">
                          <LogOut className="w-4 h-4 group-hover:text-red-400 transition-colors duration-200" />
                          <span className="font-medium">Logout</span>
                        </LogoutButton>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Not Authenticated Section
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-white border border-white/30 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="mx-4 mt-2 bg-black/60 backdrop-blur-lg border border-white/10 rounded-2xl p-4">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-white bg-white/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under the fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default NavBar;
