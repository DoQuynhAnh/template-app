import { Screen } from '@/library/components/screen';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { AccountInformationGroup } from './components/account-information-group';
import { useProfileStore } from '@/zustands/profile';
import { Spacer } from '@/library/components/spacer';
import { NoUserGroup } from './components/no-user-group';
import { SystemSettingGroup } from './components/system-setting-group';
import { OrderManageGroup } from './components/order-manage-group';
import { AccountSettingGroup } from './components/account-setting-group';
import { ItemNavigate } from './components/item-navigate';
import HeartMessageIcon from '@assets/icon/svg/account/box-favorite';
import { Block } from '@/library/components/block';
import { LogOutGroup } from './components/log-out-group';
import { useNavigation } from '@react-navigation/native';
import { APP_SCREEN } from '@/navigation/screen-types';
import { getStatusSign } from '@/library/auth/utils';

const TabAccount = () => {
  const rootRef = useRef<View>(null);
  const { styles } = useStyles(styleSheet);
  const { userInfor } = useProfileStore();
  const { navigate } = useNavigation();

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        scroll
        backgroundColor={'transparent'}>
        {getStatusSign() ? (
          <AccountInformationGroup profile={userInfor} />
        ) : (
          <>
            <Spacer height={8} />
            <NoUserGroup />
          </>
        )}
        <View style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }} />
        {getStatusSign() ? (
          <>
            <Spacer height={8} />
            <OrderManageGroup />
            <View style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }} />
            <AccountSettingGroup />
            <View style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }} />
            <Block paddingHorizontal={15} paddingVertical={7}>
              <ItemNavigate
                onPress={() => navigate(APP_SCREEN.FAVORITE_PRODUCTS)}
                title="account:favorite_product"
                leftIcon={<HeartMessageIcon />}
                description="account:products"
                descriptionOption={{ count: 17 }}
              />
            </Block>
            <View style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }} />
          </>
        ) : null}
        <SystemSettingGroup />

        {getStatusSign() ? <LogOutGroup /> : null}
        <Block height={10} />
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.background,
    flex: 1,
    paddingTop: 0,
  },
}));

export default TabAccount;
