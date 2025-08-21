import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Delivery App",
  description: "Projeto Delivery com Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased ${geistSans.className} ${geistMono.className}`}>
        {children}
      </body>
    </html>
  );
}
