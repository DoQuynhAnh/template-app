import React from 'react';
import { StyleSheet } from 'react-native';

import { APP_SCREEN } from '@navigation/screen-types';
import { useNavigation } from '@react-navigation/native';
import { Block } from '@/library/components/block';
import { LocalImage } from '@/library/components/local-image';
import { Text } from '@/library/components/text';
import { Spacer } from '@/library/components/spacer';
import { PrimaryButton } from '@/library/components/button/primary-button';

export const Empty = () => {
  const { navigate } = useNavigation();

  // func
  const handleShopping = () => {
    navigate(APP_SCREEN.HOME);
  };

  // render
  return (
    <Block style={StyleSheet.absoluteFillObject} middle justifyContent="center">
      <Block width={120} height={120}>
        <LocalImage source="empty_product" />
      </Block>
      <Text
        preset="label"
        colorTheme="neutral_05"
        center
        t18n="favorite_product:empty"
      />
      <Spacer height={24} />
      <PrimaryButton
        t18n="favorite_product:goto_shopping"
        onPress={handleShopping}
      />
    </Block>
  );
};
