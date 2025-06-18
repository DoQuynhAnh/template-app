/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useMemo, useState } from 'react';
import {
  type Animated,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View
} from 'react-native';
import {
  type NavigationState,
  SceneMap,
  type SceneRendererProps,
  TabView,
} from 'react-native-tab-view';
import { styles } from './styles';
import TabBarCutom from './tab-bar-custom';

// Định nghĩa interface cho tab
export interface TabRoute {
  key: string;
  title: string;
  component: React.ComponentType<any>;
}

// Định nghĩa interface props cho component chính
interface CustomTabViewProps {
  tabs: TabRoute[];
  initialIndex?: number;
}

const CustomTabView: React.FC<CustomTabViewProps> = ({
  tabs,
  initialIndex = 0,
}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(initialIndex);

  // Tạo route từ tabs được truyền vào
  const routes = useMemo(
    () => tabs.map(tab => ({ key: tab.key, title: tab.title })),
    [tabs],
  );

  // Tạo scene map từ tabs được truyền vào
  const renderScene = useMemo(() => {
    const scenes: Record<string, React.ComponentType<any>> = {};
    tabs.forEach(tab => {
      scenes[tab.key] = tab.component;
    });

    return SceneMap(scenes);
  }, [tabs]);

  type Route = {
    key: string;
    title: string;
  };
  type State = NavigationState<Route>;

  const renderItem = useCallback(
    ({
        navigationState,
        position,
        jumpTo,
      }: {
        navigationState: State;
        position: Animated.AnimatedInterpolation<number>;
        jumpTo: (key: string) => void;
      }) =>
      ({ route, index }: { route: Route; index: number }) => {
        const inputRange = navigationState.routes.map((_, i) => i);

        const activeOpacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: number) => (i === index ? 1 : 0)),
        });
        const inactiveOpacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: number) => (i === index ? 0 : 1)),
        });

        return (
          <TabBarCutom
            activeOpacity={activeOpacity}
            inactiveOpacity={inactiveOpacity}
            route={route}
            jumpTo={jumpTo}
          />
        );
      },
    [],
  );

  const renderTabBar = useCallback(
    (props: SceneRendererProps & { navigationState: State }) => (
      <View style={styles.tabbar}>
        {props.navigationState.routes.map(
          (route: Route, routeIndex: number) => {
            return (
              <TouchableWithoutFeedback
                key={route.key}
                onPress={() => {
                  props.jumpTo(route.key);
                  setIndex(routeIndex);
                }}>
                {renderItem(props)({ route, index: routeIndex })}
              </TouchableWithoutFeedback>
            );
          },
        )}
      </View>
    ),
    [renderItem],
  );

  const LazyPlaceholder = useCallback(
    ({ route }: { route: Route }) => (
      <View style={styles.scene}>
        <Text>Loading {route.title}…</Text>
      </View>
    ),
    [],
  );

  return (
    <TabView
      lazy
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
      renderLazyPlaceholder={LazyPlaceholder}
      lazyPreloadDistance={0}
    />
  );
};

/**
 * ví dụ sử dụng
 */
// const PriceTable = () => {
//   const tabs = [
//     { key: 'first', title: 'Tất cả', component: PriceList },
//     { key: 'second', title: 'Theo dõi', component: PriceListFavorite },
//   ];
//
//   return <CustomTabView tabs={tabs} />;
// };

export default CustomTabView;
