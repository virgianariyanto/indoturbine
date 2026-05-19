import { Gem, Rocket, Building2, Milestone, History as HistoryIcon } from "lucide-react";

export default function History() {
    const values = [
        { icon: HistoryIcon, title: "1973", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga molestiae quod dolores at excepturi? Expedita eaque, ut unde accusantium eos fugit." },
        { icon: Building2, title: "1980", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga molestiae quod dolores at excepturi? Expedita eaque, ut unde accusantium eos fugit." },
        { icon: Gem, title: "1987", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga molestiae quod dolores at excepturi? Expedita eaque, ut unde accusantium eos fugit." },
        { icon: Milestone, title: "1995", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga molestiae quod dolores at excepturi? Expedita eaque, ut unde accusantium eos fugit." },
        { icon: Rocket, title: "Today", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga molestiae quod dolores at excepturi? Expedita eaque, ut unde accusantium eos fugit." }
    ];

    return (
        <section className="w-full py-16 bg-sky-100">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="text-center font-bold text-3xl md:text-4xl text-blue-500 mb-12">History</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    {values.map((value, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6">
                            <div className="mb-6 text-blue-500">
                                <value.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-blue-600 mb-4">{value.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
