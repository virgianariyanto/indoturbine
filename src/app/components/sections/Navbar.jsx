'use client'

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Search, User, Menu, X, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const profileRef = useRef(null);

  useEffect(() => {
    let frameId;

    // Defer the setting of mounted to prevent synchronous state updates in the effect block
    frameId = requestAnimationFrame(() => {
      setMounted(true);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    // Initial check on load
    handleScroll();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "News", href: "/news" },
  ];

  return (
    <nav className={`w-full sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 py-3.5 ${isScrolled
        ? "bg-white/90 backdrop-blur-md border-b border-zinc-200/50 shadow-md shadow-zinc-100/30"
        : "bg-white/70 backdrop-blur-md border-b border-zinc-200/20 shadow-none"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block hover:opacity-90 active:scale-95 transition-all">
              <Image
                src="/images/Logo-Indoturbine-Baru-removebg-preview.png"
                alt="Indoturbine Logo"
                width={150}
                height={100}
                className="w-32 md:w-[145px] h-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-2 text-sm font-semibold tracking-wide transition-colors duration-300 group ${isActive
                      ? "text-blue-600 font-bold"
                      : "text-zinc-600 hover:text-blue-600"
                    }`}
                >
                  {link.name}
                  {/* Sliding Underline Micro-animation */}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                </Link>
              );
            })}
          </div>

          {/* Desktop Search & User Section */}
          <div className="hidden md:flex items-center gap-5">
            {/* Search Pill */}
            <div className="relative group">
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className="w-40 lg:w-48 bg-zinc-50 border border-zinc-200 text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-full px-4 py-1.5 pr-9 text-xs transition-all duration-300 shadow-sm"
              />
              <Search className="absolute right-3.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
            </div>

            {/* User Session UI */}
            {!mounted || isPending ? (
              <div className="w-8 h-8 rounded-full bg-zinc-100 animate-pulse border border-zinc-200" />
            ) : session ? (
              <div className="relative" ref={profileRef}>
                {/* Trigger Button */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2.5 p-1 pr-3 rounded-full hover:bg-zinc-50 active:scale-98 transition-all border border-transparent hover:border-zinc-200/60 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    {session.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold text-zinc-800 leading-none">{session.user.name}</p>
                    <span className="text-[9px] text-zinc-400 font-semibold tracking-tight">Operator</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Elegant Dropdown Card */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2.5 w-64 bg-white rounded-2xl shadow-xl border border-zinc-100 p-2.5 z-50 origin-top-right transform animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info Header */}
                    <div className="p-3 border-b border-zinc-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                        {session.user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-zinc-800 truncate">{session.user.name}</p>
                        <p className="text-xs text-zinc-400 truncate">{session.user.email}</p>
                      </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="py-1.5 space-y-0.5">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-blue-600 hover:bg-zinc-50 rounded-xl transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4 text-zinc-400" />
                        <span>Go to Dashboard</span>
                      </Link>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-1.5 border-t border-zinc-100">
                      <button
                        onClick={async () => {
                          setIsProfileOpen(false);
                          await authClient.signOut();
                          window.location.reload();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-red-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-full shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Trigger & Profile */}
          <div className="md:hidden flex items-center gap-3">
            {!mounted || isPending ? (
              <div className="w-8 h-8 rounded-full bg-zinc-100 animate-pulse border border-zinc-200" />
            ) : session ? (
              <Link
                href="/dashboard"
                title="Go to Dashboard"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm hover:scale-105 transition-transform"
              >
                {session.user.name.charAt(0).toUpperCase()}
              </Link>
            ) : (
              <Link href="/login" className="rounded-full p-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors">
                <User className="w-4 h-4" />
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-zinc-600 hover:text-blue-600 hover:bg-zinc-100 rounded-full transition-all focus:outline-none cursor-pointer"
            >
              {isMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Drawer (Slide-down with backdrop blur) */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-5 border-t border-zinc-100/80 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-3 mt-4">
              {/* Mobile Search */}
              <div className="relative group mb-1">
                <input
                  type="text"
                  name="search"
                  placeholder="Search..."
                  className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-full px-4 py-2 pr-9 text-xs transition-all duration-300"
                />
                <Search className="absolute right-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
              </div>

              {/* Mobile Links */}
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2.5 text-sm font-semibold rounded-xl transition-all ${isActive
                        ? "text-blue-600 bg-blue-50/50 font-bold"
                        : "text-zinc-600 hover:text-blue-600 hover:bg-zinc-50"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Logout Button inside Mobile Drawer if logged in */}
              {session && (
                <button
                  onClick={async () => {
                    setIsMenuOpen(false);
                    await authClient.signOut();
                    window.location.reload();
                  }}
                  className="mt-2 flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
