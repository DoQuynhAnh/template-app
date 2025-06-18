import React from 'react';

import { Block } from '@/library/components/block';
import { Image } from '@/library/components/image';
import { Text } from '@/library/components/text';
import { TouchableOpacity } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { ItemCategoryLevel1Props } from '../type';

import { API_URL } from '@/common/api/axios-instance';
import { useCategoryStore } from '@/zustands/category';
import _EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Category } from '../../../../services/categories/categories.api';
import { useNavigation } from '@react-navigation/native';
import { APP_SCREEN } from '@/navigation/screen-types';
const EvilIcons = _EvilIcons as unknown as React.ElementType;

export const ItemCategoryLevel1 = ({ category }: ItemCategoryLevel1Props) => {
  // state
  const {
    theme: { color },
  } = useStyles();
  const navigator = useNavigation();
  const { subCategories, setSubCategories, setSelectCategorie } =
    useCategoryStore();

  const handleCategoryPress = (item: Category) => {
    if (item.children && item.children.length === 0) {
      setSelectCategorie(item.name);
      setSubCategories(null);
      navigator.navigate(APP_SCREEN.CATEGORY_DETAIL, {
        productIDs: [item?._id],
      });
    } else {
      setSubCategories(subCategories?._id === item._id ? null : item);
    }
  };

  // render
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('run ');
        handleCategoryPress(category);
      }}>
      <Block height={50} direction={'row'} middle>
        <Block
          borderLeftWidth={3}
          // borderColor=''
          borderColorTheme={
            subCategories?._id === category?._id ? 'primaryBase' : 'transparent'
          }
          middle
          justifyContent="center"
          width={50}
          height={50}>
          <Block width={24} height={24}>
            <Image
              source={API_URL + '/resources/images' + category.image?.publicUrl}
            />
          </Block>
        </Block>
        <Block
          direction="row"
          block
          height={50}
          middle
          borderBottomWidth={1}
          borderColorTheme={'bgLight01'}
          // style={{
          //   borderBottomWidth: 1,
          //   borderBottomColor: color.white01,
          // }}
        >
          <Text
            flex
            preset="placeholder"
            colorTheme="dark150"
            numberOfLines={1}
            text={category.name}
          />
          {category.children?.length !== 0 && (
            <EvilIcons size={24} name="chevron-right" />
          )}
        </Block>
        {subCategories?._id === category._id ? (
          <Block
            zIndex={999}
            position="absolute"
            width={0}
            height={0}
            left={42}
            borderRightWidth={8}
            borderBottomWidth={10}
            borderTopWidth={10}
            borderLeftWidth={0}
            borderColor="transparent"
            borderRightColor={color.primaryBase}
          />
        ) : null}
      </Block>
    </TouchableOpacity>
  );
};
