import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { appendRegistration, getRegistrationCount } from "@/lib/sheets";
import { getCompetition } from "@/lib/competitions";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { competitionId, members, teamName } = body;

  const competition = getCompetition(competitionId);
  if (!competition) {
    return NextResponse.json({ error: "ไม่พบการแข่งขันนี้" }, { status: 400 });
  }

  // Check quota
  const count = await getRegistrationCount(competitionId);
  const usedSlots = competition.isTeam ? count : count;
  if (usedSlots >= competition.quota) {
    return NextResponse.json({ error: "การแข่งขันนี้เต็มแล้ว" }, { status: 400 });
  }

  // Validate members
  if (!members || !Array.isArray(members)) {
    return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const expectedCount = competition.isTeam ? competition.teamSize || 3 : 1;
  if (members.length !== expectedCount) {
    return NextResponse.json(
      { error: `ต้องกรอกข้อมูล ${expectedCount} คน` },
      { status: 400 }
    );
  }

  for (const m of members) {
    if (!m.name || !m.studentId || !m.classRoom) {
      return NextResponse.json({ error: "กรุณากรอกข้อมูลให้ครบทุกช่อง" }, { status: 400 });
    }
  }

  await appendRegistration({
    competitionId,
    competitionName: `${competition.name} ${competition.level}`,
    email: session.user.email,
    members,
    isTeam: competition.isTeam,
    teamName,
  });

  return NextResponse.json({ success: true });
}
