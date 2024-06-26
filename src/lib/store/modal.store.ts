import { create } from "zustand";

interface ModalState {
  newTodoIsOpen: boolean;
  openNewTodoModal: () => void;
  closeNewTodoModal: () => void;

  authIsOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  newTodoIsOpen: false,
  openNewTodoModal: () => set({ newTodoIsOpen: true }),
  closeNewTodoModal: () => set({ newTodoIsOpen: false }),

  authIsOpen: false,
  openAuthModal: () => set({ authIsOpen: true }),
  closeAuthModal: () => set({ authIsOpen: false }),
}));
