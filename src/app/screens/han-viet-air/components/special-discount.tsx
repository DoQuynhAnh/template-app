import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');

const SpecialDiscount = () => {
  const images = [
    {
      id: '1',
      imageUrl: require('./assets/SpecialDiscount-1.png'),
    },
    {
      id: '2',
      imageUrl: require('./assets/SpecialDiscount-2.png'),
    },
    {
      id: '3',
      imageUrl: require('./assets/SpecialDiscount-1.png'),
    },
    {
      id: '4',
      imageUrl: require('./assets/SpecialDiscount-2.png'),
    },
  ];

  const { t } = useTranslation();

  return (
    <Block marginTop={15} style={{ backgroundColor: '#F6FAFE' }} padding={15}>
      <Text
        text={t('home:special_discount')}
        fontWeight="700"
        fontSize={18}
        // marginBottom={15}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {images.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.imageContainer}
            activeOpacity={0.9}>
            <Image
              source={item.imageUrl}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 12,
  },
  imageContainer: {
    width: width * 0.4,
    height: width * 0.57,
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

export default SpecialDiscount;
