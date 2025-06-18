/* eslint-disable react/no-unstable-nested-components */
import { ListView } from '@/library/components/list-view';
import ProductCard from '@/library/components/ui/product-card/product-card';
import {
  getRelatedProducts,
  IProduct,
} from '../../../../services/service-products/products.api';
import ArrowLeft from '@assets/icon/svg/arrow-left';
import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';

interface IPSimilarProducts {
  _id: string;
}

const SimilarProducts = ({ _id }: IPSimilarProducts) => {
  const { data } = getRelatedProducts(_id, !!_id);

  const { styles } = useStyles(styleSheet);
  const { t } = useTranslation();

  const renderItem = useCallback(
    ({ index, item }: ListRenderItemInfo<IProduct>) => {
      return <ProductCard key={index} index={index} item={item} />;
    },
    [],
  );

  return (
    <View style={{ height: '60%', padding: 10, paddingRight: 15 }}>
      <View
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={styles.wrapText}>
          <Text style={styles.title}>{t('product:similar_product')}</Text>
        </View>
        <TouchableOpacity style={styles.flipped}>
          <ArrowLeft />
        </TouchableOpacity>
      </View>
      <ListView
        data={data ?? []}
        renderItem={renderItem}
        estimatedItemSize={56}
        ItemSeparatorComponent={() => (
          <View
            style={{
              padding: 3,
            }}
          />
        )}
      />
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  flexstyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  flipped: {
    transform: [{ scaleX: -1 }],
  },
  img: {
    left: 0,
    position: 'absolute',
    top: -0,
    zIndex: 1,
  },
  sloldCount: {
    color: color.Neutrals09,
    fontSize: 12,
    fontWeight: 400,
  },
  title: {
    color: color.Neutrals07,
    fontSize: 16,
    fontWeight: 700,
  },
  wrap: {
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
    borderColor: color.Neutrals08,
    borderTopEndRadius: 5,
    borderWidth: 2,
    marginRight: 8,
    width: 123,
    zIndex: 2,
  },
  wrapImg: {
    height: 100,
    position: 'relative',
  },
  wrapText: {
    gap: 10,
    padding: 10,
  },
}));

export default SimilarProducts;
