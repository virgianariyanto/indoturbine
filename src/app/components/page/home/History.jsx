import { Gem, Rocket, Building2, Milestone, History as HistoryIcon } from "lucide-react";

export default function History() {
  const values = [
    { 
      icon: HistoryIcon, 
      title: "1973", 
      description: "Indoturbine is founded, establishing the initial footprint for gas turbine repairs and services in the region." 
    },
    { 
      icon: Building2, 
      title: "1980", 
      description: "Expands service portfolio with the opening of our first dedicated turbine overhaul and maintenance facility." 
    },
    { 
      icon: Gem, 
      title: "1987", 
      description: "Partners with global industrial energy leaders to distribute and service high-capacity rotating machinery." 
    },
    { 
      icon: Milestone, 
      title: "1995", 
      description: "Achieves ISO quality certifications and expands operations to key offshore oil and gas turbine projects." 
    },
    { 
      icon: Rocket, 
      title: "Today", 
      description: "Pioneering real-time telemetry, IoT diagnostic sensors, and smart engineering maintenance systems." 
    }
  ];

  return (
    <section className="w-full py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Modern Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-600">
            Our Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
            History & Milestones
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
            Over five decades of powering industrial operations, scaling our services, and pioneering telemetry solutions.
          </p>
        </div>

        {/* Timeline Grid Wrapper */}
        <div className="relative">
          
          {/* Desktop-only horizontal connection line */}
          <div className="absolute top-[68px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-100 hidden lg:block z-0" />

          {/* Grid Stops */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
            {values.map((value, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                
                {/* Year Pill Tag */}
                <div className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-4 shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                  {value.title}
                </div>

                {/* Timeline Circle Node */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-slate-200/80 flex items-center justify-center text-slate-500 shadow-sm group-hover:border-blue-500 group-hover:text-blue-600 group-hover:shadow-md group-hover:shadow-blue-500/10 transition-all duration-300 mb-6">
                  <value.icon className="w-6 h-6" />
                </div>

                {/* Milestone Detail Card */}
                <div className="bg-white border border-slate-200/50 rounded-2xl p-5 shadow-sm group-hover:shadow-md group-hover:border-blue-200/60 transition-all duration-300 w-full min-h-[135px] flex flex-col justify-start">
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {value.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
