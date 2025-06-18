import { Screen } from '@/library/components/screen';
import Header from '@/library/components/ui/header';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import RatingComponent from './components/rating-component';
import ReviewItem from '@/library/components/ui/review-item/review-item';
import { useTranslation } from 'react-i18next';

const Review = () => {
  const rootRef = useRef<View>(null);
  const { styles } = useStyles(styleSheet);

  const {t} = useTranslation();

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        scroll
        backgroundColor={'transparent'}>
        <Header title={t('comment_list:header')} />

        <RatingComponent />
        <ReviewItem />
        <ReviewItem />
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.primaryWhite,
    flex: 1,
    paddingTop: 0,
  },
}));

export default Review;
