/* eslint-disable no-constant-binary-expression */
import { CURRENCY } from '@/common/constant';
import { Block } from '@/library/components/block';
import { Image } from '@/library/components/image';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import { OrderItem } from '../../../../services/service-order/order.api';
import React from 'react';
import { getImageUrl } from '@/utils';

export const ItemProduct = ({ item }: { item: OrderItem }) => {
  // render
  return (
    <Block paddingHorizontal={16} paddingVertical={12} direction="row" middle>
      <Block
        marginRight={8}
        borderWidth={1}
        borderColorTheme={'neutral_03'}
        width={64}
        height={64}
        borderRadius={4}
        overflow={'hidden'}>
        <Image
          source={getImageUrl(
            item?.sku?.product?.productImages?.[0]?.publicUrl,
          )}
        />
      </Block>
      <Block block>
        <Text
          preset="placeholderBold"
          colorTheme="dark150"
          text={item?.sku?.product?.name}
        />
        <Spacer height={4} />
        {/* <Text
          preset="caption"
          colorTheme="neutral_05"
          t18n="my_order:category_type"
          t18nOptions={{ type: item?.sku?.product?. }}
        /> */}
        <Spacer height={4} />
        <Text preset="CTAs" colorTheme="status_red">
          <Text text={item?.price ? item?.price?.toLocaleString() : '0'} />
          <Text fontSize={12}>{CURRENCY}</Text>
        </Text>
      </Block>
      <Text preset="caption" colorTheme="neutral_05" text={`${item?.quantity}` ?? 0} />
    </Block>
  );
};
