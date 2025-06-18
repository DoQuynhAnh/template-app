/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import Animated, { FadeInRight, FadeOut } from 'react-native-reanimated';


import { useStyles } from 'react-native-unistyles';
import { styles } from '../styles';
import { CategoryLevel2Props } from '../type';
import ListProduct from './list-product';

export const CategoryLevel2 = ({ categoriesLevel2 }: CategoryLevel2Props) => {
  // state
  const {
    theme: { color },
  } = useStyles();

  // func
  // const renderItemLevel2 = ({ item, index }: ListRenderItemInfo<Category>) => {
  //   return <ItemCategoryLevel2 item={item} index={index} />;
  // };

  // render
  return (
    <Animated.View
      entering={FadeInRight.duration(300)}
      exiting={FadeOut.duration(1000)}
      style={[styles.modalLevel2, { backgroundColor: color.neutral_02, paddingLeft: 1 }]}>
      <ListProduct productIDs={[categoriesLevel2[0]._id]} />
      {/* <FlatList
        data={categoriesLevel2}
        extraData={categoriesLevel2}
        renderItem={renderItemLevel2}
        showsVerticalScrollIndicator={false}
      /> */}
    </Animated.View>
  );
};
