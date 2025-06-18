/* eslint-disable react/no-unstable-nested-components */
// import ArrowLeft from '@assets/icon/svg/arrow-left';
import IconTrending from '@assets/icon/svg/icon-trending';
import React, { useEffect, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ItemBestSeller from './item-best-seller';
import { getBestSellerProducts } from '../../../../../services/service-products/products.api';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const BestSeller = () => {
  const { styles } = useStyles(styleSheet);
  const { data: responses, isFetching, refetch } = getBestSellerProducts();
  const isFocused = useIsFocused();
  const data = useMemo(() => {
    if (responses?.hits) {
      return responses.hits.map(e => ({
        name: e.name,
        soldCount: '',
        _id: e._id,
      }));
    }
    return [];
  }, [responses]);

  useEffect(() => {
    isFocused && refetch();
  }, [isFocused]);

  const renderItem = ({ item }: any) => {
    return (
      <ItemBestSeller
        name={item.name}
        soldCount={item.soldCount}
        _id={item._id}
      />
    );
  };

  // Skeleton component for the BestSeller section
  const BestSellerSkeleton = () => {
    // Create an array of 5 items for the skeleton
    const skeletonItems = Array(5).fill(null);

    return (
      <View style={{ padding: 15 }}>
        <View style={{ ...styles.wrapText }}>
          <View style={styles.wrapText}>
            <SkeletonPlaceholder speed={800}>
              <View style={{ width: 24, height: 24, borderRadius: 12 }} />
            </SkeletonPlaceholder>
            <SkeletonPlaceholder speed={800}>
              <View style={{ width: 120, height: 20, marginVertical: 10 }} />
            </SkeletonPlaceholder>
          </View>
        </View>

        <FlatList
          data={skeletonItems}
          renderItem={() => <ItemBestSellerSkeleton />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  // Skeleton item component
  const ItemBestSellerSkeleton = () => {
    return (
      <SkeletonPlaceholder
        backgroundColor="#E0E0E0"
        highlightColor="#F5F5F5"
        speed={800}>
        <View style={styles.skeletonItemWrap}>
          <View style={styles.skeletonImgContainer}>
            <View style={styles.skeletonImg} />
          </View>
          <View style={styles.skeletonTextContainer}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonSoldCount} />
          </View>
        </View>
      </SkeletonPlaceholder>
    );
  };

  const { t } = useTranslation();
  // Render skeleton if loading
  if (isFetching) {
    return <BestSellerSkeleton />;
  }

  return (
    <View style={{ padding: 15 }}>
      <View style={{ ...styles.wrapText }}>
        <View style={styles.wrapText}>
          <IconTrending />
          <Text style={styles.title}>{t('shop_detail:bestseller')}</Text>
        </View>
        {/* <TouchableOpacity style={styles.flipped}>
          <ArrowLeft />
        </TouchableOpacity> */}
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  flipped: {
    transform: [{ scaleX: -1 }],
  },
  title: {
    color: color.Neutrals07,
    fontSize: 16,
    fontWeight: 700,
    marginVertical: 10,
  },
  wrapText: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  // Skeleton styles
  skeletonItemWrap: {
    width: 123,
    height: 170,
    borderRadius: 4,
    marginRight: 8,
  },
  skeletonImgContainer: {
    height: 100,
    width: 123,
  },
  skeletonImg: {
    width: 119,
    height: 100,
    borderRadius: 4,
  },
  skeletonTextContainer: {
    padding: 10,
    gap: 10,
  },
  skeletonTitle: {
    width: 100,
    height: 16,
    borderRadius: 2,
  },
  skeletonSoldCount: {
    width: 80,
    height: 12,
    borderRadius: 2,
  },
}));

export default BestSeller;
