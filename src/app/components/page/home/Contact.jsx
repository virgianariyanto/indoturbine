import { Eye, Goal } from "lucide-react";
import Image from "next/image";
import bg from '../../../../../public/images/environmental-pollution-industry-exterior.jpg';
import Button from "@/app/components/ui/Button";

export default function Contact() {
    return (
        <section className="relative w-full py-16 md:py-36 overflow-hidden">
            {/* Optimized Background Image */}
            <Image 
                src={bg} 
                alt="Industrial Background" 
                fill 
                className="object-cover -z-20"
                priority
            />
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-slate-950/70 -z-10" />

            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-12 px-6">
                {/* Left Side: Content */}
                <section className="w-full md:w-1/2">
                    <div className="relative z-10 w-full">
                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            Ready to connect with <span className="text-blue-400">INDOTURBINE?</span>
                        </h1>
                        <p className="text-xl text-slate-300 font-medium mt-6 w-full md:w-5/6 leading-relaxed">
                            Share your information and we'll provide the expert support and innovative solutions your project needs.
                        </p>
                    </div>
                </section>

                {/* Right Side: Glassmorphism Form Card */}
                <section className="w-full md:w-1/2">
                    <div className="relative z-10 w-full bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
                        <form action="" className="flex flex-col">
                            <div className="flex gap-2 flex-col mb-6">
                                <label htmlFor="nama" className="text-white font-semibold text-sm ml-1">Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter your full name"
                                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                            <div className="flex gap-2 flex-col mb-6">
                                <label htmlFor="company" className="text-white font-semibold text-sm ml-1">Company / Institution</label>
                                <input 
                                    type="text" 
                                    placeholder="Your company name"
                                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                            <div className="flex gap-2 flex-col mb-6">
                                <label htmlFor="email" className="text-white font-semibold text-sm ml-1">Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="example@email.com"
                                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                            <div className="flex gap-2 flex-col mb-6">
                                <label htmlFor="phone" className="text-white font-semibold text-sm ml-1">Phone Number</label>
                                <input 
                                    type="tel" 
                                    placeholder="+62 ..."
                                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                            <div className="flex gap-2 flex-col mb-8">
                                <label htmlFor="message" className="text-white font-semibold text-sm ml-1">Your Message</label>
                                <textarea 
                                    name="message" 
                                    id="message" 
                                    placeholder="How can we help you?"
                                    rows="4" 
                                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <Button text="Send Message" className="w-full md:w-auto" />
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </section>
    );
}

