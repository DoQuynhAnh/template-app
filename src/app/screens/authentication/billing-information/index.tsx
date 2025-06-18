/* eslint-disable sortKeysFix/sort-keys-fix */
import React, { useRef, useState } from 'react';

import { CURRENCY } from '@/common/constant';
import { logout } from '@/common/method';
import { isSignIn } from '@/library/auth';
import { PrimaryButton } from '@/library/components/button/primary-button';
import { PostDelay } from '@/library/components/post-delay';
import { Screen } from '@/library/components/screen';
import { Spacer } from '@/library/components/spacer';
import Header from '@/library/components/ui/header';
import ItemCart from '@/library/components/ui/item-card/item-cart';
import { APP_SCREEN } from '@/navigation/screen-types';
import { handleNavigate } from '@/utils';
import { useAuthStore } from '@/zustands/auth';
import { useShopingCartStore } from '@/zustands/shopping-cart';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
// import { PayInformation } from './components/pay-information';
import PopupBuyNow from './components/popup-buy-now';
import { SelectAddressSection } from './components/select-address-section';
import { SelectPayTypeSection } from './components/select-pay-type-section';
import { userGetShippingAddresses } from '../../../services/service-auth/login.api';
import {
  ICartItem,
  useCreateOrders,
} from '../../../services/service-order/order.api';
import { useTranslation } from 'react-i18next';

export const BillingInformation = () => {
  const { data: addresses } = userGetShippingAddresses();
  const { mutateAsync, isPending } = useCreateOrders();
  const { t } = useTranslation();

  const { styles } = useStyles(styleSheet);
  const rootRef = useRef<View>(null);
  const { productChose } = useShopingCartStore();
  const [visible, setVisible] = useState<boolean>(false);
  const navigation = useNavigation();
  const { setIsAuth } = useAuthStore();

  const onCreateOrder = async () => {
    const { errorCode, data: response } = await mutateAsync({
      orderItems: productChose.map(e => ({
        cartId: e._id,
      })),
      addressId: addresses?.find(e => e.isDefault)?._id ?? '',
    });

    if (errorCode !== 0) {
      return;
    }

    navigation.navigate(APP_SCREEN.DETAIL_ORDER, {
      _id: response?._id ?? '681a3f8417fce860e8d48488',
      // _id: '681a3f8417fce860e8d48488'
    });
  };

  const renderRowTotal = () => {
    return (
      <View
        style={{
          display: 'flex',
          padding: 16,
          flexDirection: 'row',
          borderTopWidth: 1,
          borderTopColor: '#B1B5C3',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              fontSize: 14,
              color: '#23262F',
            }}>
            {t('billing_information:total')}
          </Text>
          <Spacer height={4} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#F80000',
            }}>
            {productChose
              .reduce((a, b) => a + (b.sku?.priceSell ?? 0), 0)
              .toLocaleString()}{' '}
            {CURRENCY}
          </Text>
        </View>
        <PrimaryButton
          loading={isPending}
          text={`${t('product:buy_now')} ${productChose?.length}`}
          onPress={() => {
            handleNavigate(
              () => onCreateOrder(),
              isSignIn() ? 'signIn' : 'signOut',
              () => {
                logout(setIsAuth);
                navigation.navigate(APP_SCREEN.LOGIN);
              },
            );
          }}
        />
      </View>
    );
  };

  // render
  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        scroll
        backgroundColor={'transparent'}>
        <Header title={t('billing_information:header')} />
        <PostDelay>
          <SelectAddressSection />
          <View style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }} />
          <Spacer height={12} />
          <View style={{ paddingHorizontal: 15, gap: 10 }}>
            {productChose.map(e => (
              <ItemCart key={e._id} data={e as unknown as ICartItem} />
            ))}
          </View>
          <View style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }} />
          <SelectPayTypeSection />
          <View style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }} />
          {/* <PayInformation /> */}
          <View style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }} />
        </PostDelay>
      </Screen>
      {renderRowTotal()}
      <PopupBuyNow setVisible={setVisible} visible={visible} />
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.white01,
    flex: 1,
    paddingBottom: 15,
    paddingTop: 0,
    position: 'relative',
  },
}));
