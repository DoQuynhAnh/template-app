import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';


import { ItemTabProps } from '../type';
import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';

export const ItemTab = ({ item, selected, onPress }: ItemTabProps) => {
  // render
  return (
    <Block alignSelf="center" block>
      <TouchableOpacity onPress={onPress}>
        <Block padding={16} middle>
          <Block opacity={selected ? 1 : 0}>
            <Text
              preset="placeholderBold"
              colorTheme="primaryBase"
              t18n={item?.titleT18n}
            />
          </Block>
          <Block
            opacity={selected ? 0 : 1}
            style={StyleSheet.absoluteFillObject}
            justifyContent="center"
            position="absolute"
            middle
            alignSelf="center">
            <Text
              preset="placeholder"
              colorTheme="dark150"
              t18n={item?.titleT18n}
            />
          </Block>
          {selected ? (
            <Block
              position="absolute"
              bottom={10}
              marginTop={5}
              width={24}
              height={2}
              borderRadius={4}
              colorTheme={'primaryBase'}
            />
          ) : null}
        </Block>
      </TouchableOpacity>
    </Block>
  );
};
