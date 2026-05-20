import Card from "../../ui/Card";

export default function News() {
    return (
        <section className="w-full py-16 bg-white">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="font-bold text-3xl md:text-4xl text-blue-500 mb-12">News</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center justify-items-center">
                    <Card 
                        image="/images/adigun-ampa-9U0vAXekzgU-unsplash.jpg"
                        date="13 May 2026"
                        title="Oil & Gas Turbines"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        alt="ISO 9001"
                    />
                    <Card 
                        image="/images/giorgi-iremadze-xvH26lEIBKE-unsplash.jpg"
                        date="13 May 2026"
                        title="Solar Turbines"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        alt="ISO 9001"
                    />
                    <Card 
                        image="/images/sol-tZw3fcjUIpM-unsplash.jpg"
                        date="13 May 2026"
                        title="QHSE"
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        alt="ISO 9001"
                    />
                </div>
            </div>
        </section>
    );
}