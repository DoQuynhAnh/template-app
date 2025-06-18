/* eslint-disable @typescript-eslint/no-namespace */
import {
  CategoryProductsParams,
  MyOrderParams,
  NewsParams,
  ProductDetailParams,
} from '@/model/navigation-params';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum APP_SCREEN {
  HAN_VIET_AIR = 'HAN_VIET_AIR',

  UN_AUTHORIZE = 'UN_AUTHORIZE',
  AUTHORIZE = 'AUTHORIZE',
  PUBLIC = 'PUBLIC',

  LOGIN = 'LOGIN',
  FORGOT_PASSWORD_VERIFIED = 'FORGOT_PASSWORD_VERIFIED',
  OTP_CONFIRM = 'OTP_CONFIRM',
  PASSWORD_RECOVERY = 'PASSWORD_RECOVERY',
  ADD_MAIL = 'ADD_MAIL',
  SIGN_UP = 'SIGN_UP',
  CREATE_SUCCESS = 'CREATE_SUCCESS',

  // home
  HOME = 'HOME',
  CHAT_WITH_US = 'CHAT_WITH_US',
  NEWS = 'NEWS',
  NOTIFICATION = 'NOTIFICATION',
  PROFILE = 'PROFILE',

  // other
  CATEGORY = 'CATEGORY',
  SETTING_NOTIFICATION = 'SETTING_NOTIFICATION',
  SEARCH = 'SEARCH',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  REVIEW = 'REVIEW',
  SHOPPING_CART = 'SHOPPING_CART',
  BILLING_INFORMATION = 'BILLING_INFORMATION',
  SELECT_ADDRESS = 'SELECT_ADDRESS',
  ADD_SHIPPING_ADDRESS = 'ADD_SHIPPING_ADDRESS',
  DETAIL_ORDER = 'DETAIL_ORDER',
  CATEGORY_DETAIL = 'CATEGORY_DETAIL',
  NEWS_DETAILS = 'NEWS_DETAILS',
  POLICY = 'POLICY',
  TERM = 'TERM',
  ACCOUNT_INFORMATION = 'ACCOUNT_INFORMATION',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  MY_ORDER = 'MY_ORDER',
  CANCEL_ORDER = 'CANCEL_ORDER',
  REVIEW_PRODUCT = 'REVIEW_PRODUCT',
  FAVORITE_PRODUCTS = 'FAVORITE_PRODUCTS',
  MY_REVIEWS = 'MY_REVIEWS',
  COMING_SOON = 'COMING_SOON',

  // Máy bay
  FLIGHT_SEARCH_SCREEN = 'FLIGHT_SEARCH_SCREEN',
}

export type RootStackParamList = {
  [APP_SCREEN.HAN_VIET_AIR]: undefined;

  [APP_SCREEN.LOGIN]: undefined;
  [APP_SCREEN.UN_AUTHORIZE]: undefined;
  [APP_SCREEN.PUBLIC]: undefined;
  [APP_SCREEN.AUTHORIZE]: undefined;
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.FORGOT_PASSWORD_VERIFIED]: undefined;
  [APP_SCREEN.OTP_CONFIRM]: undefined;
  [APP_SCREEN.PASSWORD_RECOVERY]: undefined;
  [APP_SCREEN.ADD_MAIL]: undefined;
  [APP_SCREEN.SIGN_UP]: undefined;
  [APP_SCREEN.CREATE_SUCCESS]: undefined;

  [APP_SCREEN.SETTING_NOTIFICATION]: undefined;
  [APP_SCREEN.SEARCH]: undefined;
  [APP_SCREEN.PRODUCT_DETAIL]: ProductDetailParams;
  [APP_SCREEN.REVIEW]: undefined;
  [APP_SCREEN.SHOPPING_CART]: undefined;
  [APP_SCREEN.BILLING_INFORMATION]: undefined;
  [APP_SCREEN.SELECT_ADDRESS]: undefined;
  [APP_SCREEN.ADD_SHIPPING_ADDRESS]: undefined;
  [APP_SCREEN.DETAIL_ORDER]: ProductDetailParams;
  [APP_SCREEN.CATEGORY_DETAIL]: CategoryProductsParams;
  [APP_SCREEN.NEWS_DETAILS]: NewsParams;
  [APP_SCREEN.POLICY]: undefined;
  [APP_SCREEN.TERM]: undefined;
  [APP_SCREEN.CHAT_WITH_US]: undefined;
  [APP_SCREEN.ACCOUNT_INFORMATION]: undefined;
  [APP_SCREEN.CHANGE_PASSWORD]: undefined;
  [APP_SCREEN.MY_ORDER]: MyOrderParams;
  [APP_SCREEN.CANCEL_ORDER]: undefined;
  [APP_SCREEN.REVIEW_PRODUCT]: undefined;
  [APP_SCREEN.FAVORITE_PRODUCTS]: undefined;
  [APP_SCREEN.MY_REVIEWS]: undefined;
  [APP_SCREEN.CATEGORY]: undefined;
  [APP_SCREEN.COMING_SOON]: undefined;

  [APP_SCREEN.FLIGHT_SEARCH_SCREEN]: undefined;
};

export type HomeRoutes = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.PROFILE]: undefined;
  [APP_SCREEN.NOTIFICATION]: undefined;
  [APP_SCREEN.NEWS]: undefined;
  [APP_SCREEN.CHAT_WITH_US]: undefined;
};

export type StackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
