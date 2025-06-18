/* eslint-disable react/no-unstable-nested-components */
import { Image } from '@/library/components/image';
import IconCategory from '@assets/icon/svg/home-bottom/icon-category';
import React, { useEffect, useMemo } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {
  CategoryWithChildren,
  getCategories,
  Category as ICategory,
} from '../../../../services/categories/categories.api';

import { Block } from '@/library/components/block';
import { API_URL } from '@/common/api/axios-instance';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { APP_SCREEN } from '@/navigation/screen-types';
import { useCategoryStore } from '@/zustands/category';

const Category = () => {
  const { styles } = useStyles(styleSheet);
  const { data, isFetching, refetch } = getCategories();
  const { navigate } = useNavigation();
  const { setSelectCategorie } = useCategoryStore();
  const { width } = Dimensions.get('window');
  const isFocused = useIsFocused();

  const categoriesData = useMemo(() => {
    if (data?.hits) {
      return buildNestedCategories(data.hits);
    }
    return [];
  }, [data]);

  function buildNestedCategories(
    categories: ICategory[],
  ): CategoryWithChildren[] {
    const categoryMap: Record<string, CategoryWithChildren> = {};

    categories.forEach(category => {
      categoryMap[category._id] = { ...category, children: [] };
    });
    const rootCategories: CategoryWithChildren[] = [];
    categories.forEach(category => {
      const current = categoryMap[category._id];

      if (category.parentId && categoryMap[category.parentId]) {
        categoryMap[category.parentId].children.push(current);
      } else {
        rootCategories.push(current);
      }
    });

    return rootCategories;
  }

  const CategorySkeleton = () => {
    const skeletonItems = Array(5).fill(null);

    return (
      <View style={styles.container}>
        {skeletonItems.map((_, index) => (
          <SkeletonPlaceholder
            key={index}
            backgroundColor="#E0E0E0"
            highlightColor="#F5F5F5"
            speed={800}>
            <View style={styles.item}>
              <View
                style={{
                  width: width / 6 - 30,
                  height: width / 6 - 30,
                  borderRadius: 8,
                }}
              />
              <View
                style={{
                  width: width / 3.5 - 35,
                  height: 16,
                  marginTop: 6,
                  borderRadius: 4,
                }}
              />
            </View>
          </SkeletonPlaceholder>
        ))}
        {/* Add one more skeleton for "Tất cả" button */}
        <SkeletonPlaceholder
          backgroundColor="#E0E0E0"
          highlightColor="#F5F5F5"
          speed={800}>
          <View style={styles.item}>
            <View
              style={{
                width: width / 6 - 30,
                height: width / 6 - 30,
                borderRadius: 8,
              }}
            />
            <View
              style={{
                width: 40,
                height: 16,
                marginTop: 6,
                borderRadius: 4,
              }}
            />
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  };

  useEffect(() => {
    isFocused && refetch();
  }, [isFocused]);

  // Render skeleton if loading
  if (isFetching) {
    return <CategorySkeleton />;
  }

  return (
    <View style={styles.container}>
      {categoriesData.slice(0, 4).map(e => (
        <TouchableOpacity
          key={e._id}
          style={styles.item}
          onPress={() => {
            setSelectCategorie(e.name);

            navigate(APP_SCREEN.CATEGORY_DETAIL, {
              productIDs: [e?._id],
            });
          }}>
          <Block
            width={categoriesData.length >= 5 ? width / 6 - 30 : width / 5 - 30}
            height={
              categoriesData.length >= 5 ? width / 6 - 30 : width / 5 - 30
            }>
            <Image
              source={API_URL + '/resources/images' + e.image?.publicUrl}
            />
          </Block>
          <Text
            style={{
              ...styles.itemText,
              width:
                categoriesData.length >= 5
                  ? width / 3.5 - 40
                  : width / 3.3 - 35,
            }}
            numberOfLines={1}>
            {e.name}
          </Text>
        </TouchableOpacity>
      ))}
      {categoriesData.length >= 5 && (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigate(APP_SCREEN.CATEGORY)}>
          <IconCategory focused />
          <Text style={{ ...styles.itemText, marginTop: 10 }}>Tất cả</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 'auto',
    // paddingHorizontal: 25,
    paddingTop: 15,
    width: '90%',
    // padding: 15,
  },
  item: {
    display: 'flex',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: color.Neutrals07,
    fontSize: 12,
    fontWeight: 600,
    textAlign: 'center'
  },
}));

export default Category;
