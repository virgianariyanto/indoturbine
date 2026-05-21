import * as LucideIcons from "lucide-react";

export default function CoreValue({ data }) {
  const badge = data?.badge || "Our Foundation";
  const title = data?.title || "Core Values";
  const description = data?.description || "The driving principles that guide our engineering precision, telemetry accuracy, and commitment to service quality.";
  const items = data?.items || [];

  return (
    <section className="w-full py-20 md:py-28 bg-white relative overflow-hidden">
      
      {/* Background decorative glows */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-slate-50 rounded-full blur-3xl pointer-events-none z-0" />

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

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((value, index) => {
            // Dynamically resolve icon from lucide-react
            const IconComponent = LucideIcons[value.icon] || LucideIcons.Lightbulb;

            return (
              <div 
                key={value.id || index} 
                className="flex flex-col items-start text-left p-8 bg-slate-50/50 hover:bg-white border border-slate-200/40 hover:border-blue-200/60 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1.5 transition-all duration-300 ease-out group"
              >
                {/* Icon Wrapper */}
                <div className="mb-6 p-3.5 bg-blue-50/80 text-blue-600 rounded-2xl border border-blue-100/50 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:scale-105 transition-all duration-300 shadow-sm">
                  <IconComponent className="w-7 h-7" />
                </div>

                {/* Header */}
                <h3 className="text-lg font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 mb-3 tracking-wide uppercase">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed font-normal">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

