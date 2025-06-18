import React, { useRef, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';

import { SceneMap, TabView } from 'react-native-tab-view';

import { Screen } from '@/library/components/screen';
import Header from '@/library/components/ui/header';
import { useTranslation } from 'react-i18next';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { TabBar } from './components/tab-bar';
import { TabNotYetRated } from './components/tab-not-yet-rated';
import { TabRated } from './components/tab-rated';
import { listTab, TABS } from './data';

const renderScene = SceneMap({
  [TABS.TAB_NOT_YET_RATED]: TabNotYetRated,
  [TABS.TAB_RATED]: TabRated,
});

export const MyReviews = () => {
  const { styles } = useStyles(styleSheet);
  const rootRef = useRef<View>(null);
  const [t] = useTranslation();

  // state
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState(listTab);
  // render
  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Header title={t('my_reviews:header')} />
        <TabView
          lazy
          renderTabBar={TabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
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
