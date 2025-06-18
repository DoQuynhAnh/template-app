import React from 'react';

import { NavigationState, SceneRendererProps } from 'react-native-tab-view';

import { ItemTab } from './item-tab';

import { listTab } from '../data';
import { Route } from '../type';
import { Block } from '@/library/components/block';

export const TabBar = ({
  jumpTo,
  navigationState: { index },
}: SceneRendererProps & {
  navigationState: NavigationState<Route>;
}) => {
  // func
  const handleTabPress = (item: Route) => {
    return () => {
      jumpTo(item.key);
    };
  };

  const renderItemTab = (item: Route, itemIndex: number) => {
    return (
      <ItemTab
        key={item.key}
        item={item}
        selected={itemIndex === index}
        onPress={handleTabPress(item)}
      />
    );
  };

  // render
  return (
    <>
      <Block
        borderBottomWidth={1}
        borderColorTheme={'background_overlay'}
        justifyContent="space-between"
        direction="row"
        middle
        colorTheme="background">
        {listTab.map(renderItemTab)}
      </Block>
    </>
  );
};
