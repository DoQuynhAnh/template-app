import { getStatusSign } from '@/library/auth/utils';
import { Block } from '@/library/components/block';
import { Screen } from '@/library/components/screen';
import { useAuthStore } from '@/zustands/auth';
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Header from './components/header';
import MainContent from './components/main-content';

const Hanvietair = () => {
  const { styles } = useStyles(styleSheet);
  const rootRef = useRef<View>(null);
  const { setIsAuth } = useAuthStore();


  useEffect(() => {
    setIsAuth(getStatusSign());
  }, [getStatusSign()]);

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'light'}
        statusColor="#2760ED"
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Block>
          <Header />
          <MainContent/>
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

export default Hanvietair;
