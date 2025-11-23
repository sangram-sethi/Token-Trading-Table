import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import TopBar from "@/components/layout/TopBar";
import ThemeContainer from "@/components/layout/ThemeContainer";
import Sidebar from "@/components/layout/Sidebar";

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
      <body>
        <AppProviders>
          <ThemeContainer>
            <div className="flex min-h-screen flex-col">
              <TopBar />
              <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 px-4 py-4">{children}</main>
              </div>
            </div>
          </ThemeContainer>
        </AppProviders>
      </body>
    </html>
  );
}


