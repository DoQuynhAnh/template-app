/* eslint-disable react/react-in-jsx-scope */
import { PrimaryButton } from '@/library/components/button/primary-button';
import { Modal } from '@/library/components/select/modal';
import QuantityButton from '@/library/components/ui/quantity-button';
import { APP_SCREEN } from '@/navigation/screen-types';
import { getImageUrl } from '@/utils';
import { type BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useQuickBuy } from '../../../../services/service-order/order.api';
import { IProduct } from '../../../../services/service-products/products.api';
import { userGetShippingAddresses } from '../../../../services/service-auth/login.api';
import { useTranslation } from 'react-i18next';

interface IPBottomSheetOrder {
  data: IProduct | undefined;

  dismiss: () => void;
}

const BottomSheetOrder = React.forwardRef<BottomSheetModal, IPBottomSheetOrder>(
  (props, ref) => {
    const navigator = useNavigation();
    const { dismiss, data } = props;
    const { styles } = useStyles(styleSheet);
    const { data: addresses } = userGetShippingAddresses();
    const [quantity, setQuantity] = useState(1);
    const { mutateAsync, isPending } = useQuickBuy();

    const handleDecrease = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };

    const handleIncrease = () => {
      setQuantity(quantity + 1);
    };

    const handlePress = async () => {
      const { errorCode } = await mutateAsync({
        skuId: data?.productSkus[0]._id ?? '',
        quantity,
        addressId: addresses?.find(e => e.isDefault)?._id ?? '',
      });

      if (errorCode !== 0) {
        return;
      }

      navigator.navigate(APP_SCREEN.MY_ORDER, { defaultSelectedTab: 0 });
      dismiss();
    };

    const { t } = useTranslation();

    return (
      <View>
        <Modal
          snapPoints={['35%']}
          ref={ref}
          containerStyle={{ backgroundColor: '#FFFFFF', paddingHorizontal: 15 }}
          isShowCloseBtn={false}>
          <View style={{ ...styles.flexStyle, gap: 10 }}>
            <View>
              <Image
                source={{
                  uri: getImageUrl(data?.productImages[0].publicUrl),
                }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <View>
              <View style={{ ...styles.flexStyle, width: '92%' }}>
                <Text style={styles.productTitle}>
                  {data?.name ?? 'Tên sản phẩm'}
                </Text>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  {data?.productSkus[0]?.priceSell?.toLocaleString()} 원
                </Text>
                <Text style={styles.priceForeign}>344,520 VND</Text>
              </View>
              <Text style={styles.originalPrice}>2,000 원</Text>
            </View>
          </View>
          <View style={{ ...styles.flexStyle, paddingVertical: 15 }}>
            <Text style={styles.label}>{t('product:amount')}</Text>
            <QuantityButton
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
              quantity={quantity}
            />
          </View>

          <PrimaryButton
            text={t('product:buy_now')}
            onPress={handlePress}
            loading={isPending}
          />
        </Modal>
      </View>
    );
  },
);

const styleSheet = createStyleSheet(({ color }) => ({
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
    marginTop: 8,
  },
  priceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    marginBottom: 7,
    marginTop: 5,
  },
  priceForeign: {
    color: color.Neutrals09,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
  },
  productTitle: {
    color: color.Neutrals07,
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    color: '#333',
    fontSize: 16,
    paddingHorizontal: 15,
  },
}));

export default BottomSheetOrder;
