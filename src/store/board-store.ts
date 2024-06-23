import { create } from "zustand";
import getTodosGroupedByColum from "@/lib/helpers/getTodosGroupedByColumn";
import { databases, ID, storage } from "@/lib/appwrite";
import uploadImage from "@/lib/helpers/uploadImage";

interface BoardState {
  board: IBoard;
  getBoard: () => void;
  setBoardState: (board: IBoard) => void;
  updateTodoInDb: (todo: ITodo, columnId: IColumnTypes) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  newTaskInput: string;
  setNewTaskInput: (newTaskInput: string) => void;
  newTaskType: IColumnTypes;
  image: File | null;
  setImage: (image: File | null) => void;
  setNewTaskType: (columnId: IColumnTypes) => void;
  addTask: (todo: string, columnId: IColumnTypes, image?: File | null) => void;
  deleteTask: (taskIndex: number, todo: ITodo, id: IColumnTypes) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: { columns: new Map<IColumnTypes, IColumn>() },
  getBoard: async () => {
    const board = await getTodosGroupedByColum();
    set({ board });
  },
  setBoardState: (board) => set({ board }),

  searchString: "",
  setSearchString: (searchString) => set({ searchString }),

  newTaskInput: "",
  setNewTaskInput: (newTaskInput) => set({ newTaskInput }),

  newTaskType: "todo",
  setNewTaskType: (columnId: IColumnTypes) => set({ newTaskType: columnId }),

  image: null,
  setImage: (image: File | null) => set({ image }),

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

  addTask: async (todo, columnId, image) => {
    let file: IImage | undefined;

    // Upload image if it exists
    if (image) {
      const fileUploaded = await uploadImage(image);
      console.log(fileUploaded);

      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }

    // Create a new record in DB
    const { $id, $createdAt, $updatedAt } = await databases.createDocument(
      process.env.NEXT_PUBLIC_AW_DATABASE_ID!,
      process.env.NEXT_PUBLIC_AW_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file ? { image: JSON.stringify(file) } : {}),
      },
    );

    // Clear the modal input for next fresh start
    set({ newTaskInput: "" });

    // Change the state by adding the newly created record
    set((state) => {
      const newColumns = new Map(state.board.columns);
      const newTodoParsed: ITodo = {
        $id,
        title: todo,
        status: columnId,
        $createdAt,
        $updatedAt,
        ...(file ? { image: JSON.stringify(file) } : {}),
      };

      const column = newColumns.get(columnId);
      if (!column) newColumns.set(columnId, { id: columnId, todos: [newTodoParsed] });
      else newColumns.get(columnId)?.todos.push(newTodoParsed);

      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },

  deleteTask: async (taskIndex, todo, id) => {
    // Delete the task from the column
    const newColumns = new Map(get().board.columns);
    const column = newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });

    // Delete the image from the storage
    if (todo.image) {
      await storage.deleteFile(JSON.parse(todo.image).bucketId, JSON.parse(todo.image).fileId);
    }

    // Delete the task from the database
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_AW_DATABASE_ID!,
      process.env.NEXT_PUBLIC_AW_TODOS_COLLECTION_ID!,
      todo.$id,
    );
  },
}));
