// auth.ts - Modified version
import { create } from 'zustand';

interface AuthStore {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
}

// Create the store
const useAuthStore = create<AuthStore>(set => ({
  isAuth: false,
  setIsAuth: isAuth => set({ isAuth }),
}));

// Export the store and direct access functions
export { useAuthStore };

// Export direct setter for non-hook usage
export const setIsAuthDirectly = (isAuth: boolean) => useAuthStore.getState().setIsAuth(isAuth);