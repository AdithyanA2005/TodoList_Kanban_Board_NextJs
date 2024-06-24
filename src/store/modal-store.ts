import { create } from "zustand";

interface ModalState {
  newTodoIsOpen: boolean;
  openNewTodoModal: () => void;
  closeNewTodoModal: () => void;

  authTodoIsOpen: boolean;
  openAuthTodoModal: () => void;
  closeAuthTodoModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  newTodoIsOpen: false,
  openNewTodoModal: () => set({ newTodoIsOpen: true }),
  closeNewTodoModal: () => set({ newTodoIsOpen: false }),

  authTodoIsOpen: false,
  openAuthTodoModal: () => set({ authTodoIsOpen: true }),
  closeAuthTodoModal: () => set({ authTodoIsOpen: false }),
}));
