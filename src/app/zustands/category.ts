import {
  CategoryState,
  ProductCategoryApi
} from '@/model/category';
import { create } from 'zustand';
import { Category } from '../services/categories/categories.api';

interface CategoryTypeStore extends CategoryState {
  selectCategorie: string;

  setSelectCategorie: (selectCategorie: string) => void;
  // setCategories: (categories: CategoryLevel1[]) => void;
  setSubCategories: (subCategories: Category | null) => void;
  setProductCategories: (productCategories: Array<ProductCategoryApi>) => void;
}

// Create the store
const useCategoryStore = create<CategoryTypeStore>(set => ({
  // categories: DATA_CATEGORY,
  subCategories: null,
  productCategories: [],
  selectCategorie: '',

  setSelectCategorie: selectCategorie => set({ selectCategorie }),
  // setCategories: categories => set({ categories }),
  setSubCategories: subCategories => set({ subCategories }),
  setProductCategories: productCategories => set({ productCategories }),
}));

// Export the store
export { useCategoryStore };
