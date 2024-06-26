"use client";

import { useEffect } from "react";
import Header from "@/components/header";
import Board from "@/components/board";
import { useAuthStore } from "@/lib/store/auth.store";

export default function Home() {
  const { getUser, user } = useAuthStore();

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <main>
      <Header />
      <Board />
    </main>
  );
}
