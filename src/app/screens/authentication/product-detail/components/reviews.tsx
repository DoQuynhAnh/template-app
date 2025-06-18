/* eslint-disable no-inline-comments */

import React from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import _AntDesign from 'react-native-vector-icons/AntDesign';
import ReviewItem from '../../../../library/components/ui/review-item/review-item';
import { ProductTrackings } from '../../../../services/service-products/products.api';
import { useTranslation } from 'react-i18next';

const AntDesign = _AntDesign as unknown as React.ElementType;

interface IPReviews {
  trackings: ProductTrackings | undefined;
}

const Reviews = ({ trackings }: IPReviews) => {
  const {
    styles,
    theme: { color },
  } = useStyles(styleSheet);

  const calculateAverageRating = () => {
    const ratings = {
      _rating_01_count: trackings?._rating_01_count ?? 0,
      _rating_02_count: trackings?._rating_02_count ?? 0,
      _rating_03_count: trackings?._rating_03_count ?? 0,
      _rating_04_count: trackings?._rating_04_count ?? 0,
      _rating_05_count: trackings?._rating_05_count ?? 10,
    };

    const totalCount =
      ratings._rating_01_count +
      ratings._rating_02_count +
      ratings._rating_03_count +
      ratings._rating_04_count +
      ratings._rating_05_count;

    const weightedSum =
      1 * ratings._rating_01_count +
      2 * ratings._rating_02_count +
      3 * ratings._rating_03_count +
      4 * ratings._rating_04_count +
      5 * ratings._rating_05_count;

    return totalCount > 0 ? weightedSum / totalCount : 0;
  };

  // Tạo giao diện hiển thị sao
  const averageRating = calculateAverageRating();

  const {t} = useTranslation();

  return (
    <View>
      <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
        <Text style={styles.sectionTitle}>{t('product:product_comment')}</Text>

        {/* Điểm số và số lượng đánh giá */}
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {[...Array(5)].map((star, index) => (
              <AntDesign
                key={index}
                name={(() => {
                  if (star <= Math.floor(averageRating)) {
                    return 'star';
                  } else if (star <= averageRating) {
                    return 'staro';
                  } else {
                    return 'staro';
                  }
                })()}
                size={14}
                color={star <= averageRating ? '#FFB800' : '#aeaeae'}
              />
            ))}
          </View>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text
              style={{
                color: color.Neutrals07,
                fontSize: 14,
                fontWeight: '600',
              }}>
              {averageRating}/5
            </Text>
            <Text style={{ color: color.Neutrals09, fontSize: 12 }}>
              ({trackings?._favoriteCount} {t('shop_detail:rate')})
            </Text>
          </View>
        </View>
      </View>

      <ReviewItem />
      <ReviewItem />
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  ratingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  sectionTitle: {
    color: color.Neutrals07,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  stars: {
    flexDirection: 'row',
    gap: 3,
    marginRight: 9,
  },
}));
export default Reviews;
