import { create } from "zustand";
import lodash from "lodash";
import { useAlertStore } from "@/lib/store/alert.stote";
import { account, ID } from "@/lib/appwrite";
import { EAlertTypes } from "@/types/enums";
import { IUser } from "@/types/models/user";
import setUserInLocalStorage from "@/lib/utils/localStorage/set-user-in-local-storage";
import deleteColumnsFromLocalStorage from "@/lib/utils/localStorage/delete-columns-from-local-storage";
import deleteUserFromLocalStorage from "@/lib/utils/localStorage/delete-user-from-local-storage";
import getUserFromLocalStorage from "@/lib/utils/localStorage/get-user-from-local-storage";
import getFilledColumns from "@/lib/utils/columns-modifiers/get-filled-columns";
import { useBoardStore } from "@/lib/store/board.store";
import { ITodo } from "@/types/models/task";
import getTempColumnFromLocalStorage from "@/lib/utils/localStorage/get-temp-columns-from-local-storage";
import deleteTempColumnsFromLocalStorage from "@/lib/utils/localStorage/delete-temp-columns-from-local-storage";

interface AuthState {
  user: IUser | null;
  getUser: () => Promise<void>;
  createUser: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  getUser: async () => {
    try {
      // First load user stored in local storage
      const storedUser = getUserFromLocalStorage();
      if (storedUser) set({ user: storedUser });

      // Fetch latest user data from appwrite
      const { $id, name, email, prefs } = await account.get();
      const fetchedUser: IUser = { $id, name, email, prefs };

      // Update user(state & localStorage) if fetched user is different
      if (!lodash.isEqual(storedUser, fetchedUser)) {
        setUserInLocalStorage(fetchedUser);
        set({ user: fetchedUser });
      }
    } catch (error: any) {
      if (error.type !== "general_unauthorized_scope")
        // This error is expected when user is not logged in
        // Show alert for all other errors
        useAlertStore.getState().newAlert(
          {
            title: "Unable to get user data",
            message: error.message,
            type: EAlertTypes.Error,
          },
          5000,
        );
    }
  },
  signIn: async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await get().getUser();
    } catch (error: any) {
      useAlertStore.getState().newAlert(
        {
          title: "Unable to login",
          message: error.message,
          type: EAlertTypes.Error,
        },
        5000,
      );
    }

    try {
      const storedColumns = getTempColumnFromLocalStorage();
      if (storedColumns) {
        const todos = Array.from(storedColumns.values()).reduce(
          (acc: ITodo[], column) => [...acc, ...column.todos],
          [],
        );

        for (const todo of todos) {
          await useBoardStore.getState().addTask(todo.title, todo.status);
        }

        deleteTempColumnsFromLocalStorage();
      }
    } catch (error: any) {
      useAlertStore.getState().newAlert(
        {
          title: "Unable to add your existing tasks",
          message: error.message,
          type: EAlertTypes.Error,
        },
        5000,
      );
    }
  },
  createUser: async (email: string, password: string, name: string) => {
    try {
      await account.create(ID.unique(), email, password, name);
      await get().signIn(email, password); // signIn() -> getUser()
    } catch (error: any) {
      useAlertStore.getState().newAlert(
        {
          title: "Unable to create user",
          message: error.message,
          type: EAlertTypes.Error,
        },
        5000,
      );
    }
  },
  signOut: async () => {
    deleteColumnsFromLocalStorage();
    deleteUserFromLocalStorage();
    set({ user: null });
    useBoardStore.getState().setColumns(getFilledColumns());

    try {
      await account.deleteSessions();
    } catch (error: any) {
      useAlertStore.getState().newAlert(
        {
          title: "Unable to logout",
          message: error.message,
          type: EAlertTypes.Error,
        },
        5000,
      );
    }
  },
}));
