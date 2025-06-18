import React, { useRef } from 'react';

import { Screen } from '@/library/components/screen';
import { View } from '@rn-core';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import HeaderHome from './components/header-home';
import MainContent from './components/main-content';

export const Home = () => {
  const rootRef = useRef<View>(null);
  const { styles } = useStyles(styleSheet);
  // const { setIsAuth } = useAuthStore();
  // const { setUserInfo } = useProfileStore();

  // useEffect(() => {
  //   setIsAuth(getStatusSign());
  //   getStatusSign() && setUserInfo(userInfoSample);
  // }, [getStatusSign()]);

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'light'}
        statusColor="#2760ED"
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <HeaderHome />
        <MainContent />
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.background,
    flex: 1,
    paddingTop: 0,
  },
}));
