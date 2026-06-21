"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import MagicBackground from "@/components/MagicBackground";
import Navbar from "@/components/Navbar";

function SuccessContent() {
  const params = useSearchParams();
  const comp = params.get("comp");
  const type = params.get("type");
  const isVolunteer = type === "volunteer";

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="text-8xl mb-6 animate-float">
        {isVolunteer ? "🤝" : "🎉"}
      </div>
      <div className="magic-card rounded-2xl p-8 mb-6">
        <h1 className="text-3xl font-bold text-white mb-3">
          {isVolunteer ? "สมัครจิตอาสาสำเร็จ!" : "สมัครสำเร็จ!"}
        </h1>
        {comp && (
          <p className="text-purple-300 text-lg mb-2">
            {comp}
          </p>
        )}
        <p className="text-gray-400 text-sm leading-relaxed">
          {isVolunteer
            ? "ขอบคุณที่สมัครเป็นจิตอาสา ครูผู้ดูแลจะติดต่อกลับเพื่อแจ้งรายละเอียดเพิ่มเติม"
            : "ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว ครูผู้ดูแลจะประกาศผลการเข้าร่วมผ่านช่องทางของโรงเรียน"}
        </p>
      </div>

      <div className="space-y-3">
        <Link
          href="/"
          className="block w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-violet-700 hover:opacity-90 transition-all text-sm"
        >
          กลับหน้าหลัก
        </Link>
        {!isVolunteer && (
          <Link
            href="/volunteer"
            className="block w-full py-3 rounded-xl font-semibold text-emerald-400 border border-emerald-700/50 hover:bg-emerald-900/20 transition-all text-sm"
          >
            สมัครจิตอาสาด้วย →
          </Link>
        )}
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <>
      <MagicBackground />
      <Navbar />
      <main className="relative z-10 pt-24 pb-20 px-4 flex items-center justify-center min-h-screen">
        <Suspense fallback={<div className="text-gray-400">กำลังโหลด...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
    </>
  );
}
