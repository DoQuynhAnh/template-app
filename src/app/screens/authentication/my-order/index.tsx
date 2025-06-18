/* eslint-disable sort-imports */
import React, { useRef, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';

import { SceneMap, TabView } from 'react-native-tab-view';

import { APP_SCREEN, StackScreenProps } from '@navigation/screen-types';

import { Block } from '@/library/components/block';
import { Screen } from '@/library/components/screen';
import Header from '@/library/components/ui/header';
import { useOrderState } from '@/zustands/order';
import { useTranslation } from 'react-i18next';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { TabBar } from './components/tab-bar';
import { TabCancelled } from './components/tab-cancelled';
import { TabComplete } from './components/tab-complete';
import { TabToReceive } from './components/tab-to-receive';
import { TabToShip } from './components/tab-to-ship';
import { TABS, listTab } from './data';

const renderScene = SceneMap({
  [TABS.TAB_TO_SHIP]: TabToShip,
  [TABS.TAB_RECEIVE]: TabToReceive,
  [TABS.TAB_COMPLETE]: TabComplete,
  [TABS.TAB_CANCELLED]: TabCancelled,
});

export const MyOrder = ({
  route: { params },
}: StackScreenProps<APP_SCREEN.MY_ORDER>) => {
  const { styles } = useStyles(styleSheet);
  const rootRef = useRef<View>(null);
  const [t] = useTranslation();

  // state
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(params?.defaultSelectedTab ?? 0);
  const [routes] = React.useState(listTab);
  const { setIndexTabView } = useOrderState();

  // render
  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Header title={t('my_order:header')} />
        <Block padding={15} height={'100%'}>
          <TabView
            lazy
            renderTabBar={TabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={e => {
              setIndex(e);
              setIndexTabView(e)
            }}
            initialLayout={{ width: layout.width }}
          />

          {/* <CustomTabView tabs={tabs} /> */}

          <Block style={{ height: 50 }} />
        </Block>
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.primaryWhite,
    height: '100%',
  },
}));
