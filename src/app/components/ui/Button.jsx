export default function Button(props) {
    return (
        <button className={`${props.className} px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all duration-300 cursor-pointer`}>
            {props.text}
        </button>
    );
}