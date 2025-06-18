import React from 'react';

import { ItemNavigate } from './item-navigate';
import { Block } from '@/library/components/block';
import VerifiedUserIcon from '@assets/icon/svg/account/profile-tick';
import LocationPinIcon from '@assets/icon/svg/account/address';
import LockIcon from '@assets/icon/svg/account/unlock';
import { useNavigation } from '@react-navigation/native';
import { APP_SCREEN } from '@/navigation/screen-types';
import { TypeScreenEmun, useSelectAddressStore } from '@/zustands/address';

export const AccountSettingGroup = () => {
  const { navigate } = useNavigation();

  const { setTypeScreen } = useSelectAddressStore();

  // render
  return (
    <Block padding={15} colorTheme="neutral_01">
      <ItemNavigate
        onPress={() => navigate(APP_SCREEN.ACCOUNT_INFORMATION)}
        title="account:account_info"
        leftIcon={<VerifiedUserIcon />}
      />
      <ItemNavigate
        onPress={() => {
          navigate(APP_SCREEN.SELECT_ADDRESS);
          setTypeScreen(TypeScreenEmun.ADDRESS_ACCOUNT);
        }}
        title="account:address"
        leftIcon={<LocationPinIcon />}
      />
      <ItemNavigate
        onPress={() => {
          navigate(APP_SCREEN.CHANGE_PASSWORD);
        }}
        title="account:change_password"
        leftIcon={<LockIcon />}
      />
    </Block>
  );
};
