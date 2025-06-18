import IconRectangle from '@assets/icon/svg/icon-rectangle';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Block } from '@/library/components/block';
import { useNavigation } from '@react-navigation/native';
import { APP_SCREEN } from '@/navigation/screen-types';

interface IPItemBestSeller {
  name: string;
  soldCount: number | string;
  isLoading?: boolean;
  _id: string;
}

const ItemBestSeller = ({
  _id,
  name,
  soldCount,
  isLoading = false,
}: IPItemBestSeller) => {
  const { styles } = useStyles(styleSheet);
  const { navigate } = useNavigation();

  const navigateToProductDetail = () => {
    navigate(APP_SCREEN.PRODUCT_DETAIL, {
      _id: _id ?? '',
    });
    // Navigate to product detail screen
  };

  // Skeleton version of the component
  if (isLoading) {
    return (
      <View style={styles.wrap}>
        <SkeletonPlaceholder
          backgroundColor="#E0E0E0"
          highlightColor="#F5F5F5"
          speed={800}>
          <Block>
            <View style={styles.wrapImg}>
              <View
                style={{
                  width: 119,
                  height: 100,
                  borderRadius: 4,
                }}
              />
            </View>
            <View style={styles.wrapText}>
              <View style={{ width: 100, height: 16, borderRadius: 2 }} />
              <View style={{ width: 80, height: 12, borderRadius: 2 }} />
            </View>
          </Block>
        </SkeletonPlaceholder>
      </View>
    );
  }

  // Normal component
  return (
    <TouchableOpacity onPress={navigateToProductDetail}>
      <View style={styles.wrap}>
        <View style={styles.wrapImg}>
          <IconRectangle
            style={{
              left: 0,
              zIndex: 2,
            }}
          />
          <View style={styles.img}>
            <Image
              style={{
                borderRadius: 4,
              }}
              width={119}
              height={100}
              resizeMode="cover"
              source={{
                uri: 'https://bizweb.dktcdn.net/100/153/764/products/ghe-sofa-gia-re-730t-3.jpg?v=1698656647950',
              }}
            />
          </View>
        </View>
        <View style={styles.wrapText}>
          <Text style={styles.title}>{name}</Text>
          {soldCount && (
            <Text style={styles.sloldCount}>Đã bán {soldCount}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  img: {
    left: 0,
    position: 'absolute',
    top: -0,
    zIndex: 1,
  },

  sloldCount: {
    color: color.Neutrals09,
    fontSize: 12,
    fontWeight: 400,
  },

  title: {
    color: color.Neutrals07,
    fontSize: 16,
    fontWeight: 700,
  },
  wrap: {
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
    borderColor: color.Neutrals08,
    borderTopEndRadius: 5,
    borderWidth: 2,
    marginRight: 8,
    width: 123,
    zIndex: 2,
  },
  wrapImg: {
    height: 100,
    position: 'relative',
  },
  wrapText: {
    gap: 10,
    padding: 10,
  },
}));

export default ItemBestSeller;
