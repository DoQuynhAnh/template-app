import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Banner from './banner';
import BestSeller from './best-seller';
import Category from './category';
import StaticBanner from './static-banner';
import Suggestions from './suggestions';

const MainContent = () => {
  const { styles } = useStyles(styleSheet);

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <Category />
      <Banner />
      <BestSeller />
      <View style={styles.line} />
      <StaticBanner />
      <View style={styles.line} />
      <Suggestions />
    </ScrollView>
  );
};
const styleSheet = createStyleSheet(({ color }) => ({
  line: {
    backgroundColor: color.info550,
    height: 10,
    width: Dimensions.get('window').width,
  },
  root: {
    backgroundColor: color.primaryWhite,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: 10,
    height: '100%',
    marginTop: -20,
  },
}));

export default MainContent;
