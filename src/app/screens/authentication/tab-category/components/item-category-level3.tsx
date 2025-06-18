import React from 'react';

import { APP_SCREEN } from '@navigation/screen-types';

import { ItemLevel3Props } from '../type';
import { TouchableOpacity } from 'react-native';
import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';
import { useNavigation } from '@react-navigation/native';
import { useCategoryStore } from '@/zustands/category';

export const ItemCategoryLevel3 = ({ item }: ItemLevel3Props) => {
  const navigator = useNavigation();
  const { setSelectCategorie } = useCategoryStore();

  // func
  const handleItemPress = () => {
    setSelectCategorie(item?.name);
    navigator.navigate(APP_SCREEN.CATEGORY_DETAIL, {
      productIDs: item?.parents ?? [],
    });
  };

  // render
  return (
    <TouchableOpacity onPress={handleItemPress}>
      <Block justifyContent="center" height={30}>
        <Text preset="paragraph1" colorTheme="Neutrals07">
          {item?.name ?? ''}
        </Text>
      </Block>
    </TouchableOpacity>
  );
};
