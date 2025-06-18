import { Route } from './type';

export const TABS = {
  TAB_TO_SHIP: 'TAB_TO_SHIP',
  TAB_RECEIVE: 'TAB_RECEIVE',
  TAB_COMPLETE: 'TAB_COMPLETE',
  TAB_CANCELLED: 'TAB_CANCELLED',
} as const;

export type ItemShopType = typeof TABS[keyof typeof TABS];

export const listTab: Array<Route> = [
  {
    key: TABS.TAB_TO_SHIP,
    titleT18n: 'my_order:to_ship',
  },
  {
    key: TABS.TAB_RECEIVE,
    titleT18n: 'my_order:to_receive',
  },
  {
    key: TABS.TAB_COMPLETE,
    titleT18n: 'my_order:complete',
  },
  {
    key: TABS.TAB_CANCELLED,
    titleT18n: 'my_order:cancelled',
  },
];
