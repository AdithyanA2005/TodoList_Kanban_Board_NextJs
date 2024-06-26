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

interface AuthState {
  user: IUser | null;
  getUser: () => void;
  createUser: (email: string, password: string, name: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  getUser: async () => {
    try {
      // Initially try to load user from local storage
      const storedUser = getUserFromLocalStorage();
      if (storedUser) set({ user: storedUser });

      // Fetch user from appwrite
      const { $id, name, email, prefs } = await account.get();
      const fetchedUser: IUser = { $id, name, email, prefs };

      // Update user(state & localStorage) if fetched user is different
      if (!lodash.isEqual(storedUser, fetchedUser)) {
        setUserInLocalStorage(fetchedUser);
        set({ user: fetchedUser });
      }
    } catch (error: any) {
      if (error.type !== "general_unauthorized_scope")
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
