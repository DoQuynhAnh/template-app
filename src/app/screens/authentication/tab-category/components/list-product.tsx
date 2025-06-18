/* eslint-disable react-hooks/exhaustive-deps */
import { Block } from '@/library/components/block';
import { ListView } from '@/library/components/list-view';
import { ReloadByState } from '@/library/components/reload-by-state';
import ProductCard from '@/library/components/ui/product-card/product-card';
import { ListRenderItemInfo } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import {
  Category,
  getCategorieProducts,
  IProduct,
} from '../../../../services/categories/categories.api';

import { IProduct as IProduct2 } from '../../../../services/service-products/products.api';
import { Spacer } from '@/library/components/spacer';
import { useWindowDimensions } from 'react-native';

const ListProduct = ({ productIDs }: { productIDs: string[] }) => {
  const { width } = useWindowDimensions();
  const actualSize = width / 2 - 4 - 35;

  const { data, isFetching, refetch } = getCategorieProducts(
    convertArrayToQueryParams(productIDs),
  );

  function convertArrayToQueryParams(idArray: string[], paramName = 'id[and]') {
    if (!idArray || idArray.length === 0) {
      return '';
    }
    return idArray.map(id => `${paramName}=${id}`).join('&');
  }

  const [products, setProducts] = useState<IProduct[]>([]);

  // func
  const renderProduct = ({ index, item }: ListRenderItemInfo<IProduct>) => {
    return (
      <ProductCard
        key={index}
        index={index}
        item={item as unknown as IProduct2}
        customWidth={actualSize}
        noPadding
      />
    );
  };

  const renderSpacer = () => {
    return <Spacer height={8} />;
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

  useEffect(() => {
    refetch();
  }, [productIDs]);

  return (
    <Block height={'100%'} paddingTop={10}>
      <ReloadByState reloadState={isFetching} delayMs={600}>
        <ListView
          data={products}
          estimatedItemSize={150}
          renderItem={renderProduct}
          ItemSeparatorComponent={renderSpacer}
          numColumns={2}
        />
      </ReloadByState>
      <Block height={50} />
    </Block>
  );
};

export default ListProduct;
