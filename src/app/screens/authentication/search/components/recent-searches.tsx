import { Loading } from '@/library/components/post-delay/loading';
import {
  getBestSellerProducts,
  IProduct,
} from '../../../../services/service-products/products.api';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { getImageUrl } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { APP_SCREEN } from '@/navigation/screen-types';
import { useTranslation } from 'react-i18next';

interface IRecentSearches {
  isSearchResult: boolean;
  searchResult?: IProduct[];
  isLoading?: boolean;
}

const RecentSearches = ({
  isSearchResult,
  searchResult,
  isLoading,
}: IRecentSearches) => {
  const { styles } = useStyles(styleSheet);
  const { data, isFetching } = getBestSellerProducts();
  const { navigate } = useNavigation();
  const {t} = useTranslation();

  return (
    <View style={styles.root}>
      {!isSearchResult && (
        <Text style={styles.title}>{t('shop_detail:bestseller')}</Text>
      )}
      {isFetching || isLoading ? (
        <Loading />
      ) : (
        <View style={{ ...styles.flexStyle, marginTop: 10 }}>
          {isSearchResult && searchResult
            ? searchResult.map(item => (
                <TouchableOpacity
                  style={styles.container}
                  key={item._id}
                  onPress={() =>
                    navigate(APP_SCREEN.PRODUCT_DETAIL, {
                      _id: item._id,
                    })
                  }>
                  <View style={styles.card}>
                    <Image
                      source={{
                        uri: getImageUrl(item?.productImages?.[0].publicUrl),
                      }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.titleCard} numberOfLines={2}>
                        {item?.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            : data?.hits.map(item => (
                <TouchableOpacity
                  style={styles.container}
                  key={item._id}
                  onPress={() =>
                    navigate(APP_SCREEN.PRODUCT_DETAIL, {
                      _id: item._id,
                    })
                  }>
                  <View style={styles.card}>
                    <Image
                      source={{
                        uri: getImageUrl(item?.productImages?.[0].publicUrl),
                      }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.titleCard} numberOfLines={2}>
                        {item?.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
        </View>
      )}
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  card: {
    alignItems: 'center',
    // backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  container: {
    borderColor: color.info550,
    borderRadius: 8,
    borderWidth: 1,
    width: '48%',
  },
  flexStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  image: {
    borderRadius: 10,
    height: 55,
    width: 55,
  },
  root: {
    paddingHorizontal: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  title: {
    color: color.Neutrals07,
    fontSize: 16,
    fontWeight: 700,
    marginVertical: 24,
  },
  titleCard: {
    color: color.dark150,
    fontSize: 14,
  },
}));

export default RecentSearches;
