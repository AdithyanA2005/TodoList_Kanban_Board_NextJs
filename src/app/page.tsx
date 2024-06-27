"use client";

import { useEffect } from "react";
import Header from "@/components/header";
import Board from "@/components/board";
import { useAuthStore } from "@/lib/store/auth.store";
import { useBoardStore } from "@/lib/store/board.store";

export default function Home() {
  const { getUser, user } = useAuthStore();
  const { fetchColumns } = useBoardStore();

  useEffect(() => {
    (async function () {
      await getUser();
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (user) await fetchColumns();
    })();
  }, [user]);

  return (
    <main>
      <Header />
      <Board />
    </main>
  );
}
