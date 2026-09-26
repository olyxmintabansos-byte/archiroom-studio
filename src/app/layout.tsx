import type { Metadata } from "next";
import "./globals.css";
import { ArchiProvider } from "@/context/ArchiContext";

export const metadata: Metadata = {
  title: "ArchiRoom Studio // Architecture CAD & Space Planning (Titan #29)",
  description: "Studio CAD arsitektur monokrom berbasis penataan ruang negatif dan presisi teknis.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-white text-black antialiased">
        <ArchiProvider>{children}</ArchiProvider>
      </body>
    </html>
  );
}
