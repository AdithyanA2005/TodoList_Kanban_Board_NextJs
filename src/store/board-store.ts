import { create } from "zustand";
import getTodosGroupedByColum from "@/lib/helpers/getTodosGroupedByColumn";

interface BoardState {
  board: IBoard;
  getBoard: () => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: { columns: new Map<IColumnTypes, IColumn>() },
  getBoard: async () => {
    const board = await getTodosGroupedByColum();
    set({ board });
  },
}));
