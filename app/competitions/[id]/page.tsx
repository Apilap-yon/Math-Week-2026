"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MagicBackground from "@/components/MagicBackground";
import { getCompetition } from "@/lib/competitions";

interface Member {
  name: string;
  studentId: string;
  classRoom: string;
}

export default function CompetitionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const competition = getCompetition(id);
  const memberCount = competition?.isTeam ? competition.teamSize || 3 : 1;

  const [members, setMembers] = useState<Member[]>(
    Array.from({ length: memberCount }, () => ({ name: "", studentId: "", classRoom: "" }))
  );
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(0);

  useEffect(() => {
    if (!competition) router.push("/");
  }, [competition, router]);

  useEffect(() => {
    fetch("/api/competitions")
      .then((r) => r.json())
      .then((data) => {
        const c = data.find((x: { id: string; registered: number }) => x.id === id);
        if (c) setRegistered(c.registered);
      })
      .catch(() => {});
  }, [id]);

  if (!competition) return null;

  const isFull = registered >= competition.quota;

  const updateMember = (index: number, field: keyof Member, value: string) => {
    setMembers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          competitionId: id,
          members: members.slice(0, memberCount),
          teamName: competition.isTeam ? teamName : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "เกิดข้อผิดพลาด กรุณาลองใหม่");
      } else {
        router.push(`/success?comp=${encodeURIComponent(competition.name + " " + competition.level)}`);
      }
    } catch {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MagicBackground />
      <Navbar />
      <main className="relative z-10 pt-24 pb-20 px-4 max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-purple-400 hover:text-white text-sm mb-6 transition-colors"
        >
          ← กลับหน้าหลัก
        </Link>

        {/* Header */}
        <div className={`bg-gradient-to-br ${competition.color} rounded-2xl p-6 mb-6 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 text-8xl opacity-20 -mt-4 -mr-4">
            {competition.icon}
          </div>
          <div className="relative">
            <h1 className="text-3xl font-bold text-white mb-1">
              {competition.icon} {competition.name}
            </h1>
            <p className="text-white/80 text-lg">{competition.level}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-white/90 text-sm">
              <span>📅 {competition.dateDisplay}</span>
              <span>🕓 {competition.time} น.</span>
              <span>📍 {competition.room}</span>
              {competition.isTeam && <span>👥 ทีม {competition.teamSize} คน</span>}
            </div>
          </div>
        </div>

        {/* Quota */}
        <div className="magic-card rounded-xl p-4 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">จำนวนผู้สมัคร</span>
            <span className="text-white font-semibold">
              {registered} / {competition.quota} {competition.isTeam ? "ทีม" : "คน"}
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${competition.color}`}
              style={{ width: `${Math.min((registered / competition.quota) * 100, 100)}%` }}
            />
          </div>
          {isFull && (
            <p className="text-red-400 text-sm mt-2 text-center font-semibold">
              ❌ การแข่งขันนี้เต็มแล้ว
            </p>
          )}
        </div>

        {isFull ? (
          <div className="magic-card rounded-2xl p-8 text-center">
            <p className="text-gray-400">การแข่งขันนี้รับผู้สมัครครบแล้ว</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="magic-card rounded-2xl p-6">
              <h2 className="text-white font-bold text-lg mb-5">
                {competition.isTeam ? "ข้อมูลสมาชิกในทีม" : "ข้อมูลผู้สมัคร"}
              </h2>

              {competition.isTeam && (
                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-1.5">ชื่อทีม</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="ชื่อทีมของคุณ (ไม่บังคับ)"
                    className="magic-input w-full px-4 py-2.5 rounded-xl text-sm"
                  />
                </div>
              )}

              {Array.from({ length: memberCount }).map((_, i) => (
                <div key={i} className={i > 0 ? "mt-6 pt-6 border-t border-purple-900/40" : ""}>
                  {competition.isTeam && (
                    <h3 className="text-purple-400 font-semibold text-sm mb-4">
                      สมาชิกคนที่ {i + 1}
                    </h3>
                  )}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">
                        ชื่อ-นามสกุล <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={members[i]?.name || ""}
                        onChange={(e) => updateMember(i, "name", e.target.value)}
                        placeholder="เช่น สมชาย ใจดี"
                        required
                        className="magic-input w-full px-4 py-2.5 rounded-xl text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">
                          เลขประจำตัว <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={members[i]?.studentId || ""}
                          onChange={(e) => updateMember(i, "studentId", e.target.value)}
                          placeholder="เช่น 12345"
                          required
                          className="magic-input w-full px-4 py-2.5 rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">
                          ชั้น/ห้อง <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={members[i]?.classRoom || ""}
                          onChange={(e) => updateMember(i, "classRoom", e.target.value)}
                          placeholder="เช่น ม.3/2"
                          required
                          className="magic-input w-full px-4 py-2.5 rounded-xl text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-800/50 text-red-400 rounded-xl p-4 text-sm">
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-white transition-all bg-gradient-to-r ${competition.color} hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-base`}
            >
              {loading ? "กำลังส่งข้อมูล..." : "✅ ยืนยันการสมัคร"}
            </button>
          </form>
        )}
      </main>
    </>
  );
}
