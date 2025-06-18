import { Block } from '@/library/components/block';
import { LocalImage } from '@/library/components/local-image';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import React from 'react';
import { StyleSheet } from 'react-native';

export const Empty = () => {
  // render
  return (
    <Block
      colorTheme="background"
      style={StyleSheet.absoluteFillObject}
      middle
      justifyContent="center">
      <Block
        height={8}
        position={'absolute'}
        top={0}
        width={'100%'}
        colorTheme={'background_overlay'}
      />
      <Block width={120} height={120}>
        <LocalImage source="empty_order" />
      </Block>
      <Spacer height={4} />
      <Text
        t18n="my_order:empty"
        preset="caption"
        colorTheme="neutral_05"
        center
      />
    </Block>
  );
};
