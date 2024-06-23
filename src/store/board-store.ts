import { create } from "zustand";
import getTodosGroupedByColum from "@/lib/helpers/getTodosGroupedByColumn";
import { databases } from "@/lib/appwrite";

interface BoardState {
  board: IBoard;
  getBoard: () => void;
  setBoardState: (board: IBoard) => void;
  updateTodoInDb: (todo: ITodo, columnId: IColumnTypes) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: { columns: new Map<IColumnTypes, IColumn>() },
  getBoard: async () => {
    const board = await getTodosGroupedByColum();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
  updateTodoInDb: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_AW_DATABASE_ID!,
      process.env.NEXT_PUBLIC_AW_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
        ...(todo.image ? { image: todo.image } : {}),
      },
    );
  },
}));
