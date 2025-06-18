import { create } from 'zustand';

interface OrderState {
  indexTabView: number;
  setIndexTabView: (indexTabView: number) => void;
}

// Create the store
const useOrderState = create<OrderState>(set => ({
  indexTabView: 0,
  setIndexTabView: indexTabView => set({ indexTabView }),
}));

// Export the store
export { useOrderState };
