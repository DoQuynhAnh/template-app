import { CustomOmit } from '@/common/type';
import { Category } from '../services/categories/categories.api';

export type HighLightCategory = {
  id: string;
  text: string;
  image: string;
};

export type CategoryState = {
  // categories: Array<Category>;
  subCategories: Category | null;
  productCategories: Array<ProductCategoryApi>;
};

export type CategoryLevel1Api = {
  _id: string;
  name: string;
  appIcon: {
    url: string;
  };
};
export type ProductCategoryApi = {
  _id: string;
  name: string;
  category: CustomOmit<CategoryLevel1Api, 'appIcon'>;
  subCategory: CustomOmit<CategoryLevel1Api, 'appIcon'>;
  industryIcon: {
    url: string;
  };
};
export type CategoryLevel2Api = {
  _id: string;
  name: string;
  category: CustomOmit<CategoryLevel1Api, 'appIcon'>;
};

export type CategoryLevel2 = {
  id: string;
  text: string;
  parentId: string;
  level3?: Array<ProductCategoryApi>;
};

export type CategoryLevel1 = {
  icon: string;
  id: string;
  text: string;
  level2: Array<CategoryLevel2>;
};
