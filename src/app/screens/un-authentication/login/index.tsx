/* eslint-disable no-inline-comments */
import React, { useEffect, useRef, useState } from 'react';

import { createStyleSheet, useStyles } from 'react-native-unistyles';

import FbIcon from '@assets/icon/svg/fb-icon';
import GgIcon from '@assets/icon/svg/gg-icon';
import { Divider } from '@components/divider';
import { Screen } from '@components/screen';
import { View } from '@rn-core';
import { Platform, Text, TouchableOpacity } from 'react-native';
import LoginForm from './components/login-form';
import { GoogleService } from '@/common/social-login';
import PushNotification from 'react-native-push-notification';
import { useTranslation } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import { userLoginOAuth } from '../../../services/service-auth/login.api';

export const Login = () => {
  const rootRef = useRef<View>(null);
  const { styles } = useStyles(styleSheet);
  const { mutateAsync } = userLoginOAuth();
  const { init, login } = GoogleService;
  const [deviceToken, setDeviceToken] = useState('');

  useEffect(() => {
    init();

    if (Platform.OS === 'ios') {
      DeviceInfo.getDeviceToken().then(deviceToken => {
        setDeviceToken(deviceToken);
        console.log('Device Token:', deviceToken);
        // Gửi deviceToken đến server của bạn để gửi thông báo đẩy
      });
    }

    if (Platform.OS === 'android') {
      PushNotification.configure({
        onRegister: function (token) {
          console.log('TOKEN:', token); // Log cả đối tượng token
          console.log('TOKEN STRING:', token.token);
          console.log('TOKEN OS:', token.os); // Hiển thị nền tảng (ios/android)
        },

        //    Notifications.events().registerRemoteNotificationsRegistered(event => {
        //   // TODO: Send the token to my server so it could send back push notifications...
        //   console.log('Device Token Received', event.deviceToken)
        // })
        // Các cấu hình khác theo nhu cầu
        // permissions: {
        //   alert: true,
        //   badge: true,
        //   sound: true,
        // },
        // popInitialNotification: true,
        // requestPermissions: true,
      });
    }
  }, []);

  const handleLoginGG = async () => {
    const { success, token } = await login();
    console.log({ success, token });
    if (success && token) {
      const {} = await mutateAsync({
        deviceToken,
        provider: 'GOOGLE',
        token,
      });
    }
  };

  const { t } = useTranslation();

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <View>
          <Text style={styles.textHeader}>{t('login:header')}</Text>
        </View>
        <LoginForm />
        <View
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <View style={styles.wrapsociallogin}>
            <View
              style={{
                width: 100,
              }}>
              <Divider />
            </View>
            <Text
              style={{
                color: '#B1B5C3',
                fontSize: 14,
              }}>
              {t('common:or')}
            </Text>
            <View
              style={{
                width: 100,
              }}>
              <Divider />
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 7,
              marginTop: 10,
            }}>
            <TouchableOpacity>
              <FbIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLoginGG}>
              <GgIcon />
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.background,
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 0,
  },
  rowItem: {
    alignItems: 'center',
    columnGap: 8,
    flexDirection: 'row',
    paddingVertical: 15,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: '15%',
    marginTop: '25%',
  },
  wrapsociallogin: {
    // marginHorizontal: 'auto',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 7,
    justifyContent: 'space-between',
    marginTop: 15,
  },
}));
