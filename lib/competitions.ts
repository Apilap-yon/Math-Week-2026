export interface Competition {
  id: string;
  name: string;
  nameTh: string;
  level: string;
  date: string;
  dateDisplay: string;
  room: string;
  time: string;
  quota: number;
  isTeam: boolean;
  teamSize?: number;
  description?: string;
  teacher?: string;
  prize?: string;
  color: string;
  icon: string;
}

export const competitions: Competition[] = [
  {
    id: "iq180-m13",
    name: "IQ 180",
    nameTh: "IQ 180",
    level: "ม.1-3",
    date: "2026-07-15",
    dateDisplay: "พุธ 15 ก.ค. 2569",
    room: "ห้อง 412",
    time: "16.30-17.30",
    quota: 20,
    isTeam: false,
    color: "from-purple-600 to-indigo-700",
    icon: "🧠",
  },
  {
    id: "iq180-m46",
    name: "IQ 180",
    nameTh: "IQ 180",
    level: "ม.4-6",
    date: "2026-07-15",
    dateDisplay: "พุธ 15 ก.ค. 2569",
    room: "ห้อง 406",
    time: "16.30-17.30",
    quota: 20,
    isTeam: false,
    color: "from-blue-600 to-cyan-700",
    icon: "🧠",
  },
  {
    id: "mathgenius-m13",
    name: "Math Genius",
    nameTh: "Math Genius",
    level: "ม.1-3",
    date: "2026-07-14",
    dateDisplay: "อังคาร 14 ก.ค. 2569",
    room: "ห้อง 412",
    time: "16.30-17.30",
    quota: 20,
    isTeam: false,
    color: "from-emerald-600 to-teal-700",
    icon: "⚡",
  },
  {
    id: "mathgenius-m46",
    name: "Math Genius",
    nameTh: "Math Genius",
    level: "ม.4-6",
    date: "2026-07-14",
    dateDisplay: "อังคาร 14 ก.ค. 2569",
    room: "ห้อง 406",
    time: "16.30-17.30",
    quota: 20,
    isTeam: false,
    color: "from-green-600 to-emerald-700",
    icon: "⚡",
  },
  {
    id: "sudoku-m16",
    name: "Sudoku",
    nameTh: "ซูโดกุ",
    level: "ม.1-6",
    date: "2026-07-13",
    dateDisplay: "จันทร์ 13 ก.ค. 2569",
    room: "ห้อง 412",
    time: "16.30-17.30",
    quota: 30,
    isTeam: false,
    color: "from-orange-600 to-red-700",
    icon: "🔢",
  },
  {
    id: "tangram-m13",
    name: "Tangram",
    nameTh: "แทนแกรม",
    level: "ม.1-3",
    date: "2026-07-16",
    dateDisplay: "พฤหัสบดี 16 ก.ค. 2569",
    room: "ห้อง 412",
    time: "16.30-17.30",
    quota: 20,
    isTeam: false,
    color: "from-pink-600 to-rose-700",
    icon: "🔺",
  },
  {
    id: "checkers-m16",
    name: "Checkers",
    nameTh: "หมากฮอส",
    level: "ม.1-6",
    date: "2026-07-17",
    dateDisplay: "ศุกร์ 17 ก.ค. 2569",
    room: "ห้อง 406",
    time: "16.30-17.30",
    quota: 20,
    isTeam: false,
    color: "from-yellow-600 to-amber-700",
    icon: "♟️",
  },
  {
    id: "mathtower",
    name: "Math to Tower",
    nameTh: "Math to Tower",
    level: "ม.1-6",
    date: "2026-07-21",
    dateDisplay: "อังคาร 21 ก.ค. 2569",
    room: "ห้องสมุด",
    time: "16.30-17.45",
    quota: 10,
    isTeam: true,
    teamSize: 3,
    color: "from-violet-600 to-purple-800",
    icon: "🏰",
  },
];

export function getCompetition(id: string): Competition | undefined {
  return competitions.find((c) => c.id === id);
}
