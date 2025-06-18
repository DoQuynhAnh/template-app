import { Block } from '@/library/components/block';
import { Screen } from '@/library/components/screen';
import Header from '@/library/components/ui/header';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const Term = () => {
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
        <Header title={t('account:term')} />
        <Block padding={15}>
          <Text>
            Chào mừng bạn đến với sàn giao dịch thương mại điện tử Hanviet qua
            giao diện website hoặc ứng dụng di động. Trước khi sử dụng Hanviet.
            Vui lòng đọc kỹ các điều khoản dịch vụ và quy chế hoạt động sàn giao
            dịch thương mại điện tử Hanviet để hiểu rõ quyền lợi và nghĩa vụ hợp
            pháp của mình.{' '}
          </Text>

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
