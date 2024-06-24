import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Modal from "@/components/modal";
import BgGradient from "@/components/bg-gradient";

interface RootLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adis Todo",
  description: "This is a todo list manager using kanban board to store progress",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Modal />
        <BgGradient />
      </body>
    </html>
  );
}
