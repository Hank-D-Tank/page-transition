import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "../src/components/Nav";
import TransitionProvider from "../src/components/TransitionProvider";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Page Transitions",
  description: "Learn To Add Page Transitions To Your Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="h-screen flex flex-col font-body overflow-hidden">
        <TransitionProvider>
          <Nav />
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
