import { Eye, Goal } from "lucide-react";

export default function Visi({ data }) {
  const visionTitle = data?.visionTitle || "VISI";
  const visionText = data?.visionText || "To be the premier global provider of integrated gas turbine solutions and telemetry, driving industrial efficiency and sustainable energy innovation across the globe.";
  const missionTitle = data?.missionTitle || "MISI";
  const missionText = data?.missionText || "Delivering state-of-the-art engineering, precision maintenance, and real-time telemetry to maximize asset performance and operational reliability for our industrial partners.";

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-16 md:py-24 relative overflow-hidden">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="container mx-auto max-w-6xl relative z-10 px-6">
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          
          {/* Vision Card */}
          <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-xl shadow-slate-200/30 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-200/60 transition-all duration-300 ease-out group">
            <div>
              {/* Icon Wrapper */}
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-7 h-7" />
              </div>
              
              {/* Heading */}
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 uppercase">
                {visionTitle}
              </h2>
              
              {/* Description */}
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                {visionText}
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-xl shadow-slate-200/30 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/5 hover:border-indigo-200/60 transition-all duration-300 ease-out group">
            <div>
              {/* Icon Wrapper */}
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100/80 flex items-center justify-center text-indigo-600 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Goal className="w-7 h-7" />
              </div>
              
              {/* Heading */}
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mb-4 uppercase">
                {missionTitle}
              </h2>
              
              {/* Description */}
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                {missionText}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

