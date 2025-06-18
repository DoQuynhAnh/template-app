/* eslint-disable no-nested-ternary */
import { Text } from '@/library/components/text';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import _Entypo from 'react-native-vector-icons/Entypo';
import _FontAwesome from 'react-native-vector-icons/FontAwesome';
const Entypo = _Entypo as unknown as React.ElementType;
const FontAwesome = _FontAwesome as unknown as React.ElementType;

const { width } = Dimensions.get('window');

const images = [
  {
    id: '1',
    uri: 'https://hanvietair-web.vfmtech.vn/_next/static/media/image1.349f7ed7.png',
  },
  {
    id: '2',
    uri: 'https://hanvietair-web.vfmtech.vn/_next/static/media/image1.349f7ed7.png',
  },
  {
    id: '3',
    uri: 'https://hanvietair-web.vfmtech.vn/_next/static/media/image1.349f7ed7.png',
  },
  {
    id: '4',
    uri: 'https://hanvietair-web.vfmtech.vn/_next/static/media/image1.349f7ed7.png',
  },
];

type ImageItem = {
  id: string;
  uri: string;
};

const StaticBanner = () => {
  const flatListRef = useRef<FlatList<ImageItem>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const autoScrollRef = useRef<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const ITEM_WIDTH = width;

  // Cập nhật ref khi state thay đổi
  useEffect(() => {
    autoScrollRef.current = autoScroll;
  }, [autoScroll]);

  // Thiết lập auto scroll với cơ chế ref
  const setupAutoScroll = () => {
    // Clear bất kỳ interval nào đang tồn tại
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Tạo mới interval nếu autoScroll = true
    if (autoScrollRef.current) {
      intervalRef.current = setInterval(() => {
        if (autoScrollRef.current && flatListRef.current) {
          const nextIndex = (currentIndex + 1) % images.length;
          flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        }
      }, 3000);
    }
  };

  // Khởi tạo và reset auto scroll
  useEffect(() => {
    setupAutoScroll();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, autoScroll]);

  // Toggle auto scroll function
  const toggleAutoScroll = () => {
    setAutoScroll(prev => !prev);
  };

  // Manual navigation
  const goToNextSlide = () => {
    if (flatListRef.current) {
      const nextIndex = (currentIndex + 1) % images.length;
      flatListRef.current.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }
  };

  const goToPrevSlide = () => {
    if (flatListRef.current) {
      const prevIndex =
        currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      flatListRef.current.scrollToIndex({
        index: prevIndex,
        animated: true,
      });
    }
  };

  // Scroll tracking with improved index calculation
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = e.nativeEvent.contentOffset.x;
        const newIndex = Math.round(offsetX / ITEM_WIDTH);

        // Chỉ cập nhật nếu index thực sự thay đổi và trong phạm vi hợp lệ
        if (
          newIndex !== currentIndex &&
          newIndex >= 0 &&
          newIndex < images.length
        ) {
          setCurrentIndex(newIndex);
        }
      },
    },
  );

  // Render item with overlay
  const renderItem = ({ item }: { item: ImageItem }) => (
    <View style={styles.slideContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        snapToInterval={width}
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onScroll={onScroll}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Navigation buttons */}
      <TouchableOpacity style={styles.navButtonLeft} onPress={goToPrevSlide}>
        <Text style={styles.navButtonText}>←</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButtonRight} onPress={goToNextSlide}>
        <Text style={styles.navButtonText}>→</Text>
      </TouchableOpacity>

      {/* Thanh điều khiển */}
      <View style={styles.controlContainer}>
        <TouchableOpacity onPress={toggleAutoScroll}>
          {/* <Text style={styles.menuButtonText}>{autoScroll ? '☰' : '▶'}</Text> */}
          {autoScroll ? (
            <Entypo name={'controller-play'} size={20} color={'#404040'} />
          ) : (
            <FontAwesome name={'pause'} size={20} color={'#404040'} />
          )}
        </TouchableOpacity>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarIndicator,
                {
                  left:
                    currentIndex === 0
                      ? '5%'
                      : currentIndex === images.length - 1
                      ? '76%'
                      : `${(currentIndex / (images.length - 1)) * 78}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.indexBadge}>
          <Text style={styles.indexText}>
            {String(currentIndex + 1).padStart(2, '0')}/
            {String(images.length).padStart(2, '0')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 16,
  },
  slideContainer: {
    width: width,
    position: 'relative',
    alignItems: 'center',
  },
  image: {
    width: width - 30,
    height: width / 2,
    resizeMode: 'cover',
  },
  navButtonLeft: {
    position: 'absolute',
    left: 24,
    top: '30%',
    backgroundColor: 'white',
    width: 35,
    height: 35,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 1,
    borderColor: '#e6e8ec',
  },
  navButtonRight: {
    position: 'absolute',
    right: 24,
    top: '30%',
    backgroundColor: 'white',
    width: 35,
    height: 35,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderColor: '#e6e8ec',
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b5563',
  },
  controlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 11,
  },
  progressBarContainer: {
    flex: 1,
    marginHorizontal: 16,
    position: 'relative',
  },
  progressBarTrack: {
    height: 2,
    backgroundColor: '#d1d5db',
    borderRadius: 2,
    position: 'relative',
  },
  progressBarIndicator: {
    position: 'absolute',
    width: '30%',
    height: 4,
    backgroundColor: '#23262F',
    borderRadius: 2,
    top: -1,
    transform: [{ translateX: -15 }],
  },
  indexBadge: {
    backgroundColor: '#F5F6F8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  indexText: {
    fontWeight: '600',
    fontSize: 13,
    color: '#23262F',
  },
});

export default StaticBanner;
