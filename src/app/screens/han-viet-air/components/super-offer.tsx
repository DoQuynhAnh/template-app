/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/extensions */
import { Block } from '@/library/components/block';
import { ListView } from '@/library/components/list-view';
import { Text } from '@/library/components/text';
import ProductCard from '@/library/components/ui/product-card/product-card';
import ArrowLeft from '@assets/icon/svg/arrow-left';
import { ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const SuperOffer = () => {
  const actualData = [1, 2, 3, 4, 5, 6];
  const { styles } = useStyles(styleSheet);
  const {width} = Dimensions.get('screen');

  const renderItem = useCallback(({ index }: ListRenderItemInfo<number>) => {
    return <ProductCard key={index} index={index} noPadding noNavigate />;
  }, []);

  const renderList = () => {
    return (
      <ListView
        data={actualData}
        renderItem={renderItem}
        estimatedItemSize={56}
        // numColumns={2}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              padding: 3,
              // width: 10,
            }}
          />
        )}
      />
    );
  };

  const {t} = useTranslation();

  return (
    <Block marginTop={15}>
      <Text
        text={t('home:Super_deals')}
        fontWeight="700"
        fontSize={18}
        // marginBottom={15}
      />

      <Block direction="row" marginTop={10} style={styles.container}>
        <Image
          source={require('../../../../../assets/icon/source/banner-hanviet-2.jpeg')}
          style={{
            ...styles.styleImg,
            width: width - 30,
            height: 470,
          }}
          resizeMode="cover"
        />
        <LinearGradient
          locations={[0, 0.4, 0.9]}
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.9)',
          ]}
          style={styles.overlay}
        />
        <Block style={styles.textWithBtn}>
          <Block width={280}>
            <Text
              text={t('home:great_deals')}
              fontWeight="700"
              fontSize={16}
              colorTheme="primaryWhite"
              // marginBottom={15}
            />
            <TouchableOpacity
              style={{
                borderRadius: 10,
                backgroundColor: '#fff',
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
                width: 120,
                alignItems: 'center',
                flexDirection: 'row',
                gap: 5,
              }}>
              <Text
                fontWeight="600"
                fontSize={14}
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                {t('product:buy_now')}
              </Text>
              <Block style={styles.flipped}>
                <ArrowLeft />
              </Block>
            </TouchableOpacity>
          </Block>
          <Block width={width * 0.86}>{renderList()}</Block>
        </Block>
        {/* <View style={styles.overlay} /> */}
      </Block>
    </Block>
  );
};

const styleSheet = createStyleSheet(({}) => ({
  container: {
    position: 'relative',
  },
  styleImg: {
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    right: -10,
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  textWithBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    // width: '70%',
  },
  flipped: {
    transform: [{ scaleX: -1 }],
  },
}));

export default SuperOffer;
