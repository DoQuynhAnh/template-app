import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';
import { useStyles } from 'react-native-unistyles';

import { APP_SCREEN } from '@navigation/screen-types';
import { createStaticNavigation, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPasswordVerified from '@screens/un-authentication/forgot-password-verified';
import { Login } from '@screens/un-authentication/login';

import AccountInformation from '@/screens/authentication/account-information';
import AddShippingAddress from '@/screens/authentication/add-shipping-address';
import { BillingInformation } from '@/screens/authentication/billing-information';
import { CancelOrder } from '@/screens/authentication/cancel-order';
import CategoryDetail from '@/screens/authentication/category-detail';
import { ChangePassword } from '@/screens/authentication/change-password';
import ChatWithUs from '@/screens/authentication/chat-with-us';
import DetailNews from '@/screens/authentication/detail-news';
import { DetailOrder } from '@/screens/authentication/detail-order';
import { FavoriteProducts } from '@/screens/authentication/favorite-products';
import { MyOrder } from '@/screens/authentication/my-order';
import { MyReviews } from '@/screens/authentication/my-reviews';
import { Policy } from '@/screens/authentication/policy';
import ProductDetail from '@/screens/authentication/product-detail';
import Review from '@/screens/authentication/review';
import { ReviewProduct } from '@/screens/authentication/review-product';
import Search from '@/screens/authentication/search';
import SelectAddress from '@/screens/authentication/select-address';
import SettingNotification from '@/screens/authentication/setting-notification';
import ShoppingCart from '@/screens/authentication/shopping-cart';
import { Term } from '@/screens/authentication/term';
import OtpConfirm from '@/screens/un-authentication/otp-confirm';
import PasswordRecovery from '@/screens/un-authentication/password-recovery';
import AddMail from '@/screens/un-authentication/register/add-mail';
import CreateSuccess from '@/screens/un-authentication/register/create-success';
import SignUp from '@/screens/un-authentication/register/sign-up';
import { useAuthStore } from '../zustands/auth';
import BottomTabNavigator from './home-bottom-navigator';
import { navigationRef } from './navigation-service';
import TabCategory from '@/screens/authentication/tab-category';
import { Home } from '@/screens/authentication/home';
import Notification from '@/screens/authentication/notification';
import ComingSoon from '@/screens/authentication/coming-soon';
import FlightSearchScreen from '@/screens/flight-search-screen';

const useAppLoggedIn = () => {
  const { isAuth } = useAuthStore();

  return isAuth;
};

const useAppLoggedOut = () => {
  return !useAppLoggedIn();
};

const RootStack = createNativeStackNavigator({
  groups: {
    // Các màn hình công khai mà tất cả người dùng đều có thể truy cập không cần đăng nhập
    [APP_SCREEN.PUBLIC]: {
      screenOptions: {
        headerShown: false,
      },
      screens: {
        [APP_SCREEN.HOME]: BottomTabNavigator,
        [APP_SCREEN.HAN_VIET_AIR]: Home,
        [APP_SCREEN.SETTING_NOTIFICATION]: SettingNotification,
        [APP_SCREEN.SEARCH]: Search,
        [APP_SCREEN.PRODUCT_DETAIL]: ProductDetail,
        [APP_SCREEN.CATEGORY_DETAIL]: CategoryDetail,
        [APP_SCREEN.NEWS_DETAILS]: DetailNews,
        [APP_SCREEN.REVIEW]: Review,
        [APP_SCREEN.POLICY]: Policy,
        [APP_SCREEN.TERM]: Term,
        [APP_SCREEN.SHOPPING_CART]: ShoppingCart,
        [APP_SCREEN.CATEGORY]: TabCategory,
        [APP_SCREEN.NOTIFICATION]: Notification,
        [APP_SCREEN.COMING_SOON]: ComingSoon,

        [APP_SCREEN.FLIGHT_SEARCH_SCREEN]: FlightSearchScreen,
      },
    },
    // Màn hình yêu cầu người dùng đăng nhập
    [APP_SCREEN.UN_AUTHORIZE]: {
      if: useAppLoggedIn,
      screenOptions: {
        headerShown: false,
      },
      screens: {
        [APP_SCREEN.BILLING_INFORMATION]: BillingInformation,
        [APP_SCREEN.SELECT_ADDRESS]: SelectAddress,
        [APP_SCREEN.ADD_SHIPPING_ADDRESS]: {
          screen: AddShippingAddress,
        },
        [APP_SCREEN.DETAIL_ORDER]: DetailOrder,
        [APP_SCREEN.CHAT_WITH_US]: ChatWithUs,
        [APP_SCREEN.ACCOUNT_INFORMATION]: AccountInformation,
        [APP_SCREEN.CHANGE_PASSWORD]: ChangePassword,
        [APP_SCREEN.MY_ORDER]: MyOrder,
        [APP_SCREEN.CANCEL_ORDER]: CancelOrder,
        [APP_SCREEN.REVIEW_PRODUCT]: ReviewProduct,
        [APP_SCREEN.FAVORITE_PRODUCTS]: FavoriteProducts,
        [APP_SCREEN.MY_REVIEWS]: MyReviews,
      },
    },
    // Màn hình đăng nhập và đăng ký
    [APP_SCREEN.AUTHORIZE]: {
      if: useAppLoggedOut,
      screenOptions: {
        headerShown: false,
      },
      screens: {
        [APP_SCREEN.LOGIN]: {
          screen: Login,
        },
        [APP_SCREEN.FORGOT_PASSWORD_VERIFIED]: {
          screen: ForgotPasswordVerified,
        },
        [APP_SCREEN.OTP_CONFIRM]: {
          screen: OtpConfirm,
        },
        [APP_SCREEN.PASSWORD_RECOVERY]: {
          screen: PasswordRecovery,
        },
        [APP_SCREEN.ADD_MAIL]: {
          screen: AddMail,
        },
        [APP_SCREEN.SIGN_UP]: {
          screen: SignUp,
        },
        [APP_SCREEN.CREATE_SUCCESS]: {
          screen: CreateSuccess,
        },
      },
    },
  },
  screenOptions: {
    freezeOnBlur: true,
    navigationBarColor: '#ffffff',
    statusBarTranslucent: true,
  },
});

const Navigation = createStaticNavigation(RootStack);

export const RootNavigation = () => {
  // state

  const { theme } = useStyles();

  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      BootSplash.hide({ fade: true });
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  // render
  return (
    <Navigation
      ref={navigationRef}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.color.background,
        },
      }}
    />
  );
};
