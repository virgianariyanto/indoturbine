import * as LucideIcons from "lucide-react";

export default function History({ data }) {
  const badge = data?.badge || "Our Journey";
  const title = data?.title || "History & Milestones";
  const description = data?.description || "Over five decades of powering industrial operations, scaling our services, and pioneering telemetry solutions.";
  const items = data?.items || [];

  return (
    <section className="w-full py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Modern Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-600">
            {badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Timeline Grid Wrapper */}
        <div className="relative">
          
          {/* Desktop-only horizontal connection line */}
          <div className="absolute top-[68px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-100 hidden lg:block z-0" />

          {/* Grid Stops */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
            {items.map((value, index) => {
              // Dynamically resolve icon from lucide-react
              const IconComponent = LucideIcons[value.icon] || LucideIcons.Milestone;

              return (
                <div key={value.id || index} className="flex flex-col items-center text-center group">
                  
                  {/* Year Pill Tag */}
                  <div className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-4 shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                    {value.year}
                  </div>

                  {/* Timeline Circle Node */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-slate-200/80 flex items-center justify-center text-slate-500 shadow-sm group-hover:border-blue-500 group-hover:text-blue-600 group-hover:shadow-md group-hover:shadow-blue-500/10 transition-all duration-300 mb-6">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Milestone Detail Card */}
                  <div className="bg-white border border-slate-200/50 rounded-2xl p-5 shadow-sm group-hover:shadow-md group-hover:border-blue-200/60 transition-all duration-300 w-full min-h-[135px] flex flex-col justify-start">
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                      {value.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

