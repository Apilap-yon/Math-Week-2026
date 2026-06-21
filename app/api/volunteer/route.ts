import { NextRequest, NextResponse } from "next/server";
import { appendVolunteer } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, studentId, classRoom, phone, activities, role } = body;

  if (!name || !studentId || !classRoom || !activities?.length || !role) {
    return NextResponse.json({ error: "กรุณากรอกข้อมูลให้ครบทุกช่อง" }, { status: 400 });
  }

  try {
    await appendVolunteer({
      name,
      studentId,
      classRoom,
      phone: phone || "",
      activities,
      role,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการบันทึกข้อมูล";
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
