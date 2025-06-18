import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import _AntDesign from 'react-native-vector-icons/AntDesign';
import { styleSheet } from './styles';
import { useTranslation } from 'react-i18next';
const AntDesign = _AntDesign as unknown as React.ElementType;

// Star component for reusability
const Star = ({ filled }: { filled: boolean }) => {
  return (
    <AntDesign name="star" size={14} color={filled ? '#FFB600' : '#B1B5C3'} />
  );
};

// Bar component for the rating distribution
const RatingBar = ({ count, total }: { count: number; total: number }) => {
  const percentage = (count / total) * 100;
  const { styles } = useStyles(styleSheet);
  return (
    <View style={styles.barContainer}>
      <View style={{ flex: 5 }}>
        <View style={[styles.bar, { width: `${percentage}%` }]} />
        <View style={styles.barBackground} />
      </View>
      <Text style={styles.barCount}>{count}</Text>
    </View>
  );
};

const RatingComponent = () => {
  const { styles } = useStyles(styleSheet);
  const { t } = useTranslation();

  // Static data from the image
  const totalRatings = 312;
  const averageRating = 4.7;
  const ratingDistribution = [
    { count: 280, stars: 5 },
    { count: 14, stars: 4 },
    { count: 7, stars: 3 },
    { count: 5, stars: 2 },
    { count: 3, stars: 1 },
  ];

  // Generate stars for the average rating section
  const renderAverageStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<Star key={i} filled={true} />);
    }
    return stars;
  };

  // Generate stars for the distribution section
  const renderDistributionStars = (numStars: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<Star key={i} filled={i < numStars} />);
    }
    return stars;
  };

  // Filter buttons
  const filterButtons = [
    { label: t('comment_list:all') },
    { label: t('comment_list:newest') },
    { label: t('comment_list:with_media') },
  ];

  // Star filter buttons
  const starFilterButtons = [5, 4, 3, 2, 1];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View>
      {/* Top section with average rating */}
      <View style={styles.topSection}>
        <View style={styles.averageContainer}>
          <Text style={styles.averageText}>{averageRating}</Text>
          <View style={styles.starsContainer}>{renderAverageStars()}</View>
          <Text style={styles.totalReviews}>
            {totalRatings} {t('shop_detail:rate')}
          </Text>
        </View>

        {/* Rating distribution */}
        <View style={styles.distributionContainer}>
          {ratingDistribution.map(item => (
            <View key={item.stars} style={styles.distributionRow}>
              <View style={styles.starsRow}>
                {renderDistributionStars(item.stars)}
              </View>
              <RatingBar count={item.count} total={totalRatings} />
            </View>
          ))}
        </View>
      </View>

      {/* Filter buttons */}
      <View style={styles.filterContainer}>
        {filterButtons.map((button, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveIndex(index)}
            style={[
              styles.filterButton,
              activeIndex === index
                ? styles.activeFilterButton
                : styles.inactiveFilterButton,
            ]}>
            <Text
              style={[
                styles.filterText,
                activeIndex === index
                  ? styles.activeFilterText
                  : styles.inactiveFilterText,
              ]}>
              {button.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Star filter buttons */}
      <View style={styles.starFilterContainer}>
        {starFilterButtons.map(stars => (
          <TouchableOpacity key={stars} style={styles.starFilterButton}>
            <Text style={styles.starFilterText}>{stars}</Text>
            <Star filled={true} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RatingComponent;
