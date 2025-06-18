import { Route } from './type';

export const TABS = {
  TAB_NOT_YET_RATED: 'TAB_NOT_YET_RATED',
  TAB_RATED: 'TAB_HAVE_EVALUATED',
} as const;

export const listTab: Array<Route> = [
  {
    key: TABS.TAB_NOT_YET_RATED,
    titleT18n: 'my_reviews:not_yet_rated',
  },
  {
    key: TABS.TAB_RATED,
    titleT18n: 'my_reviews:rated',
  },
];
