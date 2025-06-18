import React from 'react';
import { Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const StaticBanner = () => {
  const { styles } = useStyles(styleSheet);

  return (
    <View style={styles.root}>
      <View>
        <Image
          source={{
            uri: 'https://static.hawonkoo.vn/hwks1/images/2023/06/bep-co-gu-5.jpg',
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styleSheet = createStyleSheet(() => ({
  root: {
    padding: 15,
    width: '100%',
  },
  image: {
    borderRadius: 5,
    width: '100%',
    height: 180,
  },
}));

export default StaticBanner;
