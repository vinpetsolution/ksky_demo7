import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { AgentCodeProvider } from "@/components/providers/AgentCodeProvider";
import { AuthModalProvider } from "@/components/providers/AuthModalProvider";
import { UserProvider } from "@/components/providers/UserProvider";
import { MailboxCountsProvider } from "@/hooks/useMailboxCounts";
import { Toaster } from "sonner";
import Header from "@/components/layouts/Header";
import SideBar from "@/components/layouts/SideBar";
import { MobileFooterNav } from "@/components/layouts/MobileFooterNav";
import localFont from "next/font/local";

const pentorCorporate = localFont({
  src: [
    {
      path: "../../public/fonts/PentorCorpotate.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/PentorCorpotate-semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/PentorCorpotate-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pentorCorporate",
  display: "swap",
});

export const instant = false;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "KSKY SOLUTION",
  description: "KSKY SOLUTION",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pentorCorporate.variable} antialiased `}>
        <MotionProvider>
          <UserProvider>
            <MailboxCountsProvider>
              <AgentCodeProvider>
                <AuthModalProvider>
                  <Toaster position="top-center" theme="light" richColors toastOptions={{ style: { background: '#ffffff', border: '1px solid #e4d7c3', color: '#2a241c' } }} />
                  <div className="flex min-h-screen min-w-0 flex-col overflow-x-hidden">
                    <Header />
                    <div className="mt-17.5 flex min-w-0 flex-1 flex-col lg:mt-20">
                      <SideBar />
                      <main className="min-w-0 max-w-full flex-1 overflow-x-hidden pr-3 pl-2.5 max-lg:pb-17.5 lg:ml-60">
                        {children}
                      </main>
                    </div>
                    <MobileFooterNav />
                  </div>
                </AuthModalProvider>
              </AgentCodeProvider>
            </MailboxCountsProvider>
          </UserProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
