/* eslint-disable react/jsx-no-undef */
import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';
import { APP_SCREEN } from '@/navigation/screen-types';
import AirplaneIcon from '@assets/icon/svg/airplane-icon';
import AttractionIcon from '@assets/icon/svg/attraction-icon';
import BusIcon from '@assets/icon/svg/bus-icon';
import HotelIcon from '@assets/icon/svg/hotel-icon';
import ShoppingBasketIcon from '@assets/icon/svg/shopping-basket-icon';
import TicketIcon from '@assets/icon/svg/ticket-icon';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import AccommodationTab from './AccommodationTab';
import CheapestFare from './cheapest-fare';
import Footer from './footer';
import HorizontalImageList from './horizontal-image-list';
import LatestNews from './latest-news';
import SpecialDiscount from './special-discount';
import StaticBanner from './static-banner';
import SuperOffer from './super-offer';
import { useTranslation } from 'react-i18next';

const CategoryItem = ({
  Icon,
  title,
  textStyle,
  hanedlePress,
}: {
  title: string;
  Icon: React.ReactNode;
  textStyle?: boolean;
  hanedlePress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        hanedlePress && hanedlePress();
      }}>
      <Block width={85} alignItems="center" paddingBottom={10}>
        {Icon}
        {!textStyle && <Block height={5} />}
        <Text
          text={title}
          center
          fontSize={12}
          style={{
            marginTop: textStyle ? -5 : 0,
          }}
        />
      </Block>
    </TouchableOpacity>
  );
};

// Chuyển MainContent thành forwardRef component để có thể sử dụng ref
const MainContent = forwardRef(() => {
  const { navigate } = useNavigation();
  const { styles } = useStyles(styleSheet);
  const scrollViewRef = useRef<ScrollView>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    // Cuộn lên đầu trang khi component được mount
    isFocused && scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [isFocused]);

  const { t } = useTranslation();

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.root}
      showsVerticalScrollIndicator={false}>
      {/* Categories Grid */}
      <Block paddingVertical={15} paddingHorizontal={5} color="#FFFFFF">
        <Block
          direction="row"
          flexWrap="wrap"
          // style={{ gap: 10 }}
          justifyContent="space-between">
          <CategoryItem
            Icon={<HotelIcon />}
            title={t('home:Hotel/Resort')}
            hanedlePress={() => navigate(APP_SCREEN.COMING_SOON)}
          />
          <CategoryItem
            Icon={<AirplaneIcon />}
            title={t('home:Airlines')}
            hanedlePress={() => navigate(APP_SCREEN.FLIGHT_SEARCH_SCREEN)}
          />
          <CategoryItem
            Icon={<ShoppingBasketIcon />}
            title={t('category:shopping')}
            hanedlePress={() => navigate(APP_SCREEN.HAN_VIET_AIR)}
          />
          <CategoryItem
            Icon={<BusIcon />}
            title={t('home:Transportation')}
            hanedlePress={() => navigate(APP_SCREEN.COMING_SOON)}
          />
        </Block>
        <Block
          marginTop={12}
          direction="row"
          flexWrap="wrap"
          style={{ gap: 10 }}>
          <CategoryItem
            Icon={<AttractionIcon />}
            title={t('home:Attractions')}
            hanedlePress={() => navigate(APP_SCREEN.COMING_SOON)}
          />
          <CategoryItem
            Icon={<TicketIcon />}
            title={t('home:Attraction_Tickets')}
            hanedlePress={() => navigate(APP_SCREEN.COMING_SOON)}
          />
          <CategoryItem
            Icon={
              <Image
                source={require('../../../../../assets/icon/source/chatbot-icon6684.jpg')}
                style={{
                  width: 88,
                  height: 58,
                }}
                resizeMode="contain"
              />
            }
            title={t('home:Chat_with_us')}
            textStyle={true}
            hanedlePress={() => navigate(APP_SCREEN.CHAT_WITH_US)}
          />
        </Block>
      </Block>
      <StaticBanner />
      {/* Accommodation Types */}
      <Block marginTop={15} paddingHorizontal={15}>
        <Text
          text={t('home:Popular_Accommodation_Types')}
          fontWeight="700"
          fontSize={18}
          // marginBottom={15}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Block direction="row" marginTop={10} paddingBottom={10}>
            <Block marginRight={10}>
              <AccommodationTab title={t('home:Hotels')} active={true} />
            </Block>
            <Block marginRight={10}>
              <AccommodationTab title={t('home:Guesthouses')} active={false} />
            </Block>
            <Block marginRight={10}>
              <AccommodationTab title={t('home:Villas')} active={false} />
            </Block>
            <Block>
              <AccommodationTab title="Homestay" active={false} />
            </Block>
          </Block>
        </ScrollView>
        <HorizontalImageList />
        <SuperOffer />
      </Block>
      <SpecialDiscount />
      <CheapestFare />
      <LatestNews />

      <Footer />
      <Block height={110} />
    </ScrollView>
  );
});

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.primaryWhite,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    gap: 10,
    height: '100%',
    marginTop: -20,
  },
}));

export default MainContent;
