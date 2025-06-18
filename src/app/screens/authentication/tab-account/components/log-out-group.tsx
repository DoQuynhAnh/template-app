import { logout } from '@/common/method';
import { Block } from '@/library/components/block';
import { OutlineButton } from '@/library/components/button/outline-button';
import { showConfirm } from '@/library/components/popup';
import { APP_SCREEN } from '@/navigation/screen-types';
import { useAuthStore } from '@/zustands/auth';
import { useProfileStore } from '@/zustands/profile';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const LogOutGroup = () => {
  const [t] = useTranslation();
  const { setIsAuth } = useAuthStore();
  const { navigate } = useNavigation();
  const { setUserInfo } = useProfileStore();

  // func
  const handleConfirmLogout = () => {
    showConfirm({
      content: t('account:ask_logout'),
      title: t('account:logout'),
      rightPress: () => {
        logout(setIsAuth);
        setTimeout(() => {
          navigate(APP_SCREEN.LOGIN);
        }, 300);

        setUserInfo(undefined);
      },
      rightButton: t('account:yes'),
    });
  };

  // render
  return (
    <Block padding={16} colorTheme="neutral_01" paddingVertical={4}>
      <OutlineButton t18n="account:logout" onPress={handleConfirmLogout} />
    </Block>
  );
};
