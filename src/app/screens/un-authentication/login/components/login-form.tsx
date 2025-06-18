import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';

import { useAuth } from '@/library/auth';
import { setStatusSign } from '@/library/auth/utils';
import { useAuthStore } from '@/zustands/auth';
import { useProfileStore } from '@/zustands/profile';
import { PrimaryButton } from '@components/button/primary-button';
import { ControlledInput } from '@components/input';
import { APP_SCREEN } from '@navigation/screen-types';
import { useNavigation } from '@react-navigation/native';
import { View } from '@rn-core';
import { lightColors } from '@theme/colors/light';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  CLIENT_LOCAL,
  userLogin,
  UserLoginBody,
} from '../../../../services/service-auth/login.api';
import { FormType, schema } from '../type';
import { setItem } from '@/library/storage';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { mutateAsync, isPending } = userLogin();
  const { t } = useTranslation();

  const navigation = useNavigation();
  const { setUserInfo } = useProfileStore();
  const { setIsAuth } = useAuthStore();
  const signIn = useAuth.use.signIn();

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: 'admin@gmail.com',
      password: 'Admin@123',
    },
  });

  const onSubmit = async (data: FormType) => {
    const { client, payload } = await mutateAsync(data as UserLoginBody);

    setStatusSign(true);
    setIsAuth(true);
    signIn({
      access: payload.accessToken,
      refresh: 'payload.refreshToken',
    });
    setUserInfo(client);
    setItem(CLIENT_LOCAL, client);
  };

  return (
    <View style={styleSheet.container}>
      <ControlledInput
        control={control}
        name="username"
        label={'Username'}
        placeholder={'Username ...'}
      />
      <View style={styleSheet.wrapFieldPass}>
        <ControlledInput
          control={control}
          name="password"
          label={t('login:password')}
          placeholder={t('login:password_placeholder')}
          secureTextEntry={true}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(APP_SCREEN.FORGOT_PASSWORD_VERIFIED)
          }>
          <Text
            style={{
              color: lightColors.primaryBase,
              fontSize: 12,
              fontWeight: '500',
              textAlign: 'right',
            }}>
            {t('login:forgot_password')}
          </Text>
        </TouchableOpacity>
      </View>

      <PrimaryButton
        onPress={handleSubmit(onSubmit)}
        text={t('login:header')}
        loading={isPending}
      />

      <View
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 12,
            marginVertical: 15,
            textAlign: 'center',
          }}>
          {t('login:no_account')}{' '}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(APP_SCREEN.ADD_MAIL)}>
          <Text
            style={{
              color: lightColors.primaryBase,
              fontSize: 12,
              fontWeight: '500',
            }}>
            {' '}
            {t('login:register')}{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styleSheet = StyleSheet.create({
  container: {
    gap: 10,
    // marginTop: '10%',
  },
  wrapFieldPass: {
    marginBottom: 15,
  },
});

export default LoginForm;
