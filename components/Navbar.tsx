"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0615]/80 backdrop-blur-md border-b border-purple-900/40">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🔮</span>
          <div>
            <span className="text-white font-bold text-sm md:text-base">Math Week 2026</span>
            <span className="block text-purple-400 text-xs font-light">Math Isekai</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/volunteer"
            className="hidden md:block text-sm text-purple-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-purple-900/30"
          >
            🤝 จิตอาสา
          </Link>
          {session ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || ""}
                    width={28}
                    height={28}
                    className="rounded-full ring-2 ring-purple-500"
                  />
                )}
                <span className="text-sm text-gray-300 max-w-[150px] truncate">
                  {session.user?.name}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="text-sm bg-purple-900/50 hover:bg-purple-800/60 text-purple-300 hover:text-white px-3 py-1.5 rounded-lg transition-all border border-purple-700/50"
              >
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-500 hover:to-violet-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-lg shadow-purple-900/50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              เข้าสู่ระบบ
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
