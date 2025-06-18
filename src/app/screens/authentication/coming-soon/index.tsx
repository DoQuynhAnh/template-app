import { Block } from '@/library/components/block';

import { View } from '@/library/components/core/View';
import { Screen } from '@/library/components/screen';
import Header from '@/screens/han-viet-air/components/header';
import React, { useRef } from 'react';
import { Dimensions, Image } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const ComingSoon = () => {
  const { styles } = useStyles(styleSheet);
  const rootRef = useRef<View>(null);

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'light'}
        statusColor="#2760ED"
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Block>
          <Header isShowBack />
          <Block
            flex={1}
            style={styles.abcd}
            justifyContent="center"
            alignItems="center"
            >
            {/* <Text text="Coming Soon" fontSize={20} /> */}

            <Image
              source={require('../../../../../assets/icon/source/5581197.png')}
              style={{
                // ...styles.styleImg,
                width: Dimensions.get('window').width / 2,
                height: Dimensions.get('window').width / 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '50%',
              }}
              resizeMode="cover"
            />
          </Block>
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
  abcd: {
    backgroundColor: color.primaryWhite,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: 10,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: Dimensions.get('window').height / 4 - 100,
  },
}));

export default ComingSoon;
