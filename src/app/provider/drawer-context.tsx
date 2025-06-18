import { createContext, useContext } from 'react';

// Create context for drawer functions
interface DrawerContextType {
  closeDrawer: () => void;
}

export const DrawerContext = createContext<DrawerContextType | undefined>(
  undefined,
);
export const useDrawer = () => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
