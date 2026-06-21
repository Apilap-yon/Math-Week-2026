"use client";

export default function MagicBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-glow"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Magic circles */}
      <svg
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 animate-spin-slow"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="300" cy="300" r="280" stroke="#a855f7" strokeWidth="1" />
        <circle cx="300" cy="300" r="240" stroke="#7c3aed" strokeWidth="0.5" strokeDasharray="10 5" />
        <polygon points="300,50 536,175 536,425 300,550 64,425 64,175" stroke="#a855f7" strokeWidth="1" fill="none" />
        <circle cx="300" cy="300" r="180" stroke="#c084fc" strokeWidth="0.5" />
        <text x="300" y="100" textAnchor="middle" fill="#c084fc" fontSize="20" fontFamily="serif">∑</text>
        <text x="500" y="350" textAnchor="middle" fill="#c084fc" fontSize="20" fontFamily="serif">π</text>
        <text x="100" y="350" textAnchor="middle" fill="#c084fc" fontSize="20" fontFamily="serif">∞</text>
        <text x="300" y="520" textAnchor="middle" fill="#c084fc" fontSize="20" fontFamily="serif">√</text>
      </svg>

      <svg
        className="absolute bottom-1/4 right-10 w-[300px] h-[300px] opacity-5 animate-spin-reverse"
        viewBox="0 0 300 300"
        fill="none"
      >
        <circle cx="150" cy="150" r="140" stroke="#818cf8" strokeWidth="1" strokeDasharray="5 3" />
        <polygon points="150,20 275,87 275,213 150,280 25,213 25,87" stroke="#818cf8" strokeWidth="1" fill="none" />
        <text x="150" y="90" textAnchor="middle" fill="#818cf8" fontSize="14">∫</text>
        <text x="230" y="165" textAnchor="middle" fill="#818cf8" fontSize="14">Δ</text>
        <text x="70" y="165" textAnchor="middle" fill="#818cf8" fontSize="14">θ</text>
      </svg>

      {/* Floating math symbols */}
      <div className="absolute top-20 left-10 text-4xl text-purple-900 animate-float opacity-20" style={{ animationDelay: "0s" }}>∑</div>
      <div className="absolute top-40 right-20 text-3xl text-indigo-900 animate-float opacity-20" style={{ animationDelay: "1s" }}>π</div>
      <div className="absolute bottom-40 left-20 text-5xl text-purple-900 animate-float opacity-15" style={{ animationDelay: "2s" }}>∞</div>
      <div className="absolute bottom-20 right-10 text-3xl text-violet-900 animate-float opacity-20" style={{ animationDelay: "0.5s" }}>√</div>

      {/* Gradient overlays */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0a0615] to-transparent" />
    </div>
  );
}
