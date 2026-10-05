import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "APEX Multi-Sports Club | Champions Train Here",
  description:
    "Welcome to APEX Sports Club - Premier multi-sport facility offering professional coaching, tournament leagues, world-class courts & pitches for Football, Cricket, Basketball, Badminton, Tennis and Swimming.",
  keywords: "sports club, football academy, cricket nets, basketball court, badminton, tennis, swimming pool, athletic training",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${jakarta.variable}`}>
      <body className="font-body min-h-screen bg-white text-slate-700 antialiased selection:bg-primary selection:text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
