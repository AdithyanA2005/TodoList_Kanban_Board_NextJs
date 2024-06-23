import { create } from "zustand";
import getTodosGroupedByColum from "@/lib/helpers/getTodosGroupedByColumn";
import { databases, storage } from "@/lib/appwrite";

interface BoardState {
  board: IBoard;
  getBoard: () => void;
  setBoardState: (board: IBoard) => void;
  updateTodoInDb: (todo: ITodo, columnId: IColumnTypes) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  deleteTask: (taskIndex: number, todo: ITodo, id: IColumnTypes) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
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
  searchString: "",
  setSearchString: (searchString) => set({ searchString }),
  deleteTask: async (taskIndex, todo, id) => {
    // Delete the task from the column
    const newColumns = new Map(get().board.columns);
    const column = newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });

    // Delete the image from the storage
    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    // Delete the task from the database
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_AW_DATABASE_ID!,
      process.env.NEXT_PUBLIC_AW_TODOS_COLLECTION_ID!,
      todo.$id,
    );
  },
}));
