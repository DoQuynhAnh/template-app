/* eslint-disable sortKeysFix/sort-keys-fix */
/* eslint-disable sort-imports */
import { Checkbox } from '@/library/components/checkbox';
import QuantityButton from '@/library/components/ui/quantity-button';
import { getImageUrl } from '@/utils';
import { useShopingCartStore } from '@/zustands/shopping-cart';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import {
  ICartItem,
  cartsRemove,
} from '../../../../services/service-order/order.api';
import { CURRENCY } from '@/common/constant';
import { useTranslation } from 'react-i18next';

interface IPItemCart {
  data?: ICartItem;
  isCheckAll?: boolean;
  isShowCheckBox?: boolean;
  isShowFooter?: boolean;
  onPress?: (data: ICartItem) => void;
  isItemOrder?: boolean;
}

const ItemCart = ({
  data,
  isCheckAll,
  isShowCheckBox,
  isShowFooter,
  isItemOrder,
  onPress,
}: IPItemCart) => {
  const {
    styles,
    theme: { color },
  } = useStyles(styleSheet);
  const { mutateAsync } = cartsRemove();

  const { products, setProducts } = useShopingCartStore();

  const [quantity, setQuantity] = useState(1);
  const [checkboxValue, setCheckboxValue] = useState(isCheckAll);

  const handleRemove = async () => {
    await mutateAsync({
      id: data?._id ?? '',
    });

    const newArr = [...products];
    newArr.pop();
    setProducts(newArr);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    setCheckboxValue(isCheckAll);
  }, [isCheckAll]);

  const { t } = useTranslation();

  return (
    <View style={{ ...styles.flexStyle, gap: 10, marginBottom: 15 }}>
      {isShowCheckBox && (
        <Checkbox
          value={checkboxValue}
          onToggle={e => {
            setCheckboxValue(e);
            data && onPress && onPress(data);
          }}
        />
      )}
      <View>
        {!isItemOrder && (
          <Image
            source={{
              uri: data?.sku?.product?.productImages
                ? getImageUrl(data?.sku?.product?.productImages[0].publicUrl)
                : 'https://m.media-amazon.com/images/I/81L5shykO1L._AC_SL1300_.jpg',
            }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ ...styles.flexStyle }}>
          {isItemOrder ? (
            <Text style={styles.productTitle}>
              {t('my_order:order_code')}:{' '}
              {data?.orderCode ??
                '(남성)다이아몬드 패턴 질링 자켓 (BH670E-54N 050)차콜그레이'}
            </Text>
          ) : (
            <Text style={styles.productTitle}>
              {data?.sku?.product?.name ??
                '(남성)다이아몬드 패턴 질링 자켓 (BH670E-54N 050)차콜그레이'}
            </Text>
          )}
        </View>

        <Text style={styles.priceForeign}>{t('product:amount')}: 1</Text>
        <View style={styles.priceContainer}>
          {isItemOrder ? (
            <Text style={styles.price}>
              {data?.price?.toLocaleString() ?? 1} {CURRENCY}
            </Text>
          ) : (
            <Text style={styles.price}>
              {data?.sku?.priceSell?.toLocaleString() ?? 1} {CURRENCY}
            </Text>
          )}
          {/* <Text style={styles.priceForeign}>
            {isItemOrder ? `Giảm giá ${data?.promotion}` : '344,520'} {CURRENCY}
          </Text> */}
        </View>
        {/* <Text style={styles.originalPrice}>2,000 원</Text> */}
        {isShowFooter && (
          <View
            style={{
              ...styles.flexStyle,
              paddingVertical: 15,
              alignItems: 'center',
            }}>
            <QuantityButton
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
              quantity={quantity}
            />
            <TouchableOpacity onPress={() => handleRemove()}>
              <Text style={{ color: color.primaryBase, fontSize: 14 }}>
                {t('action:delete')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  button: {
    backgroundColor: '#e0e0e0',
    height: 30,
    width: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#333',
    fontSize: 18,
  },
  flexStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 8,
    height: 96,
    width: 96,
  },
  label: {
    color: '#333',
    fontSize: 16,
    marginRight: 20,
  },
  originalPrice: {
    color: color.Neutrals09,
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  price: {
    color: color.primaryBase,
    fontSize: 24,
    fontWeight: 'bold',
  },
  priceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  priceForeign: {
    color: color.Neutrals09,
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5,
  },
  productTitle: {
    color: color.Neutrals07,
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantityContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  quantityText: {
    color: '#333',
    fontSize: 16,
    paddingHorizontal: 15,
  },
}));
export default ItemCart;
