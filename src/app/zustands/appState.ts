import { create } from 'zustand';

interface AppState {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;

  // showModal: boolean;
  // setShowModal: (showModal: boolean) => void;
}

// Create the store
const useAppState = create<AppState>(set => ({
  isAuth: false,
  setIsAuth: isAuth => set({ isAuth }),

  // setShowModal: showModal => set({ showModal }),
  // showModal: false,
}));

// Export the store
export { useAppState };
