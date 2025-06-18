import React from 'react';

import { APP_SCREEN } from '@navigation/screen-types';
import { Block } from '@/library/components/block';
import { Text } from '@/library/components/text';
import { Spacer } from '@/library/components/spacer';
import { PrimaryButton } from '@/library/components/button/primary-button';
import { useNavigation } from '@react-navigation/native';

export const BottomToShipGroup = () => {
  const { navigate } = useNavigation();

  // func
  const handleCancelOrder = () => {
    navigate(APP_SCREEN.CANCEL_ORDER);
  };
  // render
  return (
    <Block paddingHorizontal={16} paddingVertical={12} direction={'row'} middle>
      <Text
        flex
        // t18n="my_order:to_receive_description"
        colorTheme="primaryBase"
        preset="caption"
        t18nOptions={'19/02'}
      />
      <Spacer width={8} />
      <PrimaryButton onPress={handleCancelOrder} t18n="my_order:cancel_order" />
    </Block>
  );
};
