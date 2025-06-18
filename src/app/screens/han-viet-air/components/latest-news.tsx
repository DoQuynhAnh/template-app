import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AccommodationTab from './AccommodationTab';
import SeeMore from './see-more';
import { Spacer } from '@/library/components/spacer';
import { useTranslation } from 'react-i18next';

const LatestNews = () => {
  const { t } = useTranslation();

  return (
    <Block marginTop={15} paddingHorizontal={15}>
      <Text
        text={t('home:latest_news')}
        fontWeight="700"
        fontSize={18}
        // marginBottom={15}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Block direction="row" marginTop={10} paddingBottom={10}>
          <Block marginRight={10}>
            <AccommodationTab title={t('home:rules_procedures')} active={true} />
          </Block>
          <Block marginRight={10}>
            <AccommodationTab title={t('home:travel_news')} active={false} />
          </Block>
          <Block marginRight={10}>
            <AccommodationTab title={t('home:vietnam_sim')} active={false} />
          </Block>
        </Block>
      </ScrollView>

      <Block paddingTop={10} direction="row" justifyContent="space-between">
        <TouchableOpacity>
          <Image
            source={require('./assets/LatestNews-1.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('./assets/LatestNews-2.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </Block>
      <Block paddingTop={10} direction="row" justifyContent="space-between">
        <TouchableOpacity>
          <Image
            source={require('./assets/LatestNews-3.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('./assets/LatestNews-4.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </Block>
      <SeeMore />
      <Spacer height={20} />
    </Block>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('screen').width * 0.45,
    height: Dimensions.get('screen').width * 0.45,
  },
});

export default LatestNews;
