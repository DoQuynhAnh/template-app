/* eslint-disable sort-imports */
import React, { useEffect } from 'react';

import { ShopGroupOrder } from './shop-group-order';

import { Block } from '@/library/components/block';
import { ListView } from '@/library/components/list-view';
import { Loading } from '@/library/components/post-delay/loading';
import { Spacer } from '@/library/components/spacer';
import { useOrderState } from '@/zustands/order';
import { ListRenderItemInfo } from '@shopify/flash-list';
import {
  IOrder,
  OrderStatusEnum,
  getOrders,
} from '../../../../services/service-order/order.api';
import { TABS } from '../data';
import { Empty } from './empty';

export const TabToShip = () => {
  const { isFetching, data, refetch } = getOrders(OrderStatusEnum.PENDING);
  const { indexTabView } = useOrderState();

  // func
  const renderItemOrder = ({ index, item }: ListRenderItemInfo<IOrder>) => {
    return (
      <ShopGroupOrder type={TABS.TAB_TO_SHIP} orderItems={item} key={index} />
    );
  };

  const renderSpacer = () => {
    return <Spacer height={16} />;
  };

  useEffect(() => {
    indexTabView === 0 && refetch();
  }, [indexTabView]);

  // render
  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <ListView
          ListHeaderComponent={<Spacer height={8} />}
          ItemSeparatorComponent={renderSpacer}
          data={data?.hits}
          estimatedItemSize={200}
          renderItem={renderItemOrder}
          ListEmptyComponent={
            <Block middle flex={1} height={300}>
              <Empty />
            </Block>
          }
        />
      )}
    </>
  );
};
