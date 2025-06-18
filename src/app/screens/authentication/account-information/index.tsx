import { Block } from '@/library/components/block';
import { Screen } from '@/library/components/screen';
import { Spacer } from '@/library/components/spacer';
import { StackView } from '@/library/components/stack-view';
import Header from '@/library/components/ui/header';
import { FormUpdateUserType } from '@/model/user';
import { useProfileStore } from '@/zustands/profile';
import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { FormUpdateUser } from './components/form-update-user';
import {
  CLIENT_LOCAL,
  IClient,
  PayloadUpdateProfile,
  userUpdateProfile,
} from '../../../services/service-auth/login.api';
import { getItem, setItem } from '@/library/storage';
import { Gender } from '@/common/constant';

const AccountInformation = () => {
  const { styles } = useStyles(styleSheet);
  const rootRef = useRef<View>(null);
  const [t] = useTranslation();
  const { mutateAsync, isPending } = userUpdateProfile();
  const { setUserInfo } = useProfileStore();
  const client: IClient = useMemo(() => getItem(CLIENT_LOCAL), []);

  // func
  const handleSubmit = (data: FormUpdateUserType) => {
    mutateAsync({
      dob: data.birth,
      email: data.email === client.email ? undefined : data.email,
      fullname: data.name,
      gender: data.gender,
      phone: data.phone,
    } as PayloadUpdateProfile);

    setUserInfo({
      ...client,
      email: data.email ?? '',
      fullname: data.name,
      phone: data.phone,
      dob: data.birth,
      gender: data.gender as Gender,
    });
    setItem(CLIENT_LOCAL, {
      ...client,
      dob: data.birth,
      email: data.email,
      fullname: data.name,
      gender: data.gender,
      phone: data.phone,
    });
  };

  // render
  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <Header title={t('account_information:header')} />

        <StackView>
          <Block paddingHorizontal={15}>
            <Spacer height={24} />
            <FormUpdateUser onSubmit={handleSubmit} isPending={isPending} />
          </Block>
        </StackView>
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.primaryWhite,
    height: '100%',
  },
}));

export default AccountInformation;
