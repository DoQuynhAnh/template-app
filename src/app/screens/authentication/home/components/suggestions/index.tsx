/* eslint-disable sort-imports */
/* eslint-disable react/no-unstable-nested-components */
import { Block } from '@/library/components/block';
import { ListView } from '@/library/components/list-view';
import ProductCard from '@/library/components/ui/product-card/product-card';
import {
  IProduct,
  getRecommendProducts,
} from '../../../../../services/service-products/products.api';
import { ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Loading } from '@/library/components/post-delay/loading';
import { Spacer } from '@/library/components/spacer';
import { useTranslation } from 'react-i18next';


const Suggestions = () => {
  const { data, isFetching } = getRecommendProducts();
  const { styles } = useStyles(styleSheet);
  const {t} = useTranslation();

  const renderItem = useCallback(
    ({ index, item }: ListRenderItemInfo<IProduct>) => {
      return <ProductCard key={index} index={index} item={item} />;
    },
    [],
  );

  return (
    <View style={styles.root}>
      <Block paddingHorizontal={15} marginTop={15}>
        <Text style={{ ...styles.title, paddingBottom: 5 }}>{t('top_reputable_supplier:for_you')}</Text>
        <Text style={styles.subTitle}>
          {t('top_reputable_supplier:for_you_note')}
        </Text>
      </Block>

      <View style={{ marginTop: 15 }}>
        {isFetching ? (
          <Loading />
        ) : (
          <ListView
            data={data?.hits}
            renderItem={renderItem}
            estimatedItemSize={56}
            numColumns={2}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  padding: 6,
                  width: 10,
                }}
              />
            )}
          />
        )}
        <Spacer height={10} />
      </View>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  flexstyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  root: {
    height: '100%',
    // padding: 15,
    // height: '100%'
  },
  subTitle: {
    color: color.dark150,
    fontSize: 14,
  },

  title: {
    color: color.Neutrals07,
    fontSize: 16,
    fontWeight: 700,
  },
}));

export default Suggestions;
