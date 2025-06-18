import { View } from '@/library/components/core/View';
import { ImageData } from '../../../../services/categories/categories.api';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { getImageUrl } from '@/utils';

interface IPropProductImage {
  images: ImageData[];
}

const ProductImage = ({ images }: IPropProductImage) => {
  const { styles } = useStyles(styleSheet);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const { width } = Dimensions.get('window');

  const renderItem = ({ item }: { item: ImageData }) => {
    return (
      <View style={[styles.imageWrapper, { width }]}>
        <Image
          source={{ uri: getImageUrl(item.publicUrl) }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>
    );
  };

  const handleScroll = (event: {
    nativeEvent: {
      layoutMeasurement: { width: any };
      contentOffset: { x: number };
    };
  }) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.imageContainer}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      <View style={styles.pageIndicator}>
        <Text style={styles.pageIndicatorText}>
          {currentIndex + 1}/{images.length}
        </Text>
      </View>
    </View>
  );
};

const styleSheet = createStyleSheet(() => ({
  imageContainer: {
    backgroundColor: 'white',
    height: 350,
    position: 'relative',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
  },
  productImage: {
    height: '100%',
    width: '100%',
  },
  pageIndicator: {
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    borderRadius: 15,
    bottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    right: 10,
  },
  pageIndicatorText: {
    color: 'white',
    fontSize: 12,
  },
}));

export default ProductImage;
