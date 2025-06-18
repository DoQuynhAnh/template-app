/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  // ImageSourcePropType,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  // useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface EnhancedCarouselProps {
  data: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showPagination?: boolean;
  showCaption?: boolean;
  onItemPress?: (item: CarouselItem, index: number) => void;
  carouselWidth?: number;
  carouselHeight?: number;
  style?: object;
  imageStyle?: object;
  dotStyle?: object;
  activeDotStyle?: object;
  captionContainerStyle?: object;
  titleStyle?: object;
  descriptionStyle?: object;
}

const EnhancedCarousel: React.FC<EnhancedCarouselProps> = ({
  data,
  autoPlay = true,
  autoPlayInterval = 3000,
  showPagination = true,
  showCaption = true,
  onItemPress,
  carouselWidth = SCREEN_WIDTH - 30,
  carouselHeight = SCREEN_HEIGHT * 0.4,
  style,
  imageStyle,
  dotStyle,
  activeDotStyle,
  captionContainerStyle,
  titleStyle,
  descriptionStyle,
}) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const progressValue = useSharedValue<number>(0);

  // Handle item press
  const handleItemPress = useCallback(
    (item: CarouselItem, index: number) => {
      if (onItemPress) {
        onItemPress(item, index);
      }
    },
    [onItemPress],
  );

  // Scroll handler for progress animation
  // const scrollHandler = useAnimatedScrollHandler({
  //   onScroll: (event) => {
  //     progressValue.value = event.contentOffset.x / carouselWidth;
  //   },
  // });

  // Render carousel item
  const renderItem = useCallback(
    ({ item, index }: { item: CarouselItem; index: number }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => handleItemPress(item, index)}
          style={[styles.itemContainer, { width: carouselWidth }]}>
          <Image
            source={{ uri: item.image }}
            style={[
              styles.image,
              { height: carouselHeight, width: carouselWidth },
              imageStyle,
            ]}
            resizeMode="cover"
          />

          {showCaption && (
            <View style={[styles.captionContainer, captionContainerStyle]}>
              <Text style={[styles.title, titleStyle]} numberOfLines={1}>
                {item.title}
              </Text>
              <Text
                style={[styles.description, descriptionStyle]}
                numberOfLines={2}>
                {item.description}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      );
    },
    [
      carouselWidth,
      carouselHeight,
      handleItemPress,
      showCaption,
      imageStyle,
      captionContainerStyle,
      titleStyle,
      descriptionStyle,
    ],
  );

  // Custom pagination component
  const CustomPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {data.map((_, index) => {
          // Animation for each dot
          const animatedDotStyle = useAnimatedStyle(() => {
            const widthAnimation = interpolate(
              progressValue.value,
              [index - 1, index, index + 1],
              [8, 16, 8],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            );

            const opacityAnimation = interpolate(
              progressValue.value,
              [index - 1, index, index + 1],
              [0.5, 1, 0.5],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            );

            return {
              backgroundColor:
                index === Math.round(progressValue.value)
                  ? '#ffffff'
                  : 'rgba(255, 255, 255, 0.5)',
              opacity: opacityAnimation,
              width: widthAnimation,
            };
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                index === activeIndex && styles.activeDot,
                dotStyle,
                index === activeIndex && activeDotStyle,
                animatedDotStyle,
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Carousel
        ref={carouselRef}
        loop
        width={carouselWidth}
        height={carouselHeight}
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={index => setActiveIndex(index)}
        renderItem={renderItem}
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress;
        }}
        // panGestureHandlerProps={{
        //   activeOffsetX: [-10, 10],
        // }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingOffset: 50,
          parallaxScrollingScale: 0.92,
        }}
      />

      {showPagination && <CustomPagination />}
    </View>
  );
};

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: '#ffffff',
    width: 16,
  },
  captionContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    bottom: 0,
    left: 0,
    padding: 16,
    position: 'absolute',
    right: 0,
  },
  container: {
    // backgroundColor: '#000',
    // flex: 1,
  },
  description: {
    color: '#f0f0f0',
    fontSize: 14,
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    height: 8,
    marginHorizontal: 4,
    width: 8,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  paginationContainer: {
    alignItems: 'center',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default EnhancedCarousel;