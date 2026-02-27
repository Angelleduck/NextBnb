import { create } from "zustand";

interface UseFilterModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useFilterModal = create<UseFilterModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export { useFilterModal };
