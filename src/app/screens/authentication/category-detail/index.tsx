import { Block } from '@/library/components/block';
import { ListView } from '@/library/components/list-view';
import { Loading } from '@/library/components/post-delay/loading';
import { Screen } from '@/library/components/screen';
import { Spacer } from '@/library/components/spacer';
import Header from '@/library/components/ui/header';
import ProductCard from '@/library/components/ui/product-card/product-card';
import { APP_SCREEN, StackScreenProps } from '@/navigation/screen-types';
import { useCategoryStore } from '@/zustands/category';
import { ListRenderItemInfo } from '@shopify/flash-list';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import {
  Category,
  getCategorieProducts,
  IProduct,
} from '../../../services/categories/categories.api';

import { IProduct as IProduct2 } from '../../../services/service-products/products.api';
import { ItemTabFilter } from './components/item-tab-filter';
import { Text } from '@/library/components/text';
import EmptyStateSvg from '@assets/icon/svg/empty-state';

const CategoryDetail = ({
  route: { params },
}: StackScreenProps<APP_SCREEN.CATEGORY_DETAIL>) => {
  const rootRef = useRef<View>(null);
  const {
    styles,
    theme: { color },
  } = useStyles(styleSheet);
  const { selectCategorie } = useCategoryStore();
  const { data, isFetching } = getCategorieProducts(
    convertArrayToQueryParams(params.productIDs),
  );
  const [products, setProducts] = useState<IProduct[]>([]);

  function convertArrayToQueryParams(idArray: string[], paramName = 'id[and]') {
    if (!idArray || idArray.length === 0) {
      return '';
    }
    return idArray.map(id => `${paramName}=${id}`).join('&');
  }

  // state
  const [filterType, setFilterType] = useState<number>(0);

  // func
  const renderProduct = ({ index, item }: ListRenderItemInfo<IProduct>) => {
    return (
      <ProductCard
        key={index}
        index={index}
        item={item as unknown as IProduct2}
      />
    );
  };

  const renderSpacer = () => {
    return <Spacer height={8} />;
  };

  const handleFilterPress = (type: number) => {
    return () => {
      setFilterType(type);
    };
  };

  function extractAllProducts(categories: Category[]) {
    let allProducts: IProduct[] = [];

    categories.forEach(category => {
      if (
        category.products &&
        Array.isArray(category.products) &&
        category.products.length > 0
      ) {
        allProducts = allProducts.concat(category.products);
      }
    });

    return allProducts;
  }

  useEffect(() => {
    if (data?.hits) {
      const allProducts = extractAllProducts(data.hits);
      setProducts(allProducts);
    }
  }, [data]);

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'light'}
        statusColor="#2760ED"
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Header
          title={selectCategorie ? selectCategorie : 'Danh mục'}
          containerStyle={{
            backgroundColor: color.primaryBase,
          }}
          textStyles={{
            color: color.primaryWhite,
          }}
          colorButton={color.primaryWhite}
        />

        <Block block>
          <Block
            direction="row"
            justifyContent="space-around"
            padding={15}
            marginTop={5}>
            <ItemTabFilter
              focused={filterType === 0}
              onPress={handleFilterPress(0)}
              title="shop_detail:popular"
            />
            <Block height={12} width={1} colorTheme={'neutral_03'} />
            <ItemTabFilter
              focused={filterType === 1}
              onPress={handleFilterPress(1)}
              title="shop_detail:bestseller_filter"
            />
            <Block height={12} width={1} colorTheme={'neutral_03'} />
            <ItemTabFilter
              focused={filterType === 2}
              onPress={handleFilterPress(2)}
              title="shop_detail:new"
            />
            <Block height={12} width={1} colorTheme={'neutral_03'} />
            <ItemTabFilter
              focused={filterType === 3}
              onPress={handleFilterPress(3)}
              title="shop_detail:price"
              rightIcon="swap-vertical"
            />
          </Block>
          <Block
            // style={{
            // //   marginHorizontal: 'auto',
            // }}
            height={'100%'}>
            {isFetching ? (
              <Loading />
            ) : (
              <ListView
                data={products}
                estimatedItemSize={150}
                renderItem={renderProduct}
                ItemSeparatorComponent={renderSpacer}
                numColumns={2}
                ListEmptyComponent={() => (
                  <Block
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                    marginTop={100}>
                    <Text>Không có sản phẩm nào</Text>
                    <EmptyStateSvg />
                  </Block>
                )}
              />
            )}

            {/* <ReloadByState reloadState={filterType || isFetching} delayMs={600}>
            </ReloadByState> */}
            <Block height={50} />
          </Block>
        </Block>
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.background,
    flex: 1,
    paddingTop: 0,
  },
}));

export default CategoryDetail;
