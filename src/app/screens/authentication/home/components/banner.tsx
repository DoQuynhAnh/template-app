/* eslint-disable react/no-unstable-nested-components */
import EnhancedCarousel from '@/library/components/enhanced-carousel';
import { useGetBannersPosition } from '../../../../services/service-banner/banner.api';
import React from 'react';
import { Dimensions, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Banner = () => {
  const { data, isFetching } = useGetBannersPosition();
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const carouselWidth = SCREEN_WIDTH - 30;
  const carouselHeight = 150;

  // Skeleton component
  const BannerSkeleton = () => {
    return (
      <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
        <SkeletonPlaceholder
          backgroundColor="#E0E0E0"
          highlightColor="#F5F5F5"
          speed={1200}>
          <View
            style={{
              width: carouselWidth,
              height: carouselHeight,
              borderRadius: 8,
            }}
          />
        </SkeletonPlaceholder>

        {/* Pagination dots skeleton */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <SkeletonPlaceholder
            backgroundColor="#E0E0E0"
            highlightColor="#F5F5F5"
            speed={1200}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <View
                style={{
                  width: 16,
                  height: 8,
                  borderRadius: 4,
                  marginHorizontal: 4,
                }}
              />
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginHorizontal: 4,
                }}
              />
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginHorizontal: 4,
                }}
              />
            </View>
          </SkeletonPlaceholder>
        </View>
      </View>
    );
  };

  // If fetching data, show skeleton
  if (isFetching) {
    return <BannerSkeleton />;
  }

  return (
    <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
      <EnhancedCarousel
        data={
          data
            ? data?.map(e => ({
                id: e._id,
                title: e.title,
                description: e?.description ?? e.title,
                image: e.linkUrl,
              }))
            : []
        }
        autoPlay={true}
        autoPlayInterval={4000}
        showPagination={false}
        showCaption={false}
        carouselHeight={150}

        // onItemPress={handleCarouselItemPress}
        // Optional custom styling
        // style={styles.carousel}
        // imageStyle={styles.carouselImage}
        // captionContainerStyle={styles.customCaptionContainer}
        // titleStyle={styles.customTitle}
      />
    </View>
  );
};

export default Banner;
