import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./css/globals.css";
import { ThemeProvider } from "@/components/themeProvider/ThemeProvider"
import { themeValues } from "@/components/themeProvider/CustomThemes"
import { Navbar } from "@/components/Navbar";
import Config from "@/lib/config";

const lexend = Lexend({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: Config.title,
  description: Config.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={Config.lang} suppressHydrationWarning>
      <body className={`${lexend.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme={Config.defaultTheme} enableSystem value={themeValues} disableTransitionOnChange>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
