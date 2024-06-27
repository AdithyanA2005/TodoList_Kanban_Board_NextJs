import { create } from "zustand";
import { ETaskTypes } from "@/types/enums";

interface INewTodoValues {
  title: string;
  type: ETaskTypes;
  image: File | null;
}

interface IAuthValues {
  name?: string;
  email: string;
  password: string;
}

interface FormState {
  newTodoValues: INewTodoValues;
  setNewTodoValues: (newTodoValues: INewTodoValues) => void;
  resetNewTodoValues: () => void;

  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  resetSearchValue: () => void;

  authValues: IAuthValues;
  setAuthValues: (registerValues: IAuthValues) => void;
  resetAuthValues: () => void;
}

const newTodoInitialValues = { title: "", type: ETaskTypes.Todo, image: null };
const authInitialValues = { name: "", email: "", password: "" };

export const useFormStore = create<FormState>((set, get) => ({
  newTodoValues: newTodoInitialValues,
  setNewTodoValues: (newTodoValues) => set({ newTodoValues }),
  resetNewTodoValues: () => setTimeout(() => set({ newTodoValues: newTodoInitialValues }), 300),

  searchValue: "",
  setSearchValue: (searchValue) => set({ searchValue }),
  resetSearchValue: () => set({ searchValue: "" }),

  authValues: authInitialValues,
  setAuthValues: (authValues) => set({ authValues }),
  resetAuthValues: () => setTimeout(() => set({ authValues: authInitialValues }), 300),
}));
