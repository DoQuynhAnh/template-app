/* eslint-disable no-nested-ternary */
import { APP_SCREEN } from '@/navigation/screen-types';
import { getImageUrl } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { IProduct } from '../../../../services/service-products/products.api';
import { Block } from '../../block';
import { useTranslation } from 'react-i18next';

const ProductCard = ({
  index,
  item,
  noPadding,
  noNavigate,
  customWidth,
}: {
  index: number;
  item?: IProduct;
  noPadding?: boolean;
  noNavigate?: boolean;
  customWidth?: number;
}) => {
  const { styles } = useStyles(styleSheet);
  const navigate = useNavigation();
  const { width } = useWindowDimensions();
  const actualSize = customWidth ? customWidth : width / 2 - 4 - 15;

  const navigateToProductDetail = () => {
    if (noNavigate) return;

    navigate.navigate(APP_SCREEN.PRODUCT_DETAIL, {
      _id: item?._id ?? '',
    });
    // Navigate to product detail screen
  };

  const { t } = useTranslation();

  return (
    <Block
      // width={width / 2 - 12}
      paddingLeft={!noPadding ? (index % 2 === 0 ? 16 : 4) : 0}
      style={{
        marginHorizontal: customWidth ? 'auto' : 0,
      }}>
      <TouchableOpacity
        style={{ ...styles.container, width: actualSize }}
        onPress={navigateToProductDetail}>
        {/* Hình ảnh sản phẩm với badge giảm giá */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: getImageUrl(item?.productImages?.[0].publicUrl),
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-50%</Text>
          </View>
        </View>

        {/* Thông tin sản phẩm */}
        <View style={styles.infoContainer}>
          <Text style={styles.productTitle}>
            {item?.name ?? '(남성)다이아몬드 패턴 퀼팅 자켓(BH670E-54N 05...'}
          </Text>

          {/* Giá sản phẩm */}
          <View style={styles.priceContainer}>
            <Text style={styles.salePrice}>{item?.productSkus?.[0].priceSell.toLocaleString()} VND</Text>
            {/* <Text
              style={[
                styles.convertedPrice,
                customWidth ? { width: customWidth / 1.9 } : undefined,
              ]}
              numberOfLines={1}>
              344,520 VND
            </Text> */}
          </View>
          {/* <Text style={styles.originalPrice}>2,000 원</Text> */}

          {/* Đánh giá và lượt bán */}
          <View style={styles.ratingContainer}>
            <Text style={styles.starIcon}>★</Text>
            <Text style={styles.ratingValue}>4.7</Text>
            <Text style={styles.separator}>|</Text>
            <Text
              style={[
                styles.soldCount,
                {width: width * 0.29}
              ]}
              numberOfLines={1}>
              {t('product:amount')} {item?.productSkus?.[0].quantity}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Block>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  container: {
    borderRadius: 8,

    marginBottom: 15,
    // overflow: 'hidden',
    // width: Dimensions.get(‚'screen').width / 2 - 12,
  },
  convertedPrice: {
    color: color.Neutrals09,
    fontSize: 14,
  },
  discountBadge: {
    backgroundColor: color.danger550,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  discountText: {
    color: color.primaryWhite,
    fontSize: 12,
    fontWeight: 'bold',
  },
  image: {
    borderRadius: 8,
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    aspectRatio: 1,
    position: 'relative',
    width: '100%',
  },
  infoContainer: {
    paddingTop: 10,
  },
  originalPrice: {
    color: color.Neutrals09,
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  priceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 4,
  },
  productTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.5,
    marginBottom: 5,
  },
  ratingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },
  ratingValue: {
    color: color.dark150,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  salePrice: {
    color: color.primaryBase,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  separator: {
    color: '#DDD',
    fontSize: 16,
    marginRight: 8,
  },
  soldCount: {
    color: color.dark150,
    fontSize: 16,
  },
  starIcon: {
    color: '#FFBA00',
    fontSize: 18,
    marginRight: 4,
  },
}));

export default ProductCard;
