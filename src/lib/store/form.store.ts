import { create } from "zustand";
import { ETaskTypes } from "@/types/enums";

interface INewTodoValues {
  title: string;
  type: ETaskTypes;
  image: File | null;
}

interface FormState {
  newTodoValues: INewTodoValues;
  setNewTodoValues: (newTodoValues: INewTodoValues) => void;
  resetNewTodoValues: () => void;

  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  resetSearchValue: () => void;
}

const newTodoInitialValues = { title: "", type: ETaskTypes.Todo, image: null };

export const useFormStore = create<FormState>((set, get) => ({
  newTodoValues: newTodoInitialValues,
  setNewTodoValues: (newTodoValues) => set({ newTodoValues }),
  resetNewTodoValues: () => set({ newTodoValues: newTodoInitialValues }),

  searchValue: "",
  setSearchValue: (searchValue) => set({ searchValue }),
  resetSearchValue: () => set({ searchValue: "" }),
}));
