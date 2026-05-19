import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-[#E5E7EB] text-[#1F2937]">
            <div className="container mx-auto px-6 py-12 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1: Logo & Contact */}
                    <div className="flex flex-col gap-6">
                        <Image 
                            src="/images/Logo-Indoturbine-Baru-removebg-preview.png" 
                            alt="Indoturbine Logo" 
                            width={220} 
                            height={60} 
                            className="object-contain"
                        />
                        <div className="flex flex-col gap-4 mt-2">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                                <p className="text-sm leading-relaxed">
                                    Wisma 46 Kota BNI, 16th Floor<br />
                                    Jl. Jend. Sudirman No. Kav. 1<br />
                                    DKI Jakarta, 10220
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm">(021) 574 9822</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm">(021) 574 9823</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm">indotrbn@indoturbinept.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: About Us */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-bold text-lg">About Us</h4>
                        <ul className="flex flex-col gap-3">
                            <li><a href="#" className="text-sm hover:text-blue-500 transition-colors">Overview</a></li>
                            <li><a href="#" className="text-sm hover:text-blue-500 transition-colors">Policy</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Certificate */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-bold text-lg">Certificate</h4>
                        <ul className="flex flex-col gap-3">
                            <li className="text-sm">ISO 9001:2015</li>
                            <li className="text-sm">ISO 14001:2015</li>
                            <li className="text-sm">ISO 37001:2016</li>
                            <li className="text-sm">ISO 45001:2018</li>
                            <li className="text-sm">SKUP Migas Jasa 2023</li>
                        </ul>
                    </div>

                    {/* Column 4: Services */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-bold text-lg">Services</h4>
                        <ul className="flex flex-col gap-3">
                            <li><a href="#" className="text-sm hover:text-blue-500 transition-colors">Overhaul</a></li>
                            <li><a href="#" className="text-sm hover:text-blue-500 transition-colors">Maintenance</a></li>
                            <li><a href="#" className="text-sm hover:text-blue-500 transition-colors">Spareparts</a></li>
                            <li><a href="#" className="text-sm hover:text-blue-500 transition-colors">Engineer, Procurement, & Construction (EPC)</a></li>
                            <li><a href="#" className="text-sm hover:text-blue-500 transition-colors">Workshop</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="w-full bg-[#D1D5DB] py-4">
                <div className="container mx-auto px-6 text-center text-sm font-medium">
                    Copyright © 2025 – PT Indoturbine
                </div>
            </div>
        </footer>
    );
}
