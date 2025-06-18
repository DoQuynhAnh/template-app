import { Block } from '@/library/components/block';
import { LocalImage } from '@/library/components/local-image';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import React from 'react';
import { StyleSheet } from 'react-native';

export const EmptyList = () => {
  // render
  return (
    <Block style={StyleSheet.absoluteFillObject} middle justifyContent="center">
      <Block width={120} height={120}>
        <LocalImage source="location" />
      </Block>
      <Spacer height={10} />
      <Text
        t18n={'list_address:address_empty'}
        colorTheme="neutral_05"
      />
    </Block>
  );
};
