/* eslint-disable react-hooks/exhaustive-deps */
import { ListView } from '@/library/components/list-view';
import { Screen } from '@/library/components/screen';
import Header from '@/library/components/ui/header';
import { useCategoryStore } from '@/zustands/category';
import { ListRenderItemInfo } from '@shopify/flash-list';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import {
  Category,
  CategoryWithChildren,
  getCategories,
} from '../../../services/categories/categories.api';
import { CategoryLevel2 } from './components/category-level-2';
import { ItemCategoryLevel1 } from './components/item-category-level-1';
import { useTranslation } from 'react-i18next';

const TabCategory = () => {
  const { data } = getCategories();
  const [categories, setCategories] = useState<Category[]>([]);
  // const [itemCategorie, setItemCategorie] = useState<Category[]>([]);
  const categoriesData = useMemo(() => {
    if (data?.hits) {
      return buildNestedCategories(data.hits);
    }
    return [];
  }, [data]);

  const rootRef = useRef<View>(null);
  const {
    styles,
    theme: { color },
  } = useStyles(styleSheet);

  const { subCategories } = useCategoryStore();

  const renderItemLevel1 = ({ item }: ListRenderItemInfo<Category>) => {
    return <ItemCategoryLevel1 category={item} />;
  };

  function buildNestedCategories(
    categories: Category[],
  ): CategoryWithChildren[] {
    // Map lưu trữ tất cả danh mục theo ID để truy cập nhanh
    const categoryMap: Record<string, CategoryWithChildren> = {};

    // Tạo bản sao và khởi tạo mảng children cho mỗi danh mục
    categories.forEach(category => {
      categoryMap[category._id] = { ...category, children: [] };
    });

    // Danh sách các danh mục gốc (không có parentId)
    const rootCategories: CategoryWithChildren[] = [];

    // Xây dựng cấu trúc cây
    categories.forEach(category => {
      const current = categoryMap[category._id];

      if (category.parentId && categoryMap[category.parentId]) {
        // Thêm vào mảng children của danh mục cha
        categoryMap[category.parentId].children.push(current);
      } else {
        // Nếu không có cha hoặc không tìm thấy cha, đây là danh mục gốc
        rootCategories.push(current);
      }
    });

    return rootCategories;
  }

  useEffect(() => {
    if (data?.hits) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);
  const { t } = useTranslation();

  // console.log({categories, subCategories}, 'categories');

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'light'}
        statusColor="#2760ED"
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Header
          title={t('category:shopping')}
          containerStyle={{
            backgroundColor: color.primaryBase,
          }}
          textStyles={{
            color: color.primaryWhite,
          }}
          colorButton={color.primaryWhite}
        />
        <ListView
          // extraData={categories}
          renderItem={renderItemLevel1}
          estimatedItemSize={50}
          data={categories}
        />
        {subCategories !== null ? (
          <CategoryLevel2 categoriesLevel2={subCategories?.children ?? []} />
        ) : null}
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.background,
    flex: 1,
    paddingTop: 0,
  },
}));

export default TabCategory;
