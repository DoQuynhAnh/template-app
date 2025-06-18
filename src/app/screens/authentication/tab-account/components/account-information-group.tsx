import React, { useMemo } from 'react';

import { Block } from '@/library/components/block';
import { Image } from '@/library/components/image';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import { APP_SCREEN } from '@/navigation/screen-types';
// import HeadphonesIcon from '@assets/icon/svg/headphones-icon';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import _EvilIcons from 'react-native-vector-icons/EvilIcons';
import _MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AccountInformationGroupProps } from '../type';
import {
  CLIENT_LOCAL,
  IClient,
} from '../../../../services/service-auth/login.api';
import { getItem } from '@/library/storage';
const EvilIcons = _EvilIcons as unknown as React.ElementType;
const MaterialCommunityIcons =
  _MaterialCommunityIcons as unknown as React.ElementType;

export const AccountInformationGroup = ({}: AccountInformationGroupProps) => {
  const {
    theme: { color },
  } = useStyles();
  const { navigate } = useNavigation();
  const client: IClient = useMemo(() => getItem(CLIENT_LOCAL), []);

  // render
  return (
    <Block padding={16} colorTheme="neutral_01">
      <Block direction="row">
        <Block block direction="row" middle>
          <TouchableOpacity
            onPress={() => navigate(APP_SCREEN.ACCOUNT_INFORMATION)}>
            <Block width={48} height={48} borderRadius={48} overflow={'hidden'}>
              <Image source={''} />
            </Block>
          </TouchableOpacity>
          <Block block marginLeft={8}>
            <TouchableOpacity
              onPress={() => navigate(APP_SCREEN.ACCOUNT_INFORMATION)}>
              <Text
                preset="paragraph1Bold"
                colorTheme="Neutrals07"
                numberOfLines={2}
                text={client?.fullname ?? 'account name'}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Block marginTop={5} direction="row" middle>
                <MaterialCommunityIcons
                  name="crown"
                  color={color.primaryBase}
                  size={16}
                />
                <Spacer width={4} />
                <Text
                  t18n="account:loyal_ccustomers"
                  colorTheme="primaryBase"
                  preset="label"
                />
                <EvilIcons
                  size={24}
                  name="chevron-right"
                  color={color.primaryBase}
                />
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
        {/* <TouchableOpacity onPress={() => navigate(APP_SCREEN.CHAT_WITH_US)}>
          <Block padding={5}>
            <HeadphonesIcon />
          </Block>
        </TouchableOpacity> */}
      </Block>
    </Block>
  );
};
