import React from 'react';

import { Block } from '@/library/components/block';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import { PrimaryButton } from '@/library/components/button/primary-button';
import _Feather from 'react-native-vector-icons/Feather';
import { useStyles } from 'react-native-unistyles';
const Feather = _Feather as unknown as React.ElementType;

export const BottomCancelledGroup = () => {
  const {
    theme: { color },
  } = useStyles();

  // render
  return (
    <Block paddingHorizontal={16} paddingVertical={12} direction={'row'} middle>
      <Feather name="slash" color={color.status_red} size={16} />
      <Spacer width={4} />
      <Text
        flex
        text="Đã hủy bởi người bán"
        colorTheme="status_red"
        preset="caption"
      />
      <Spacer width={8} />
      <Block minWidth={140}>
        <PrimaryButton t18n="my_order:re_buy" />
      </Block>
    </Block>
  );
};
