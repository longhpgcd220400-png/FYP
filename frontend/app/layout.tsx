import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers"; // nếu bạn có NextAuth/ThemeProvider thì import ở đây
import GlobalToaster from "@/components/GlobalToaster";
import AIChat from "@/components/AIChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily HearWrite",
  description: "Practice English listening & dictation every day",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
      >
        <Providers>
          <Navbar />
          <main className="min-h-screen container mx-auto px-4 py-6">
            {children}
            <AIChat /> {/* 🔹 Luôn hiển thị chat ở góc */}
            <GlobalToaster />
          </main>
          <Footer />
          
        </Providers>
      </body>
    </html>
  );
}
