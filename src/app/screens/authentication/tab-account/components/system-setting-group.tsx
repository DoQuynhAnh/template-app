import React, { useRef } from 'react';

import { APP_SCREEN } from '@navigation/screen-types';

import { ItemNavigate } from './item-navigate';
// import { PopupSelectLanguage } from './popup-select-language';

import { Block } from '@/library/components/block';
import { useProfileStore } from '@/zustands/profile';
import InfoIcon from '@assets/icon/svg/account/info-circle';
import LanguageCircle from '@assets/icon/svg/account/language-circle';
import MessageIcon from '@assets/icon/svg/account/message';
import ShieldIcon from '@assets/icon/svg/account/security-user';
import SecurityIcon from '@assets/icon/svg/account/shield-security';
import { useNavigation } from '@react-navigation/native';
import { PopupSelectLanguageRef } from '../type';
import { PopupSelectLanguage } from './popup-select-language';

export const SystemSettingGroup = () => {
  const { navigate } = useNavigation();

  // state
  const { userInfor: profile } = useProfileStore();
  const selectLanguageRef = useRef<PopupSelectLanguageRef>(null);

  // func
  const handleSelectLanguage = () => {
    selectLanguageRef.current?.show();
  };

  // render
  return (
    <Block padding={15}>
      <ItemNavigate
        onPress={handleSelectLanguage}
        title="account:language"
        description="account:current_language"
        leftIcon={<LanguageCircle />}
      />
      <ItemNavigate
        onPress={() => navigate(APP_SCREEN.POLICY)}
        title="account:policy"
        leftIcon={<SecurityIcon />}
      />
      <ItemNavigate
        onPress={() => navigate(APP_SCREEN.TERM)}
        title="account:term"
        leftIcon={<ShieldIcon />}
      />
      {profile ? (
        <ItemNavigate
          onPress={() => navigate(APP_SCREEN.CHAT_WITH_US)}
          title="account:chat_with_us"
          leftIcon={<MessageIcon />}
        />
      ) : null}
      <ItemNavigate title="account:about_us" leftIcon={<InfoIcon />} />
      <PopupSelectLanguage ref={selectLanguageRef} />
    </Block>
  );
};
