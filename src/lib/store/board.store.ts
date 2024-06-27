import { create } from "zustand";
import env from "@/lib/env";
import { databases, ID, storage } from "@/lib/appwrite";
import uploadImage from "@/lib/appwrite/uploadImage";
import fillWithEmptyColumns from "@/lib/utils/fillWithEmptyColumns";
import getTodosGroupedByType from "@/lib/appwrite/getTodosGroupedByType";
import getColumnFromLocalStorage from "@/lib/utils/localStorage/get-columns-from-local-storage";
import setColumnsInLocalStorage from "@/lib/utils/localStorage/set-columns-in-local-storage";
import { EAlertTypes, ETaskTypes } from "@/types/enums";
import { IColumns } from "@/types/models/column";
import { ITodo } from "@/types/models/task";
import { IImage } from "@/types/utils/image";
import { useAlertStore } from "@/lib/store/alert.stote";

interface BoardState {
  columns: IColumns;
  setColumns: (columns: IColumns) => void;
  fetchColumns: () => Promise<void>;

  addTask: (todo: string, columnId: ETaskTypes, image?: File | null) => Promise<void>;
  updateTask: (todo: ITodo, columnId: ETaskTypes) => Promise<void>;
  deleteTask: (taskIndex: number, todo: ITodo, id: ETaskTypes) => Promise<void>;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  columns: fillWithEmptyColumns(),

  setColumns: (columns) => set({ columns }),

  fetchColumns: async () => {
    try {
      // Use data from local storage on initial load
      if (get().columns.size === 0) {
        const stored = getColumnFromLocalStorage();
        set({ columns: stored });
      }

      const fetchedColumns = await getTodosGroupedByType();
      const filledColumns = fillWithEmptyColumns(fetchedColumns);
      // TODO: Sort columns according to the users preference

      setColumnsInLocalStorage(filledColumns);
      set({ columns: filledColumns });
    } catch (error: any) {
      useAlertStore.getState().newAlert(
        {
          title: "Unable to fetch your todos",
          message: error.message,
          type: EAlertTypes.Error,
        },
        5000,
      );
    }
  },

  addTask: async (todo, columnId, image) => {
    try {
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
        env.awDatabaseId,
        env.awTodosCollectionId,
        ID.unique(),
        {
          title: todo,
          status: columnId,
          ...(file ? { image: JSON.stringify(file) } : {}),
        },
      );

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
        else column.todos.push(newTodoParsed);

        return {
          columns: newColumns,
        };
      });

      // Show success alert
      useAlertStore.getState().newAlert(
        {
          title: "New task added",
          message: "Your task has been added successfully!",
          type: EAlertTypes.Success,
        },
        5000,
      );
    } catch (error: any) {
      useAlertStore.getState().newAlert(
        {
          title: "Unable to add a new task",
          message: error.message,
          type: EAlertTypes.Error,
        },
        5000,
      );
    }
  },

  updateTask: async (todo, columnId) => {
    try {
      await databases.updateDocument(env.awDatabaseId, env.awTodosCollectionId, todo.$id, {
        title: todo.title,
        status: columnId,
        ...(todo.image ? { image: todo.image } : {}),
      });

      // Show success alert
      useAlertStore.getState().newAlert(
        {
          title: "Task updated",
          message: "Your task has been updated successfully!",
          type: EAlertTypes.Success,
        },
        5000,
      );
    } catch (error: any) {
      useAlertStore.getState().newAlert(
        {
          title: "Unable to update the task",
          message: error.message,
          type: EAlertTypes.Error,
        },
        5000,
      );
    }
  },

  deleteTask: async (taskIndex, todo, id) => {
    try {
      // Delete the image from the storage
      if (todo.image) {
        await storage.deleteFile(JSON.parse(todo.image).bucketId, JSON.parse(todo.image).fileId);
      }

      // Delete the task from the database
      await databases.deleteDocument(env.awDatabaseId, env.awTodosCollectionId, todo.$id);

      // Delete the task from the column
      const newColumns = new Map(get().columns);
      newColumns.get(id)?.todos.splice(taskIndex, 1);
      set({ columns: newColumns });

      // Show success alert
      useAlertStore.getState().newAlert(
        {
          title: "Task deleted",
          message: "Your task has been deleted successfully!",
          type: EAlertTypes.Success,
        },
        5000,
      );
    } catch (error: any) {
      useAlertStore.getState().newAlert(
        {
          title: "Unable to delete the task",
          message: error.message,
          type: EAlertTypes.Error,
        },
        5000,
      );
    }
  },
}));
