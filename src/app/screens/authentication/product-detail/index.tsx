import { Block } from '@/library/components/block';
import { PrimaryButton } from '@/library/components/button/primary-button';
import { Loading } from '@/library/components/post-delay/loading';
import { Screen } from '@/library/components/screen';
import { useModal } from '@/library/components/select/modal';
import { APP_SCREEN, StackScreenProps } from '@/navigation/screen-types';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import _AntDesign from 'react-native-vector-icons/AntDesign';
import { getProductDetail } from '../../../services/service-products/products.api';
import BottomSheetOrder from './components/bottom-sheet-order';
import HeaderWithButton from './components/header-with-button';
import ProductImage from './components/product-image';
import ProductSection from './components/product-section';
import Reviews from './components/reviews';
import SimilarProducts from './components/similar-products';
import {
  cartsUpdate,
  getCarts,
} from '../../../services/service-order/order.api';
import { useShopingCartStore } from '@/zustands/shopping-cart';
import { useTranslation } from 'react-i18next';
const AntDesign = _AntDesign as unknown as React.ElementType;

const ProductDetail = ({
  route: { params },
}: StackScreenProps<APP_SCREEN.PRODUCT_DETAIL>) => {
  const { mutateAsync, isPending } = cartsUpdate();
  const { refetch, data } = getCarts();
  const { setProducts } = useShopingCartStore();

  const { present, ref: refModal, dismiss } = useModal();
  const rootRef = useRef<View>(null);
  const {
    styles,
    theme: { color },
  } = useStyles(styleSheet);
  const navigator = useNavigation();

  const { isFetching, data: productDetail } = getProductDetail(
    params._id ? params._id : '67e6db0c6626580eeefc0423',
    true,
  );

  const { width: screenWidth } = Dimensions.get('screen');

  const handlePress = async () => {
    // const arrProductData = cloneProductData(productData, quantity);
    // setProducts([...products, ...arrProductData]);
    const { errorCode } = await mutateAsync({
      skuId: productDetail?.productSkus?.[0]?._id ?? '',
      quantity: 1,
    });

    if (errorCode !== 0) {
      return;
    }
    refetch();

    // navigator.navigate(APP_SCREEN.SHOPPING_CART);
  };

  useEffect(() => {
    setProducts(data?.hits ?? []);
  }, [data]);

  const {t} = useTranslation();

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        scroll
        backgroundColor={'transparent'}>
        <Block height={'100%'}>
          {isFetching ? (
            <Loading />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header with back, cart and share buttons */}
              <HeaderWithButton />

              {/* Product Image */}
              <ProductImage images={productDetail?.productImages ?? []} />

              {/* Product Title and Price Section */}
              <ProductSection productDetail={productDetail} />

              {/* review section */}
              <View style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }} />

              <Reviews trackings={productDetail?.trackings} />

              <TouchableOpacity
                style={styles.wrapText}
                onPress={() => navigator.navigate(APP_SCREEN.REVIEW)}>
                <Text style={{ ...styles.text }}>{t('product:see_all')}</Text>
                <AntDesign name="right" size={14} style={styles.text} />
              </TouchableOpacity>

              <View style={{ borderTopColor: '#f0f0f0', borderTopWidth: 8 }} />
              <SimilarProducts _id={productDetail?._id ?? ''} />
            </ScrollView>
          )}
        </Block>
      </Screen>

      <View
        style={{
          ...styles.flex,
          width: screenWidth,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            borderWidth: 0.5,
            borderColor: color.primaryBase,
            padding: 3,
            borderRadius: 5,
            height: 40,
            width: 80,
          }}
          onPress={() => handlePress()}>
          {isPending ? (
            <Loading />
          ) : (
            <>
              <AntDesign
                name="shoppingcart"
                size={24}
                style={{ ...styles.text, fontSize: 18 }}
              />
              <Text style={styles.text}>Add to cart</Text>
            </>
          )}
        </TouchableOpacity>
        <Block flex={1}>
          <PrimaryButton text={t('product:buy_now')} onPress={present} />
        </Block>
      </View>
      <BottomSheetOrder ref={refModal} dismiss={dismiss} data={productDetail} />
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  flex: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderTopColor: color.bgLight01,
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'space-between',
    padding: 15,
  },
  root: {
    backgroundColor: color.white01,
    flex: 1,
    paddingBottom: 15,
    paddingTop: 0,
    position: 'relative',
  },
  showMoreButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  showMoreText: {
    color: '#4070F4',
    marginRight: 5,
  },
  text: {
    color: color.primaryBase,
    fontSize: 14,
  },
  wrapText: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    padding: 15,
  },
}));

export default ProductDetail;
