/* eslint-disable no-inline-comments */
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import _AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';

const AntDesign = _AntDesign as unknown as React.ElementType;

const ProductDescription = () => {
  const { styles } = useStyles(styleSheet);

  const [showMore, setShowMore] = React.useState(false);

  const opacity = new Animated.Value(1);

  const {t} = useTranslation();

  const toggleExpand = () => {
    Animated.timing(opacity, {
      toValue: showMore ? 1 : 0, // Khi mở rộng, opacity của vùng mờ giảm
      duration: 300,
      useNativeDriver: true,
    }).start();

    setShowMore(!showMore);
  };

  return (
    <View style={styles.descriptionSection}>
      <Text style={styles.descriptionTitle}>
        Máy Đa Năng Dùng Pin 18V Makita DUX18RGX4
      </Text>
      <Text
        style={[
          styles.descriptionText,
          showMore ? styles.expanded : styles.collapsed,
        ]}>
        Máy Đa Năng Dùng Pin 18V Makita DUX18RGX4 Là Sản Phẩm Được Nhiều Người
        Sử Dụng Tin Dùng Bởi
        {!showMore && (
          <Animated.View style={[styles.fadeOverlay, { opacity }]} />
        )}
        {/* Hiệu ứng mờ dần bằng LinearGradient */}
      </Text>
      {!showMore && <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0.3)',
          'rgba(255, 255, 255, 0.83)',
          '#FFFFFF',
        ]}
        locations={[0, 0.2708, 1]} // Chuyển 27.08% thành 0.2708
        start={{ x: 0.5, y: 0 }} // Bắt đầu từ giữa trên cùng
        end={{ x: 0.5, y: 1 }} // Kết thúc ở giữa dưới cùng (180 độ)
        style={styles.gradient}
      />}

      <TouchableOpacity style={styles.showMoreButton} onPress={toggleExpand}>
        <Text style={styles.showMoreText}>
          {!showMore ? t('product:see_more') : t('product:see_less')}
        </Text>
        <AntDesign name={showMore ? 'up' : 'down'} size={14} color="#4070F4" />
      </TouchableOpacity>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  descriptionSection: {
    paddingVertical: 15,
  },

  fadeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: 'white',
    opacity: 0.5,
  },
  descriptionText: {
    color: '#666',
    lineHeight: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.Neutrals07,
  },

  showMoreButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },

  collapsed: {
    maxHeight: 20,
    overflow: 'hidden',
  },
  expanded: {
    maxHeight: 'auto',
  },
  showMoreText: {
    color: '#4070F4',
    marginRight: 5,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%', // Chiều cao của gradient
    zIndex: 0, // Gradient nằm dưới text
  },
}));

export default ProductDescription;
