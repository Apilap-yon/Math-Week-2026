"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MagicBackground from "@/components/MagicBackground";

const ACTIVITIES = [
  { id: "iq180-m13", label: "IQ 180 ม.1-3 (15 ก.ค.)" },
  { id: "iq180-m46", label: "IQ 180 ม.4-6 (15 ก.ค.)" },
  { id: "mathgenius-m13", label: "Math Genius ม.1-3 (14 ก.ค.)" },
  { id: "mathgenius-m46", label: "Math Genius ม.4-6 (14 ก.ค.)" },
  { id: "sudoku-m16", label: "Sudoku ม.1-6 (13 ก.ค.)" },
  { id: "tangram-m13", label: "Tangram ม.1-3 (16 ก.ค.)" },
  { id: "checkers-m16", label: "Checkers ม.1-6 (17 ก.ค.)" },
  { id: "mathtower", label: "Math to Tower (21 ก.ค.)" },
];

const ROLES = [
  "ลงทะเบียนผู้เข้าแข่งขัน",
  "จัดเตรียมสถานที่",
  "ตัดสินและตรวจคำตอบ",
  "อำนวยความสะดวกทั่วไป",
  "ถ่ายภาพ/บันทึกวิดีโอ",
];

export default function VolunteerPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    studentId: "",
    classRoom: "",
    phone: "",
    role: "",
  });
  const [activities, setActivities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleActivity = (id: string) => {
    setActivities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activities.length) {
      setError("กรุณาเลือกกิจกรรมอย่างน้อย 1 รายการ");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, activities }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "เกิดข้อผิดพลาด");
      } else {
        router.push("/success?type=volunteer");
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
        <Link href="/" className="inline-flex items-center gap-1 text-purple-400 hover:text-white text-sm mb-6 transition-colors">
          ← กลับหน้าหลัก
        </Link>

        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-8xl opacity-20 -mt-4 -mr-4">🤝</div>
          <div className="relative">
            <h1 className="text-3xl font-bold text-white mb-1">🤝 จิตอาสา</h1>
            <p className="text-white/80">Math Week 2026 · Math Isekai</p>
            <p className="text-white/70 text-sm mt-2">
              ร่วมเป็นส่วนหนึ่งของทีมผู้จัดกิจกรรม สร้างประสบการณ์ที่ยอดเยี่ยมให้ผู้เข้าแข่งขัน
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal info */}
          <div className="magic-card rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-5">ข้อมูลส่วนตัว</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  ชื่อ-นามสกุล <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="เช่น สมหญิง รักเรียน"
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
                    value={form.studentId}
                    onChange={(e) => setForm({ ...form, studentId: e.target.value })}
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
                    value={form.classRoom}
                    onChange={(e) => setForm({ ...form, classRoom: e.target.value })}
                    placeholder="เช่น ม.5/1"
                    required
                    className="magic-input w-full px-4 py-2.5 rounded-xl text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="เช่น 08x-xxx-xxxx"
                  className="magic-input w-full px-4 py-2.5 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="magic-card rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-1">
              กิจกรรมที่ต้องการเป็นจิตอาสา <span className="text-red-400">*</span>
            </h2>
            <p className="text-gray-500 text-xs mb-4">เลือกได้มากกว่า 1 รายการ</p>
            <div className="grid grid-cols-1 gap-2">
              {ACTIVITIES.map((act) => (
                <label
                  key={act.id}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                    activities.includes(act.id)
                      ? "bg-emerald-900/30 border-emerald-600/60 text-emerald-300"
                      : "border-purple-900/40 text-gray-400 hover:border-purple-700/60 hover:text-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={activities.includes(act.id)}
                    onChange={() => toggleActivity(act.id)}
                    className="hidden"
                  />
                  <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                    activities.includes(act.id) ? "bg-emerald-600 border-emerald-600" : "border-gray-600"
                  }`}>
                    {activities.includes(act.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm">{act.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Role */}
          <div className="magic-card rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">
              บทบาทที่ต้องการ <span className="text-red-400">*</span>
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {ROLES.map((role) => (
                <label
                  key={role}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                    form.role === role
                      ? "bg-purple-900/30 border-purple-600/60 text-purple-300"
                      : "border-purple-900/40 text-gray-400 hover:border-purple-700/60 hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={form.role === role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="hidden"
                    required
                  />
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    form.role === role ? "border-purple-500" : "border-gray-600"
                  }`}>
                    {form.role === role && (
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500 block" />
                    )}
                  </span>
                  <span className="text-sm">{role}</span>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-800/50 text-red-400 rounded-xl p-4 text-sm">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-white transition-all bg-gradient-to-r from-emerald-600 to-teal-700 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-base"
          >
            {loading ? "กำลังส่งข้อมูล..." : "✅ ยืนยันการสมัครจิตอาสา"}
          </button>
        </form>
      </main>
    </>
  );
}
