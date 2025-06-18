import React from 'react';

import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';

import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';
import { APP_SCREEN } from '@/navigation/screen-types';
import { useCategoryStore } from '@/zustands/category';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { ItemLevel2Props } from '../type';
import { useStyles } from 'react-native-unistyles';
import { Collapsible } from '@/library/components/collapsible';
import { ItemCategoryLevel3 } from './item-category-level3';
import { Category } from '../../../../services/categories/categories.api';

export const ItemCategoryLevel2 = ({ item, index }: ItemLevel2Props) => {
  // state
  const {
    theme: { color },
  } = useStyles();
  const navigator = useNavigation();

  const { setSelectCategorie } = useCategoryStore();

  // func
  const handleItemPress = (text: string) => {
    console.log(item, 'item');

    if (item?.children?.length === 0) {
      setSelectCategorie(text);
      navigator.navigate(APP_SCREEN.CATEGORY_DETAIL, {
        productIDs: [item?._id],
      });
      return;
    }

    setSelectCategorie(text);
    navigator.navigate(APP_SCREEN.CATEGORY_DETAIL, {
      productIDs: [item?._id],
    });
  };

  // func
  const renderMasterView = (
    _: Animated.SharedValue<number>,
    isShow: boolean,
  ) => {
    return (
      <Block paddingHorizontal={16} height={50} justifyContent="center">
        <Text preset="placeholder" colorTheme="Neutrals07">
          {item.name}
        </Text>
        {isShow ? (
          <Block
            zIndex={999}
            position="absolute"
            width={0}
            height={0}
            left={20}
            bottom={0}
            borderRightWidth={10}
            borderBottomWidth={8}
            borderTopWidth={10}
            borderLeftWidth={10}
            borderColor="transparent"
            borderBottomColor={color.neutral_03}
          />
        ) : null}
      </Block>
    );
  };

  const renderItemCategoryLevel3 = (item: Category) => {
    return <ItemCategoryLevel3 key={item._id} item={item} />;
  };

  const renderContentView = () => {
    return (
      <Block
        paddingVertical={10}
        colorTheme="neutral_03"
        paddingHorizontal={16}
        paddingLeft={20}>
        {item.children?.map(renderItemCategoryLevel3)}
      </Block>
    );
  };

  // render
  return (
    <Animated.View
      exiting={FadeOutRight.delay(index * 20)}
      entering={FadeInRight.delay(index * 50)}>
      {(item?.children ?? []).length > 0 ? (
        <Collapsible
          renderContent={renderContentView}
          renderMasterView={renderMasterView}
        />
      ) : (
        <TouchableOpacity onPress={() => handleItemPress(item.name)}>
          <Block paddingHorizontal={16} height={50} justifyContent="center">
            <Text preset="paragraph1" colorTheme="Neutrals07">
              {item.name}
            </Text>
          </Block>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};
