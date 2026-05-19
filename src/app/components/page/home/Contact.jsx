import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import bg from '../../../../../public/images/environmental-pollution-industry-exterior.jpg';
import Button from "@/app/components/ui/Button";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full py-20 md:py-36 overflow-hidden bg-slate-950">
      {/* Optimized Background Image */}
      <Image 
        src={bg} 
        alt="Industrial Background" 
        fill 
        className="object-cover -z-20 opacity-40 scale-105 transform transition-transform duration-[10000ms] will-change-transform"
        priority
      />
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-slate-950/85 -z-10" />

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="container mx-auto max-w-6xl relative z-10 px-6">
        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-12 lg:gap-16">
          
          {/* Left Side: Content & Quick Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-300">
                Get In Touch
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] uppercase tracking-tight">
                Ready to connect <br className="hidden md:block"/>
                with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400">INDOTURBINE</span>?
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Share your information and we&apos;ll provide the expert support and innovative solutions your project needs.
              </p>
            </div>

            {/* Quick Contact Details */}
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold">Call Us</span>
                  <span className="text-sm sm:text-base text-white font-semibold">+62 21 1234 5678</span>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold">Email Us</span>
                  <span className="text-sm sm:text-base text-white font-semibold">info@indoturbine.com</span>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold">Our Head Office</span>
                  <span className="text-sm sm:text-base text-white font-semibold">Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Glassmorphism Form Card */}
          <div className="w-full lg:w-1/2 flex items-center">
            <div className="w-full bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative">
              <form action="" className="flex flex-col">
                <div className="flex gap-2 flex-col mb-6">
                  <label htmlFor="nama" className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    id="nama"
                    type="text" 
                    placeholder="Enter your full name"
                    className="w-full p-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                  />
                </div>
                <div className="flex gap-2 flex-col mb-6">
                  <label htmlFor="company" className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Company / Institution</label>
                  <input 
                    id="company"
                    type="text" 
                    placeholder="Your company name"
                    className="w-full p-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                  />
                </div>
                <div className="flex gap-2 flex-col mb-6">
                  <label htmlFor="email" className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    placeholder="example@email.com"
                    className="w-full p-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                  />
                </div>
                <div className="flex gap-2 flex-col mb-6">
                  <label htmlFor="phone" className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Phone Number</label>
                  <input 
                    id="phone"
                    type="tel" 
                    placeholder="+62 ..."
                    className="w-full p-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                  />
                </div>
                <div className="flex gap-2 flex-col mb-8">
                  <label htmlFor="message" className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">Your Message</label>
                  <textarea 
                    name="message" 
                    id="message" 
                    placeholder="How can we help you?"
                    rows="4" 
                    className="w-full p-3.5 rounded-xl bg-slate-900/60 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 resize-none"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <Button text="Send Message" className="w-full md:w-auto" />
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
