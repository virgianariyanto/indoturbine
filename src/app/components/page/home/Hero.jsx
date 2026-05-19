export default function HomeHero() {
  return (
    <section
      className="w-full min-h-[30rem] md:min-h-[40rem] relative bg-cover bg-center flex items-center justify-center py-12 md:py-0"
      style={{ backgroundImage: "url('/images/po-hsuan-huang-Y8H4rOxCf0g-unsplash.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
          INDOTURBINE
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 w-full md:w-5/6 mx-auto leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga molestiae quod dolores at excepturi? 
          Expedita eaque, ut unde accusantium eos fugit, eum iure eius voluptate laboriosam et nihil, 
          voluptatibus temporibus.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" className="w-full sm:w-auto px-8 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}