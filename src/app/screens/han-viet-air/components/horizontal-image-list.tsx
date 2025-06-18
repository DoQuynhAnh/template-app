/* eslint-disable import/extensions */
import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SeeMore from './see-more';

const { width } = Dimensions.get('window');

// Định nghĩa kiểu dữ liệu cho mỗi ảnh
export interface ImageItem {
  // imageUrl: string;
  imageUrl: ImageSourcePropType;
  title?: string;
  id: string;
}

const HorizontalImageList = () => {
  // Dữ liệu mẫu
  const images: ImageItem[] = [
    {
      id: '1',
      imageUrl: require('../../../../../assets/icon/source/card-1.png'),
    },
    {
      id: '5',
      imageUrl: require('../../../../../assets/icon/source/card-5.png'),
    },
    {
      id: '4',
      imageUrl: require('../../../../../assets/icon/source/card-4.png'),
    },
    {
      id: '3',
      imageUrl: require('../../../../../assets/icon/source/card-3.png'),
    },
    {
      id: '2',
      imageUrl: require('../../../../../assets/icon/source/card-2.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {images.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.imageContainer,
              // Number(item.id) % 2 !== 0 && { width: width * 0.4, height: 230 },
            ]}
            activeOpacity={0.9}>
            <Image
              source={item.imageUrl}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <SeeMore />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollContent: {
    // paddingHorizontal: 12,
  },
  imageContainer: {
    width: width * 0.4,
    height: width * 0.55,
    marginRight: 12,
    borderRadius: 12,
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    // overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default HorizontalImageList;
