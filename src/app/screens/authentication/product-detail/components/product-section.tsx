import React from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import CouponSection from './coupon-section';
import Ratings from './ratings';
import ProductDescription from './product-description';
import { IProduct } from '../../../../services/service-products/products.api';
import { useTranslation } from 'react-i18next';

interface IProductSectionProps {
  productDetail: IProduct | undefined;
}

const ProductSection = ({ productDetail }: IProductSectionProps) => {
  const { styles } = useStyles(styleSheet);
  const { t } = useTranslation();
  productDetail?.productSkus[0].quantity;
  return (
    <View style={styles.infoContainer}>
      <View
        style={{
          paddingHorizontal: 15,
        }}>
        <View style={styles.flexStyle}>
          <Text style={styles.productTitle}>{productDetail?.name}</Text>
          {/* <View style={styles.discount}>
            <Text style={styles.discountText}>-15%</Text>
          </View> */}
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {productDetail?.productSkus[0].priceSell?.toLocaleString()} VND
          </Text>
          {/* <Text style={styles.priceForeign}>344,520 VND</Text> */}
        </View>
        {/* <Text style={styles.originalPrice}>2,000 원</Text> */}

        {/* Ratings */}
        <Ratings
          trackings={productDetail?.trackings}
          productId={productDetail?._id ?? ''}
          quantity={productDetail?.productSkus?.[0].quantity ?? 0}
        />
      </View>

      {/* Coupon Section */}
      <CouponSection />

      <View
        style={{
          paddingHorizontal: 15,
        }}>
        {/* Product Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>{t('product:product_detail')}</Text>
          {productDetail?.productSkus &&
            productDetail?.productSkus?.[0]?.variants.map(e => (
              <View style={styles.detailRow} key={e._id}>
                <Text style={styles.detailLabel}>{e.variant.name}</Text>
                <Text style={styles.detailValue}>{e.variantValue}</Text>
              </View>
            ))}
        </View>

        {/* Product Description */}
        <ProductDescription />
      </View>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.Neutrals07,
    width: '87%',
  },
  detailLabel: {
    color: color.dark150,
    width: 120,
    fontSize: 12,
  },
  detailRow: {
    // borderBottomColor: '#f0f0f0',
    // borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 8,
  },
  detailValue: {
    flex: 1,
    fontWeight: '500',
    color: color.dark100,
    fontSize: 12,
  },
  detailsSection: {
    paddingVertical: 15,
  },
  discount: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF4B4B',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: color.white01,
    paddingVertical: 15,
    // width: Dimensions.get('window').width - 50,
  },
  flexStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // gap: 10,
  },
  originalPrice: {
    color: color.Neutrals09,
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  price: {
    color: color.primaryBase,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  priceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 7,
    gap: 5,
  },
  priceForeign: {
    color: color.Neutrals09,
    fontSize: 16,
    marginTop: 5,
    fontWeight: '500',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: color.Neutrals07,
  },
}));

export default ProductSection;
