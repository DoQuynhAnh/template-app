import React from 'react';

import { Block } from '@/library/components/block';
import ItemCart from '@/library/components/ui/item-card/item-cart';
import { ICartItem, IOrder } from '../../../../services/service-order/order.api';

interface IPOrderCode {
  order: IOrder | undefined;
}
export const ShopGroup = ({ order }: IPOrderCode) => {
  // render
  return (
    <Block
      padding={15}
      style={{
        gap: 15,
      }}>
      {order?.orderItems.map(e => (
        <ItemCart key={e._id} data={e as unknown as ICartItem} isItemOrder />
      ))}
    </Block>
  );
};
