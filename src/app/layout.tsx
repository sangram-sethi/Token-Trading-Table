import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import TopBar from "@/components/layout/TopBar";

export const metadata: Metadata = {
  title: "Axiom Pulse",
  description: "Token dashboard demo with Redux + Tailwind v4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <TopBar />
            <main className="flex-1 px-4 py-4">{children}</main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
