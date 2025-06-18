import React from 'react';

import { Block } from '@/library/components/block';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import { PrimaryButton } from '@/library/components/button/primary-button';
import _AntDesign from 'react-native-vector-icons/AntDesign';
import { useStyles } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';
import { APP_SCREEN } from '@/navigation/screen-types';
const AntDesign = _AntDesign as unknown as React.ElementType;

export const BottomCompleteGroup = () => {
  const {
    theme: { color },
  } = useStyles();

  const { navigate } = useNavigation();

  // func
  const handleRate = () => {
    navigate(APP_SCREEN.REVIEW_PRODUCT);
  };

  // render
  return (
    <Block paddingHorizontal={16} paddingVertical={12} direction={'row'} middle>
      <AntDesign size={16} name="check" color={color.primaryGreen} />
      <Spacer width={4} />
      <Text
        flex
        t18n="my_order:complete_description"
        colorTheme="primaryGreen"
        preset="caption"
      />
      <Spacer width={8} />
      <PrimaryButton onPress={handleRate} t18n="my_order:rate_now" />
    </Block>
  );
};
