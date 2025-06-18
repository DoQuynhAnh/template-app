import BackButton from '@/library/components/back-button';
import { APP_SCREEN } from '@/navigation/screen-types';
import IconNotification from '@assets/icon/svg/icon-notification';
import SearchNormal from '@assets/icon/svg/search-normal';
import ShoppingBag from '@assets/icon/svg/shopping-bag';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { getNoticationsCount } from '../../../../services/notifications/notifications.api';
import { getCarts } from '../../../../services/service-order/order.api';
import { useTranslation } from 'react-i18next';

const HeaderHome = () => {
  const { styles } = useStyles(styleSheet);
  const navigation = useNavigation();
  const { data: cartLength, refetch: refetchCartLength } = getCarts();
  const { data, refetch } = getNoticationsCount();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refetchCartLength();
      refetch();
    }
  }, [isFocused]);
  const { t } = useTranslation();

  return (
    <View style={styles.root}>
      <View style={[styles.wrap, styles.commonFlex, { alignItems: 'center' }]}>
        <BackButton color="#fff" customBack={() => navigation.navigate(APP_SCREEN.HOME)} />
        {/* <AppLogo /> */}
        <TouchableOpacity
          style={styles.wrapText}
          onPress={() => {
            navigation.navigate(APP_SCREEN.SEARCH);
            console.log('navigate to search');
          }}>
          <SearchNormal />
          <Text style={styles.placeholder}>{t('search_product:search_placeholder')}</Text>
        </TouchableOpacity>

        <View
          style={[
            styles.commonFlex,
            styles.wrapButton,
            { alignItems: 'center' },
          ]}>
          <TouchableOpacity
            style={styles.parentCountItemShop}
            onPress={() => navigation.navigate(APP_SCREEN.SHOPPING_CART)}>
            {cartLength?.pagination?.totalRows && (
              <Text style={styles.positionCountItemShop}>
                {cartLength?.pagination?.totalRows}
              </Text>
            )}
            <ShoppingBag />
          </TouchableOpacity>
          <TouchableOpacity
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            onPress={() => navigation.navigate(APP_SCREEN.NOTIFICATION)}>
            {data?.unreadCount !== 0 && (
              <Text style={styles.positionCountItemShop}>
                {data?.unreadCount}
              </Text>
            )}
            {/* > */}
            <IconNotification />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  commonFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parentCountItemShop: {
    position: 'relative',
  },
  placeholder: {
    color: color.Neutrals09,
    fontSize: 12,
    paddingLeft: 5,
  },
  positionCountItemShop: {
    backgroundColor: color.danger550,
    borderRadius: '50%',
    color: color.primaryWhite,
    fontSize: 12,
    left: 12,
    padding: 2,
    paddingHorizontal: 6,
    position: 'absolute',
    top: -8,
    zIndex: 2,
  },
  root: {
    backgroundColor: color.primaryBase,
    padding: 15,
    paddingBottom: 35,
  },
  wrap: {
    width: '100%',
  },
  wrapButton: {
    gap: 15,
    marginBottom: 7,
  },
  wrapText: {
    alignItems: 'center',
    backgroundColor: color.primaryWhite,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    width: Dimensions.get('screen').width * 0.65,
  },
}));

export default HeaderHome;
