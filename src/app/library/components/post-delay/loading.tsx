import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { styles } from './style';

export const Loading = () => {
  // render
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={'gray'} />
    </View>
  );
};
