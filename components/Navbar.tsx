"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0615]/80 backdrop-blur-md border-b border-purple-900/40">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🔮</span>
          <div>
            <span className="text-white font-bold text-sm md:text-base">Math Week 2026</span>
            <span className="block text-purple-400 text-xs font-light">Math Isekai</span>
          </div>
        </Link>

        <Link
          href="/volunteer"
          className="text-sm text-purple-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-purple-900/30"
        >
          🤝 สมัครจิตอาสา
        </Link>
      </div>
    </nav>
  );
}
