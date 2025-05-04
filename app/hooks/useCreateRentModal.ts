import { create } from "zustand";

interface UseCreateRentProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateRentModal = create<UseCreateRentProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreateRentModal;
