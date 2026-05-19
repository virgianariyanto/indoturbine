"use client";

import { useState } from "react";
import Image from "next/image";

export default function Policy() {
  const [activeTab, setActiveTab] = useState("qhse");

  const policyTabs = [
    {
      id: "qhse",
      label: "QHSE",
      title: "Quality, Health, Safety & Environment",
      subtitle: "Ensuring top-tier industrial safety and quality standards.",
      image: "/images/sol-tZw3fcjUIpM-unsplash.jpg",
      description: "Indoturbine is committed to delivering premium quality services while ensuring the highest safety, health, and environmental preservation standards across all operations.",
      points: [
        "Provide reliable products and engineering services",
        "Protect the safety and health of employees and contractors",
        "Prevent work-related injuries and operational ill health",
        "Prevent pollution and minimize environmental impact",
        "Ensure sustainable use of energy and resources",
        "Promote a culture of continuous improvement in QHSE"
      ]
    },
    {
      id: "anti-bribery",
      label: "Anti-bribery",
      title: "Anti-Bribery & Corruption Policy",
      subtitle: "Upholding absolute transparency and ethical business practices.",
      image: "/images/sol-tZw3fcjUIpM-unsplash.jpg",
      description: "We enforce a zero-tolerance policy against bribery and corruption. Indoturbine operates in complete compliance with international standards and anti-corruption regulations.",
      points: [
        "Zero-tolerance for all bribery and corruption practices",
        "Transparent financial tracking and regular external audits",
        "Compliance with ISO 37001 Anti-Bribery standards",
        "Mandatory annual compliance training for all staff",
        "Strict protocols for corporate gifts and hospitality",
        "Independent reporting channels for ethical concerns"
      ]
    },
    {
      id: "whistleblowing",
      label: "Whistleblowing System",
      title: "Whistleblowing & Compliance Reporting",
      subtitle: "A secure, protected space to report unethical practices.",
      image: "/images/sol-tZw3fcjUIpM-unsplash.jpg",
      description: "Our whistleblowing system provides secure, protected, and fully anonymous channels for employees, clients, and partners to report potential violations or misconduct.",
      points: [
        "100% confidential and anonymous reporting channels",
        "Full protection against retaliation or adverse actions",
        "Prompt, independent investigation of all reports",
        "Direct reporting lines to the compliance committee",
        "Clear whistleblower status tracking and follow-up",
        "Strict data confidentiality and privacy protection"
      ]
    }
  ];

  const certificates = [
    { title: "ISO 9001", image: "/images/certificate/iso-9001-removebg-preview.png" },
    { title: "ISO 14001", image: "/images/certificate/ISO-14001.png" },
    { title: "ISO 37001", image: "/images/certificate/ISO-37001.png" },
    { title: "ISO 45001", image: "/images/certificate/ISO-45001.png" }
  ];

  const activeData = policyTabs.find((t) => t.id === activeTab) || policyTabs[0];

  return (
    <section className="w-full py-20 md:py-28 bg-white relative overflow-hidden">
      
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-50 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Modern Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-600">
            Compliance & Quality
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
            Policies & Standards
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
            Our commitment to safety, integrity, and operational quality is governed by strict ISO-certified regulations.
          </p>
        </div>

        {/* Tab Navigation Switcher Bar */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap md:flex-nowrap justify-center p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 gap-1">
            {policyTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Content: Fluid Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-200/50 mb-10 h-64 md:h-[400px]">
          <Image 
            src={activeData.image} 
            alt={activeData.title} 
            fill
            priority
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white max-w-2xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-2 uppercase">
              {activeData.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
              {activeData.subtitle}
            </p>
          </div>
        </div>

        {/* Active Content: Grid details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          
          {/* Summary Column */}
          <div className="md:col-span-1 space-y-4">
            <h4 className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight uppercase">
              Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
              {activeData.description}
            </p>
          </div>

          {/* Details List Card */}
          <div className="md:col-span-2 bg-slate-50/50 border border-slate-200/40 rounded-3xl p-6 sm:p-8 space-y-6">
            <h4 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight uppercase">
              Key Policy Objectives
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeData.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-normal">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Certificates Heading Section */}
        <div className="text-center max-w-2xl mx-auto mt-24 mb-12 space-y-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600">
            Accreditations
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
            Certified Quality Standards
          </h3>
        </div>

        {/* Certificates Grid Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200/50 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200/60 hover:-translate-y-1 transition-all duration-300 group">
              <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
                <Image 
                  src={cert.image} 
                  alt={cert.title} 
                  width={160} 
                  height={160} 
                  className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <span className="mt-4 text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                {cert.title}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}