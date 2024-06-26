"use client";

import Header from "@/components/header";
import Board from "@/components/board";
import BgGradient from "@/components/bg-gradient";
import { useAlertStore } from "@/lib/store/alert.stote";

export default function Home() {
  const { newAlert } = useAlertStore();
  return (
    <main>
      <Header />
      <Board />
    </main>
  );
}
