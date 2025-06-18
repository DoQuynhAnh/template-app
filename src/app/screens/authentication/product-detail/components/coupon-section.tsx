import Subtract from '@assets/icon/svg/subtract';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import _AntDesign from 'react-native-vector-icons/AntDesign';
import ModalCoupon from './modal-coupon';
import { Text } from '@/library/components/text';

const AntDesign = _AntDesign as unknown as React.ElementType;

const CouponSection = () => {
  const { styles } = useStyles(styleSheet);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <View style={styles.couponSection}>
        <Text
          style={styles.couponText}
          t18n={'account:vouchers_count'}
          t18nOptions={'14'}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 15,
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity style={styles.couponButton}>
            <View style={{ ...styles.couponIcon }}>
              <Subtract />
            </View>
            <Text style={styles.couponButtonText}>Giảm 15K</Text>
          </TouchableOpacity>
          <View style={{ padding: 3 }} />
          <TouchableOpacity style={styles.couponButton}>
            <View style={styles.couponIcon}>
              <Subtract />
            </View>
            <Text style={styles.couponButtonText}>Giảm 25K</Text>
          </TouchableOpacity>
          <View style={{ paddingLeft: 1 }} />
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => {
              setIsVisible(false);
            }}>
            <AntDesign name="right" size={16} style={styles.AntDesign} />
          </TouchableOpacity>
        </View>
      </View>
      <ModalCoupon isVisible={isVisible} />
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  AntDesign: {
    color: color.primaryBase,
  },
  couponButton: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  couponButtonText: {
    color: color.primaryBase,
    fontSize: 10,
    textAlign: 'center',
  },
  couponIcon: {
    position: 'absolute',
    // left: 0,
  },
  couponSection: {
    alignItems: 'center',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 8,
    borderTopColor: '#f0f0f0',
    borderTopWidth: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    padding: 15,
  },

  couponText: {
    color: color.Neutrals07,
    fontSize: 12,
    marginRight: 10,
  },

  moreButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default CouponSection;
