import Image from "next/image";

export default function News() {
  const articles = [
    {
      image: "/images/adigun-ampa-9U0vAXekzgU-unsplash.jpg",
      date: "18 May 2026",
      title: "Expanding Turbine Operations in Offshore Oil Fields",
      description: "Deploying high-efficiency telemetry diagnostic sensors to monitor critical rotating machinery under extreme deep-sea conditions."
    },
    {
      image: "/images/giorgi-iremadze-xvH26lEIBKE-unsplash.jpg",
      date: "14 May 2026",
      title: "Strategic Integration of Low-Emission Solar Turbines",
      description: "Delivering sustainable industrial power generation systems with low-emission profiles for manufacturing plants."
    },
    {
      image: "/images/sol-tZw3fcjUIpM-unsplash.jpg",
      date: "10 May 2026",
      title: "Achieving Milestones in HSE Zero-Incident Compliance",
      description: "Successfully celebrating over 500,000 safe man-hours on complex turbine repairs and overhauls in East Java facilities."
    }
  ];

  return (
    <section className="w-full py-20 md:py-28 bg-gradient-to-b from-slate-50/50 to-white relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-slate-50 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Modern Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-600">
            Latest Updates
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
            News & Press
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
            Stay informed with the latest insights, project milestones, and industry announcements from Indoturbine.
          </p>
        </div>

        {/* Grid Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {articles.map((item, index) => (
            <div 
              key={index} 
              className="w-full bg-white border border-slate-200/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1.5 transition-all duration-300 ease-out group flex flex-col justify-between"
            >
              <div>
                {/* Image wrapper */}
                <div className="w-full h-52 relative overflow-hidden bg-slate-100">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  {/* Floating Date Badge */}
                  <div className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-md text-[10px] text-white font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest">
                    {item.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-3">
                  <h3 className="text-lg md:text-xl font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Read Action Link */}
              <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 flex justify-start">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 uppercase tracking-widest cursor-pointer">
                  Read Article
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}