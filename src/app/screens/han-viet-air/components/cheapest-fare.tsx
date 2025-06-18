import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';
import React from 'react';
import AccommodationTab from './AccommodationTab';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SeeMore from './see-more';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const CheapestFare = () => {
  const images = [
    {
      id: '1',
      imageUrl: require('./assets/CheapestFare-2.png'),
    },
    {
      id: '2',
      imageUrl: require('./assets/CheapestFare-1.png'),
    },
    {
      id: '3',
      imageUrl: require('./assets/CheapestFare-2.png'),
    },
    {
      id: '4',
      imageUrl: require('./assets/CheapestFare-1.png'),
    },
  ];

  const { t } = useTranslation();
  return (
    <Block marginTop={15} padding={15}>
      <Text
        text={t('home:cheapest_ticket')}
        fontWeight="700"
        fontSize={18}
        // marginBottom={15}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Block direction="row" marginTop={10} paddingBottom={10}>
          <Block marginRight={10}>
            <AccommodationTab title={t('home:visit')} active={true} />
          </Block>
          <Block marginRight={10}>
            <AccommodationTab title={t('home:entertainment')} active={false} />
          </Block>
          <Block marginRight={10}>
            <AccommodationTab title={t('home:music_liveshow')} active={false} />
          </Block>
        </Block>
      </ScrollView>
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
              source={item.imageUrl }
              style={styles.image}
              resizeMode="cover"
            />
            {/* <Text style={styles.productTitle}>
              (남성)다이아몬드 패턴 퀼팅 자켓(BH670E-54N 05...
            </Text> */}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <SeeMore />
    </Block>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 12,
  },
  imageContainer: {
    width: width * 0.4,
    // height: 200,
    marginRight: 12,
    borderRadius: 12,
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    // overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 260,
  },
  //   productTitle: {
  //     color: '#333',
  //     fontSize: 18,
  //     fontWeight: '600',
  //     letterSpacing: -0.5,
  //     marginBottom: 5,
  //   },
});

export default CheapestFare;
