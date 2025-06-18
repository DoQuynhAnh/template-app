import { IOrder } from '../../../services/service-order/order.api';
import { ItemShopType } from './data';

export type Route = {
  key: string;
  titleT18n: I18nKeys;
};

export type ItemTabProps = {
  item: Route;
  onPress?: () => void;
  selected?: boolean;
};

export type ItemProductProps = {
  type: ItemShopType;
  orderItems: IOrder
};
