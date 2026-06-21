import { NextResponse } from "next/server";
import { competitions } from "@/lib/competitions";
import { getRegistrationCount, getCompetitionDetails } from "@/lib/sheets";

export async function GET() {
  try {
    const [details, counts] = await Promise.all([
      getCompetitionDetails(),
      Promise.all(
        competitions.map(async (c) => ({
          id: c.id,
          count: await getRegistrationCount(c.id),
        }))
      ),
    ]);

    const countMap: Record<string, number> = {};
    for (const { id, count } of counts) {
      countMap[id] = count;
    }

    const enriched = competitions.map((c) => ({
      ...c,
      teacher: details[c.name]?.teacher || "",
      description: details[c.name]?.description || "",
      prize: details[c.name]?.prize || "",
      registered: countMap[c.id] || 0,
    }));

    return NextResponse.json(enriched);
  } catch {
    return NextResponse.json(competitions.map((c) => ({ ...c, registered: 0 })));
  }
}
