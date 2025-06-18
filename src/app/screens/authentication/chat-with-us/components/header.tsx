import React from 'react';

import BackButton from '@/library/components/back-button';
import { Block } from '@/library/components/block';
import { Spacer } from '@/library/components/spacer';
import { Text } from '@/library/components/text';
import { navigateScreen } from '@/navigation/navigation-service';
import { APP_SCREEN } from '@/navigation/screen-types';
import { useStyles } from 'react-native-unistyles';
import _AntDesign from 'react-native-vector-icons/AntDesign';
const AntDesign = _AntDesign as unknown as React.ElementType;

export const Header = () => {
  // state

  const {
    theme: { color },
  } = useStyles();

   const handleNavigateToHome = () => {
    navigateScreen(APP_SCREEN.HOME);
  };

  // render
  return (
    <Block
      borderBottomWidth={1}
      borderColorTheme={'neutral10'}
      // paddingTop={top}
      paddingHorizontal={16}
      paddingBottom={12}
      direction={'row'}
      middle>
      <BackButton customBack={handleNavigateToHome} />
      <Spacer width={16} />
      <Block>
        <Block direction="row" middle>
          <Text
            colorTheme="Neutrals07"
            preset="paragraph1Bold"
            text="Hanvietair"
          />
          <Spacer width={5} />
          <AntDesign name="checkcircle" color={color.primaryBase} size={10} />
        </Block>
        <Text
          preset="label"
          colorTheme="neutral_05"
          t18n="chat_with_us:online"
        />
      </Block>
    </Block>
  );
};
