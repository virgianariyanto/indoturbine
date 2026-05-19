import Image from "next/image";

export default function Policy() {
    return (
        <section className="w-full py-16 bg-white">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="font-bold text-lg md:text-xl mb-4">Policy</h2>
                <div className="flex gap-6 mt-10 overflow-x-auto whitespace-nowrap border-b border-gray-100 md:border-none no-scrollbar">
                    <span className="border-blue-500 border-b-2 pb-2 font-medium cursor-pointer">QHSE</span>
                    <span className="text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">Anti-bribery</span>
                    <span className="text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">Whistleblowing System</span>
                </div>
                <div className="mt-4 rounded-xl overflow-hidden shadow-lg">
                    <Image src="/images/sol-tZw3fcjUIpM-unsplash.jpg" alt="Qhse Policy" className="object-cover w-full h-64 md:h-[50vh]" width={1200} height={800} />
                </div>
                <div className="flex flex-col md:flex-row gap-10 mt-10">
                    <div className="w-full md:w-1/3">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Quality, Health, Safety & Environment</h3>
                        <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam nemo quod maiores non velit expedita commodi, ullam qui ut veniam reprehenderit, minima rerum cupiditate voluptatum tempora obcaecati consequatur, quia et!.</p>
                    </div>
                    <div className="w-full md:w-2/3">
                        <h4 className="text-lg font-semibold text-gray-700 mb-6">To fulfill this commitment, we actively work to:</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4 text-gray-600">
                                <span className="mt-2 h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                <span>Provide reliable products and services</span>
                            </li>
                            <li className="flex items-start gap-4 text-gray-600">
                                <span className="mt-2 h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                <span>Protect the safety and health of employees, contractors and visitors</span>
                            </li>
                            <li className="flex items-start gap-4 text-gray-600">
                                <span className="mt-2 h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                <span>Prevent injuries and ill health</span>
                            </li>
                            <li className="flex items-start gap-4 text-gray-600">
                                <span className="mt-2 h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                <span>Prevent pollution and damage to the environment</span>
                            </li>
                            <li className="flex items-start gap-4 text-gray-600">
                                <span className="mt-2 h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                <span>Ensure sustainable use of resources and energy</span>
                            </li>
                            <li className="flex items-start gap-4 text-gray-600">
                                <span className="mt-2 h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                <span>Promote a culture of improvement in QHSE performance</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <h2 className="font-bold text-3xl md:text-4xl text-blue-500 mt-20 mb-12">Certificates</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center">
                    <Image src="/images/certificate/iso-9001-removebg-preview.png" alt="ISO 9001" className="w-32 md:w-40" width={200} height={200} />
                    <Image src="/images/certificate/ISO-14001.png" alt="ISO 14001" className="w-32 md:w-40" width={200} height={200} />
                    <Image src="/images/certificate/ISO-37001.png" alt="ISO 37001" className="w-32 md:w-40" width={200} height={200} />
                    <Image src="/images/certificate/ISO-45001.png" alt="ISO 45001" className="w-32 md:w-40" width={200} height={200} />
                </div>
            </div>
        </section>
    );
}