import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';
import React from 'react';

export const BottomToReceiveGroup = () => {
  // render
  return (
    <Block paddingHorizontal={16} paddingVertical={12} direction={'row'} middle>
      <Text
        flex
        t18n="my_order:to_receive_description"
        colorTheme="primaryBase"
        t18nOptions={{ date: '28/09/2022' }}
        preset="caption"
      />
    </Block>
  );
};
