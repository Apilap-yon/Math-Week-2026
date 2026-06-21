import { NextRequest, NextResponse } from "next/server";
import { appendVolunteer } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, studentId, classRoom, phone, activities, role } = body;

  if (!name || !studentId || !classRoom || !activities?.length || !role) {
    return NextResponse.json({ error: "กรุณากรอกข้อมูลให้ครบทุกช่อง" }, { status: 400 });
  }

  await appendVolunteer({
    name,
    studentId,
    classRoom,
    phone: phone || "",
    activities,
    role,
  });

  return NextResponse.json({ success: true });
}
