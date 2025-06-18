/* eslint-disable import/extensions */
import { Block } from '@/library/components/block';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import _EvilIcons from 'react-native-vector-icons/EvilIcons';
import _Feather from 'react-native-vector-icons/Feather';
const EvilIcons = _EvilIcons as unknown as React.ElementType;
const Feather = _Feather as unknown as React.ElementType;

const Footer = () => {
  // const handlePress = (url: string) => {
  //   Linking.openURL(url).catch(err => console.error('Không thể mở URL: ', err));
  // };

  const { t } = useTranslation();

  // Using translation keys for menu sections
  const menuSections = [
    {
      title: t('footer:hanviet_air_agency'),
      items: [
        {
          label: t('footer:hanoi_office'),
          type: 'address',
        },
        { label: '+84-985-422-486', type: 'phone' },
      ],
    },
    {
      title: t('footer:about_hanvietair'),
      items: [
        { label: t('footer:about_us'), type: 'link' },
        { label: 'Blog', type: 'link' },
        { label: t('footer:terms_policies'), type: 'link' },
      ],
    },
    {
      title: t('footer:customer_service'),
      items: [
        { label: t('footer:support_center'), type: 'link' },
        { label: t('footer:privacy_policy'), type: 'link' },
        { label: t('footer:faq'), type: 'link' },
        { label: t('footer:submit_question'), type: 'link' },
      ],
    },
    {
      title: t('footer:payment_shipping'),
      items: [
        { label: t('footer:service_fees'), type: 'link' },
        { label: t('footer:package_fees'), type: 'link' },
        { label: t('footer:international_shipping_fees'), type: 'link' },
        { label: t('footer:delivery_procedures'), type: 'link' },
      ],
    },
    {
      title: t('footer:user_guide'),
      items: [
        { label: t('footer:purchase_process'), type: 'link' },
        { label: t('footer:auction_process'), type: 'link' },
        { label: t('footer:last_minute_deals'), type: 'link' },
        { label: t('footer:quick_order_guide'), type: 'link' },
        { label: t('footer:auction_credit'), type: 'link' },
      ],
    },
  ];

  // Dữ liệu cho các kênh social media
  // const socialLinks = [
  //   { icon: 'facebook', url: 'https://facebook.com/hanvietair' },
  //   { icon: 'twitter', url: 'https://twitter.com/hanvietair' },
  //   { icon: 'instagram', url: 'https://instagram.com/hanvietair' },
  //   { icon: 'youtube-play', url: 'https://youtube.com/hanvietair' },
  // ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../../../assets/icon/source/hvair-logo.png')}
          // style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {menuSections.map((section, index) => (
        <View key={index} style={styles.section}>
          {section.title ? (
            <Block direction="row">
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </Block>
          ) : null}

          {section.items.map((item, itemIndex) => {
            if (item.type === 'address') {
              return (
                <View key={itemIndex} style={styles.addressItem}>
                  <EvilIcons name="location" size={20} />
                  <Text style={{ ...styles.addressText, paddingLeft: 2 }}>
                    {item.label}
                  </Text>
                </View>
              );
            } else if (item.type === 'phone') {
              return (
                <TouchableOpacity
                  key={itemIndex}
                  //   onPress={() => Linking.openURL(`tel:${item.label}`)}
                  style={styles.addressItem}>
                  <Feather name="phone" size={14} />
                  <Text style={{ ...styles.linkText, paddingLeft: 5 }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  key={itemIndex}
                  //   onPress={() => handlePress('#')}
                  style={styles.linkItem}>
                  <Text style={styles.linkText}>{item.label}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      ))}

      {/* <View style={styles.socialSection}>
        <Text style={styles.socialTitle}>Kết nối với Hanvietair</Text>
        <View style={styles.socialIcons}>
          {socialLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(link.url)}
              style={styles.socialButton}>
            </TouchableOpacity>
          ))}
        </View>
      </View> */}

      <View style={styles.footer}>
        <Text style={styles.copyright}>
          Copyright © 2025 Hanvietair. All Rights Reserved.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    alignItems: 'flex-start',
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  linkItem: {
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    flex: 1,
  },
  linkText: {
    fontSize: 14,
  },
  footer: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#2760ED',
  },
  copyright: {
    fontSize: 12,
    color: '#FFFFFF',
  },
});

export default Footer;
