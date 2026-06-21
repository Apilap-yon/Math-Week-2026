import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { appendVolunteer } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, studentId, classRoom, phone, activities, role } = body;

  if (!name || !studentId || !classRoom || !activities?.length || !role) {
    return NextResponse.json({ error: "กรุณากรอกข้อมูลให้ครบทุกช่อง" }, { status: 400 });
  }

  await appendVolunteer({
    email: session.user.email,
    name,
    studentId,
    classRoom,
    phone: phone || "",
    activities,
    role,
  });

  return NextResponse.json({ success: true });
}
