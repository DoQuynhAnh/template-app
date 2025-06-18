import { Category } from '../../../services/categories/categories.api';

export type ItemCategoryLevel1Props = {
  category: Category;
  // selected?: Category;
  onPress?: () => void;
};

export type CategoryLevel2Props = {
  categoriesLevel2: Array<Category>;
};

export type ItemLevel2Props = {
  item: Category;
  index: number;
};
export type ItemLevel3Props = {
  item: Category;
};
