import React, { useRef } from 'react';

import { Block } from '@/library/components/block';
import { PrimaryButton } from '@/library/components/button/primary-button';
// import { PostDelay } from '@/library/components/post-delay';
import { Screen } from '@/library/components/screen';
import Header from '@/library/components/ui/header';
import { ScrollView, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import OrderCode from './components/order-code';
import { ShopGroup } from './components/shop-group';
import { PayTypeSection } from './components/pay-type-section';
import { FollowOrderSection } from './components/follow-order-section';
// import { PayInformation } from './components/pay-information';
import { useNavigation } from '@react-navigation/native';
import { APP_SCREEN, StackScreenProps } from '@/navigation/screen-types';
import { SelectAddressSection } from '../billing-information/components/select-address-section';
import { getOrderDetail } from '../../../services/service-order/order.api';
import { Loading } from '@/library/components/post-delay/loading';
import { useTranslation } from 'react-i18next';
// MaterialIcons
// const MaterialIcons = _MaterialIcons as unknown as React.ElementType;

export const DetailOrder = ({
  route: { params },
}: StackScreenProps<APP_SCREEN.DETAIL_ORDER>) => {
  const { isFetching, data } = getOrderDetail(params._id);
  const rootRef = useRef<View>(null);
  const { styles } = useStyles(styleSheet);
  const { navigate } = useNavigation();
  const {t} = useTranslation()

  // render
  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        // scroll
        backgroundColor={'transparent'}>
        {/* APP_SCREEN.CHAT_WITH_US */}
        <Header
          title={t('detail_order:header')}
          isShowLeft={false}
          // renderRight={() => (
          //   <TouchableOpacity onPress={() => navigate(APP_SCREEN.CHAT_WITH_US)}>
          //     <MaterialIcons name={'support-agent'} size={24} />
          //   </TouchableOpacity>
          // )}
        />
        <ScrollView>
          {isFetching ? (
            <Loading />
          ) : (
            <>
              <SelectAddressSection />
              <View style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }} />
              <OrderCode order={data} />
              <View style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }} />
              <ShopGroup order={data} />
              <View style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }} />
              <PayTypeSection />
              <View style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }} />
              <FollowOrderSection />
              <View style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }} />
              {/* <PayInformation /> */}
            </>
          )}
        </ScrollView>
        <Block padding={15}>
          <PrimaryButton
            text={t('detail_order:re_buy')}
            onPress={() =>
              navigate(APP_SCREEN.HAN_VIET_AIR)
            } 
          />
        </Block>
      </Screen>
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
