import { Lightbulb, Handshake, Trophy, Users } from "lucide-react";

export default function CoreValue() {
    const values = [
        { icon: Lightbulb, title: "INNOVATION", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga molestiae quod dolores at excepturi? Expedita eaque, ut unde accusantium eos fugit." },
        { icon: Handshake, title: "INTEGRITY", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga molestiae quod dolores at excepturi? Expedita eaque, ut unde accusantium eos fugit." },
        { icon: Trophy, title: "EXCELLENCE", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga molestiae quod dolores at excepturi? Expedita eaque, ut unde accusantium eos fugit." },
        { icon: Users, title: "TEAMWORK", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga molestiae quod dolores at excepturi? Expedita eaque, ut unde accusantium eos fugit." }
    ];

    return (
        <section className="w-full py-16 bg-white">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="text-center font-bold text-3xl md:text-4xl text-blue-500 mb-12">Core Value</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-300">
                            <div className="mb-6 p-4 bg-blue-100 rounded-full text-blue-500">
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
