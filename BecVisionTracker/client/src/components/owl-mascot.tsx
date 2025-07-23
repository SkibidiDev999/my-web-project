interface OwlMascotProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

export default function OwlMascot({ size = "md", className = "", animated = false }: OwlMascotProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16", 
    lg: "w-24 h-24"
  };

  return (
    <div className={`${sizeClasses[size]} ${className} ${animated ? "animate-bounce" : ""}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Owl Body */}
        <ellipse cx="50" cy="60" rx="25" ry="30" fill="#8B4513" stroke="#6B3410" strokeWidth="1"/>
        
        {/* Owl Head */}
        <circle cx="50" cy="35" r="22" fill="#A0522D" stroke="#6B3410" strokeWidth="1"/>
        
        {/* Ear Tufts */}
        <path d="M35 20 L32 12 L40 18 Z" fill="#8B4513"/>
        <path d="M65 20 L68 12 L60 18 Z" fill="#8B4513"/>
        
        {/* Eyes Background */}
        <circle cx="42" cy="32" r="8" fill="white" stroke="#333" strokeWidth="1"/>
        <circle cx="58" cy="32" r="8" fill="white" stroke="#333" strokeWidth="1"/>
        
        {/* Eye Pupils */}
        <circle cx="42" cy="32" r="5" fill="#2D4059"/>
        <circle cx="58" cy="32" r="5" fill="#2D4059"/>
        
        {/* Eye Highlights */}
        <circle cx="44" cy="30" r="2" fill="white"/>
        <circle cx="60" cy="30" r="2" fill="white"/>
        
        {/* Beak */}
        <path d="M48 38 L52 38 L50 42 Z" fill="#FFA500" stroke="#FF8C00" strokeWidth="1"/>
        
        {/* Wings */}
        <ellipse cx="30" cy="55" rx="8" ry="15" fill="#8B4513" stroke="#6B3410" strokeWidth="1" transform="rotate(-15 30 55)"/>
        <ellipse cx="70" cy="55" rx="8" ry="15" fill="#8B4513" stroke="#6B3410" strokeWidth="1" transform="rotate(15 70 55)"/>
        
        {/* Wing Details */}
        <path d="M25 50 Q30 52 28 60" stroke="#6B3410" strokeWidth="1" fill="none"/>
        <path d="M75 50 Q70 52 72 60" stroke="#6B3410" strokeWidth="1" fill="none"/>
        
        {/* Chest Pattern */}
        <ellipse cx="50" cy="60" rx="12" ry="18" fill="#CD853F" opacity="0.7"/>
        <path d="M42 50 Q50 52 58 50" stroke="#6B3410" strokeWidth="1" fill="none"/>
        <path d="M44 55 Q50 57 56 55" stroke="#6B3410" strokeWidth="1" fill="none"/>
        <path d="M46 60 Q50 62 54 60" stroke="#6B3410" strokeWidth="1" fill="none"/>
        
        {/* Feet */}
        <ellipse cx="45" cy="88" rx="4" ry="6" fill="#FFA500"/>
        <ellipse cx="55" cy="88" rx="4" ry="6" fill="#FFA500"/>
        
        {/* Talons */}
        <path d="M42 90 L40 94 M45 90 L43 94 M48 90 L46 94" stroke="#FF8C00" strokeWidth="1"/>
        <path d="M52 90 L54 94 M55 90 L57 94 M58 90 L60 94" stroke="#FF8C00" strokeWidth="1"/>
        
        {/* Graduation Cap (for academic theme) */}
        <rect x="38" y="15" width="24" height="3" fill="#2D4059" rx="1"/>
        <path d="M35 18 L65 18 L62 15 L38 15 Z" fill="#2D4059"/>
        <circle cx="63" cy="16" r="1" fill="#FFD700"/>
        <path d="M63 16 L68 12" stroke="#FFD700" strokeWidth="1"/>
        <rect x="67" y="10" width="3" height="3" fill="#FFD700" transform="rotate(45 68.5 11.5)"/>
      </svg>
    </div>
  );
}

export function OwlMascotWithSpeech({ message, position = "right" }: { message: string; position?: "left" | "right" }) {
  return (
    <div className={`flex items-end space-x-4 ${position === "left" ? "flex-row" : "flex-row-reverse space-x-reverse"}`}>
      <OwlMascot size="lg" animated />
      <div className="relative bg-white border-2 border-velvet rounded-lg p-4 shadow-lg max-w-xs">
        <p className="text-sm text-gray-800">{message}</p>
        {/* Speech bubble tail */}
        <div className={`absolute top-1/2 transform -translate-y-1/2 w-0 h-0 ${
          position === "left" 
            ? "-left-2 border-t-8 border-b-8 border-r-8 border-transparent border-r-velvet" 
            : "-right-2 border-t-8 border-b-8 border-l-8 border-transparent border-l-velvet"
        }`} />
      </div>
    </div>
  );
}