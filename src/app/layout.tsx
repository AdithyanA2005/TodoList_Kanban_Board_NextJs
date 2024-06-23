import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Modal from "@/components/modal";

interface RootLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trello 2.0",
  description: "This is a Trello clone built with Next.js",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Modal />
      </body>
    </html>
  );
}
