import { Sparkles, ArrowRight, ChevronDown } from "lucide-react";

export default function Hero({ data = {} }) {
  // Extract fields with fallback values just in case
  const {
    bgImageUrl = "/images/po-hsuan-huang-Y8H4rOxCf0g-unsplash.jpg",
    titlePart1 = "INDO",
    titlePart2 = "TURBINE",
    tag = "Integrated Turbine Services & Telemetry",
    description = "Empowering energy and manufacturing sectors with state-of-the-art gas turbine maintenance, precision engineering solutions, and high-performance real-time telemetry.",
    primaryBtnText = "Get Started",
    primaryBtnLink = "#contact",
    secondaryBtnText = "Explore Solutions",
    secondaryBtnLink = "#services",
  } = data;

  const showPrimaryBtn = primaryBtnText && primaryBtnLink;
  const showSecondaryBtn = secondaryBtnText && secondaryBtnLink;
  const showButtons = showPrimaryBtn || showSecondaryBtn;

  return (
    <section
      className="w-full min-h-[40rem] md:min-h-[48rem] xl:min-h-screen relative flex items-center justify-center py-20 overflow-hidden bg-slate-950"
    >
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-65 scale-105 transform hover:scale-100 transition-transform duration-[10000ms] ease-out will-change-transform"
        style={{ backgroundImage: `url('${bgImageUrl}')` }}
      />

      {/* Dark Gradients for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-slate-950 z-0" />
      <div className="absolute inset-0 bg-blue-950/20 mix-blend-multiply z-0" />

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Floating Context Tag */}
        {tag && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-blue-300 mb-2 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{tag}</span>
          </div>
        )}

        {/* Large Styled Brand Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-zinc-400">
            {titlePart1}
          </span>
          {titlePart2 && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 ml-1">
              {titlePart2}
            </span>
          )}
        </h1>

        {/* Informative Sub-Headline */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-normal">
          {description}
        </p>

        {/* Dual Actions Button Array */}
        {showButtons && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {showPrimaryBtn && (
              <a
                href={primaryBtnLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all duration-200 group cursor-pointer"
              >
                <span>{primaryBtnText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            )}
            {showSecondaryBtn && (
              <a
                href={secondaryBtnLink}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/15 hover:border-white/30 backdrop-blur-md active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                {secondaryBtnText}
              </a>
            )}
          </div>
        )}
      </div>

      {/* Pulsing Scroll-down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors pointer-events-none z-10">
        <span className="text-[10px] font-bold tracking-widest uppercase">Scroll Down</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}