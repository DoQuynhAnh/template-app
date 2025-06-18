import React from 'react';

import { BottomCancelledGroup } from './bottom-cancelled-group';
import { BottomCompleteGroup } from './bottom-complete-group';
import { BottomToReceiveGroup } from './bottom-to-receive-group';
import { BottomToShipGroup } from './bottom-to-ship-group';
import { ItemProduct } from './item-product';

import { TABS } from '../data';
import { ItemProductProps } from '../type';
import { TouchableOpacity } from 'react-native';
import { Block } from '@/library/components/block';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import { useStyles } from 'react-native-unistyles';
import { CURRENCY } from '@/common/constant';
import { Divider } from '@/library/components/divider';
import _AntDesign from 'react-native-vector-icons/AntDesign';
import _EvilIcons from 'react-native-vector-icons/EvilIcons';
import { OrderItem } from '../../../../services/service-order/order.api';

const AntDesign = _AntDesign as unknown as React.ElementType;
const EvilIcons = _EvilIcons as unknown as React.ElementType;

export const ShopGroupOrder = ({ type, orderItems }: ItemProductProps) => {
  const {
    theme: { color },
  } = useStyles();

  // func
  const renderFooterShopGroup = () => {
    switch (type) {
      case TABS.TAB_TO_SHIP:
        return <BottomToShipGroup />;
      case TABS.TAB_RECEIVE:
        return <BottomToReceiveGroup />;
      case TABS.TAB_COMPLETE:
        return <BottomCompleteGroup />;
      case TABS.TAB_CANCELLED:
        return <BottomCancelledGroup />;

      default:
        return null;
    }
  };

  const renderShopName = () => {
    return (
      <TouchableOpacity>
        <Block paddingHorizontal={16} paddingBottom={4} direction="row" middle>
          <AntDesign size={20} name="shoppingcart" color={color.Neutrals07} />
          <Spacer width={8} />
          <Text
            flex
            text={orderItems.orderCode}
            preset="placeholderBold"
            colorTheme="Neutrals07"
            numberOfLines={1}
          />
          <Spacer width={4} />
          <EvilIcons size={20} name="chevron-right" color={color.Neutrals07} />
        </Block>
      </TouchableOpacity>
    );
  };

  const renderProduct = (_: OrderItem, index: number) => {
    return <ItemProduct key={index} item={_} />;
  };

  const renderTotal = () => {
    return (
      <Block paddingHorizontal={16} direction="row" middle paddingVertical={8}>
        <Text
          flex
          t18n="my_order:total"
          preset="placeholderBold"
          colorTheme="Neutrals07"
        />
        <Text>
          <Text preset="CTAs" colorTheme="status_red">
            {!isNaN(orderItems?.orderItems.reduce((a, b) => (a += b.price), 0))
              ? orderItems?.orderItems
                  .reduce((a, b) => (a += b.price), 0)
                  ?.toLocaleString()
              : 0}
          </Text>
          <Text fontSize={12} colorTheme="status_red">
            {CURRENCY}
          </Text>
        </Text>
      </Block>
    );
  };

  // render
  return (
    <Block colorTheme="background" paddingVertical={16}>
      {renderShopName()}
      {orderItems?.orderItems?.map(renderProduct)}
      <Divider />
      {renderTotal()}
      <Divider />
      {renderFooterShopGroup()}
    </Block>
  );
};
