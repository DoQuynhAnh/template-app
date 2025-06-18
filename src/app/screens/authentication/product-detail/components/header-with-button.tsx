import { View } from '@/library/components/core/View';
import { Text } from '@/library/components/text';
import { APP_SCREEN } from '@/navigation/screen-types';
import { useShopingCartStore } from '@/zustands/shopping-cart';
import ArrowWithCircleLeft from '@assets/icon/svg/arrow-with-circle-left';
import CartWithCircle from '@assets/icon/svg/cart-with-circle';
import ShareWithCircle from '@assets/icon/svg/share-with-circle';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Share, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const HeaderWithButton = () => {
  const { styles } = useStyles(styleSheet);
  const navigation = useNavigation();
  const { products } = useShopingCartStore();

  const shareLink = async () => {
    try {
      const result = await Share.share({
        message: 'Kiểm tra ứng dụng này!',
        url: 'https://your-website.com/product/123',
        title: 'Xem sản phẩm tuyệt vời này',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Đã chia sẻ với activityType
          console.log(`Đã chia sẻ với ${result.activityType}`);
        } else {
          // Đã chia sẻ
          console.log('Đã chia sẻ thành công');
        }
      } else if (result.action === Share.dismissedAction) {
        // Đã hủy
        console.log('Đã hủy chia sẻ');
      }
    } catch (error) {
      console.error('Lỗi khi chia sẻ:', error);
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.goBack()}>
        <ArrowWithCircleLeft />
      </TouchableOpacity>

      <View style={styles.rightIcons}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate(APP_SCREEN.SHOPPING_CART)}>
          {products.length !== 0 && (
            <Text style={styles.positionCountItemShop}>{products.length}</Text>
          )}
          <CartWithCircle />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={shareLink}>
          <ShareWithCircle />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    paddingHorizontal: 10,
    position: 'absolute',
    right: 0,
    top: 10,
    zIndex: 10,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  rightIcons: {
    flexDirection: 'row',
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
}));

export default HeaderWithButton;
