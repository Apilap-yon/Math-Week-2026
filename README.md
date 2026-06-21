# Math Week 2026 — Math Isekai

เว็บสมัครแข่งขันคณิตศาสตร์ กิจกรรม Math Week 2026

## การติดตั้ง

### 1. Clone และติดตั้ง dependencies
```bash
npm install
```

### 2. ตั้งค่า Environment Variables

คัดลอก `.env.example` เป็น `.env.local` แล้วกรอกข้อมูล:

```bash
cp .env.example .env.local
```

#### ตัวแปรที่ต้องกรอก:

| ตัวแปร | รายละเอียด |
|--------|-----------|
| `NEXTAUTH_URL` | URL ของเว็บไซต์ (เช่น `http://localhost:3000`) |
| `NEXTAUTH_SECRET` | สร้างด้วย `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | จาก Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | จาก Google Cloud Console |
| `GOOGLE_SHEET_ID` | ID ของ Google Sheet |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | JSON ของ Service Account (ทั้งหมดเป็น 1 บรรทัด) |

### 3. ตั้งค่า Google Cloud

#### A. สร้าง OAuth 2.0 Client
1. ไป [Google Cloud Console](https://console.cloud.google.com)
2. APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
3. Application type: Web application
4. Authorized redirect URIs: `https://your-domain.com/api/auth/callback/google`

#### B. สร้าง Service Account
1. APIs & Services → Credentials → Create Credentials → Service Account
2. สร้าง Key (JSON format) แล้วคัดลอกเนื้อหาทั้งหมดเป็น 1 บรรทัดใส่ `GOOGLE_SERVICE_ACCOUNT_KEY`
3. แชร์ Google Sheet ให้ email ของ Service Account (Editor)

#### C. เปิดใช้งาน APIs
- Google Sheets API
- Google Drive API (ถ้าต้องการอ่านรายละเอียดจาก Sheet)

### 4. ตั้งค่า Google Sheet

#### หน้า `Registrations` (สร้างใหม่ถ้ายังไม่มี)
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | Competition ID | Competition Name | Email | ชื่อ-นามสกุล | เลขประจำตัว | ชั้น/ห้อง |

สำหรับ Math to Tower (ทีม):
| A | B | C | D | E | F | G | H | I | J | K | L | M | N |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | ID | ชื่อการแข่ง | Email | ชื่อทีม | ชื่อ1 | รหัส1 | ชั้น1 | ชื่อ2 | รหัส2 | ชั้น2 | ชื่อ3 | รหัส3 | ชั้น3 |

#### หน้า `Volunteers`
| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | Email | ชื่อ-นามสกุล | เลขประจำตัว | ชั้น/ห้อง | เบอร์โทร | กิจกรรม | บทบาท |

### 5. รันเว็บ
```bash
npm run dev     # Development
npm run build   # Build
npm start       # Production
```

## โครงสร้างไฟล์

```
app/
├── page.tsx                    # หน้าหลัก (รายการแข่งขัน)
├── competitions/[id]/page.tsx  # หน้าสมัครแข่งขัน
├── volunteer/page.tsx          # หน้าสมัครจิตอาสา
├── success/page.tsx            # หน้าสำเร็จ
└── api/
    ├── auth/[...nextauth]/     # NextAuth config
    ├── competitions/           # GET รายการและจำนวนผู้สมัคร
    ├── register/               # POST สมัครแข่งขัน
    └── volunteer/              # POST สมัครจิตอาสา

lib/
├── competitions.ts             # ข้อมูลและ quota การแข่งขัน
└── sheets.ts                   # Google Sheets API

components/
├── Navbar.tsx                  # Navigation bar
└── MagicBackground.tsx         # พื้นหลัง Isekai
```

## การปรับ Quota

แก้ไขได้ใน `lib/competitions.ts` ที่ field `quota` ของแต่ละรายการ
