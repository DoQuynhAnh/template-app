import React from 'react';


import { TextMessageProps } from '../type';
import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';

export const TextMessage = ({ mine, text }: TextMessageProps) => {
  // render
  return (
    <Block paddingHorizontal={16}>
      <Block
        borderRadius={8}
        paddingVertical={8}
        paddingHorizontal={16}
        colorTheme={mine ? 'primaryBase' : 'background'}
        alignSelf={mine ? 'flex-end' : 'flex-start'}>
        <Text
          preset="label"
          colorTheme={mine ? 'neutral_01' : 'Neutrals07'}>
          {text}
        </Text>
      </Block>
    </Block>
  );
};
