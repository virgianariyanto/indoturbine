'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, User, Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  return (
    <nav className="w-full bg-white border-b border-solid border-zinc-200 p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src="/images/Logo-Indoturbine-Baru-removebg-preview.png" alt="Logo" width={150} height={100} className="w-32 md:w-[150px]" />
            </Link>
          </div>

          {/* Desktop Search and User */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                name="search" 
                placeholder="search..." 
                className="border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1 pr-8"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            
            {!mounted || isPending ? (
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-4">
                <Link 
                  href="/dashboard"
                  className="hidden sm:flex items-center gap-1 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                >
                  <span>Dashboard</span>
                </Link>
                <div className="flex items-center gap-3 border-l border-zinc-200 pl-4">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-gray-800 leading-none">{session.user.name}</span>
                    <button 
                      onClick={async () => {
                        await authClient.signOut();
                        window.location.reload();
                      }}
                      className="text-[10px] text-red-500 font-bold hover:underline uppercase tracking-tighter mt-1"
                    >
                      Logout
                    </button>
                  </div>
                  <Link href="/dashboard" title="Go to Dashboard">
                    <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm hover:scale-105 transition-transform">
                      {session.user.name.charAt(0).toUpperCase()}
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <Link href="/login" className="rounded-full p-1.5 bg-red-500 hover:bg-red-600 transition-colors cursor-pointer shadow-md shadow-red-100">
                <User className="w-5 h-5 text-white" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {!mounted || isPending ? (
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
            ) : session ? (
              <Link href="/dashboard" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm hover:scale-105 transition-transform">
                {session.user.name.charAt(0).toUpperCase()}
              </Link>
            ) : (
              <Link href="/login" className="rounded-full p-1.5 bg-red-500">
                <User className="w-5 h-5 text-white" />
              </Link>
            )}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-500 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>


        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4 mt-8">
          <Link href="/" className="text-gray-700 hover:text-blue-500 font-semibold transition-colors">
            Home
          </Link>
          <a href="#" className="text-gray-700 hover:text-blue-500 font-semibold transition-colors">
            About
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500 font-semibold transition-colors">
            Contact
          </a>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-zinc-100 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-4 mt-4">
              <div className="relative mb-2">
                <input 
                  type="text" 
                  name="search" 
                  placeholder="search..." 
                  className="w-full border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-2 pr-8"
                />
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <Link href="/" className="text-gray-700 hover:text-blue-500 font-semibold py-2 border-b border-zinc-50">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-500 font-semibold py-2 border-b border-zinc-50">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-500 font-semibold py-2">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>  
  );
}
