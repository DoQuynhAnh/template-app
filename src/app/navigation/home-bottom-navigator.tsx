import ChatWithUs from '@/screens/authentication/chat-with-us';
import News from '@/screens/authentication/news';
import Notification from '@/screens/authentication/notification';
import TabAccount from '@/screens/authentication/tab-account';
import Hanvietair from '@/screens/han-viet-air/han-viet-air';
import { lightColors } from '@/themes/colors/light';
import HeadphonesIcon from '@assets/icon/svg/headphones-icon';
import IconHome from '@assets/icon/svg/home-bottom/icon-home';
import IconNews from '@assets/icon/svg/home-bottom/icon-news';
import IconNote from '@assets/icon/svg/home-bottom/icon-note';
import IconProfile from '@assets/icon/svg/home-bottom/icon-profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';
import { Platform } from 'react-native';
import { APP_SCREEN, HomeRoutes } from './screen-types';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator<HomeRoutes>();

const HomeIcon = ({ focused }: { focused: boolean }) => (
  <IconHome focused={focused} />
);
const CategoryIcon = ({ focused }: { focused: boolean }) => (
  <HeadphonesIcon focused={focused} color={focused ? '#2760ED' : '#23262F'} />
);
const NewsIcon = ({ focused }: { focused: boolean }) => (
  <IconNote focused={focused} />
);
const NotificationIcon = ({ color }: { color: string }) => (
  <IconNews color={color} />
);
const ProfileIcon = ({ focused }: { focused: boolean }) => (
  <IconProfile focused={focused} />
);

// Component Home với tham chiếu để cuộn lên đầu
const HomeScreen = () => {
  return <Hanvietair />;
};

function BottomTabNavigator() {
  const homeTabPressedRef = useRef(false);
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName={APP_SCREEN.HOME}
      screenOptions={{
        animation: 'shift',
        headerShown: false,
        tabBarActiveTintColor: lightColors.primaryBase,
        tabBarInactiveTintColor: lightColors.dark100,
        tabBarStyle: {
          backgroundColor: 'white',
          borderRadius: 5,
          borderTopWidth: 0,
          paddingVertical: 5,
          ...Platform.select({
            android: {
              elevation: 5,
            },
            ios: {
              shadowColor: '#000000',
              shadowOffset: { height: 0, width: 3 },
              shadowOpacity: 0.08,
              shadowRadius: 10,
            },
          }),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}>
      <Tab.Screen
        name={APP_SCREEN.NEWS}
        component={News}
        options={{
          tabBarLabel: t('news:header'),
          tabBarIcon: NewsIcon,
        }}
      />
      <Tab.Screen
        name={APP_SCREEN.CHAT_WITH_US}
        component={ChatWithUs}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: CategoryIcon,
        }}
      />
      <Tab.Screen
        name={APP_SCREEN.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: t('home:tab'),
          tabBarIcon: HomeIcon,
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            if (navigation.isFocused()) {
              e.preventDefault();
              homeTabPressedRef.current = true;
              navigation.navigate(APP_SCREEN.HOME);
            }
          },
        })}
      />
      <Tab.Screen
        name={APP_SCREEN.NOTIFICATION}
        component={Notification}
        options={{
          tabBarLabel: t('notification:header'),
          tabBarIcon: NotificationIcon,
        }}
      />
      <Tab.Screen
        name={APP_SCREEN.PROFILE}
        component={TabAccount}
        options={{
          tabBarLabel: t('account:tab'),
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
