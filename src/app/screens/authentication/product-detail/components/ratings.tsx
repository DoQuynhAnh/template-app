import { useIsFocused } from '@react-navigation/native';
import {
  ProductTrackings,
  useProductFavoritesCheck,
  useProductFavoritesToggle,
} from '../../../../services/service-products/products.api';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import _AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';

const AntDesign = _AntDesign as unknown as React.ElementType;

interface IPRatings {
  trackings: ProductTrackings | undefined;
  productId: string;
  quantity: number
}

const Ratings = ({ trackings, productId, quantity }: IPRatings) => {
  const { mutateAsync } = useProductFavoritesCheck();
  const { mutateAsync: productFavoritesToggle } = useProductFavoritesToggle();
  const [favorite, setFavorite] = useState(false);
  const { styles, theme } = useStyles(styleSheet);
  const isFocused = useIsFocused();

  const { color } = theme;

  // Tính toán số sao trung bình
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

  const handleToggleStatusFavorite = async () => {
    const data = await productFavoritesToggle({
      productId,
    });
    setFavorite(data);
  };

  const handleCheckStatusFavorite = async () => {
    const data = await mutateAsync({
      productId,
    });
    setFavorite(data);
  };

  useEffect(() => {
    isFocused && handleCheckStatusFavorite();
  }, [isFocused]);

  // Tạo giao diện hiển thị sao
  const averageRating = calculateAverageRating();
  const { t } = useTranslation();

  return (
    <View style={styles.ratingsContainer}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map(star => (
            <AntDesign
              key={star}
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
        <Text style={styles.ratingsText}>
          | {trackings?._favoriteCount} {t('shop_detail:rate')}
        </Text>
        <Text style={styles.soldText}>| {t('product:amount')} {quantity.toLocaleString()}</Text>
      </View>

      <TouchableOpacity onPress={() => handleToggleStatusFavorite()}>
        <AntDesign
          name={favorite ? 'heart' : 'hearto'}
          size={18}
          color={!favorite ? color.primaryBase : color.status_red}
        />
      </TouchableOpacity>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  ratingsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 15,
    display: 'flex',
    justifyContent: 'space-between',
  },
  ratingsText: {
    marginLeft: 5,
    color: color.dark150,
    fontSize: 12,
  },
  soldText: {
    color: color.dark150,
    fontSize: 12,
    marginLeft: 5,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 5,
  },
}));

export default Ratings;
