"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, ShieldCheck, Sparkles, Home } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });
    
    if (error) {
      setLoading(false);
      alert(error.message || "Invalid credentials");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-end p-16 justify-start">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/adigun-ampa-9U0vAXekzgU-unsplash.jpg" 
            alt="Turbine Power" 
            fill 
            className="object-cover scale-105 transform hover:scale-100 transition-transform duration-1000 ease-out" 
            priority
          />
          {/* Dual Gradient Overlay for Immersive Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/30 z-10" />
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply z-10" />
        </div>

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* Content over image */}
        <div className="relative z-20 max-w-xl text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-blue-300">
            <Sparkles className="w-4 h-4 text-blue-400" /> Professional Energy Portal
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Powering the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Industrial Turbines</span>.
          </h2>
          <p className="text-slate-300 text-base md:text-lg font-normal leading-relaxed max-w-md">
            Log in to manage operations, explore cutting-edge QHSE insights, and access high-performance turbine telemetry.
          </p>

          <div className="pt-6 border-t border-white/10 flex items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span>ISO 9001 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-200 font-medium">System Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 bg-white relative">
        {/* Back to Home floating link */}
        {/* <div className="absolute top-6 sm:top-8 px-6 w-full flex justify-between">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 group transition-colors"
          >
            <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Home</span>
          </Link>
          <div className="inline-block mb-2">
            <Link href="/">
              <Image 
                src="/images/Logo-Indoturbine-Baru-removebg-preview.png" 
                alt="Indoturbine Logo" 
                width={180} 
                height={80} 
                className="w-44 md:w-48 object-contain transition-transform duration-300 hover:scale-105 origin-left"
              />
            </Link>
          </div>
        </div> */}

        <div className="w-full max-w-md space-y-8">
          {/* Logo & Header */}
          <div className="space-y-4 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-normal">
              Enter your credentials to securely access your account.
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5 mt-8">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-700">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  placeholder="name@indoturbine.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-slate-800 placeholder:text-slate-400 font-medium text-sm shadow-sm shadow-slate-100/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-slate-700">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  placeholder="••••••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all text-slate-800 placeholder:text-slate-400 font-medium text-sm shadow-sm shadow-slate-100/50"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white py-3.5 px-4 rounded-xl font-bold tracking-wide hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 flex justify-center items-center gap-2 group cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2.5">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-sm font-bold">Authenticating...</span>
                </div>
              ) : (
                <>
                  <span className="text-sm font-bold">Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </form>
          
          {/* Footer Link */}
          <div className="pt-8 border-t border-slate-100 text-center sm:text-left">
            <p className="text-sm text-slate-500 font-normal">
              Don't have an account?{" "}
              <Link 
                href="/" 
                className="font-extrabold text-blue-600 hover:text-blue-700 hover:underline transition-colors inline-flex items-center gap-1"
              >
                Back to Homepage &rarr;
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

