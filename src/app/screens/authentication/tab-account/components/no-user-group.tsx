import React from 'react';

import { Block } from '@/library/components/block';
import { OutlineButton } from '@/library/components/button/outline-button';
import { PrimaryButton } from '@/library/components/button/primary-button';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import { APP_SCREEN } from '@navigation/screen-types';
import { useNavigation } from '@react-navigation/native';

export const NoUserGroup = () => {
  const { navigate } = useNavigation();

  // func
  const handleLogin = () => {
    navigate(APP_SCREEN.LOGIN);
  };

  const handleRegister = () => {
    navigate(APP_SCREEN.SIGN_UP);
  };

  // render
  return (
    <Block padding={16} colorTheme={'neutral_01'}>
      <Text
        preset="paragraph1Bold"
        colorTheme="Neutrals07"
        center
        t18n="account:welcome"
      />
      <Spacer height={4} />
      <Text
        preset="label"
        colorTheme="neutral_05"
        center
        t18n="account:login_to_enjoy"
      />
      <Spacer height={24} />
      <Block direction="row" middle alignSelf="center">
        <Block width={140}>
          <OutlineButton t18n="account:login" onPress={handleLogin} />
        </Block>
        <Spacer width={12} />
        <Block width={140}>
          <PrimaryButton onPress={handleRegister} t18n="account:register" />
        </Block>
      </Block>
    </Block>
  );
};
