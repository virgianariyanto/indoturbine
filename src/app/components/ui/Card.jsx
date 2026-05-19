import Image from "next/image";

export default function Card({ image, date, title, description, alt = "News image" }) {
    return (
        <div className="w-full bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            <div className="w-full h-48 relative rounded-xl overflow-hidden">
                <Image 
                    src={image} 
                    alt={alt} 
                    fill 
                    className="object-cover" 
                />
            </div>
            <h6 className="text-xs text-slate-800 mt-4 mb-2">{date}</h6>
            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}
