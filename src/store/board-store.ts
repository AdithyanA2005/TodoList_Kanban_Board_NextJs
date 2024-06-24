import { create } from "zustand";
import { databases, ID, storage } from "@/lib/appwrite";
import { getColumnFromLocalStorage, setColumnsInLocalStorage } from "@/lib/utils";
import uploadImage from "@/lib/helpers/uploadImage";
import getTodosGroupedByType from "@/lib/helpers/getTodosGroupedByType";

interface BoardState {
  columns: IColumns;
  setColumns: (columns: IColumns) => void;
  fetchColumns: () => void;

  searchString: string;
  setSearchString: (searchString: string) => void;

  image: File | null;
  setImage: (image: File | null) => void;
  newTaskInput: string;
  setNewTaskInput: (newTaskInput: string) => void;
  newTaskType: IColumnTypes;
  setNewTaskType: (columnId: IColumnTypes) => void;

  addTask: (todo: string, columnId: IColumnTypes, image?: File | null) => void;
  updateTask: (todo: ITodo, columnId: IColumnTypes) => void;
  deleteTask: (taskIndex: number, todo: ITodo, id: IColumnTypes) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  columns: new Map<IColumnTypes, IColumn>(getColumnFromLocalStorage()),
  setColumns: (columns) => set({ columns }),

  searchString: "",
  setSearchString: (searchString) => set({ searchString }),

  newTaskInput: "",
  setNewTaskInput: (newTaskInput) => set({ newTaskInput }),

  newTaskType: "todo",
  setNewTaskType: (columnId: IColumnTypes) => set({ newTaskType: columnId }),

  image: null,
  setImage: (image: File | null) => set({ image }),

  fetchColumns: async () => {
    const columns = await getTodosGroupedByType();
    setColumnsInLocalStorage(columns);
    set({ columns });
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
      const newColumns = new Map(state.columns);
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
        columns: newColumns,
      };
    });
  },

  updateTask: async (todo, columnId) => {
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

  deleteTask: async (taskIndex, todo, id) => {
    // Delete the task from the column
    const newColumns = new Map(get().columns);
    const column = newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ columns: newColumns });

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
