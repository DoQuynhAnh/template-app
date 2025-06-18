import React, { useRef } from 'react';

import { FormCancel } from './components/form-cancel';
import { Block } from '@/library/components/block';
import { Screen } from '@/library/components/screen';
import { Spacer } from '@/library/components/spacer';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { View } from '@/library/components/core';
import { useTranslation } from 'react-i18next';
import Header from '@/library/components/ui/header';

export const CancelOrder = () => {
  const { styles } = useStyles(styleSheet);
  const rootRef = useRef<View>(null);
  const [t] = useTranslation();

  // render
  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Header title={t('cancel_order:header')} />
        <Block padding={15}>
          <Spacer height={20} />
          <FormCancel />

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
