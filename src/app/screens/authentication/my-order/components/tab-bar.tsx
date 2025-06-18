import React, { useEffect, useRef } from 'react';

import { NavigationState, SceneRendererProps } from 'react-native-tab-view';

import { useMounted } from '@hooks';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';

import { ItemTab } from './item-tab';

import { listTab } from '../data';
import { Route } from '../type';
import { Block } from '@/library/components/block';

export const TabBar = ({
  jumpTo,
  navigationState: { index, routes },
}: SceneRendererProps & {
  navigationState: NavigationState<Route>;
}) => {
  // state
  const listRouteRef = useRef<FlashList<Route>>(null);
  // func
  const handleTabPress = (item: Route) => {
    return () => {
      jumpTo(item.key);
    };
  };

  const renderItemTab = ({
    item,
    index: itemIndex,
  }: ListRenderItemInfo<Route>) => {
    return (
      <ItemTab
        item={item}
        selected={itemIndex === index}
        onPress={handleTabPress(item)}
      />
    );
  };

  // effect
  useMounted(() => {
    listRouteRef.current?.scrollToItem({
      item: routes[index],
      animated: true,
      viewPosition: 0.5,
    });
  }, [index]);

  useEffect(() => {
    const id = setTimeout(() => {
      listRouteRef.current?.scrollToItem({
        item: routes[index],
        animated: true,
        viewPosition: 0.5,
      });
    }, 200);
    return () => clearTimeout(id);
  }, []);

  // render
  return (
    <Block colorTheme="background">
      <FlashList
        ref={listRouteRef}
        extraData={index}
        data={listTab}
        horizontal
        estimatedItemSize={100}
        renderItem={renderItemTab}
      />
    </Block>
  );
};
