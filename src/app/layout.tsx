import "./globals.css";
import "./styles/custom-scrollbar.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smokeland Conversation Engine",
  description: "Your AI-powered assistant at your service.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
