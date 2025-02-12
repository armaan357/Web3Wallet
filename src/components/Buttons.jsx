export function Button({ bgColor, textColor, hoverBgColor, type, onClick, children }) {
    return (
        <button 
            type={type ? type : null}
            onClick={onClick ? onClick : null}
            className={`px-4 py-3 ${bgColor} ${textColor} border-0 rounded-lg cursor-pointer font-bold  w-full transition-colors duration-300 hover:${hoverBgColor}`}>
            {children}
        </button>
    );
}