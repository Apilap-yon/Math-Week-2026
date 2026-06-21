"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MagicBackground from "@/components/MagicBackground";
import { Competition } from "@/lib/competitions";

interface EnrichedCompetition extends Competition {
  teacher: string;
  description: string;
  prize: string;
  registered: number;
}

export default function HomePage() {
  const [competitions, setCompetitions] = useState<EnrichedCompetition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/competitions")
      .then((r) => r.json())
      .then((data) => {
        setCompetitions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const regular = competitions.filter((c) => !c.isTeam);
  const team = competitions.filter((c) => c.isTeam);

  return (
    <>
      <MagicBackground />
      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-4 max-w-6xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-6xl md:text-8xl animate-float">🔮</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-2 shimmer-text">
            Math Week 2026
          </h1>
          <p className="text-xl md:text-2xl text-purple-300 font-light mb-2">
            ✦ Math Isekai ✦
          </p>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            เปิดประตูสู่โลกใหม่แห่งคณิตศาสตร์ · กรกฎาคม 2569
          </p>
        </section>

        {/* Schedule overview */}
        <section className="mb-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-sm">
            {[
              { day: "จันทร์", date: "13 ก.ค.", event: "Sudoku", color: "text-orange-400" },
              { day: "อังคาร", date: "14 ก.ค.", event: "Math Genius", color: "text-emerald-400" },
              { day: "พุธ", date: "15 ก.ค.", event: "IQ 180", color: "text-blue-400" },
              { day: "พฤหัส", date: "16 ก.ค.", event: "Tangram", color: "text-pink-400" },
              { day: "ศุกร์", date: "17 ก.ค.", event: "Checkers", color: "text-yellow-400" },
            ].map((d) => (
              <div key={d.day} className="magic-card rounded-xl p-3">
                <div className="text-gray-400 text-xs">{d.day}</div>
                <div className="text-white font-semibold">{d.date}</div>
                <div className={`${d.color} text-xs mt-1`}>{d.event}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Individual competitions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-purple-400">⚔️</span>
            การแข่งขันเดี่ยว
            <span className="text-sm font-normal text-gray-500 ml-2">(16.30–17.30 น.)</span>
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="magic-card rounded-2xl p-5 animate-pulse h-48" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regular.map((c) => (
                <CompetitionCard key={c.id} competition={c} />
              ))}
            </div>
          )}
        </section>

        {/* Team competition */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-purple-400">🏰</span>
            การแข่งขันทีม
            <span className="text-sm font-normal text-gray-500 ml-2">(ทีม 3 คน)</span>
          </h2>
          {!loading && team.map((c) => (
            <CompetitionCard key={c.id} competition={c} large />
          ))}
        </section>

        {/* Volunteer CTA */}
        <section>
          <div className="magic-card rounded-2xl p-8 text-center border-purple-700/40">
            <div className="text-4xl mb-3">🤝</div>
            <h2 className="text-2xl font-bold text-white mb-2">สมัครเป็นจิตอาสา</h2>
            <p className="text-gray-400 mb-6 text-sm max-w-md mx-auto">
              ร่วมเป็นส่วนหนึ่งของทีมจัดงาน Math Week 2026 ช่วยดูแลการแข่งขันแต่ละรายการ
            </p>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg"
            >
              ✨ สมัครจิตอาสาตอนนี้
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

function CompetitionCard({
  competition: c,
  large = false,
}: {
  competition: EnrichedCompetition;
  large?: boolean;
}) {
  const isFull = c.registered >= c.quota;
  const pct = Math.min((c.registered / c.quota) * 100, 100);

  return (
    <div className={`magic-card rounded-2xl p-5 ${large ? "max-w-2xl mx-auto w-full" : ""}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{c.icon}</span>
          <div>
            <h3 className="text-white font-bold text-lg leading-tight">{c.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${c.color} text-white`}>
              {c.level}
            </span>
          </div>
        </div>
        {isFull ? (
          <span className="text-xs bg-red-900/50 text-red-400 px-2 py-1 rounded-lg border border-red-800/50 shrink-0">
            เต็มแล้ว
          </span>
        ) : (
          <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-lg border border-green-800/40 shrink-0">
            เปิดรับ
          </span>
        )}
      </div>

      <div className="space-y-1 text-sm text-gray-400 mb-4">
        <div className="flex items-center gap-2">
          <span>📅</span><span>{c.dateDisplay}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🕓</span><span>{c.time} น.</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📍</span><span>{c.room}</span>
        </div>
        {c.isTeam && (
          <div className="flex items-center gap-2">
            <span>👥</span><span>ทีม {c.teamSize} คน</span>
          </div>
        )}
        {c.teacher && (
          <div className="flex items-center gap-2">
            <span>👩‍🏫</span><span>{c.teacher}</span>
          </div>
        )}
        {c.prize && (
          <div className="flex items-center gap-2">
            <span>🏆</span><span className="text-amber-400">{c.prize}</span>
          </div>
        )}
      </div>

      {/* Quota bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>ผู้สมัคร</span>
          <span>{c.registered}/{c.isTeam ? `${c.quota} ทีม` : `${c.quota} คน`}</span>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${c.color} transition-all`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <Link
        href={isFull ? "#" : `/competitions/${c.id}`}
        className={`block w-full text-center py-2.5 rounded-xl font-semibold text-sm transition-all ${
          isFull
            ? "bg-gray-800 text-gray-500 cursor-not-allowed pointer-events-none"
            : `bg-gradient-to-r ${c.color} text-white hover:opacity-90 shadow-lg`
        }`}
      >
        {isFull ? "เต็มแล้ว" : "สมัครเข้าร่วม →"}
      </Link>
    </div>
  );
}
