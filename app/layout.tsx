import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
const inter = Inter({ subsets: ['latin'] });
import { ThemeProvider } from "./providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Fluid Onchain Agent",
  description: "Read blockchains, send transactions, assisted with Fluid Agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${inter.className} min-h-screen bg-background`}>

      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <div className="relative min-h-screen bg-gradient-to-b from-background via-background to-background">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
          <Navbar />
          <main className="relative">{children}</main>
        </div>
      </ThemeProvider>
    </body>
  </html>
  );
}
