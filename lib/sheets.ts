import { google } from "googleapis";

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;

function getAuth() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendRegistration(data: {
  competitionId: string;
  competitionName: string;
  email: string;
  members: Array<{ name: string; studentId: string; classRoom: string }>;
  isTeam: boolean;
  teamName?: string;
}) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const timestamp = new Date().toLocaleString("th-TH", {
    timeZone: "Asia/Bangkok",
  });

  const rows: string[][] = [];

  if (data.isTeam) {
    // One row per team
    rows.push([
      timestamp,
      data.competitionId,
      data.competitionName,
      data.email,
      data.teamName || "",
      data.members[0]?.name || "",
      data.members[0]?.studentId || "",
      data.members[0]?.classRoom || "",
      data.members[1]?.name || "",
      data.members[1]?.studentId || "",
      data.members[1]?.classRoom || "",
      data.members[2]?.name || "",
      data.members[2]?.studentId || "",
      data.members[2]?.classRoom || "",
    ]);
  } else {
    // One row per person
    for (const member of data.members) {
      rows.push([
        timestamp,
        data.competitionId,
        data.competitionName,
        data.email,
        member.name,
        member.studentId,
        member.classRoom,
      ]);
    }
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Registrations!A:Z",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: rows },
  });
}

export async function appendVolunteer(data: {
  email: string;
  name: string;
  studentId: string;
  classRoom: string;
  phone: string;
  activities: string[];
  role: string;
}) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const timestamp = new Date().toLocaleString("th-TH", {
    timeZone: "Asia/Bangkok",
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Volunteers!A:Z",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          timestamp,
          data.email,
          data.name,
          data.studentId,
          data.classRoom,
          data.phone,
          data.activities.join(", "),
          data.role,
        ],
      ],
    },
  });
}

export async function getRegistrationCount(competitionId: string): Promise<number> {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Registrations!B:B",
    });

    const values = res.data.values || [];
    // Skip header row, count rows matching competitionId
    return values.slice(1).filter((row) => row[0] === competitionId).length;
  } catch {
    return 0;
  }
}

export async function getCompetitionDetails(): Promise<
  Record<string, { teacher: string; description: string; prize: string }>
> {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "รายละเอียดกิจกรรม!B:J",
    });

    const values = res.data.values || [];
    const result: Record<string, { teacher: string; description: string; prize: string }> = {};

    for (const row of values.slice(1)) {
      const name = row[0] || "";
      if (name) {
        result[name] = {
          teacher: row[1] || "",
          description: row[2] || "",
          prize: row[8] || "",
        };
      }
    }

    return result;
  } catch {
    return {};
  }
}
