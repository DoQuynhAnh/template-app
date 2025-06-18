import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';
import { APP_SCREEN } from '@/navigation/screen-types';
import { getCarts } from '../../../services/service-order/order.api';
import ShoppingBag from '@assets/icon/svg/shopping-bag';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import _EvilIcons from 'react-native-vector-icons/EvilIcons';
import AppLogo2 from '@assets/icon/svg/app-logo2';
import BackButton from '@/library/components/back-button';
import { useTranslation } from 'react-i18next';
const EvilIcons = _EvilIcons as unknown as React.ElementType;

const Header = ({ isShowBack }: { isShowBack?: boolean }) => {
  const {
    styles,
    theme: { color },
  } = useStyles(styleSheet);
  const isFocused = useIsFocused();
  const { t } = useTranslation();

  const { data: cartLength, refetch } = getCarts();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return (
    <View style={styles.root}>
      <View style={[styles.wrap, styles.commonFlex]}>
        {isShowBack && <BackButton color='#fff' />}
        {/* <AppLogo /> */}
        {!isShowBack && <Block width={'6%'} />}
        <AppLogo2 />
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
        </View>
      </View>

      <TouchableOpacity
        style={styles.wrapText}
        onPress={() => {
          // navigation.navigate(APP_SCREEN.SEARCH);
          console.log('navigate to search');
        }}>
        <EvilIcons name="search" size={24} color={color.primaryWhite} />
        <Text style={styles.placeholder}>{t('search_product:search_placeholder')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  commonFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  parentCountItemShop: {
    position: 'relative',
  },
  placeholder: {
    color: color.primaryWhite,
    fontSize: 14,
    paddingLeft: 5,
    fontWeight: 600,
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
    // justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 18,
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    width: Dimensions.get('screen').width - 30,
    // border: 1px solid ${color.primaryWhite},
    borderWidth: 1,
    borderColor: color.primaryWhite,
    marginTop: 10,
  },
}));

export default Header;
