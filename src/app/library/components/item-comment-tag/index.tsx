import React from 'react';


import { ItemTagProps } from './type';
import { TouchableOpacity } from 'react-native';
import { Block } from '../block';
import { Text } from '../text';

export const ItemCommentTag = ({ tag, selected, onPress }: ItemTagProps) => {
  // render
  return (
    <TouchableOpacity onPress={onPress}>
      <Block
        marginRight={8}
        paddingVertical={6}
        paddingHorizontal={16}
        borderRadius={8}
        borderWidth={1}
        borderColorTheme={selected ? 'primaryBase' : 'transparent'}
        colorTheme={selected ? 'primary_light' : 'neutral_03'}>
        <Text
          preset="label"
          colorTheme={selected ? 'primaryBase' : 'Neutrals07'}>
          {tag.content}
        </Text>
      </Block>
    </TouchableOpacity>
  );
};
