import { Eye, Goal } from "lucide-react";

export default function Visi() {
    return (
        <section className="w-full bg-slate-200 py-12 md:py-20">
            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-center items-stretch gap-8 px-6">
                <section className="w-full md:w-1/2 min-h-[20rem] md:min-h-[30rem] p-8 md:p-12 flex items-center justify-center">
                    <div className="relative z-10 w-full">
                        <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-6 flex items-center gap-3">
                            <Eye className="w-10 h-10" />
                            <span>VISI</span>
                        </h1>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga molestiae quod dolores at excepturi? 
                            Expedita eaque, ut unde accusantium eos fugit, eum iure eius voluptate laboriosam et nihil, 
                            voluptatibus temporibus.
                        </p>
                    </div>
                </section>
                <section className="w-full md:w-1/2 min-h-[20rem] md:min-h-[30rem] p-8 md:p-12 flex items-center justify-center">
                    <div className="relative z-10 w-full">
                        <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-6 flex items-center gap-3">
                            <Goal className="w-10 h-10" />
                            <span>MISI</span>
                        </h1>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga molestiae quod dolores at excepturi? 
                            Expedita eaque, ut unde accusantium eos fugit, eum iure eius voluptate laboriosam et nihil, 
                            voluptatibus temporibus.
                        </p>
                    </div>
                </section>
            </div>
        </section>
    );
}
