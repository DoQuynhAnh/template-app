/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable sortKeysFix/sort-keys-fix */
import { CURRENCY } from '@/common/constant';
import { logout } from '@/common/method';
import { isSignIn } from '@/library/auth';
import { PrimaryButton } from '@/library/components/button/primary-button';
import { Checkbox } from '@/library/components/checkbox';
import { Text } from '@/library/components/core';
import { Loading } from '@/library/components/post-delay/loading';
import { Screen } from '@/library/components/screen';
import { Spacer } from '@/library/components/spacer';
import Header from '@/library/components/ui/header';
import ItemCart from '@/library/components/ui/item-card/item-cart';
import { APP_SCREEN } from '@/navigation/screen-types';
import { handleNavigate } from '@/utils';
import { useAuthStore } from '@/zustands/auth';
import { useShopingCartStore } from '@/zustands/shopping-cart';
import EmptyStateSvg from '@assets/icon/svg/empty-state';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import _Feather from 'react-native-vector-icons/Feather';
import {
  cartsRemoveAll,
  getCarts,
  ICartItem,
} from '../../../services/service-order/order.api';
import { useTranslation } from 'react-i18next';
const Feather = _Feather as unknown as React.ElementType;

const ShoppingCart = () => {
  const {
    styles,
    theme: { color },
  } = useStyles(styleSheet);
  const rootRef = useRef<View>(null);
  const { products, setProducts, setProductsChose } = useShopingCartStore();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const navigator = useNavigation();

  const { data, isFetching } = getCarts();
  const { mutateAsync, isPending } = cartsRemoveAll();
  const [productCards, setProductCards] = useState<ICartItem[]>([]);
  const { setIsAuth } = useAuthStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (data?.hits) {
      setProducts(data.hits);
    }
  }, [data?.hits]);

  useEffect(() => {
    setIsCheckAll(productCards.length === products.length);
  }, [productCards, products]);

  useEffect(() => {
    setProductsChose(productCards);
  }, [productCards]);

  const onCreateOrder = async () => {
    navigator.navigate(APP_SCREEN.BILLING_INFORMATION);
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
            {
              <>
                {productCards
                  .reduce((a, b) => a + (b.sku?.priceSell ?? 0), 0)
                  .toLocaleString()}{' '}
                {CURRENCY}
              </>
            }
          </Text>
        </View>
        <PrimaryButton
          // loading={isPending}
          text={`${t('product:buy_now')} ${productCards?.length}`}
          onPress={() =>
            handleNavigate(
              () => onCreateOrder(),
              isSignIn() ? 'signIn' : 'signOut',
              () => {
                logout(setIsAuth);
                navigator.navigate(APP_SCREEN.LOGIN);
              },
            )
          }
        />
      </View>
    );
  };

  const handleRemoteAll = async () => {
    await mutateAsync({
      ids: products.map(e => e._id),
    });
    setProducts([]);
    setProductCards([]);
    setIsCheckAll(false);
    setProductsChose([]);
  };

  useEffect(() => {
    if (products.length === 0) {
      setProductCards([]);
      setIsCheckAll(false);
      setProductsChose([]);
      
    }
  }, [products]);

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        // scroll
        backgroundColor={'transparent'}>
        <Header
          title={t('card:header')}
          renderRight={() => (
            <TouchableOpacity onPress={() => handleRemoteAll()}>
              <Feather name="trash-2" color="#FF0000" size={18} />
            </TouchableOpacity>
          )}
        />
        <ScrollView>
          <View
            style={{
              backgroundColor: '#F4F5F6',
            }}>
            {products.length !== 0 && (
              <>
                <View style={styles.wrapCheckBox}>
                  <Checkbox
                    onToggle={e => {
                      setIsCheckAll(e);
                      e ? setProductCards(products) : setProductCards([]);
                    }}
                    value={isCheckAll}
                  />

                  <Text style={{ ...styles.textStyle, paddingLeft: 7 }}>
                    {t('card:all')}{' '}
                  </Text>
                  <Text
                    style={{
                      ...styles.textStyle,
                      fontWeight: 600,
                      fontSize: 16,
                    }}>
                    ({products.length})
                  </Text>
                </View>
                <View
                  style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }}
                />
              </>
            )}
            <View
              style={{
                padding: 15,
                backgroundColor: color.primaryWhite,
                height: '100%',
              }}>
              {isFetching || isPending ? (
                <Loading />
              ) : (
                <>
                  {products.length !== 0 ? (
                    products.map((e, i) => (
                      <ItemCart
                        key={e._id + i}
                        isCheckAll={isCheckAll}
                        isShowCheckBox
                        isShowFooter
                        data={e}
                        onPress={() => {
                          setProductCards(prev => {
                            const isExist = prev.findIndex(
                              item => item._id === e._id,
                            );
                            if (isExist !== -1) {
                              prev.splice(isExist, 1);
                              return [...prev];
                            }
                            return [...prev, e];
                          });
                        }}
                      />
                    ))
                  ) : (
                    <View
                      style={{ marginHorizontal: 'auto', marginTop: '40%' }}>
                      <EmptyStateSvg />
                      <Text style={{ textAlign: 'center', marginBottom: 25 }}>
                        text={t('card:empty')}
                      </Text>

                      <PrimaryButton
                        text={t('card:continue_shopping')}
                        onPress={() => navigator.goBack()}
                      />
                    </View>
                  )}
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </Screen>
      {productCards.length !== 0 && renderRowTotal()}
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
  wrapCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: color.primaryWhite,
  },
  textStyle: {
    color: color.Neutrals07,
    fontSize: 14,
  },
}));

export default ShoppingCart;
