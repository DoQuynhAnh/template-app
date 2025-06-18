import React, { useEffect } from 'react';

import { ShopGroupOrder } from './shop-group-order';

import { TABS } from '../data';
import { Spacer } from '@/library/components/spacer';
import { ListView } from '@/library/components/list-view';
import { Loading } from '@/library/components/post-delay/loading';
import {
  getOrders,
  IOrder,
  OrderStatusEnum,
} from '../../../../services/service-order/order.api';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { Block } from '@/library/components/block';
import { Empty } from './empty';
import { useOrderState } from '@/zustands/order';

export const TabComplete = () => {
  const { isFetching, data, refetch } = getOrders(OrderStatusEnum.DELIVERED);

  // func
  const renderItemOrder = ({ index, item }: ListRenderItemInfo<IOrder>) => {
    return (
      <ShopGroupOrder type={TABS.TAB_COMPLETE} orderItems={item} key={index} />
    );
  };

  const { indexTabView } = useOrderState();
  useEffect(() => {
    indexTabView === 2 && refetch();
  }, [indexTabView]);

  const renderSpacer = () => {
    return <Spacer height={16} />;
  };

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
