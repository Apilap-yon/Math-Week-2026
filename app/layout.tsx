import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "Math Week 2026 — Math Isekai",
  description: "สมัครแข่งขันคณิตศาสตร์ กิจกรรม Math Week 2026 ธีม Math Isekai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={kanit.variable}>
      <body className="font-kanit bg-[#0a0615] text-white min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
