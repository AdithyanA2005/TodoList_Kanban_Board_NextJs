import { create } from "zustand";
import env from "@/lib/env";
import { databases, ID, storage } from "@/lib/appwrite";
import uploadImage from "@/lib/appwrite/upload-image";
import getTaskColumns from "@/lib/appwrite/get-task-columns";
import getColumnFromLocalStorage from "@/lib/utils/localStorage/get-columns-from-local-storage";
import setColumnsInLocalStorage from "@/lib/utils/localStorage/set-columns-in-local-storage";
import { EAlertTypes, ETaskTypes } from "@/types/enums";
import { IColumns } from "@/types/models/column";
import { ITodo } from "@/types/models/task";
import { IImage } from "@/types/utils/image";
import { useAlertStore } from "@/lib/store/alert.stote";
import { Permission, Role } from "appwrite";
import { useAuthStore } from "@/lib/store/auth.store";
import getFilledColumns from "@/lib/utils/columns-modifiers/get-filled-columns";
import getSortedColumns from "@/lib/utils/columns-modifiers/get-sorted-columns";
import setTempColumnsInLocalStorage from "@/lib/utils/localStorage/set-temp-colums-in-local-storage";
import getTempColumnFromLocalStorage from "@/lib/utils/localStorage/get-temp-columns-from-local-storage";

interface BoardState {
  columns: IColumns;
  setColumns: (columns: IColumns) => void;
  fetchColumns: () => Promise<void>;

  addTask: (todo: string, columnId: ETaskTypes, image?: File | null) => Promise<void>;
  updateTask: (todo: ITodo, columnId: ETaskTypes) => Promise<void>;
  deleteTask: (taskIndex: number, todo: ITodo, id: ETaskTypes) => Promise<void>;
}

export const useBoardStore = create<BoardState>((set, get) => {
  const order = [ETaskTypes.Todo, ETaskTypes.Doing, ETaskTypes.Done];

  return {
    columns: getSortedColumns(getFilledColumns(), order),

    setColumns: (columns) => set({ columns }),

    fetchColumns: async () => {
      try {
        const user = useAuthStore.getState().user;

        if (user) {
          // First set data stored in localStorage
          set({ columns: getColumnFromLocalStorage() });

          // Fetch the latest data from the database and format it
          let fetchedColumns = await getTaskColumns();
          fetchedColumns = getFilledColumns(fetchedColumns);
          fetchedColumns = getSortedColumns(fetchedColumns, order);

          // Update the state and localStorage with the latest data
          setColumnsInLocalStorage(fetchedColumns);
          set({ columns: fetchedColumns });
          return;
        }

        // Get temp data from localStorage OR Initialize temp data in localStorage
        const storedColumns = getTempColumnFromLocalStorage();
        if (storedColumns.size !== 0) set({ columns: storedColumns });
        else setTempColumnsInLocalStorage(getSortedColumns(getFilledColumns(), order));
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
        const user = useAuthStore.getState().user;
        let newTodo;

        if (!user) {
          // Create a new task item that will be added to the state
          newTodo = {
            $id: ID.unique(),
            title: todo,
            status: columnId,
            $createdAt: new Date().toLocaleString(),
            $updatedAt: new Date().toLocaleString(),
          };
        } else {
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
            [
              Permission.delete(Role.user(user.$id)),
              Permission.update(Role.user(user.$id)),
              Permission.read(Role.user(user.$id)),
            ],
          );

          // Create a new task item that will be added to the state
          newTodo = {
            $id,
            title: todo,
            status: columnId,
            $createdAt,
            $updatedAt,
            ...(file ? { image: JSON.stringify(file) } : {}),
          };
        }

        // Change the state and localStorage by adding the newly created record
        set((state) => {
          let newColumns = new Map(state.columns);
          const column = newColumns.get(columnId);

          if (!column) {
            newColumns = getFilledColumns(newColumns);
            newColumns.set(columnId, { id: columnId, todos: [newTodo] });
            newColumns = getSortedColumns(newColumns, order);
          } else {
            column.todos.push(newTodo);
          }

          // Update the state and SPECIFIC localStorage with the new data
          if (user) setColumnsInLocalStorage(newColumns);
          else setTempColumnsInLocalStorage(newColumns);
          return { columns: newColumns };
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
      const user = useAuthStore.getState().user;
      if (!user) {
        const newColumns = new Map(get().columns);
        const column = newColumns.get(columnId);
        if (!column) return;
        const taskIndex = column.todos.findIndex((task) => task.$id === todo.$id);
        if (taskIndex === -1) return;

        column.todos[taskIndex] = todo;
        set({ columns: newColumns });
        setTempColumnsInLocalStorage(newColumns);
        return;
      }

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
      const user = useAuthStore.getState().user;
      if (!user) {
        const newColumns = new Map(get().columns);
        newColumns.get(id)?.todos.splice(taskIndex, 1);
        set({ columns: newColumns });
        setTempColumnsInLocalStorage(newColumns);
        return;
      }

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
  };
});
