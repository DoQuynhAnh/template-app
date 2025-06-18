import React, { useEffect, useRef } from 'react';

import { ListRenderItemInfo } from '@shopify/flash-list';

import { Block } from '@/library/components/block';
import { View } from '@/library/components/core/View';
import { ListView } from '@/library/components/list-view';
import { Loading } from '@/library/components/post-delay/loading';
import { Screen } from '@/library/components/screen';
import { Spacer } from '@/library/components/spacer';
import Header from '@/library/components/ui/header';
import ProductCard from '@/library/components/ui/product-card/product-card';
import { useTranslation } from 'react-i18next';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import {
  IProduct,
  useGetProductFavorites,
} from '../../../services/service-products/products.api';
import { Empty } from './components/empty';
import { useIsFocused } from '@react-navigation/native';

export const FavoriteProducts = () => {
  const { styles } = useStyles(styleSheet);
  const rootRef = useRef<View>(null);
  const [t] = useTranslation();
  const isFocused = useIsFocused();

  const { data, isFetching } = useGetProductFavorites();

  // func
  const renderProduct = ({ index, item }: ListRenderItemInfo<IProduct>) => {
    return <ProductCard key={index} index={index} item={item as unknown as any} />;
  };

  const renderSpacer = () => {
    return <Spacer height={8} />;
  };

  useEffect(() => {
    // isFocused && refetch();
  }, [isFocused]);

  // render
  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Header title={t('favorite_product:header')} />
        <Block flex={1} marginTop={10}>
          {data && data.length <= 0 ? (
            <>{isFetching ? <Loading /> : <Empty />}</>
          ) : (
            <ListView
              numColumns={2}
              estimatedItemSize={150}
              ListHeaderComponent={<Spacer height={16} />}
              ItemSeparatorComponent={renderSpacer}
              data={data}
              renderItem={renderProduct}
            />
          )}
        </Block>
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.primaryWhite,
    height: '100%',
  },
}));
