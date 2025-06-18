import React from 'react';

import { ImageMessageProps } from '../type';
import { Block } from '@/library/components/block';
import { Image } from '@/library/components/image';

export const ImageMessage = ({ image, mine }: ImageMessageProps) => {
  // render
  return (
    <Block paddingHorizontal={16}>
      <Block
        borderRadius={8}
        padding={4}
        colorTheme={mine ? 'primaryBase' : 'background'}
        alignSelf={mine ? 'flex-end' : 'flex-start'}>
        <Block
          borderRadius={4}
          overflow={'hidden'}
          width={150}
          height={200}
          color={'green'}>
          <Image source={image as string} resizeMode={'cover'} />
        </Block>
      </Block>
    </Block>
  );
};
