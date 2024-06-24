import { create } from "zustand";

interface ModalState {
  newTodoIsOpen: boolean;
  openNewTodoModal: () => void;
  closeNewTodoModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  newTodoIsOpen: false,
  openNewTodoModal: () => set({ newTodoIsOpen: true }),
  closeNewTodoModal: () => set({ newTodoIsOpen: false }),
}));
